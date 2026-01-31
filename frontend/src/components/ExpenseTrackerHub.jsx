import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Receipt, TrendingUp } from 'lucide-react';
import ExpenseTracker from '../pages/ExpenseTracker';
import WealthDashboard from '../pages/WealthDashboard';

const ExpenseTrackerHub = ({ isOpen, onClose, user }) => {
  const [activeTab, setActiveTab] = useState('tracker'); // 'tracker', 'wealth'

  const tabs = [
    { id: 'tracker', label: 'Expense Tracker', icon: Receipt },
    { id: 'wealth', label: 'Wealth Dashboard', icon: TrendingUp }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[#0B0C10] border border-gray-800 rounded-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Tabs */}
          <div className="bg-gradient-to-r from-primary/10 to-transparent border-b border-gray-800 p-6 sticky top-0 z-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Financial Management Suite</h2>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex gap-2">
              {tabs.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                      isActive
                        ? 'bg-primary text-black'
                        : 'bg-gray-900/50 text-gray-400 hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="overflow-y-auto" style={{ maxHeight: 'calc(95vh - 180px)' }}>
            <AnimatePresence mode="wait">
              {activeTab === 'tracker' && (
                <motion.div
                  key="tracker"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <ExpenseTracker />
                </motion.div>
              )}
              {activeTab === 'wealth' && (
                <motion.div
                  key="wealth"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <WealthDashboard />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ExpenseTrackerHub;
