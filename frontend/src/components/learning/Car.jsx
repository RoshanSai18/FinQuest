import React from 'react';
import { motion } from 'framer-motion';

const Car = ({ position, isMoving, duration }) => {
  const x = position.x * 12;
  const y = position.y * 8 + 85; // Adjusted to sit on road

  return (
    <g>
      {/* Dust trail when moving */}
      {isMoving && (
        <>
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx={x - 20}
              cy={y + 10}
              r={3}
              fill="#666"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0, 1, 1.5],
                x: [-10, -20, -30]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </>
      )}

      {/* Car container - moves to target position */}
      <motion.g
        animate={{ 
          x: x, 
          y: y,
        }}
        transition={{ 
          duration: duration,
          ease: "easeInOut"
        }}
      >
        {/* Car shadow */}
        <ellipse
          cx="0"
          cy="18"
          rx="22"
          ry="4"
          fill="#000"
          opacity="0.4"
        />

        {/* Car body */}
        <motion.g
          animate={isMoving ? {
            y: [0, -2, 0]
          } : {}}
          transition={{
            duration: 0.3,
            repeat: isMoving ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          {/* Main body */}
          <rect
            x="-18"
            y="0"
            width="36"
            height="16"
            fill="#c8ff00"
            stroke="#a0cc00"
            strokeWidth="2"
            rx="3"
          />

          {/* Car top */}
          <path
            d="M -12,0 L -8,-8 L 8,-8 L 12,0 Z"
            fill="#a0cc00"
            stroke="#88aa00"
            strokeWidth="1.5"
          />

          {/* Windows */}
          <rect x="-10" y="-6" width="8" height="5" fill="#333" rx="1" />
          <rect x="2" y="-6" width="8" height="5" fill="#333" rx="1" />

          {/* Headlights */}
          <circle cx="16" cy="4" r="2" fill="#ffffcc" opacity="0.9" />
          <circle cx="16" cy="12" r="2" fill="#ff4444" opacity="0.8" />

          {/* Wheels */}
          <g>
            {/* Front wheel */}
            <circle cx="10" cy="16" r="4" fill="#222" stroke="#444" strokeWidth="1" />
            <motion.circle
              cx="10"
              cy="16"
              r="2"
              fill="#666"
              animate={isMoving ? { rotate: 360 } : {}}
              transition={{
                duration: 0.5,
                repeat: isMoving ? Infinity : 0,
                ease: "linear"
              }}
              style={{ originX: '10px', originY: '16px' }}
            />

            {/* Back wheel */}
            <circle cx="-10" cy="16" r="4" fill="#222" stroke="#444" strokeWidth="1" />
            <motion.circle
              cx="-10"
              cy="16"
              r="2"
              fill="#666"
              animate={isMoving ? { rotate: 360 } : {}}
              transition={{
                duration: 0.5,
                repeat: isMoving ? Infinity : 0,
                ease: "linear"
              }}
              style={{ originX: '-10px', originY: '16px' }}
            />
          </g>

          {/* Speed lines when moving */}
          {isMoving && (
            <>
              <motion.line
                x1="-25"
                y1="6"
                x2="-30"
                y2="6"
                stroke="#c8ff00"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  x1: [-25, -35],
                  x2: [-30, -40]
                }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity
                }}
              />
              <motion.line
                x1="-25"
                y1="10"
                x2="-28"
                y2="10"
                stroke="#c8ff00"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  x1: [-25, -32],
                  x2: [-28, -35]
                }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  delay: 0.1
                }}
              />
            </>
          )}
        </motion.g>
      </motion.g>
    </g>
  );
};

export default Car;
