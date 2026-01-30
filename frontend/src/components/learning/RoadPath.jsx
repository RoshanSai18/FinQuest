import React from 'react';

const RoadPath = ({ modules }) => {
  // Generate smooth curved path through all module positions
  const generatePath = () => {
    if (modules.length === 0) return '';

    let path = `M ${modules[0].position.x * 12} ${modules[0].position.y * 8 + 100}`;

    for (let i = 1; i < modules.length; i++) {
      const prev = modules[i - 1].position;
      const curr = modules[i].position;
      
      const x1 = prev.x * 12;
      const y1 = prev.y * 8 + 100;
      const x2 = curr.x * 12;
      const y2 = curr.y * 8 + 100;
      
      // Calculate control points for smooth curve
      const midX = (x1 + x2) / 2;
      const controlY = Math.min(y1, y2) - 30;
      
      path += ` Q ${midX} ${controlY}, ${x2} ${y2}`;
    }

    return path;
  };

  const pathData = generatePath();

  return (
    <g id="road-path">
      {/* Road shadow */}
      <path
        d={pathData}
        stroke="#000"
        strokeWidth="28"
        fill="none"
        opacity="0.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(0, 2)"
      />
      
      {/* Main road */}
      <path
        d={pathData}
        stroke="#2a2a2a"
        strokeWidth="24"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Road center line */}
      <path
        d={pathData}
        stroke="#c8ff00"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="15,10"
        opacity="0.6"
      />
      
      {/* Road edges */}
      <path
        d={pathData}
        stroke="#444"
        strokeWidth="26"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
      />
    </g>
  );
};

export default RoadPath;
