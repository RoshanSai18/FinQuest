import React from 'react';
import { motion } from 'framer-motion';

const UIOverlay = ({ progress }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="absolute top-6 left-1/2 transform -translate-x-1/2 z-40"
    >
      {/* Simple Progress Bar */}
      <div className="bg-dark/80 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 flex items-center gap-4 min-w-fit">
        <span className="text-base font-bold text-white whitespace-nowrap">Progress</span>
        
        {/* Progress Bar */}
        <div className="w-64 bg-white/10 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          />
        </div>

        {/* Percentage */}
        <span className="text-xl font-extrabold text-primary whitespace-nowrap">{progress}%</span>
      </div>
    </motion.div>
  );
};

export default UIOverlay;
