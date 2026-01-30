import React from 'react';
import { motion } from 'framer-motion';
import { Award, Target } from 'lucide-react';

const UIOverlay = ({ modules, currentModule, completionPercentage }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-40">
      {/* Progress indicator - Top right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-6 right-8 pointer-events-auto"
      >
        <div className="bg-dark/90 backdrop-blur-md border border-primary/30 rounded-2xl p-4 min-w-[200px]">
          {/* Progress header */}
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-5 h-5 text-primary" />
            <span className="font-bold text-base text-white">Your Progress</span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-white/10 rounded-full h-3 mb-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-primary/70"
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400 font-medium">
              {currentModule + 1} of {modules.length} modules
            </span>
            <span className="text-primary font-bold">
              {Math.round(completionPercentage)}%
            </span>
          </div>

          {/* Module list */}
          <div className="mt-4 space-y-2">
            {modules.map((module, index) => (
              <div
                key={module.id}
                className={`flex items-center gap-2 text-xs font-medium transition-all ${
                  index <= currentModule
                    ? 'text-primary'
                    : module.locked
                    ? 'text-gray-600'
                    : 'text-gray-400'
                }`}
              >
                {index <= currentModule ? (
                  <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-dark text-[10px]">✓</span>
                  </div>
                ) : (
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    module.locked ? 'border-gray-600' : 'border-gray-400'
                  }`} />
                )}
                <span>{module.title}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Quick guide - Bottom left */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-8 pointer-events-auto"
      >
        <div className="bg-dark/90 backdrop-blur-md border border-white/20 rounded-xl p-4 max-w-xs">
          <div className="flex items-start gap-3">
            <Target className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-bold text-sm text-white mb-1">Quick Guide</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Click on any unlocked tower to drive there and start learning. Complete modules to unlock new ones!
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UIOverlay;
