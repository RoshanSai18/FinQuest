import React from 'react';
import { motion } from 'framer-motion';

const Tower = ({ module, isActive, isUnlocked, onClick }) => {
  const x = module.position.x * 12;
  const y = module.position.y * 8;
  const height = 80;
  const width = 50;

  return (
    <g
      style={{ cursor: isUnlocked ? 'pointer' : 'not-allowed' }}
      onClick={isUnlocked ? onClick : undefined}
    >
      {/* Tower base platform */}
      <ellipse
        cx={x}
        cy={y + height + 10}
        rx={width / 2 + 5}
        ry={8}
        fill="#1a1a1a"
        opacity="0.6"
      />

      {/* Tower body */}
      <motion.rect
        x={x - width / 2}
        y={y + height}
        width={width}
        height={height}
        fill={isUnlocked ? 'url(#towerGradient' + module.id + ')' : '#333'}
        stroke={isActive ? '#c8ff00' : isUnlocked ? '#555' : '#222'}
        strokeWidth="2"
        rx="4"
        initial={{ scaleY: 0, originY: 1 }}
        animate={{ 
          scaleY: 1,
          y: isActive ? [y + height, y + height - 5, y + height] : y + height
        }}
        transition={{
          scaleY: { duration: 0.6, delay: module.id * 0.2 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        whileHover={isUnlocked ? { 
          scale: 1.05,
          transition: { duration: 0.2 }
        } : {}}
      />

      {/* Tower gradient definition */}
      <defs>
        <linearGradient id={`towerGradient${module.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={isUnlocked ? '#444' : '#222'} />
          <stop offset="100%" stopColor={isUnlocked ? '#222' : '#111'} />
        </linearGradient>
      </defs>

      {/* Tower windows */}
      {isUnlocked && [0, 1, 2, 3].map((row) => (
        <g key={row}>
          {[0, 1].map((col) => (
            <motion.rect
              key={`${row}-${col}`}
              x={x - width / 2 + 10 + col * 20}
              y={y + height + 15 + row * 18}
              width={8}
              height={12}
              fill={isActive ? '#c8ff00' : '#ffeb3b'}
              opacity={isActive ? 0.9 : 0.4}
              animate={isActive ? {
                opacity: [0.9, 0.5, 0.9]
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </g>
      ))}

      {/* Tower roof */}
      <polygon
        points={`
          ${x},${y + height - 5}
          ${x - width / 2 - 5},${y + height + 10}
          ${x + width / 2 + 5},${y + height + 10}
        `}
        fill={isUnlocked ? '#c8ff00' : '#444'}
        opacity={isActive ? 1 : 0.6}
      />

      {/* Glow effect for active tower */}
      {isActive && (
        <motion.ellipse
          cx={x}
          cy={y + height + height / 2}
          rx={width / 2 + 10}
          ry={height / 2 + 10}
          fill="#c8ff00"
          opacity={0.2}
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Lock icon for locked towers */}
      {!isUnlocked && (
        <g transform={`translate(${x}, ${y + height + 40})`}>
          {/* Lock body */}
          <rect x="-8" y="0" width="16" height="12" rx="2" fill="#666" />
          {/* Lock shackle */}
          <path
            d="M -5,-8 Q -5,-15 0,-15 Q 5,-15 5,-8"
            stroke="#666"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      )}

      {/* Module icon */}
      <text
        x={x}
        y={y + height - 15}
        fontSize="24"
        textAnchor="middle"
        opacity={isUnlocked ? 1 : 0.3}
      >
        {module.icon}
      </text>

      {/* Module title (shown on hover) */}
      <motion.g
        initial={{ opacity: 0, y: -10 }}
        whileHover={isUnlocked ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.2 }}
      >
        <rect
          x={x - 60}
          y={y + height - 60}
          width="120"
          height="40"
          fill="rgba(10, 10, 10, 0.95)"
          stroke="#c8ff00"
          strokeWidth="2"
          rx="8"
        />
        <text
          x={x}
          y={y + height - 42}
          fontSize="12"
          fontWeight="bold"
          textAnchor="middle"
          fill="#c8ff00"
        >
          {module.title}
        </text>
        <text
          x={x}
          y={y + height - 28}
          fontSize="9"
          textAnchor="middle"
          fill="#aaa"
        >
          {module.subtitle}
        </text>
      </motion.g>
    </g>
  );
};

export default Tower;
