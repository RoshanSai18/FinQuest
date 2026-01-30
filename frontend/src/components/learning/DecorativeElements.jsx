import React from 'react';
import { motion } from 'framer-motion';

const DecorativeElements = ({ modules }) => {
  // Generate trees between modules
  const renderTree = (x, y, index) => (
    <g key={`tree-${index}`} transform={`translate(${x * 12}, ${y * 8 + 120})`}>
      {/* Tree trunk */}
      <rect x="-3" y="0" width="6" height="20" fill="#3d2817" rx="2" />
      
      {/* Tree foliage */}
      <motion.g
        animate={{
          y: [0, -3, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.3
        }}
      >
        <circle cx="0" cy="-8" r="12" fill="#2d5016" />
        <circle cx="-8" cy="-3" r="10" fill="#2d5016" />
        <circle cx="8" cy="-3" r="10" fill="#2d5016" />
        <circle cx="0" cy="-15" r="8" fill="#3d6b1f" />
      </motion.g>
    </g>
  );

  // Generate bushes
  const renderBush = (x, y, index) => (
    <g key={`bush-${index}`} transform={`translate(${x * 12}, ${y * 8 + 130})`}>
      <ellipse cx="0" cy="0" rx="15" ry="10" fill="#1a3a1a" />
      <ellipse cx="-8" cy="-2" rx="10" ry="8" fill="#1a3a1a" />
      <ellipse cx="8" cy="-2" rx="10" ry="8" fill="#1a3a1a" />
    </g>
  );

  // Generate street lamps
  const renderLamp = (x, y, index) => (
    <g key={`lamp-${index}`} transform={`translate(${x * 12}, ${y * 8 + 90})`}>
      {/* Lamp post */}
      <rect x="-1" y="0" width="2" height="40" fill="#444" />
      
      {/* Lamp head */}
      <rect x="-6" y="-5" width="12" height="8" fill="#333" rx="2" />
      
      {/* Light glow */}
      <motion.circle
        cx="0"
        cy="0"
        r="8"
        fill="#c8ff00"
        opacity="0.3"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          r: [8, 10, 8]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.5
        }}
      />
      
      {/* Light bulb */}
      <circle cx="0" cy="0" r="3" fill="#ffeb3b" opacity="0.9" />
    </g>
  );

  return (
    <g id="decorative-elements">
      {/* Trees scattered around */}
      {modules.map((module, i) => (
        <React.Fragment key={`decorations-${i}`}>
          {/* Tree before each module */}
          {renderTree(module.position.x - 8, module.position.y + 3, i * 3)}
          
          {/* Tree after each module */}
          {renderTree(module.position.x + 8, module.position.y + 2, i * 3 + 1)}
          
          {/* Bush */}
          {renderBush(module.position.x - 5, module.position.y + 5, i * 2)}
          
          {/* Street lamp */}
          {i < modules.length - 1 && renderLamp(
            (module.position.x + modules[i + 1].position.x) / 2,
            (module.position.y + modules[i + 1].position.y) / 2,
            i
          )}
        </React.Fragment>
      ))}

      {/* Additional random trees */}
      {renderTree(10, 68, 100)}
      {renderTree(95, 63, 101)}
      {renderBush(5, 70, 50)}
      {renderBush(98, 68, 51)}
    </g>
  );
};

export default DecorativeElements;
