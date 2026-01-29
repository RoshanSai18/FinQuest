import { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, TrendingDown, DollarSign, Wallet, PiggyBank, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ShineBorder } from './UIComponents';

/**
 * Groww-style Financial Health Calculator Modal
 * Features: Sliders with scroll animations, real-time results, glass morphism design
 */

// Custom Slider Component with scroll/drag support
const ScrollSlider = memo(({ label, value, onChange, min, max, step = 1, prefix = '', suffix = '', formatValue }) => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const percentage = ((value - min) / (max - min)) * 100;

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -step * 10 : step * 10;
    const newValue = Math.max(min, Math.min(max, value + delta));
    onChange(newValue);
  };

  const handleSliderChange = (e) => {
    onChange(parseFloat(e.target.value));
  };

  const displayValue = formatValue ? formatValue(value) : `${prefix}${value.toLocaleString('en-IN')}${suffix}`;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3">
        <label className="text-gray-300 font-medium">{label}</label>
        <motion.span 
          key={value}
          initial={{ scale: 1.1, color: '#c8ff00' }}
          animate={{ scale: 1, color: '#ffffff' }}
          className="text-xl font-bold text-white"
        >
          {displayValue}
        </motion.span>
      </div>
      
      <div 
        ref={sliderRef}
        className="relative h-3 cursor-pointer flex items-center"
        onWheel={handleWheel}
      >
        {/* Track background */}
        <div className="absolute inset-0 bg-white/10 rounded-full" />
        
        {/* Filled track */}
        <motion.div 
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/80 rounded-full"
          style={{ width: `${percentage}%` }}
          layoutId={`slider-fill-${label}`}
        />
        
        {/* Input range */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleSliderChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        
        {/* Thumb */}
        <motion.div 
          className={cn(
            "absolute w-5 h-5 bg-primary rounded-full shadow-lg shadow-primary/50 border-2 border-white",
            isDragging && "scale-125"
          )}
          style={{ 
            left: `${percentage}%`,
            transform: 'translate(-50%, 0)'
          }}
          animate={{ scale: isDragging ? 1.25 : 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
      </div>
      
      {/* Min/Max labels */}
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>{prefix}{min.toLocaleString('en-IN')}{suffix}</span>
        <span>{prefix}{max.toLocaleString('en-IN')}{suffix}</span>
      </div>
    </div>
  );
});

ScrollSlider.displayName = 'ScrollSlider';

// Result Card Component
const ResultCard = ({ icon: Icon, label, value, trend, color = 'primary' }) => {
  const colorClasses = {
    primary: 'text-primary bg-primary/10 border-primary/20',
    success: 'text-green-400 bg-green-400/10 border-green-400/20',
    warning: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    danger: 'text-red-400 bg-red-400/10 border-red-400/20',
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "p-4 rounded-xl border backdrop-blur-sm",
        colorClasses[color]
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4" />
        <span className="text-sm text-gray-400">{label}</span>
      </div>
      <motion.p 
        key={value}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        className="text-2xl font-bold"
      >
        {value}
      </motion.p>
      {trend && (
        <p className={cn(
          "text-xs mt-1 flex items-center gap-1",
          trend > 0 ? "text-green-400" : "text-red-400"
        )}>
          {trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(trend)}%
        </p>
      )}
    </motion.div>
  );
};

// Health Score Gauge
const HealthScoreGauge = ({ score }) => {
  const getScoreColor = (s) => {
    if (s >= 80) return '#c8ff00';
    if (s >= 60) return '#22c55e';
    if (s >= 40) return '#eab308';
    return '#ef4444';
  };

  const getScoreLabel = (s) => {
    if (s >= 80) return 'Excellent';
    if (s >= 60) return 'Good';
    if (s >= 40) return 'Fair';
    return 'Needs Work';
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="64"
            cy="64"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <motion.circle
            cx="64"
            cy="64"
            r="45"
            fill="none"
            stroke={getScoreColor(score)}
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              strokeDasharray: circumference,
              filter: `drop-shadow(0 0 10px ${getScoreColor(score)}50)`,
            }}
          />
        </svg>
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            key={score}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-3xl font-bold"
            style={{ color: getScoreColor(score) }}
          >
            {score}
          </motion.span>
          <span className="text-xs text-gray-400">/ 100</span>
        </div>
      </div>
      <motion.p 
        key={getScoreLabel(score)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-2 font-semibold"
        style={{ color: getScoreColor(score) }}
      >
        {getScoreLabel(score)}
      </motion.p>
    </div>
  );
};

