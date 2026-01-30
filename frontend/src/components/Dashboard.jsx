import React from 'react';
import { motion } from 'framer-motion';
import { 
  LogOut, 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  PiggyBank, 
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Target,
  Calendar
} from 'lucide-react';
import { GradientText } from './UIComponents';

const Dashboard = ({ user, onLogout }) => {

  // Sample data
  const stats = [
    { 
      label: 'Total Balance', 
      value: '₹12,45,680', 
      change: '+12.5%', 
      isPositive: true,
      icon: DollarSign,
      color: 'text-blue-400'
    },
    { 
      label: 'Monthly Savings', 
      value: '₹45,230', 
      change: '+8.2%', 
      isPositive: true,
      icon: PiggyBank,
      color: 'text-green-400'
    },
    { 
      label: 'Expenses', 
      value: '₹2,45,680', 
      change: '-3.1%', 
      isPositive: true,
      icon: CreditCard,
      color: 'text-orange-400'
    },
    { 
      label: 'Investments', 
      value: '₹8,65,420', 
      change: '+15.3%', 
      isPositive: true,
      icon: TrendingUp,
      color: 'text-purple-400'
    },
  ];

  const recentTransactions = [
    { id: 1, name: 'Amazon Purchase', amount: -2499, date: '2026-01-30', category: 'Shopping' },
    { id: 2, name: 'Salary Credit', amount: 85000, date: '2026-01-28', category: 'Income' },
    { id: 3, name: 'Electricity Bill', amount: -1250, date: '2026-01-27', category: 'Utilities' },
    { id: 4, name: 'Restaurant', amount: -1850, date: '2026-01-26', category: 'Food & Dining' },
    { id: 5, name: 'Mutual Fund SIP', amount: -5000, date: '2026-01-25', category: 'Investment' },
  ];

  const goals = [
    { id: 1, name: 'Emergency Fund', current: 45000, target: 100000, color: 'bg-blue-500' },
    { id: 2, name: 'Vacation', current: 32000, target: 80000, color: 'bg-green-500' },
    { id: 3, name: 'Car Down Payment', current: 125000, target: 200000, color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Header */}
      <nav className="border-b border-white/10 bg-dark/95 backdrop-blur-lg sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Activity className="w-6 h-6 text-dark" />
              </div>
              <h1 className="text-2xl font-bold">
                <GradientText>FinQuest</GradientText>
              </h1>
            </div>

            {/* User Info & Logout */}
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm text-gray-400">Welcome back,</p>
                <p className="font-semibold">{user?.fullName || 'User'}</p>
              </div>
              {user?.avatar && (
                <img 
                  src={user.avatar} 
                  alt={user.fullName}
                  className="w-10 h-10 rounded-full border-2 border-primary/50"
                />
              )}
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/30 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back, {user?.fullName?.split(' ')[0] || 'User'}! 👋
          </h2>
          <p className="text-gray-400">
            Here&apos;s your financial overview for {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-primary/30 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${stat.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    {stat.change}
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Recent Transactions</h3>
              <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      transaction.amount > 0 ? 'bg-green-400/20 text-green-400' : 'bg-red-400/20 text-red-400'
                    }`}>
                      {transaction.amount > 0 ? (
                        <TrendingUp className="w-5 h-5" />
                      ) : (
                        <TrendingDown className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold">{transaction.name}</p>
                      <p className="text-sm text-gray-400">{transaction.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${transaction.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString('en-IN')}
                    </p>
                    <p className="text-sm text-gray-400">{new Date(transaction.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Financial Goals */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Financial Goals</h3>
              <Target className="w-5 h-5 text-primary" />
            </div>

            <div className="space-y-6">
              {goals.map((goal) => {
                const progress = (goal.current / goal.target) * 100;
                return (
                  <div key={goal.id}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-sm">{goal.name}</p>
                      <p className="text-xs text-gray-400">{Math.round(progress)}%</p>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 mb-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className={`h-full ${goal.color} rounded-full`}
                      />
                    </div>
                    <p className="text-xs text-gray-400">
                      ₹{goal.current.toLocaleString('en-IN')} of ₹{goal.target.toLocaleString('en-IN')}
                    </p>
                  </div>
                );
              })}
            </div>

            <button className="w-full mt-6 py-3 px-4 rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 text-primary font-semibold transition-all">
              Create New Goal
            </button>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10"
        >
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Add Transaction', icon: DollarSign },
              { label: 'Create Budget', icon: PiggyBank },
              { label: 'Run Simulation', icon: Activity },
              { label: 'Schedule Payment', icon: Calendar },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/30 transition-all group"
                >
                  <Icon className="w-6 h-6 mb-2 text-primary group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium">{action.label}</p>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
