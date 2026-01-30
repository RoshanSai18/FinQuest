import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const UIOverlay = ({ progress, currentLevel, levels }) => {
  const levelInfo = levels && currentLevel !== undefined ? levels[currentLevel] : null;
  const [hoveredModule, setHoveredModule] = useState(null);
  
  // Flatten all modules across levels to create milestone array
  const allModules = levels ? levels.flatMap((level, levelIndex) => 
    level.modules.map((moduleName, moduleIndex) => ({
      id: `${levelIndex}-${moduleIndex}`,
      name: moduleName,
      levelTitle: level.shortTitle || level.title,
      levelIcon: level.icon,
      levelColor: level.color,
      levelIndex,
      moduleIndex,
      completed: level.completed || (levelIndex < currentLevel),
      isCurrent: levelIndex === currentLevel && moduleIndex === 0,
      locked: level.locked || levelIndex > currentLevel
    }))
  ) : [];
  
  return (
    <div className="fixed top-0 left-0 right-0 z-40 flex justify-center pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 pointer-events-auto relative"
      >
        {/* Segmented Progress Bar */}
        <div className="bg-dark/80 backdrop-blur-xl border border-white/20 rounded-full px-8 py-4 flex items-center gap-6">
          {/* Level Badge (if available) */}
          {levelInfo && (
            <div className="flex items-center gap-2">
              <span className="text-2xl">{levelInfo.icon}</span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white/60 whitespace-nowrap leading-tight">
                  {levelInfo.title}
                </span>
              </div>
            </div>
          )}
          
          <div className="w-px h-6 bg-white/20" />
          
          <span className="text-base font-bold text-white whitespace-nowrap">Learning Journey</span>
          
          {/* Segmented Milestone Progress */}
          <div className="flex items-center gap-1.5 px-2">
            {allModules.map((module, index) => (
              <div key={module.id} className="flex items-center">
                {/* Module Dot */}
                <div
                  className="relative"
                  onMouseEnter={() => setHoveredModule(module)}
                  onMouseLeave={() => setHoveredModule(null)}
                >
                  <motion.div
                    className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                      module.completed 
                        ? 'bg-primary shadow-lg shadow-primary/50'
                        : module.isCurrent
                        ? 'bg-primary/70'
                        : 'bg-white/20'
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: module.isCurrent ? [1, 1.3, 1] : 1,
                      boxShadow: module.isCurrent 
                        ? [
                            '0 0 0 0 rgba(200, 255, 0, 0.4)',
                            '0 0 0 8px rgba(200, 255, 0, 0)',
                            '0 0 0 0 rgba(200, 255, 0, 0)'
                          ]
                        : 'none'
                    }}
                    transition={{
                      delay: 0.6 + index * 0.03,
                      duration: module.isCurrent ? 1.5 : 0.3,
                      repeat: module.isCurrent ? Infinity : 0
                    }}
                    whileHover={{ scale: 1.4 }}
                  />
                  
                  {/* Check mark for completed */}
                  {module.completed && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.03 }}
                    >
                      <svg className="w-2 h-2 text-dark" fill="currentColor" viewBox="0 0 12 12">
                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>
                  )}
                </div>
                
                {/* Connecting Line */}
                {index < allModules.length - 1 && (
                  <motion.div
                    className={`h-0.5 ${
                      module.completed ? 'bg-primary/50' : 'bg-white/10'
                    }`}
                    style={{ width: '12px' }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.65 + index * 0.03 }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Percentage */}
          <span className="text-xl font-extrabold text-primary whitespace-nowrap">{progress}%</span>
        </div>
        
        {/* Hover Tooltip */}
        <AnimatePresence>
          {hoveredModule && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-dark/95 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-3 shadow-xl pointer-events-none z-50"
              style={{ minWidth: '220px' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{hoveredModule.levelIcon}</span>
                <span className="text-xs font-semibold text-white/70">{hoveredModule.levelTitle}</span>
              </div>
              <div className="text-sm font-bold text-white mb-1">{hoveredModule.name}</div>
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: hoveredModule.levelColor }}
                />
                <span className="text-xs text-white/60">
                  {hoveredModule.completed 
                    ? 'Completed ✓' 
                    : hoveredModule.isCurrent 
                    ? 'In Progress...' 
                    : 'Locked'}
                </span>
              </div>
              {/* Tooltip Arrow */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-dark/95 border-l border-t border-white/20 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default UIOverlay;