// Main Modal Component
const FinancialCalculatorModal = ({ isOpen, onClose }) => {
  const [monthlyIncome, setMonthlyIncome] = useState(50000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(30000);
  const [totalDebt, setTotalDebt] = useState(100000);
  const [age, setAge] = useState(30);

  // Calculated values
  const [healthScore, setHealthScore] = useState(0);
  const [savingsRate, setSavingsRate] = useState(0);
  const [debtToIncomeRatio, setDebtToIncomeRatio] = useState(0);

  // Calculate financial metrics in real-time
  useEffect(() => {
    const monthlySavings = monthlyIncome - monthlyExpenses;
    const savings = ((monthlySavings) / monthlyIncome) * 100;
    const dti = (totalDebt / (monthlyIncome * 12)) * 100;

    setSavingsRate(Math.max(0, savings));
    setDebtToIncomeRatio(dti);

    // Calculate health score
    let score = 50;

    // Savings rate impact
    if (savings >= 30) score += 30;
    else if (savings >= 20) score += 20;
    else if (savings >= 10) score += 10;
    else if (savings >= 0) score += 5;
    else score -= 10;

    // Debt to income impact
    if (dti <= 20) score += 20;
    else if (dti <= 30) score += 10;
    else if (dti <= 40) score += 0;
    else if (dti <= 50) score -= 10;
    else score -= 20;

    // Age factor
    if (age < 30) score += 10;
    else if (age < 40) score += 5;
    else if (age >= 60) score += 5;

    setHealthScore(Math.max(0, Math.min(100, Math.round(score))));
  }, [monthlyIncome, monthlyExpenses, totalDebt, age]);

  const monthlySavings = monthlyIncome - monthlyExpenses;
  const annualSavings = monthlySavings * 12;

  const formatCurrency = (val) => `₹${val.toLocaleString('en-IN')}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-6"
          >
            {/* Modal with ShineBorder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed inset-0 z-[70] flex items-center justify-center p-6"
            >
              <ShineBorder className="w-full max-w-[900px]">
                <div className="max-h-[85vh] overflow-hidden flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <div>
                      <h2 className="text-2xl font-bold text-white">Financial Health Calculator</h2>
                      <p className="text-gray-400 text-sm mt-1">Adjust the sliders to see your financial health score</p>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6 overflow-y-auto flex-1">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Left Side - Sliders */}
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                          <Wallet className="w-5 h-5 text-primary" />
                          Your Financial Details
                        </h3>

                        <ScrollSlider
                          label="Monthly Income"
                          value={monthlyIncome}
                          onChange={setMonthlyIncome}
                          min={10000}
                          max={500000}
                          step={5000}
                          prefix="₹"
                        />

                        <ScrollSlider
                          label="Monthly Expenses"
                          value={monthlyExpenses}
                          onChange={setMonthlyExpenses}
                          min={5000}
                          max={400000}
                          step={5000}
                          prefix="₹"
                        />

                        <ScrollSlider
                          label="Total Debt"
                          value={totalDebt}
                          onChange={setTotalDebt}
                          min={0}
                          max={5000000}
                          step={10000}
                          prefix="₹"
                        />

                        <ScrollSlider
                          label="Your Age"
                          value={age}
                          onChange={setAge}
                          min={18}
                          max={70}
                          step={1}
                          suffix=" years"
                        />
                      </div>

                      {/* Right Side - Results */}
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-primary" />
                          Your Results
                        </h3>

                        {/* Health Score Gauge */}
                        <div className="flex justify-center mb-6">
                          <HealthScoreGauge score={healthScore} />
                        </div>

                        {/* Result Cards Grid */}
                        <div className="grid grid-cols-2 gap-4">
                          <ResultCard
                            icon={PiggyBank}
                            label="Monthly Savings"
                            value={formatCurrency(monthlySavings)}
                            color={monthlySavings >= 0 ? 'success' : 'danger'}
                          />
                          <ResultCard
                            icon={TrendingUp}
                            label="Savings Rate"
                            value={`${savingsRate.toFixed(1)}%`}
                            color={savingsRate >= 20 ? 'success' : savingsRate >= 10 ? 'warning' : 'danger'}
                          />
                          <ResultCard
                            icon={DollarSign}
                            label="Annual Savings"
                            value={formatCurrency(annualSavings)}
                            color={annualSavings >= 0 ? 'primary' : 'danger'}
                          />
                          <ResultCard
                            icon={AlertCircle}
                            label="Debt-to-Income"
                            value={`${debtToIncomeRatio.toFixed(1)}%`}
                            color={debtToIncomeRatio <= 30 ? 'success' : debtToIncomeRatio <= 50 ? 'warning' : 'danger'}
                          />
                        </div>

                        {/* Recommendation */}
                        <motion.div 
                          key={healthScore}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={cn(
                            "p-4 rounded-xl border flex items-start gap-3",
                            healthScore >= 80 ? "bg-green-400/10 border-green-400/20" :
                            healthScore >= 60 ? "bg-primary/10 border-primary/20" :
                            healthScore >= 40 ? "bg-yellow-400/10 border-yellow-400/20" :
                            "bg-red-400/10 border-red-400/20"
                          )}
                        >
                          {healthScore >= 60 ? (
                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                          )}
                          <div>
                            <p className="font-semibold text-white">
                              {healthScore >= 80 ? "Excellent Financial Health!" :
                               healthScore >= 60 ? "Good Progress!" :
                               healthScore >= 40 ? "Room for Improvement" :
                               "Action Required"}
                            </p>
                            <p className="text-sm text-gray-400 mt-1">
                              {healthScore >= 80 ? "You're doing great! Consider advanced wealth-building strategies." :
                               healthScore >= 60 ? "You're on track. Focus on building your emergency fund." :
                               healthScore >= 40 ? "Try to reduce expenses and increase your savings rate." :
                               "Focus on reducing debt and building an emergency fund."}
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </ShineBorder>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FinancialCalculatorModal;
