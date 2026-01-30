import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import RoadPath from './RoadPath';
import Tower from './Tower';
import Car from './Car';
import Background from './Background';
import DecorativeElements from './DecorativeElements';

const CityMap = ({ modules, currentModule, onTowerClick, isTransitioning, skipAnimation }) => {
  const [carPosition, setCarPosition] = useState(modules[0].position);
  const [targetModule, setTargetModule] = useState(0);
  const containerRef = useRef(null);
  const [cameraOffset, setCameraOffset] = useState(0);

  // Handle tower click - move car to that position
  useEffect(() => {
    if (isTransitioning && modules[targetModule]) {
      setCarPosition(modules[targetModule].position);
      
      // Calculate camera offset to keep car centered
      const targetX = modules[targetModule].position.x;
      // Pan camera to keep car in view
      if (targetX > 50) {
        setCameraOffset(-(targetX - 50) * 10);
      } else {
        setCameraOffset(0);
      }
    }
  }, [isTransitioning, targetModule, modules]);

  const handleTowerClickInternal = (moduleId) => {
    setTargetModule(moduleId);
    onTowerClick(moduleId);
  };

  // Animation duration based on skip mode
  const animationDuration = skipAnimation ? 0.5 : 2;

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Camera container - moves to follow car */}
      <motion.div
        animate={{ x: cameraOffset }}
        transition={{ 
          duration: animationDuration, 
          ease: "easeInOut" 
        }}
        className="relative w-full h-full"
        style={{ willChange: 'transform' }}
      >
        {/* Background (sky, clouds) */}
        <Background />

        {/* Main SVG Canvas */}
        <svg
          viewBox="0 0 1200 800"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Ground */}
          <rect x="0" y="600" width="1200" height="200" fill="url(#groundGradient)" />
          <defs>
            <linearGradient id="groundGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1a3a1a" />
              <stop offset="100%" stopColor="#0d1f0d" />
            </linearGradient>
          </defs>

          {/* Road Path */}
          <RoadPath modules={modules} />

          {/* Decorative Elements */}
          <DecorativeElements modules={modules} />

          {/* Towers */}
          {modules.map((module) => (
            <Tower
              key={module.id}
              module={module}
              isActive={currentModule === module.id}
              isUnlocked={!module.locked}
              onClick={() => handleTowerClickInternal(module.id)}
            />
          ))}

          {/* Car */}
          <Car
            position={carPosition}
            isMoving={isTransitioning}
            duration={animationDuration}
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default CityMap;
