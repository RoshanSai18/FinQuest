import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Zap } from 'lucide-react';
import CityMap from './CityMap';
import ChapterTransition from './ChapterTransition';
import UIOverlay from './UIOverlay';

const LearningWorld = ({ onBack }) => {
  const [currentModule, setCurrentModule] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [skipAnimation, setSkipAnimation] = useState(false);

  // Define learning modules
  const modules = [
    {
      id: 0,
      title: 'Budget Basics',
      subtitle: 'Master the fundamentals',
      locked: false,
      position: { x: 15, y: 60 },
      color: 'from-blue-500 to-blue-600',
      icon: '💰'
    },
    {
      id: 1,
      title: 'Saving Strategies',
      subtitle: 'Build your safety net',
      locked: false,
      position: { x: 35, y: 55 },
      color: 'from-green-500 to-green-600',
      icon: '🏦'
    },
    {
      id: 2,
      title: 'Investing 101',
      subtitle: 'Grow your wealth',
      locked: currentModule < 1,
      position: { x: 60, y: 50 },
      color: 'from-purple-500 to-purple-600',
      icon: '📈'
    },
    {
      id: 3,
      title: 'Taxes & Credit',
      subtitle: 'Optimize your finances',
      locked: currentModule < 2,
      position: { x: 85, y: 55 },
      color: 'from-orange-500 to-orange-600',
      icon: '📊'
    }
  ];

  // Handle tower click
  const handleTowerClick = (moduleId) => {
    const module = modules[moduleId];
    if (module.locked) return;

    setIsTransitioning(true);
    
    // After car animation completes, show chapter
    const animationTime = skipAnimation ? 500 : 2000;
    setTimeout(() => {
      setSelectedChapter(module);
      setIsTransitioning(false);
    }, animationTime);
  };

  // Handle chapter completion
  const handleChapterComplete = () => {
    setSelectedChapter(null);
    // Unlock next module
    if (currentModule < modules.length - 1) {
      setCurrentModule(currentModule + 1);
    }
  };

  // Calculate completion percentage
  const completionPercentage = ((currentModule + 1) / modules.length) * 100;

  return (
    <div className="min-h-screen bg-dark text-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-900/20 via-dark to-dark pointer-events-none" />

      <AnimatePresence mode="wait">
        {!selectedChapter ? (
          <motion.div
            key="city"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10"
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBack}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-bold">Back</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSkipAnimation(!skipAnimation)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border backdrop-blur-md transition-all ${
                  skipAnimation 
                    ? 'bg-primary/20 border-primary/50 text-primary' 
                    : 'bg-white/10 border-white/20 hover:bg-white/20'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span className="font-bold text-sm">Quick Mode</span>
              </motion.button>
            </div>

            {/* UI Overlay */}
            <UIOverlay 
              modules={modules}
              currentModule={currentModule}
              completionPercentage={completionPercentage}
            />

            {/* City Map */}
            <CityMap
              modules={modules}
              currentModule={currentModule}
              onTowerClick={handleTowerClick}
              isTransitioning={isTransitioning}
              skipAnimation={skipAnimation}
            />
          </motion.div>
        ) : (
          <ChapterTransition
            key="chapter"
            chapter={selectedChapter}
            onBack={() => setSelectedChapter(null)}
            onComplete={handleChapterComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default LearningWorld;
