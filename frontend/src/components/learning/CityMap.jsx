import React, { useRef, useEffect } from 'react';
import RoadPath from './RoadPath';
import Tower from './Tower';
import Car from './Car';
import Background from './Background';
import DecorativeElements from './DecorativeElements';

const CityMap = ({ levels, currentLevel, isAnimating, onLevelClick }) => {
  const containerRef = useRef(null);

  // Pan camera to follow car and reveal next tower
  useEffect(() => {
    if (containerRef.current && isAnimating) {
      const level = levels[currentLevel];
      if (level) {
        // Scroll to reveal the next tower (more aggressive)
        const targetX = (level.position.x / 100) * (containerRef.current.scrollWidth || window.innerWidth * 2);
        const scrollX = targetX - window.innerWidth * 0.4; // Show more of the right side
        
        containerRef.current.scrollTo({
          left: Math.max(0, scrollX),
          behavior: 'smooth'
        });
      }
    }
  }, [currentLevel, isAnimating, levels]);

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
          <RoadPath levels={levels} />

          {/* 4 Level Towers */}
          {levels.map((level, index) => (
            <Tower
              key={level.id}
              level={level}
              index={index}
              isActive={currentLevel === level.id}
              onClick={() => onLevelClick(level.id)}
            />
          ))}

          {/* Car */}
          <Car
            currentLevel={currentLevel}
            levels={levels}
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
