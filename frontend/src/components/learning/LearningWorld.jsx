import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, SkipForward } from 'lucide-react';
import CityMap from './CityMap';
import UIOverlay from './UIOverlay';
import ChapterTransition from './ChapterTransition';

const LearningWorld = ({ onClose }) => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showChapter, setShowChapter] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);

  // 4 Level towers - each level is a tower
  const levels = useMemo(() => [
    {
      id: 0,
      title: 'MONEY BASICS',
      shortTitle: 'Money Basics',
      subtitle: 'Survival Mode',
      theme: 'Understand → Control → Stabilize',
      color: '#10b981', // green
      icon: '🟢',
      completed: false,
      locked: false,
      position: { x: 20, y: 50 }, // First tower position
      moduleCount: 5,
      modules: [
        'Money Mindset',
        'Income & Cash Flow',
        'Expenses & Budgeting',
        'Saving Fundamentals',
        'Emergency Planning'
      ]
    },
    {
      id: 1,
      title: 'DEBT & CREDIT',
      shortTitle: 'Debt & Credit',
      subtitle: 'Adulting Mode',
      theme: 'Borrow → Control → Escape',
      color: '#3b82f6', // blue
      icon: '🔵',
      completed: false,
      locked: false,
      position: { x: 45, y: 50 }, // Second tower position
      moduleCount: 5,
      modules: [
        'Debt Basics',
        'Credit Cards & Score',
        'Loan Traps',
        'Debt Escape Strategies',
        'Financial Discipline'
      ]
    },
    {
      id: 2,
      title: 'PROTECTION & SECURITY',
      shortTitle: 'Protection',
      subtitle: 'Defense Mode',
      theme: 'Earn → Protect → Defend',
      color: '#a855f7', // purple
      icon: '🟣',
      completed: false,
      locked: false,
      position: { x: 70, y: 50 }, // Third tower position
      moduleCount: 3,
      modules: [
        'Banking & Digital Safety',
        'Emergency Funds & Safety Nets',
        'Income Protection'
      ]
    },
    {
      id: 3,
      title: 'RISK & WEALTH GROWTH',
      shortTitle: 'Wealth Growth',
      subtitle: 'Prosperity Mode',
      theme: 'Protect → Grow → Multiply',
      color: '#f97316', // orange
      icon: '🟠',
      completed: false,
      locked: false,
      position: { x: 95, y: 50 }, // Fourth tower position
      moduleCount: 3,
      modules: [
        'Risk & Insurance',
        'Investing Basics',
        'Long-Term Wealth'
      ]
    }
  ], []);

  // Check level completion
  useEffect(() => {
    // This will track when levels are completed for future enhancements
  }, [levels]);

  // Handle level click
  const handleLevelClick = (levelId) => {
    const level = levels.find(l => l.id === levelId);
    
    if (!level || level.locked || isAnimating) return;
    
    setIsAnimating(true);
    setCurrentLevel(levelId);
    setSelectedLevel(level);

    // After car reaches destination, show chapter
    setTimeout(() => {
      setIsAnimating(false);
      setShowChapter(true);
    }, 2000);
  };

  // Skip animation
  const handleSkipAnimation = () => {
    if (isAnimating) {
      setIsAnimating(false);
      setShowChapter(true);
    }
  };

  // Return to city
  const handleReturnToCity = () => {
    setShowChapter(false);
    setSelectedLevel(null);
  };

  // Calculate overall progress
  const completedLevels = levels.filter(l => l.completed).length;
  const progress = Math.round((completedLevels / levels.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-dark"
    >
      {/* Close Button */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-primary/50 transition-all backdrop-blur-sm"
        aria-label="Close Learning World"
      >
        <X className="w-6 h-6" />
      </motion.button>

      {/* Skip Animation Button */}
      <AnimatePresence>
        {isAnimating && (
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={handleSkipAnimation}
            className="absolute top-6 right-24 z-50 px-4 py-2 rounded-full bg-primary/20 hover:bg-primary/30 border border-primary/50 transition-all backdrop-blur-sm flex items-center gap-2"
          >
            <SkipForward className="w-4 h-4" />
            <span className="text-sm font-bold">Skip</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Progress Overlay */}
      <UIOverlay 
        progress={progress} 
        currentLevel={currentLevel}
        levels={levels}
      />

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {!showChapter ? (
          <motion.div
            key="city"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <CityMap
              levels={levels}
              currentLevel={currentLevel}
              isAnimating={isAnimating}
              onLevelClick={handleLevelClick}
            />
          </motion.div>
        ) : (
          <ChapterTransition
            key="chapter"
            level={selectedLevel}
            onReturn={handleReturnToCity}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LearningWorld;
