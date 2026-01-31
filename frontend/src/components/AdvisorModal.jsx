import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  X, 
  TrendingUp, 
  Send, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  AlertTriangle,
  Loader2,
  IndianRupee,
  BarChart3,
  MessageSquare,
  FileText
} from 'lucide-react';
import {
  MarkdownRenderer,
  CashFlowChart,
  PortfolioChart,
  WealthProjectionChart,
  DebtOverviewChart,
  RiskAssessmentChart
} from './FinancialCharts';

// Typewriter Effect Component
const TypewriterMarkdown = ({ content, speed = 20 }) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < content.length) {
      const timeout = setTimeout(() => {
        setDisplayedContent(prev => prev + content[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, content, speed]);

  // Reset when content changes
  useEffect(() => {
    setDisplayedContent('');
    setCurrentIndex(0);
    setIsComplete(false);
  }, [content]);

  return (
    <div className="prose prose-invert prose-sm max-w-none">
      <MarkdownRenderer content={displayedContent} />
      {!isComplete && <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse"></span>}
    </div>
  );
};

const AdvisorModal = ({ isOpen, onClose, user }) => {
  // Form state
  const [formData, setFormData] = useState({
    monthlyIncome: '',
    incomeSource: 'Salary',
    monthlyExpenses: '',
    totalDebt: '',
    age: '',
    dependents: '0',
    // Debt breakdown
    homeLoan: '',
    carLoan: '',
    personalLoan: '',
    creditCard: '',
    // Investments
    equity: '',
    debt: '',
    gold: '',
    realEstate: '',
    ppf: '',
    otherAssets: ''
  });

  // UI state
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'analysis', 'chat'
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  
  // Chat state
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatting, setIsChatting] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Analyze financials
  const handleAnalyze = async () => {
    // Validation
    if (!formData.monthlyIncome || !formData.monthlyExpenses || !formData.age) {
      alert('Please fill in at least Monthly Income, Monthly Expenses, and Age');
      return;
    }

    setIsAnalyzing(true);

    try {
      const response = await axios.post('http://localhost:5000/api/advisor/analyze', {
        monthlyIncome: parseFloat(formData.monthlyIncome) || 0,
        incomeSource: formData.incomeSource,
        monthlyExpenses: parseFloat(formData.monthlyExpenses) || 0,
        totalDebt: parseFloat(formData.totalDebt) || 0,
        age: parseInt(formData.age) || 25,
        dependents: parseInt(formData.dependents) || 0,
        debtBreakdown: {
          homeLoan: parseFloat(formData.homeLoan) || 0,
          carLoan: parseFloat(formData.carLoan) || 0,
          personalLoan: parseFloat(formData.personalLoan) || 0,
          creditCard: parseFloat(formData.creditCard) || 0
        },
        investments: {
          equity: parseFloat(formData.equity) || 0,
          debt: parseFloat(formData.debt) || 0,
          gold: parseFloat(formData.gold) || 0,
          realEstate: parseFloat(formData.realEstate) || 0,
          ppf: parseFloat(formData.ppf) || 0,
          otherAssets: parseFloat(formData.otherAssets) || 0
        }
      }, {
        withCredentials: true
      });

      console.log('API Response:', response.data);

      if (response.data.success) {
        console.log('Analysis Result:', response.data.analysis);
        setAnalysisResult(response.data.analysis);
        setActiveTab('analysis');
      } else {
        alert(response.data.message || 'Analysis failed');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      console.error('Error response:', error.response?.data);
      if (error.response?.status === 401) {
        alert('Please log in to use the financial advisor feature.');
      } else {
        const errorMsg = error.response?.data?.message || error.message || 'Failed to analyze';
        alert(`Error: ${errorMsg}. Please check your backend and Perplexity API key.`);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Send chat message
  const handleChatSend = async () => {
    if (!chatInput.trim()) return;

    const userMessage = { role: 'user', content: chatInput };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsChatting(true);

    try {
      const response = await axios.post('http://localhost:5000/api/advisor/chat', {
        message: chatInput,
        chatHistory: chatMessages
      }, {
        withCredentials: true
      });

      if (response.data.success) {
        const aiMessage = { 
          role: 'assistant', 
          content: response.data.response,
          isNew: true // Flag for typewriter effect
        };
        setChatMessages(prev => [...prev, aiMessage]);
      } else {
        alert(response.data.message || 'Chat failed');
      }
    } catch (error) {
      console.error('Chat error:', error);
      if (error.response?.status === 401) {
        alert('Please log in to use the chat feature.');
      } else {
        const errorMsg = error.response?.data?.message || 'Failed to send message';
        alert(`Error: ${errorMsg}`);
      }
    } finally {
      setIsChatting(false);
    }
  };

  // Get status badge component
  const StatusBadge = ({ status }) => {
    const config = {
      good: { icon: CheckCircle2, color: 'text-green-400 bg-green-400/20', label: 'Good' },
      warning: { icon: AlertTriangle, color: 'text-yellow-400 bg-yellow-400/20', label: 'Warning' },
      critical: { icon: AlertCircle, color: 'text-red-400 bg-red-400/20', label: 'Critical' }
    };

    const { icon: Icon, color, label } = config[status] || config.warning;

    return (
      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${color}`}>
        <Icon className="w-4 h-4" />
        <span className="font-medium">{label}</span>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[#0B0C10] border border-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/10 to-transparent border-b border-gray-800 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">AI Financial Advisor</h2>
                  <p className="text-sm text-gray-400">Powered by Gemini AI</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-lg bg-gray-800/50 hover:bg-gray-700 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mt-6">
              {[
                { id: 'profile', label: 'Financial Profile', icon: FileText },
                { id: 'analysis', label: 'Analysis', icon: BarChart3 },
                { id: 'chat', label: 'Chat Assistant', icon: MessageSquare }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary/20 text-primary border border-primary/30'
                      : 'bg-gray-800/30 text-gray-400 hover:bg-gray-800/50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Basic Info */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Monthly Income (₹) *
                    </label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="number"
                        name="monthlyIncome"
                        value={formData.monthlyIncome}
                        onChange={handleInputChange}
                        placeholder="e.g., 75000"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Income Source
                    </label>
                    <select
                      name="incomeSource"
                      value={formData.incomeSource}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary/50"
                    >
                      <option>Salary</option>
                      <option>Business</option>
                      <option>Freelance</option>
                      <option>Investments</option>
                      <option>Mixed</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Monthly Expenses (₹) *
                    </label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="number"
                        name="monthlyExpenses"
                        value={formData.monthlyExpenses}
                        onChange={handleInputChange}
                        placeholder="e.g., 45000"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Age *
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="e.g., 30"
                      className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Dependents
                    </label>
                    <input
                      type="number"
                      name="dependents"
                      value={formData.dependents}
                      onChange={handleInputChange}
                      placeholder="0"
                      className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Total Debt (₹)
                    </label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="number"
                        name="totalDebt"
                        value={formData.totalDebt}
                        onChange={handleInputChange}
                        placeholder="0"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Debt Breakdown */}
                <div className="border-t border-gray-800 pt-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Debt Breakdown (Optional)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {['homeLoan', 'carLoan', 'personalLoan', 'creditCard'].map(field => (
                      <div key={field} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-400">
                          {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} (₹)
                        </label>
                        <div className="relative">
                          <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                          <input
                            type="number"
                            name={field}
                            value={formData[field]}
                            onChange={handleInputChange}
                            placeholder="0"
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary/50"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Investments */}
                <div className="border-t border-gray-800 pt-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Investments (Optional)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {['equity', 'debt', 'gold', 'realEstate', 'ppf', 'otherAssets'].map(field => (
                      <div key={field} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-400">
                          {field === 'ppf' ? 'PPF' : field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} (₹)
                        </label>
                        <div className="relative">
                          <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                          <input
                            type="number"
                            name={field}
                            value={formData[field]}
                            onChange={handleInputChange}
                            placeholder="0"
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary/50"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Analyze Button */}
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-black font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing Your Finances...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-5 h-5" />
                      Analyze My Finances
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Analysis Tab */}
            {activeTab === 'analysis' && (
              <div className="space-y-6">
                {analysisResult ? (
                  <>
                    {/* Overall Score */}
                    <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/30 rounded-xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-1">Financial Health Score</h3>
                          <p className="text-sm text-gray-400">Based on comprehensive analysis</p>
                        </div>
                        <div className="text-5xl font-bold text-primary">
                          {analysisResult.overallScore || 0}
                          <span className="text-2xl text-gray-400">/100</span>
                        </div>
                      </div>
                    </div>

                    {/* Summary with Markdown */}
                    {analysisResult.summary && (
                      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                        <MarkdownRenderer content={analysisResult.summary} />
                      </div>
                    )}

                    {/* Charts Section */}
                    <div className="space-y-6">
                      {/* Cash Flow Chart */}
                      {analysisResult.cashflow_analysis && (
                        <CashFlowChart data={analysisResult.cashflow_analysis} />
                      )}

                      {/* Wealth Projection Chart */}
                      {analysisResult.wealth_projection && (
                        <WealthProjectionChart data={analysisResult.wealth_projection} />
                      )}

                      {/* Portfolio Comparison */}
                      {analysisResult.strategy && (
                        <PortfolioChart strategy={analysisResult.strategy} />
                      )}

                      {/* Debt Overview */}
                      {analysisResult.debt_overview && (
                        <DebtOverviewChart data={analysisResult.debt_overview} />
                      )}

                      {/* Risk Assessment */}
                      {analysisResult.risk_assessment && (
                        <RiskAssessmentChart data={analysisResult.risk_assessment} />
                      )}
                    </div>

                    {/* Audit Categories with Markdown */}
                    {analysisResult.audit && analysisResult.audit.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white">Detailed Category Analysis</h3>
                        <div className="grid grid-cols-1 gap-4">
                          {analysisResult.audit.map((category, index) => (
                            <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 space-y-3">
                              <div className="flex items-start justify-between">
                                <h4 className="text-lg font-semibold text-white">{category.category}</h4>
                                <div className="flex items-center gap-3">
                                  {category.score && (
                                    <span className="text-2xl font-bold text-primary">{category.score}</span>
                                  )}
                                  <StatusBadge status={category.status} />
                                </div>
                              </div>
                              {category.reason && (
                                <div className="pt-2">
                                  <MarkdownRenderer content={category.reason} />
                                </div>
                              )}
                              {category.improvement && (
                                <div className="pt-2 border-t border-gray-800">
                                  <MarkdownRenderer content={category.improvement} />
                                </div>
                              )}
                              {category.impact && (
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-500">Impact:</span>
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    category.impact === 'High' ? 'bg-red-500/20 text-red-400' :
                                    category.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                    'bg-green-500/20 text-green-400'
                                  }`}>
                                    {category.impact}
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Investment Strategy */}
                    {analysisResult.investmentStrategy && (
                      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-4">
                        <h3 className="text-xl font-bold text-white">Investment Strategy</h3>
                        
                        {/* Allocation */}
                        {analysisResult.investmentStrategy.allocation && (
                          <div>
                            <p className="text-sm font-semibold text-gray-400 mb-3">Recommended Allocation</p>
                            <div className="flex gap-4">
                              {Object.entries(analysisResult.investmentStrategy.allocation).map(([key, value]) => (
                                <div key={key} className="flex-1 bg-gray-800/50 rounded-lg p-3 text-center">
                                  <p className="text-xs text-gray-500 uppercase mb-1">{key}</p>
                                  <p className="text-lg font-bold text-primary">{value}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Projected Returns */}
                        {analysisResult.investmentStrategy.projectedReturns && (
                          <div>
                            <p className="text-sm font-semibold text-gray-400 mb-3">Projected Returns (Annual)</p>
                            <div className="grid grid-cols-3 gap-3">
                              {Object.entries(analysisResult.investmentStrategy.projectedReturns).map(([key, value]) => (
                                <div key={key} className="bg-gray-800/50 rounded-lg p-3 text-center">
                                  <p className="text-xs text-gray-500 uppercase mb-1">{key}</p>
                                  <p className="text-sm font-bold text-white">{value}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Recommendation */}
                        {analysisResult.investmentStrategy.recommendation && (
                          <p className="text-sm text-gray-300 leading-relaxed pt-2 border-t border-gray-800">
                            {analysisResult.investmentStrategy.recommendation}
                          </p>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <BarChart3 className="w-16 h-16 text-gray-700 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-400 mb-2">No Analysis Yet</h3>
                    <p className="text-gray-500 mb-6">Fill in your financial profile and run an analysis to see results</p>
                    <button
                      onClick={() => setActiveTab('profile')}
                      className="px-6 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition-colors"
                    >
                      Go to Profile
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Chat Tab */}
            {activeTab === 'chat' && (
              <div className="flex flex-col h-[350px]">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {chatMessages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <MessageSquare className="w-16 h-16 text-gray-700 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-400 mb-2">Start a Conversation</h3>
                      <p className="text-gray-500 max-w-md">
                        Ask me anything about personal finance, investments, debt management, or your financial situation
                      </p>
                      <div className="flex flex-wrap gap-2 mt-6">
                        {['How should I start investing?', 'Tips for reducing debt', 'Emergency fund advice'].map(suggestion => (
                          <button
                            key={suggestion}
                            onClick={() => setChatInput(suggestion)}
                            className="px-4 py-2 bg-gray-800/50 hover:bg-gray-800 text-sm text-gray-400 rounded-lg transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      {chatMessages.map((msg, index) => (
                        <div
                          key={index}
                          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] p-4 rounded-xl ${
                              msg.role === 'user'
                                ? 'bg-primary/20 text-white ml-auto'
                                : 'bg-gray-900/50 border border-gray-800 text-gray-300'
                            }`}
                          >
                            {msg.role === 'user' ? (
                              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                            ) : (
                              msg.isNew ? (
                                <TypewriterMarkdown content={msg.content} speed={20} />
                              ) : (
                                <MarkdownRenderer content={msg.content} />
                              )
                            )}
                          </div>
                        </div>
                      ))}
                      {isChatting && (
                        <div className="flex justify-start">
                          <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-xl">
                            <Loader2 className="w-5 h-5 text-primary animate-spin" />
                          </div>
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </>
                  )}
                </div>

                {/* Input */}
                <div className="border-t border-gray-800 pt-4">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleChatSend()}
                      placeholder="Ask about personal finance, investments, savings..."
                      className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary/50"
                      disabled={isChatting}
                    />
                    <button
                      onClick={handleChatSend}
                      disabled={!chatInput.trim() || isChatting}
                      className="px-6 py-3 bg-primary hover:bg-primary/90 text-black font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdvisorModal;
