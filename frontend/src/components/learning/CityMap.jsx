import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import RoadPath from './RoadPath';
import Tower from './Tower';
import Car from './Car';
import Background from './Background';
import DecorativeElements from './DecorativeElements';

const CityMap = ({ modules, currentModule, isAnimating, onModuleClick }) => {
  const containerRef = useRef(null);

  // Pan camera to follow car
  useEffect(() => {
    if (containerRef.current && isAnimating) {
      const module = modules[currentModule];
      const scrollX = (module.position.x / 100) * window.innerWidth - window.innerWidth / 2;
      
      containerRef.current.scrollTo({
        left: scrollX,
        behavior: 'smooth'
      });
    }
  }, [currentModule, isAnimating, modules]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-x-auto overflow-y-hidden relative scrollbar-hide"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <div className="relative min-w-[200%] h-full">
        {/* Background */}
        <Background />

        {/* SVG Container for Road and Elements */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 2000 800"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Road Path */}
          <RoadPath />

          {/* Towers */}
          {modules.map((module, index) => (
            <Tower
              key={module.id}
              module={module}
              index={index}
              isActive={currentModule === module.id}
              onClick={() => onModuleClick(module.id)}
            />
          ))}

          {/* Car */}
          <Car
            currentModule={currentModule}
            modules={modules}
            isAnimating={isAnimating}
          />

          {/* Decorative Elements */}
          <DecorativeElements />
        </svg>
      </div>
    </div>
  );
};

export default CityMap;
