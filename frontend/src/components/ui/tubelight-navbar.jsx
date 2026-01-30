import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * TubeLight NavBar - Animated navbar with glow effect
 * Adapted for FinQuest with React (JSX)
 */
export function TubeLightNavBar({ items, className, activeItem, onItemClick }) {
  const [activeTab, setActiveTab] = useState(items[0]?.name || '');
  const [hoveredTab, setHoveredTab] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (activeItem) {
      setActiveTab(activeItem);
    }
  }, [activeItem]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (item) => {
    setActiveTab(item.name);
    if (onItemClick) {
      onItemClick(item);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-1 bg-dark/90 border border-primary/30 backdrop-blur-xl py-2 px-3 rounded-full shadow-xl shadow-primary/20 ml-0 md:ml-10 lg:ml-16 xl:ml-24 mr-16",
        className
      )}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.name;
        const isHovered = hoveredTab === item.name;
        const showTorch = isActive || isHovered;

        return (
          <button
            key={item.name}
            onClick={() => handleClick(item)}
            onMouseEnter={() => setHoveredTab(item.name)}
            onMouseLeave={() => setHoveredTab(null)}
            className={cn(
              "relative cursor-pointer text-sm font-medium px-6 py-2.5 rounded-full transition-all duration-300 group",
              "text-gray-300 hover:text-white",
              isActive && "text-white"
            )}
          >
            {Icon && isMobile ? (
              <Icon size={18} strokeWidth={2.5} />
            ) : (
              <span className="relative z-20 flex flex-col items-center gap-1">
                {item.name}
                <span 
                  className={cn(
                    "h-0.5 bg-primary rounded-full transition-all duration-300",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </span>
            )}
            {showTorch && (
              <motion.div
                layoutId="lamp"
                className="absolute inset-0 w-full bg-gradient-to-r from-primary/15 via-primary/25 to-primary/15 rounded-full border border-primary/20"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 35,
                }}
              >
                {/* Tubelight glow effect on top */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-primary rounded-t-full shadow-lg shadow-primary/60">
                  <div className="absolute w-16 h-10 bg-primary/40 rounded-full blur-xl -top-4 -left-2" />
                  <div className="absolute w-12 h-8 bg-primary/50 rounded-full blur-lg -top-3 left-0" />
                  <div className="absolute w-8 h-6 bg-primary/60 rounded-full blur-md -top-2 left-2" />
                </div>
              </motion.div>
            )}
          </button>
        );
      })}
    </div>
  );
}