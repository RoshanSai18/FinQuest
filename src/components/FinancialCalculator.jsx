/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  Calendar,
  Award,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';
import { triggerConfetti, triggerConfettiBurst, formatCurrency } from '../lib/utils';
import { Card, GradientButton, Badge, AnimatedCounter, Reveal } from './UIComponents';

const FinancialCalculator = () => {
  const [formData, setFormData] = useState({
    monthlyIncome: '',
    monthlyExpenses: '',
    totalDebt: '',
    age: '',
  });

  const [healthScore, setHealthScore] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [achievement, setAchievement] = useState(null);

  // Calculate financial health score
  const calculateHealthScore = () => {
    const { monthlyIncome, monthlyExpenses, totalDebt, age } = formData;

    if (!monthlyIncome || !monthlyExpenses || !totalDebt || !age) {
      alert('Please fill all fields');
      return;
    }

    setIsCalculating(true);

    // Simulate calculation delay
    setTimeout(() => {
      const income = parseFloat(monthlyIncome);
      const expenses = parseFloat(monthlyExpenses);
      const debt = parseFloat(totalDebt);
      const userAge = parseInt(age);

      // Calculate various financial metrics
      const savingsRate = ((income - expenses) / income) * 100;
      const debtToIncomeRatio = (debt / (income * 12)) * 100;
      const emergencyFund = income * 6; // Recommended 6 months

      // Calculate base score (0-100)
      let score = 50; // Base score

      // Savings rate impact (max +30 points)
      if (savingsRate >= 30) score += 30;
      else if (savingsRate >= 20) score += 20;
      else if (savingsRate >= 10) score += 10;
      else if (savingsRate >= 0) score += 5;
      else score -= 10; // Negative savings

      // Debt to income impact (max +20 points or -20)
      if (debtToIncomeRatio <= 20) score += 20;
      else if (debtToIncomeRatio <= 30) score += 10;
      else if (debtToIncomeRatio <= 40) score += 0;
      else if (debtToIncomeRatio <= 50) score -= 10;
      else score -= 20;

      // Age factor - younger people have more time to build wealth
      if (userAge < 30) score += 10;
      else if (userAge < 40) score += 5;
      else if (userAge >= 60) score += 5; // Retirement bonus if score is good

      // Ensure score is between 0-100
      score = Math.max(0, Math.min(100, Math.round(score)));

      setHealthScore(score);
      generateRecommendations(score, savingsRate, debtToIncomeRatio, income, expenses, debt);
      checkAchievements(score, savingsRate);
      setIsCalculating(false);

      // Trigger confetti for good scores
      if (score >= 80) {
        triggerConfettiBurst();
      } else if (score >= 60) {
        triggerConfetti();
      }
    }, 1500);
  };

  // Generate personalized recommendations
  const generateRecommendations = (score, savingsRate, debtToIncomeRatio, income, expenses, debt) => {
    const recs = [];

    if (score < 40) {
      recs.push({
        type: 'error',
        icon: AlertCircle,
        title: 'Critical: Immediate Action Required',
        description: 'Your financial health needs urgent attention. Focus on reducing expenses and increasing income.',
      });
    } else if (score < 60) {
      recs.push({
        type: 'warning',
        icon: Info,
        title: 'Warning: Improvement Needed',
        description: 'Your finances are at risk. Consider creating a budget and debt repayment plan.',
      });
    } else if (score < 80) {
      recs.push({
        type: 'success',
        icon: CheckCircle,
        title: 'Good Progress',
        description: 'You\'re on the right track! Focus on optimizing investments and building emergency fund.',
      });
    } else {
      recs.push({
        type: 'success',
        icon: Award,
        title: 'Excellent Financial Health!',
        description: 'You\'re doing great! Consider advanced wealth-building strategies and diversification.',
      });
    }

    // Savings recommendations
    if (savingsRate < 10) {
      recs.push({
        type: 'warning',
        icon: TrendingDown,
        title: 'Increase Your Savings Rate',
        description: `Your savings rate is ${savingsRate.toFixed(1)}%. Aim for at least 20% by reducing discretionary spending.`,
      });
    } else if (savingsRate >= 30) {
      recs.push({
        type: 'success',
        icon: TrendingUp,
        title: 'Excellent Savings Rate!',
        description: `Your ${savingsRate.toFixed(1)}% savings rate is outstanding. Consider investing surplus in diversified portfolios.`,
      });
    }

    // Debt recommendations
    if (debtToIncomeRatio > 40) {
      recs.push({
        type: 'error',
        icon: CreditCard,
        title: 'High Debt Burden',
        description: `Your debt-to-income ratio of ${debtToIncomeRatio.toFixed(1)}% is concerning. Prioritize debt repayment using avalanche method.`,
      });
    } else if (debtToIncomeRatio <= 20) {
      recs.push({
        type: 'success',
        icon: CheckCircle,
        title: 'Healthy Debt Levels',
        description: `Your debt-to-income ratio of ${debtToIncomeRatio.toFixed(1)}% is excellent. Maintain this discipline.`,
      });
    }

    // Emergency fund recommendation
    const emergencyFund = income * 6;
    recs.push({
      type: 'info',
      icon: DollarSign,
      title: 'Emergency Fund Target',
      description: `Build an emergency fund of ${formatCurrency(emergencyFund)} (6 months of income) in a high-yield savings account.`,
    });

    // Investment recommendation based on age
    const userAge = parseInt(formData.age);
    if (userAge < 35) {
      recs.push({
        type: 'info',
        icon: TrendingUp,
        title: 'Long-term Growth Strategy',
        description: 'At your age, focus on equity-heavy portfolios (70-80%) for long-term wealth creation.',
      });
    } else if (userAge < 50) {
      recs.push({
        type: 'info',
        icon: TrendingUp,
        title: 'Balanced Investment Approach',
        description: 'Consider a balanced 60:40 equity-to-debt ratio for optimal risk-adjusted returns.',
      });
    } else {
      recs.push({
        type: 'info',
        icon: CheckCircle,
        title: 'Capital Preservation',
        description: 'Shift towards debt instruments and blue-chip stocks to preserve capital as you approach retirement.',
      });
    }

    setRecommendations(recs);
  };

  // Check and award achievements
  const checkAchievements = (score, savingsRate) => {
    if (score >= 90) {
      setAchievement({
        title: 'Financial Guru',
        description: 'You\'ve achieved elite financial health status!',
        icon: '🏆',
      });
    } else if (score >= 80) {
      setAchievement({
        title: 'Money Master',
        description: 'Your financial discipline is impressive!',
        icon: '⭐',
      });
    } else if (savingsRate >= 30) {
      setAchievement({
        title: 'Super Saver',
        description: 'Your savings rate is in the top 10%!',
        icon: '💰',
      });
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Get score color and label
  const getScoreInfo = (score) => {
    if (score >= 80) return { color: 'text-green-400', label: 'Excellent', bg: 'bg-green-500' };
    if (score >= 60) return { color: 'text-primary', label: 'Good', bg: 'bg-primary' };
    if (score >= 40) return { color: 'text-yellow-400', label: 'Fair', bg: 'bg-yellow-500' };
    return { color: 'text-red-400', label: 'Needs Work', bg: 'bg-red-500' };
  };

  return (
    <div className="w-full">
      <Reveal>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Financial Health Calculator
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Enter your financial details to get your personalized health score and AI-powered recommendations
        </p>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Input Form */}
        <Reveal delay={0.2}>
          <Card className="p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-primary" />
              Your Financial Details
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Monthly Income (₹)
                </label>
                <input
                  type="number"
                  name="monthlyIncome"
                  value={formData.monthlyIncome}
                  onChange={handleInputChange}
                  placeholder="e.g., 75000"
                  className="form-input w-full px-4 py-3 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Monthly Expenses (₹)
                </label>
                <input
                  type="number"
                  name="monthlyExpenses"
                  value={formData.monthlyExpenses}
                  onChange={handleInputChange}
                  placeholder="e.g., 45000"
                  className="form-input w-full px-4 py-3 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Total Debt (₹)
                </label>
                <input
                  type="number"
                  name="totalDebt"
                  value={formData.totalDebt}
                  onChange={handleInputChange}
                  placeholder="e.g., 500000"
                  className="form-input w-full px-4 py-3 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Your Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="e.g., 32"
                  className="form-input w-full px-4 py-3 rounded-lg text-white"
                />
              </div>

              <GradientButton
                onClick={calculateHealthScore}
                className="w-full"
                disabled={isCalculating}
              >
                {isCalculating ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-dark border-t-transparent rounded-full"
                    />
                    Calculating...
                  </span>
                ) : (
                  'Calculate Health Score'
                )}
              </GradientButton>
            </div>
          </Card>
        </Reveal>

        {/* Results */}
        <Reveal delay={0.4}>
          <Card className="p-8">
            <AnimatePresence mode="wait">
              {healthScore === null ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center"
                >
                  <div className="w-32 h-32 mb-6 rounded-full border-4 border-dashed border-gray-700 flex items-center justify-center">
                    <TrendingUp className="w-12 h-12 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-400">
                    Ready to Calculate
                  </h3>
                  <p className="text-gray-500">
                    Fill in your details and click calculate to see your score
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold mb-6 text-center">
                    Your Health Score
                  </h3>

                  {/* Score Circle */}
                  <div className="flex flex-col items-center mb-8">
                    <div className="relative w-48 h-48">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="96"
                          cy="96"
                          r="88"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="16"
                          fill="none"
                        />
                        <motion.circle
                          cx="96"
                          cy="96"
                          r="88"
                          stroke="#c8ff00"
                          strokeWidth="16"
                          fill="none"
                          strokeLinecap="round"
                          initial={{ strokeDasharray: '552', strokeDashoffset: '552' }}
                          animate={{ 
                            strokeDashoffset: 552 - (552 * healthScore) / 100 
                          }}
                          transition={{ duration: 1.5, ease: 'easeOut' }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-5xl font-bold ${getScoreInfo(healthScore).color}`}>
                          <AnimatedCounter end={healthScore} duration={1.5} />
                        </span>
                        <span className="text-gray-400 text-sm mt-1">
                          {getScoreInfo(healthScore).label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Achievement Badge */}
                  {achievement && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="achievement-badge mb-6 text-center"
                    >
                      <Badge variant="default" pulse className="text-lg px-6 py-3">
                        <span className="mr-2 text-2xl">{achievement.icon}</span>
                        {achievement.title}
                      </Badge>
                      <p className="text-sm text-gray-400 mt-2">{achievement.description}</p>
                    </motion.div>
                  )}

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-lg bg-white/5">
                      <p className="text-sm text-gray-400 mb-1">Savings Rate</p>
                      <p className="text-xl font-bold text-primary">
                        {(((parseFloat(formData.monthlyIncome) - parseFloat(formData.monthlyExpenses)) / parseFloat(formData.monthlyIncome)) * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-white/5">
                      <p className="text-sm text-gray-400 mb-1">Debt Ratio</p>
                      <p className="text-xl font-bold text-primary">
                        {((parseFloat(formData.totalDebt) / (parseFloat(formData.monthlyIncome) * 12)) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </Reveal>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <Reveal delay={0.6} className="mt-12 max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold mb-6 text-center">
            Personalized Recommendations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map((rec, index) => {
              const Icon = rec.icon;
              const typeColors = {
                success: 'border-green-500 bg-green-500/10',
                warning: 'border-yellow-500 bg-yellow-500/10',
                error: 'border-red-500 bg-red-500/10',
                info: 'border-primary bg-primary/10',
              };

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-xl border-2 ${typeColors[rec.type]}`}
                >
                  <div className="flex items-start gap-4">
                    <Icon className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-lg mb-2">{rec.title}</h4>
                      <p className="text-gray-400 text-sm">{rec.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Reveal>
      )}
    </div>
  );
};

export default FinancialCalculator;
