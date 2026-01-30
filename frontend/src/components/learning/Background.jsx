import React from 'react';
import { motion } from 'framer-motion';

const Background = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-800/30 via-sky-900/20 to-transparent" />

      {/* Animated clouds */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${10 + i * 15}%`,
              left: `-10%`,
            }}
            animate={{
              x: ['0vw', '110vw']
            }}
            transition={{
              duration: 60 + i * 20,
              repeat: Infinity,
              ease: "linear",
              delay: i * 5
            }}
          >
            <svg width="120" height="50" viewBox="0 0 120 50">
              <ellipse cx="30" cy="25" rx="25" ry="15" fill="rgba(255,255,255,0.1)" />
              <ellipse cx="60" cy="20" rx="30" ry="18" fill="rgba(255,255,255,0.1)" />
              <ellipse cx="85" cy="25" rx="20" ry="12" fill="rgba(255,255,255,0.1)" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Animated birds */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              top: `${15 + i * 20}%`,
              left: `-5%`,
            }}
            animate={{
              x: ['0vw', '105vw'],
              y: [0, -20, 0, 20, 0]
            }}
            transition={{
              x: { duration: 40 + i * 10, repeat: Infinity, ease: "linear" },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              delay: i * 8
            }}
          >
            <motion.span
              animate={{
                rotate: [-5, 5, -5]
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🦅
            </motion.span>
          </motion.div>
        ))}
      </div>

      {/* Stars (subtle) */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 50}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Background;
