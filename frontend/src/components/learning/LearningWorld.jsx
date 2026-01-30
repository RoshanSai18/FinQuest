import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, SkipForward, Award } from 'lucide-react';
import CityMap from './CityMap';
import UIOverlay from './UIOverlay';
import ChapterTransition from './ChapterTransition';

const LearningWorld = ({ onClose }) => {
  const [currentModule, setCurrentModule] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showChapter, setShowChapter] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  // Module data
  const modules = [
    {
      id: 0,
      title: 'Budget Basics',
      description: 'Master the fundamentals of budgeting',
      icon: '💰',
      completed: true,
      locked: false,
      position: { x: 15, y: 50 }
    },
    {
      id: 1,
      title: 'Saving Strategies',
      description: 'Learn effective saving techniques',
      icon: '🏦',
      completed: false,
      locked: false,
      position: { x: 35, y: 45 }
    },
    {
      id: 2,
      title: 'Investing 101',
      description: 'Begin your investment journey',
      icon: '📈',
      completed: false,
      locked: false,
      position: { x: 60, y: 48 }
    },
    {
      id: 3,
      title: 'Taxes & Credit',
      description: 'Understand taxes and credit scores',
      icon: '📊',
      completed: false,
      locked: true,
      position: { x: 85, y: 52 }
    }
  ];

  // Handle module click
  const handleModuleClick = (moduleId) => {
    const module = modules.find(m => m.id === moduleId);
    if (module.locked || isAnimating) return;
    
    setIsAnimating(true);
    setCurrentModule(moduleId);
    setSelectedModule(module);

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
    setSelectedModule(null);
  };

  // Calculate progress
  const progress = Math.round((modules.filter(m => m.completed).length / modules.length) * 100);

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
      <UIOverlay progress={progress} />

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
              modules={modules}
              currentModule={currentModule}
              isAnimating={isAnimating}
              onModuleClick={handleModuleClick}
            />
          </motion.div>
        ) : (
          <ChapterTransition
            key="chapter"
            module={selectedModule}
            onReturn={handleReturnToCity}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LearningWorld;
