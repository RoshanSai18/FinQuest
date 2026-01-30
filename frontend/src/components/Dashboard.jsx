import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap,
  BarChart3,
  User,
  LogOut,
  Sparkles
} from 'lucide-react';
import { GradientText } from './UIComponents';
import LearningWorld from './learning/LearningWorld';

const Dashboard = ({ user, onLogout }) => {
  const [hoveredCircle, setHoveredCircle] = useState(null);
  const [showLearning, setShowLearning] = useState(false);

  const actionCircles = [
    {
      id: 'learn',
      label: 'Learn Now!',
      icon: GraduationCap,
      description: 'Master financial literacy',
      gradient: 'from-primary/20 via-primary/10 to-transparent'
    },
    {
      id: 'tracker',
      label: 'Expense Tracker',
      icon: BarChart3,
      description: 'Track your spending',
      gradient: 'from-primary/20 via-primary/10 to-transparent'
    },
    {
      id: 'whefile',
      label: 'Advisor',
      icon: User,
      description: 'AI powered financial Advisor',
      gradient: 'from-primary/20 via-primary/10 to-transparent'
    }
  ];

  const handleCircleClick = (id) => {
    console.log(`Navigating to: ${id}`);
    if (id === 'learn') {
      setShowLearning(true);
    }
    // TODO: Add navigation logic for other circles
  };

  return (
    <>
      <AnimatePresence>
        {showLearning && (
          <LearningWorld onClose={() => setShowLearning(false)} />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-dark text-white relative overflow-hidden">
        {/* Ambient Background Effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        {/* Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        className="relative z-10 px-8 py-6 flex items-center justify-between"
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-primary/80 to-primary/60 flex items-center justify-center shadow-lg shadow-primary/30">
            <Sparkles className="w-6 h-6 text-dark" />
            <div className="absolute inset-0 rounded-xl bg-primary/20 blur-lg" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            <GradientText>FinQuest</GradientText>
          </h1>
        </motion.div>

        {/* User Info & Logout */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4"
        >
          {user?.avatar && (
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={user.avatar}
              alt={user.fullName}
              className="w-10 h-10 rounded-full border-2 border-primary/30 shadow-lg shadow-primary/20"
            />
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/30 transition-all backdrop-blur-sm"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-base font-bold">Logout</span>
          </motion.button>
        </motion.div>
      </motion.header>

      {/* Main Content - Centered Action Circles */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-8">
        <div className="w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-center justify-items-center"
          >
            {actionCircles.map((circle, index) => {
              const Icon = circle.icon;
              const isHovered = hoveredCircle === circle.id;

              return (
                <motion.div
                  key={circle.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 0.4 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                  className="flex flex-col items-center gap-6 w-full max-w-xs"
                >
                  {/* Circle Button */}
                  <motion.button
                    whileHover={{ scale: 1.05, y: -8 }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => setHoveredCircle(circle.id)}
                    onHoverEnd={() => setHoveredCircle(null)}
                    onFocus={() => setHoveredCircle(circle.id)}
                    onBlur={() => setHoveredCircle(null)}
                    onClick={() => handleCircleClick(circle.id)}
                    className="relative w-48 h-48 rounded-full bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20 hover:border-primary/50 transition-all duration-300 backdrop-blur-md shadow-2xl hover:shadow-primary/20 focus:outline-none focus:ring-4 focus:ring-primary/30 group"
                    aria-label={`${circle.label} - ${circle.description}`}
                  >
                    {/* Glow Effect */}
                    <motion.div
                      animate={{
                        opacity: isHovered ? 0.6 : 0,
                        scale: isHovered ? 1.2 : 1
                      }}
                      transition={{ duration: 0.3 }}
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${circle.gradient} blur-xl`}
                    />

                    {/* Icon */}
                    <motion.div
                      animate={{
                        scale: isHovered ? 1.1 : 1,
                        rotate: isHovered ? 5 : 0
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <Icon 
                        className="w-20 h-20 text-primary drop-shadow-[0_0_8px_rgba(200,255,0,0.5)]" 
                        strokeWidth={1.5}
                      />
                    </motion.div>

                    {/* Hover Ring */}
                    <motion.div
                      animate={{
                        scale: isHovered ? 1 : 0.95,
                        opacity: isHovered ? 1 : 0
                      }}
                      className="absolute inset-0 rounded-full border-2 border-primary/50 shadow-[0_0_20px_rgba(200,255,0,0.3)]"
                    />
                  </motion.button>

                  {/* Label */}
                  <div className="text-center space-y-2">
                    <motion.h3
                      animate={{
                        color: isHovered ? 'rgb(200, 255, 0)' : 'rgb(255, 255, 255)'
                      }}
                      className="text-2xl font-extrabold tracking-tight"
                      style={{ fontSize: '1.5rem' }}
                    >
                      {circle.label}
                    </motion.h3>
                    <motion.p
                      animate={{
                        opacity: isHovered ? 1 : 0.8
                      }}
                      className="text-base font-semibold text-gray-300"
                      style={{ fontSize: '1.1rem' }}
                    >
                      {circle.description}
                    </motion.p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Dashboard;
