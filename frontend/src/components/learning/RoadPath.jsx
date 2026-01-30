import React from 'react';
import { motion } from 'framer-motion';

const RoadPath = () => {
  // Define the curved road path using SVG path
  const roadPath = "M 100 450 Q 400 420, 700 440 T 1300 460 T 1900 470";
  
  return (
    <g id="road">
      {/* Road shadow/base */}
      <motion.path
        d={roadPath}
        fill="none"
        stroke="rgba(255, 255, 255, 0.05)"
        strokeWidth="80"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Main road */}
      <motion.path
        d={roadPath}
        fill="none"
        stroke="rgba(255, 255, 255, 0.1)"
        strokeWidth="60"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Road center line (dashed) */}
      <motion.path
        d={roadPath}
        fill="none"
        stroke="rgba(200, 255, 0, 0.3)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="20 15"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
      />

      {/* Glow effect */}
      <motion.path
        d={roadPath}
        fill="none"
        stroke="rgba(200, 255, 0, 0.1)"
        strokeWidth="70"
        strokeLinecap="round"
        filter="url(#glow)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* SVG Filter for glow */}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="10" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </g>
  );
};

export default RoadPath;
