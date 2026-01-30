import React from 'react';
import { motion } from 'framer-motion';

const Background = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-100 to-dark" />

      {/* Animated Stars/Dots */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 60}%`
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      {/* Ground/Grass Base */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/5 to-transparent" />
    </div>
  );
};

export default Background;
