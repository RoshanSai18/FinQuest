import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap,
  BarChart3,
  User,
  LogOut,
  Sparkles,
  MessageCircle,
  X
} from 'lucide-react';
import { GradientText } from './UIComponents';
import LearningWorld from './learning/LearningWorld';

const Dashboard = ({ user, onLogout }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hoveredCircle, setHoveredCircle] = useState(null);
  const [activeView, setActiveView] = useState(null); // null, 'learn', 'tracker', 'profile'

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
      id: 'profile',
      label: 'Profile',
      icon: User,
      description: 'Manage your account',
      gradient: 'from-primary/20 via-primary/10 to-transparent'
    }
  ];

  const handleCircleClick = (id) => {
    setActiveView(id);
  };

  // If a view is active, render that view
  if (activeView === 'learn') {
    return <LearningWorld onBack={() => setActiveView(null)} />;
  }

  if (activeView === 'tracker') {
    // TODO: Implement Expense Tracker view
    return (
      <div className="min-h-screen bg-dark text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Expense Tracker</h1>
          <p className="text-gray-400 mb-6">Coming soon...</p>
          <button
            onClick={() => setActiveView(null)}
            className="px-6 py-3 bg-primary text-dark rounded-lg font-bold"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (activeView === 'profile') {
    // TODO: Implement Profile view
    return (
      <div className="min-h-screen bg-dark text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Profile</h1>
          <p className="text-gray-400 mb-6">Coming soon...</p>
          <button
            onClick={() => setActiveView(null)}
            className="px-6 py-3 bg-primary text-dark rounded-lg font-bold"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
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

      {/* Floating Chatbot */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="absolute bottom-20 right-0 w-80 h-96 bg-dark/95 backdrop-blur-xl border border-primary/30 rounded-2xl shadow-2xl shadow-primary/20 overflow-hidden mb-2"
            >
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-primary/20 to-primary/10 border-b border-primary/30 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-dark" />
                  </div>
                  <div>
                    <p className="font-bold text-base">FinQuest Assistant</p>
                    <p className="text-sm font-medium text-gray-300">AI-powered financial advisor</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Content */}
              <div className="p-4 h-[calc(100%-120px)] flex items-center justify-center">
                <p className="text-gray-300 text-center text-base font-semibold">
                  Chat interface coming soon!<br />
                  Ask me anything about your finances.
                </p>
              </div>

              {/* Chat Input */}
              <div className="border-t border-white/10 p-4">
                <input
                  type="text"
                  placeholder="Ask me anything..."
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  disabled
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chatbot Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="relative w-16 h-16 rounded-full bg-primary shadow-2xl shadow-primary/40 flex items-center justify-center group overflow-hidden"
          aria-label="Open AI Assistant"
        >
          {/* Pulse Animation */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 rounded-full bg-primary"
          />

          {/* Icon */}
          <motion.div
            animate={{ rotate: isChatOpen ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {isChatOpen ? (
              <X className="w-7 h-7 text-dark relative z-10" />
            ) : (
              <MessageCircle className="w-7 h-7 text-dark relative z-10" />
            )}
          </motion.div>

          {/* Notification Badge */}
          {!isChatOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg"
            >
              1
            </motion.div>
          )}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Dashboard;
