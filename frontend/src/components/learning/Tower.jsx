import React from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle } from 'lucide-react';

const Tower = ({ level, index, isActive, onClick }) => {
  const { position, locked, completed, title, shortTitle, icon, color, moduleCount } = level;

  // Calculate SVG coordinates (percentage to SVG viewBox - 2000 width)
  const x = (position.x / 100) * 2000;
  const y = (position.y / 100) * 800;

  // Use level color
  const towerColor = color || 'rgba(200, 255, 0, 0.5)';

  // Use shortTitle for display, fall back to title if shortTitle doesn't exist
  const displayTitle = shortTitle || title;

  return (
    <g
      onClick={onClick}
      style={{ cursor: locked ? 'not-allowed' : 'pointer' }}
      className="tower-group"
    >
      {/* Tower Base Shadow */}
      <motion.rect
        x={x - 55}
        y={y + 100}
        width="110"
        height="15"
        fill="rgba(0, 0, 0, 0.2)"
        rx="8"
        initial={{ opacity: 0, scale: 0, x: x + 200 }}
        animate={{ opacity: 0.5, scale: 1, x: x - 55 }}
        transition={{ delay: 0.5 + index * 0.15, type: "spring", stiffness: 100 }}
      />

      {/* Tower Building with slide-in animation */}
      <motion.g
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 + index * 0.15, type: "spring", stiffness: 120, damping: 15 }}
        whileHover={{ y: -5 }}
      >
        {/* Main Tower Body */}
        <rect
          x={x - 50}
          y={y - 100}
          width="100"
          height="200"
          fill={locked ? 'rgba(100, 100, 100, 0.3)' : isActive ? `${towerColor}35` : `${towerColor}20`}
          stroke={locked ? 'rgba(150, 150, 150, 0.5)' : towerColor}
          strokeWidth={isActive ? "5" : "3"}
          rx="10"
          filter={isActive && !locked ? 'url(#glow)' : 'none'}
        />

        {/* Tower Windows */}
        {[...Array(6)].map((_, i) => (
          <rect
            key={i}
            x={x - 35 + (i % 2) * 40}
            y={y - 80 + Math.floor(i / 2) * 40}
            width="20"
            height="25"
            fill={locked ? 'rgba(150, 150, 150, 0.3)' : `${towerColor}40`}
            rx="3"
          />
        ))}

        {/* Tower Roof */}
        <polygon
          points={`${x - 60},${y - 100} ${x},${y - 140} ${x + 60},${y - 100}`}
          fill={locked ? 'rgba(120, 120, 120, 0.5)' : `${towerColor}60`}
          stroke={locked ? 'rgba(150, 150, 150, 0.5)' : towerColor}
          strokeWidth="2"
        />

        {/* Enhanced glow effect for active tower */}
        {isActive && !locked && (
          <>
            <motion.circle
              cx={x}
              cy={y}
              r="90"
              fill={towerColor}
              opacity="0.15"
              filter="url(#glow)"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.15, 0.35, 0.15]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx={x}
              cy={y}
              r="70"
              fill={towerColor}
              opacity="0.2"
              filter="url(#glow)"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
          </>
        )}
      </motion.g>

      {/* Level Number on Top of Tower */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8 + index * 0.15, type: "spring", stiffness: 200 }}
      >
        <circle 
          cx={x} 
          cy={y - 150} 
          r="25" 
          fill={locked ? 'rgba(100, 100, 100, 0.5)' : towerColor}
          stroke={locked ? 'rgba(150, 150, 150, 0.7)' : 'rgba(255, 255, 255, 0.3)'}
          strokeWidth="2"
          opacity="0.95"
          filter={isActive && !locked ? 'url(#glow)' : 'none'}
        />
        <text
          x={x}
          y={y - 143}
          fontSize="24"
          fontWeight="bold"
          fill={locked ? 'rgba(200, 200, 200, 0.8)' : '#0a0a0a'}
          textAnchor="middle"
        >
          {index + 1}
        </text>
      </motion.g>

      {/* Icon/Emoji Display */}
      <motion.text
        x={x}
        y={y - 30}
        fontSize="50"
        textAnchor="middle"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.9 + index * 0.15, type: "spring" }}
        style={{ filter: locked ? 'grayscale(100%)' : 'none' }}
      >
        {icon}
      </motion.text>

      {/* Status Icon */}
      {completed && (
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1 + index * 0.2, type: "spring" }}
        >
          <circle cx={x + 35} cy={y - 90} r="15" fill="rgba(34, 197, 94, 0.9)" />
          <foreignObject x={x + 25} y={y - 100} width="20" height="20">
            <CheckCircle className="w-5 h-5 text-white" />
          </foreignObject>
        </motion.g>
      )}

      {locked && (
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1 + index * 0.2, type: "spring" }}
        >
          <circle cx={x + 35} cy={y - 90} r="15" fill="rgba(150, 150, 150, 0.9)" />
          <foreignObject x={x + 26} y={y - 99} width="18" height="18">
            <Lock className="w-4 h-4 text-white" />
          </foreignObject>
        </motion.g>
      )}

      {/* Tower Label with Background */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 + index * 0.2 }}
      >
        {/* Background rectangle for better visibility */}
        <rect
          x={x - 100}
          y={y + 110}
          width="200"
          height="38"
          fill="rgba(10, 10, 10, 0.9)"
          stroke={locked ? 'rgba(150, 150, 150, 0.3)' : towerColor}
          strokeWidth="2"
          rx="10"
        />
        <text
          x={x}
          y={y + 135}
          fontSize="15"
          fontWeight="600"
          fill={locked ? 'rgba(200, 200, 200, 0.9)' : 'rgba(255, 255, 255, 0.95)'}
          textAnchor="middle"
          style={{ letterSpacing: '0.3px' }}
        >
          {displayTitle}
        </text>
      </motion.g>
    </g>
  );
};

export default Tower;
