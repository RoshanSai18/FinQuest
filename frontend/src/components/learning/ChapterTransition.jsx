import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, BookOpen, Clock, CheckCircle, Lock, X } from 'lucide-react';
import CoursePlayer from './CoursePlayer';
import { level1CourseData, level2CourseData, level3CourseData, level4CourseData } from './courseData';

const ChapterTransition = ({ level, onReturn }) => {
  const [showSyllabus, setShowSyllabus] = useState(false);
  const [showCoursePlayer, setShowCoursePlayer] = useState(false);
  
  if (!level) return null;
  
  // Get course data based on level ID
  const courseDataMap = [level1CourseData, level2CourseData, level3CourseData, level4CourseData];
  const courseData = courseDataMap[level.id] || null;
  
  const handleGetStarted = () => {
    if (courseData) {
      setShowCoursePlayer(true);
    }
  };
  
  const handleBackFromPlayer = () => {
    setShowCoursePlayer(false);
  };
  
  // If CoursePlayer is active, show it
  if (showCoursePlayer && courseData) {
    return <CoursePlayer levelData={courseData} onBack={handleBackFromPlayer} />;
  }

  // Extract level info
  const levelTitle = level.title || 'Learning Module';
  const levelIcon = level.icon || '🎯';
  const levelSubtitle = level.subtitle || '';
  const levelTheme = level.theme || '';
  const modules = level.modules || [];
  const isLocked = level.locked || false;
  const isCompleted = level.completed || false;

  // Use the primary green color from the landing page
  const primaryColor = '#c8ff00';

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] bg-dark/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl"
        >
          {/* Glowing background effect - primary green */}
          <div 
            className="absolute inset-0 rounded-3xl blur-3xl opacity-30"
            style={{ background: `radial-gradient(circle at center, ${primaryColor}, transparent 70%)` }}
          />

          {/* Main Card - matching financial calculator style */}
          <div className="relative bg-gradient-to-br from-dark via-dark to-dark/95 backdrop-blur-2xl border-2 rounded-3xl p-6 sm:p-10 shadow-2xl"
               style={{ 
                 borderColor: primaryColor,
                 boxShadow: `0 0 60px ${primaryColor}40, 0 20px 60px rgba(0,0,0,0.5)` 
               }}
          >
          
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              onClick={onReturn}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 border-2 transition-all backdrop-blur-sm group z-10"
              style={{ borderColor: `${primaryColor}40` }}
              whileHover={{ scale: 1.1, rotate: 90, borderColor: primaryColor }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-colors" style={{ color: primaryColor }} />
            </motion.button>

            {/* Header Section */}
            <div className="text-center mb-8">
              {/* Level Icon with glow */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.1 }}
                className="relative inline-block mb-6"
              >
                <div 
                  className="absolute inset-0 rounded-full blur-3xl opacity-60"
                  style={{ background: primaryColor }}
                />
                <div 
                  className="relative text-7xl sm:text-8xl filter drop-shadow-2xl"
                  style={{ textShadow: `0 0 40px ${primaryColor}` }}
                >
                  {levelIcon}
                </div>
              </motion.div>

              {/* Level Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-4"
              >
                <span 
                  className="inline-block px-5 py-2 rounded-full text-xs sm:text-sm font-bold backdrop-blur-sm border-2"
                  style={{ 
                    backgroundColor: `${primaryColor}15`, 
                    color: primaryColor,
                    borderColor: primaryColor,
                    boxShadow: `0 0 20px ${primaryColor}40`
                  }}
                >
                  {levelSubtitle}
                </span>
              </motion.div>

              {/* Level Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl sm:text-5xl font-extrabold mb-3"
                style={{ 
                  color: primaryColor,
                  textShadow: `0 0 30px ${primaryColor}60`,
                  filter: 'drop-shadow(0 0 20px rgba(200,255,0,0.4))'
                }}
              >
                {levelTitle}
              </motion.h1>

              {/* Level Theme */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-base sm:text-xl text-gray-300 font-semibold mb-6"
              >
                {levelTheme}
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center gap-6 sm:gap-8 text-gray-400"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: primaryColor }} />
                  <span className="text-sm sm:text-base font-semibold">{modules.length} Modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: primaryColor }} />
                  <span className="text-sm sm:text-base font-semibold">~{modules.length * 30} mins</span>
                </div>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-6"
            >
              <motion.button
                onClick={handleGetStarted}
                disabled={isLocked}
                className="flex-1 group relative px-6 sm:px-8 py-4 text-base sm:text-lg font-extrabold rounded-xl transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed border-2"
                style={{
                  backgroundColor: primaryColor,
                  color: '#0a0a0a',
                  borderColor: primaryColor,
                  boxShadow: `0 8px 32px ${primaryColor}60, inset 0 1px 0 rgba(255,255,255,0.2)`
                }}
                whileHover={!isLocked ? { 
                  scale: 1.02, 
                  boxShadow: `0 12px 40px ${primaryColor}80, inset 0 1px 0 rgba(255,255,255,0.3)`,
                  y: -2
                } : {}}
                whileTap={!isLocked ? { scale: 0.98 } : {}}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                  {isCompleted ? 'Continue Learning' : 'Get Started'}
                </span>
              </motion.button>

              <motion.button
                onClick={() => setShowSyllabus(true)}
                className="flex-1 px-6 sm:px-8 py-4 text-base sm:text-lg font-bold bg-white/5 hover:bg-white/10 border-2 rounded-xl transition-all backdrop-blur-sm"
                style={{ borderColor: `${primaryColor}40` }}
                whileHover={{ 
                  scale: 1.02, 
                  borderColor: primaryColor,
                  backgroundColor: `${primaryColor}10`,
                  boxShadow: `0 0 20px ${primaryColor}30`
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center gap-2" style={{ color: primaryColor }}>
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
                  View Syllabus
                </span>
              </motion.button>
            </motion.div>

            {/* Progress Indicator */}
            {isCompleted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="p-4 rounded-xl flex items-center gap-3 border-2"
                style={{ 
                  backgroundColor: `${primaryColor}10`,
                  borderColor: `${primaryColor}40`,
                  boxShadow: `0 0 20px ${primaryColor}20`
                }}
              >
                <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: primaryColor }} />
                <span className="text-sm font-semibold" style={{ color: primaryColor }}>
                  You&apos;ve completed this level! 🎉
                </span>
              </motion.div>
            )}

            {isLocked && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="p-4 bg-yellow-500/10 border-2 border-yellow-500/30 rounded-xl flex items-center gap-3"
              >
                <Lock className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <span className="text-sm font-semibold text-yellow-400">
                  Complete previous levels to unlock this content
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Syllabus Modal */}
      <AnimatePresence>
        {showSyllabus && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowSyllabus(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl max-h-[80vh] overflow-y-auto scrollbar-hide"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glowing background */}
              <div 
                className="absolute inset-0 rounded-3xl blur-3xl opacity-30"
                style={{ background: `radial-gradient(circle at center, ${primaryColor}, transparent 70%)` }}
              />

              {/* Syllabus Card */}
              <div className="relative bg-gradient-to-br from-dark via-dark to-dark/95 backdrop-blur-2xl border-2 rounded-3xl p-6 sm:p-8 shadow-2xl"
                   style={{ 
                     borderColor: primaryColor,
                     boxShadow: `0 0 60px ${primaryColor}40` 
                   }}
              >
                {/* Close Button */}
                <motion.button
                  onClick={() => setShowSyllabus(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 border-2 transition-all"
                  style={{ borderColor: `${primaryColor}40` }}
                  whileHover={{ scale: 1.1, borderColor: primaryColor }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5" style={{ color: primaryColor }} />
                </motion.button>

                {/* Syllabus Header */}
                <motion.h2
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl sm:text-3xl font-extrabold mb-6 flex items-center gap-3"
                  style={{ color: primaryColor }}
                >
                  <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />
                  What You&apos;ll Learn
                </motion.h2>

                {/* Modules List */}
                <div className="grid grid-cols-1 gap-3">
                  {modules.map((moduleName, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                      className="bg-white/5 hover:bg-white/10 border-2 border-white/10 rounded-xl p-4 flex items-center gap-4 transition-all group cursor-pointer"
                      style={{ 
                        borderLeftColor: primaryColor, 
                        borderLeftWidth: '4px',
                      }}
                      whileHover={{ 
                        x: 5, 
                        borderLeftWidth: '5px',
                        backgroundColor: `${primaryColor}05`,
                        boxShadow: `0 0 20px ${primaryColor}20`
                      }}
                    >
                      <div 
                        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-base backdrop-blur-sm border-2"
                        style={{ 
                          backgroundColor: `${primaryColor}20`,
                          color: primaryColor,
                          borderColor: primaryColor
                        }}
                      >
                        {index + 1}
                      </div>
                      <span className="text-base font-semibold text-white/90 group-hover:text-white transition-colors">
                        {moduleName}
                      </span>
                      {index === 0 && !isLocked && (
                        <CheckCircle className="ml-auto w-5 h-5" style={{ color: primaryColor }} />
                      )}
                      {isLocked && (
                        <Lock className="ml-auto w-5 h-5 text-gray-500" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChapterTransition;
