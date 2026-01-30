import React from 'react';
import { motion } from 'framer-motion';

const RoadPath = ({ levels = [] }) => {
  // Generate dynamic wiggly road path through all levels
  const generateRoadPath = () => {
    if (levels.length === 0) {
      return "M 100 450 Q 400 420, 700 440 T 1300 460 T 1900 470";
    }
    
    // Convert level positions to SVG coordinates (2000 viewBox width)
    const points = levels.map(level => ({
      x: (level.position.x / 100) * 2000,
      y: (level.position.y / 100) * 800 + 50 // Offset to road level
    }));
    
    // Create smooth curved wiggly path through points
    if (points.length === 1) {
      return `M ${points[0].x} ${points[0].y}`;
    }
    
    let path = `M ${points[0].x - 150} ${points[0].y}`;
    
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      
      // Add variation to make it wiggly
      const controlX1 = current.x + (next.x - current.x) * 0.3;
      const controlY1 = current.y + (i % 2 === 0 ? -30 : 30); // Alternate up/down
      const controlX2 = current.x + (next.x - current.x) * 0.7;
      const controlY2 = next.y + (i % 2 === 0 ? 30 : -30); // Alternate down/up
      
      path += ` C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${next.x} ${next.y}`;
    }
    
    // Continue past last point
    const last = points[points.length - 1];
    path += ` L ${last.x + 150} ${last.y}`;
    
    return path;
  };

  const roadPath = generateRoadPath();
  
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
