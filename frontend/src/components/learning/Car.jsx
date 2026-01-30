import React from 'react';
import { motion } from 'framer-motion';

const Car = ({ currentModule, modules, isAnimating }) => {
  const currentModuleData = modules[currentModule];
  
  // Calculate car position based on module position
  const x = (currentModuleData.position.x / 100) * 2000;
  const y = (currentModuleData.position.y / 100) * 800;

  return (
    <g id="car">
      {/* Dust trail effect */}
      {isAnimating && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.circle
              key={i}
              cx={x - 40 - i * 15}
              cy={y + 25}
              r="8"
              fill="rgba(200, 255, 0, 0.3)"
              initial={{ opacity: 0.6, scale: 1 }}
              animate={{
                opacity: 0,
                scale: 0.5,
                x: -20
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
        </>
      )}

      {/* Car Group - Animated */}
      <motion.g
        animate={{
          x: x - 300,
          y: y - 380
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 20,
          duration: 1.8
        }}
      >
        {/* Car Shadow */}
        <ellipse
          cx="300"
          cy="410"
          rx="40"
          ry="10"
          fill="rgba(0, 0, 0, 0.3)"
        />

        {/* Car Body */}
        <motion.g
          animate={{
            y: isAnimating ? [-2, 2, -2] : 0
          }}
          transition={{
            duration: 0.3,
            repeat: isAnimating ? Infinity : 0
          }}
        >
          {/* Main Car Body */}
          <rect
            x="260"
            y="380"
            width="80"
            height="25"
            fill="rgba(200, 255, 0, 0.9)"
            rx="5"
          />

          {/* Car Top/Cabin */}
          <path
            d="M 275 380 L 285 360 L 315 360 L 325 380 Z"
            fill="rgba(200, 255, 0, 0.7)"
            stroke="rgba(200, 255, 0, 1)"
            strokeWidth="2"
          />

          {/* Windows */}
          <rect
            x="288"
            y="365"
            width="12"
            height="12"
            fill="rgba(255, 255, 255, 0.3)"
            rx="2"
          />
          <rect
            x="303"
            y="365"
            width="12"
            height="12"
            fill="rgba(255, 255, 255, 0.3)"
            rx="2"
          />

          {/* Headlight */}
          <circle
            cx="338"
            cy="392"
            r="4"
            fill="rgba(255, 255, 100, 0.9)"
          />

          {/* Wheels */}
          <motion.circle
            cx="275"
            cy="405"
            r="8"
            fill="rgba(50, 50, 50, 0.9)"
            animate={{
              rotate: isAnimating ? 360 : 0
            }}
            transition={{
              duration: 0.5,
              repeat: isAnimating ? Infinity : 0,
              ease: "linear"
            }}
          />
          <circle
            cx="275"
            cy="405"
            r="4"
            fill="rgba(150, 150, 150, 0.8)"
          />

          <motion.circle
            cx="325"
            cy="405"
            r="8"
            fill="rgba(50, 50, 50, 0.9)"
            animate={{
              rotate: isAnimating ? 360 : 0
            }}
            transition={{
              duration: 0.5,
              repeat: isAnimating ? Infinity : 0,
              ease: "linear"
            }}
          />
          <circle
            cx="325"
            cy="405"
            r="4"
            fill="rgba(150, 150, 150, 0.8)"
          />

          {/* Shine effect */}
          <motion.ellipse
            cx="290"
            cy="390"
            rx="15"
            ry="8"
            fill="rgba(255, 255, 255, 0.3)"
            animate={{
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />
        </motion.g>
      </motion.g>
    </g>
  );
};

export default Car;
