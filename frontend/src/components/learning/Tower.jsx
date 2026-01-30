import React from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle } from 'lucide-react';

const Tower = ({ module, index, isActive, onClick }) => {
  const { position, locked, completed, title, icon } = module;

  // Calculate SVG coordinates (percentage to SVG viewBox)
  const x = (position.x / 100) * 2000;
  const y = (position.y / 100) * 800;

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
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ delay: 0.5 + index * 0.2, type: "spring" }}
      />

      {/* Tower Building */}
      <motion.g
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 + index * 0.2, type: "spring", stiffness: 200 }}
        whileHover={{ y: -5 }}
      >
        {/* Main Tower Body */}
        <rect
          x={x - 50}
          y={y - 100}
          width="100"
          height="200"
          fill={locked ? 'rgba(100, 100, 100, 0.3)' : 'rgba(200, 255, 0, 0.15)'}
          stroke={locked ? 'rgba(150, 150, 150, 0.5)' : 'rgba(200, 255, 0, 0.5)'}
          strokeWidth="3"
          rx="10"
        />

        {/* Tower Windows */}
        {[...Array(6)].map((_, i) => (
          <rect
            key={i}
            x={x - 35 + (i % 2) * 40}
            y={y - 80 + Math.floor(i / 2) * 40}
            width="20"
            height="25"
            fill={locked ? 'rgba(150, 150, 150, 0.3)' : 'rgba(200, 255, 0, 0.3)'}
            rx="3"
          />
        ))}

        {/* Tower Roof */}
        <polygon
          points={`${x - 60},${y - 100} ${x},${y - 140} ${x + 60},${y - 100}`}
          fill={locked ? 'rgba(120, 120, 120, 0.5)' : 'rgba(200, 255, 0, 0.4)'}
          stroke={locked ? 'rgba(150, 150, 150, 0.5)' : 'rgba(200, 255, 0, 0.6)'}
          strokeWidth="2"
        />

        {/* Glow effect for active tower */}
        {isActive && !locked && (
          <motion.circle
            cx={x}
            cy={y}
            r="80"
            fill="rgba(200, 255, 0, 0.1)"
            filter="url(#glow)"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.g>

      {/* Icon/Emoji Display */}
      <motion.text
        x={x}
        y={y - 30}
        fontSize="40"
        textAnchor="middle"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8 + index * 0.2, type: "spring" }}
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

      {/* Tower Label */}
      <motion.text
        x={x}
        y={y + 130}
        fontSize="18"
        fontWeight="bold"
        fill={locked ? 'rgba(150, 150, 150, 0.8)' : 'rgba(255, 255, 255, 0.9)'}
        textAnchor="middle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 + index * 0.2 }}
      >
        {title}
      </motion.text>
    </g>
  );
};

export default Tower;
