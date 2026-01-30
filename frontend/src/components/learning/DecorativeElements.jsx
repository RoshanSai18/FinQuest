import React from 'react';
import { motion } from 'framer-motion';

const DecorativeElements = () => {
  // Tree positions along the road
  const trees = [
    { x: 200, y: 550 },
    { x: 500, y: 520 },
    { x: 850, y: 540 },
    { x: 1100, y: 560 },
    { x: 1400, y: 550 },
    { x: 1700, y: 570 }
  ];

  // Cloud positions
  const clouds = [
    { x: 300, y: 150, scale: 1 },
    { x: 800, y: 100, scale: 1.2 },
    { x: 1400, y: 180, scale: 0.9 },
    { x: 1800, y: 120, scale: 1.1 }
  ];

  return (
    <g id="decorative-elements">
      {/* Trees */}
      {trees.map((tree, index) => (
        <motion.g
          key={`tree-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 + index * 0.1 }}
        >
          {/* Tree trunk */}
          <rect
            x={tree.x - 5}
            y={tree.y - 30}
            width="10"
            height="30"
            fill="rgba(139, 69, 19, 0.6)"
            rx="2"
          />
          
          {/* Tree foliage */}
          <motion.circle
            cx={tree.x}
            cy={tree.y - 40}
            r="20"
            fill="rgba(34, 197, 94, 0.3)"
            animate={{
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.5
            }}
          />
          <circle
            cx={tree.x - 10}
            cy={tree.y - 35}
            r="15"
            fill="rgba(34, 197, 94, 0.25)"
          />
          <circle
            cx={tree.x + 10}
            cy={tree.y - 35}
            r="15"
            fill="rgba(34, 197, 94, 0.25)"
          />
        </motion.g>
      ))}

      {/* Clouds */}
      {clouds.map((cloud, index) => (
        <motion.g
          key={`cloud-${index}`}
          initial={{ opacity: 0, x: -50 }}
          animate={{ 
            opacity: 0.4, 
            x: cloud.x,
            y: [0, -10, 0]
          }}
          transition={{
            opacity: { delay: 0.5 + index * 0.2, duration: 1 },
            x: { delay: 0.5 + index * 0.2, duration: 1 },
            y: { 
              duration: 4 + index,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <ellipse
            cx={0}
            cy={cloud.y}
            rx={30 * cloud.scale}
            ry={15 * cloud.scale}
            fill="rgba(255, 255, 255, 0.1)"
          />
          <ellipse
            cx={-15 * cloud.scale}
            cy={cloud.y}
            rx={20 * cloud.scale}
            ry={12 * cloud.scale}
            fill="rgba(255, 255, 255, 0.08)"
          />
          <ellipse
            cx={15 * cloud.scale}
            cy={cloud.y}
            rx={20 * cloud.scale}
            ry={12 * cloud.scale}
            fill="rgba(255, 255, 255, 0.08)"
          />
        </motion.g>
      ))}

      {/* Birds */}
      {[...Array(3)].map((_, i) => (
        <motion.g
          key={`bird-${i}`}
          initial={{ x: -100, y: 200 + i * 80 }}
          animate={{
            x: [0, 2000],
            y: [200 + i * 80, 180 + i * 80, 200 + i * 80]
          }}
          transition={{
            x: { duration: 20 + i * 5, repeat: Infinity, ease: "linear" },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          {/* Simple bird shape */}
          <path
            d="M 0 0 Q -5 -3, -10 0 Q -5 3, 0 0 Q 5 -3, 10 0 Q 5 3, 0 0"
            fill="rgba(200, 255, 0, 0.4)"
          />
        </motion.g>
      ))}

      {/* Small bushes */}
      {[...Array(8)].map((_, i) => (
        <motion.ellipse
          key={`bush-${i}`}
          cx={250 + i * 220}
          cy={600}
          rx="25"
          ry="15"
          fill="rgba(34, 197, 94, 0.2)"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 + i * 0.1, type: "spring" }}
        />
      ))}
    </g>
  );
};

export default DecorativeElements;
