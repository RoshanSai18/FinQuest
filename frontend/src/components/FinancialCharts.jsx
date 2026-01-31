import React from 'react';
import ReactMarkdown from 'react-markdown';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Color palette
const COLORS = {
  primary: '#c8ff00',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  chart: ['#c8ff00', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444']
};

// Markdown renderer component
export const MarkdownRenderer = ({ content }) => {
  if (!content) return null;
  
  return (
    <div className="prose prose-invert prose-sm max-w-none">
      <ReactMarkdown
        components={{
          h1: ({...props}) => <h1 className="text-2xl font-bold text-white mb-4" {...props} />,
          h2: ({...props}) => <h2 className="text-xl font-bold text-white mb-3 mt-6" {...props} />,
          h3: ({...props}) => <h3 className="text-lg font-semibold text-white mb-2 mt-4" {...props} />,
          p: ({...props}) => <p className="text-gray-300 mb-3 leading-relaxed" {...props} />,
          ul: ({...props}) => <ul className="list-disc list-inside text-gray-300 space-y-1 mb-3" {...props} />,
          ol: ({...props}) => <ol className="list-decimal list-inside text-gray-300 space-y-1 mb-3" {...props} />,
          li: ({...props}) => <li className="ml-2" {...props} />,
          strong: ({...props}) => <strong className="text-primary font-semibold" {...props} />,
          em: ({...props}) => <em className="text-gray-200 italic" {...props} />,
          hr: ({...props}) => <hr className="border-gray-800 my-4" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

// Cash Flow Chart
export const CashFlowChart = ({ data }) => {
  if (!data || !data.monthly_breakdown || data.monthly_breakdown.length === 0) return null;

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-4">
      <h3 className="text-xl font-bold text-white">Monthly Cash Flow Breakdown</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data.monthly_breakdown}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="category" stroke="#9ca3af" tick={{fill: '#9ca3af'}} />
          <YAxis stroke="#9ca3af" tick={{fill: '#9ca3af'}} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
            labelStyle={{ color: '#fff' }}
          />
          <Bar dataKey="amount" fill={COLORS.primary} />
        </BarChart>
      </ResponsiveContainer>
      {data.analysis && <MarkdownRenderer content={data.analysis} />}
    </div>
  );
};

// Portfolio Comparison Chart
export const PortfolioChart = ({ strategy }) => {
  if (!strategy || !strategy.current_portfolio || !strategy.recommended_portfolio) return null;

  const currentData = Object.entries(strategy.current_portfolio).map(([key, value]) => ({
    name: key.replace('_percentage', '').replace('_', ' ').toUpperCase(),
    value: value
  }));

  const recommendedData = Object.entries(strategy.recommended_portfolio).map(([key, value]) => ({
    name: key.replace('_percentage', '').replace('_', ' ').toUpperCase(),
    value: value
  }));

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-4">
      <h3 className="text-xl font-bold text-white">Portfolio Allocation Comparison</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-center text-gray-400 mb-3">Current Portfolio</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={currentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({name, value}) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {currentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS.chart[index % COLORS.chart.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h4 className="text-center text-gray-400 mb-3">Recommended Portfolio</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={recommendedData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({name, value}) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {recommendedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS.chart[index % COLORS.chart.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      {strategy.summary && <MarkdownRenderer content={strategy.summary} />}
      {strategy.rationale && <MarkdownRenderer content={strategy.rationale} />}
    </div>
  );
};

// Wealth Projection Chart
export const WealthProjectionChart = ({ data }) => {
  if (!data || !data.years || data.years.length === 0) return null;

  const chartData = data.years.map((year, index) => ({
    year,
    conservative: data.conservative[index] || 0,
    moderate: data.moderate[index] || 0,
    aggressive: data.aggressive[index] || 0
  }));

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-4">
      <h3 className="text-xl font-bold text-white">Wealth Growth Projection</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="year" stroke="#9ca3af" tick={{fill: '#9ca3af'}} />
          <YAxis stroke="#9ca3af" tick={{fill: '#9ca3af'}} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
            labelStyle={{ color: '#fff' }}
            formatter={(value) => `₹${(value/100000).toFixed(2)}L`}
          />
          <Legend />
          <Line type="monotone" dataKey="conservative" stroke={COLORS.success} strokeWidth={2} name="Conservative (8-10%)" />
          <Line type="monotone" dataKey="moderate" stroke={COLORS.primary} strokeWidth={2} name="Moderate (12-14%)" />
          <Line type="monotone" dataKey="aggressive" stroke={COLORS.danger} strokeWidth={2} name="Aggressive (15-18%)" />
        </LineChart>
      </ResponsiveContainer>
      {data.analysis && <MarkdownRenderer content={data.analysis} />}
    </div>
  );
};

// Debt Overview Chart
export const DebtOverviewChart = ({ data }) => {
  if (!data || !data.debt_breakdown || data.debt_breakdown.length === 0) return null;

  const priorityColors = {
    'Critical': COLORS.danger,
    'High': '#f59e0b',
    'Medium': '#3b82f6',
    'Low': COLORS.success
  };

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Debt Overview</h3>
        <div className="text-right">
          <p className="text-sm text-gray-400">Total Debt</p>
          <p className="text-2xl font-bold text-primary">₹{(data.total_debt/100000).toFixed(2)}L</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data.debt_breakdown} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis type="number" stroke="#9ca3af" tick={{fill: '#9ca3af'}} />
          <YAxis type="category" dataKey="type" stroke="#9ca3af" tick={{fill: '#9ca3af'}} width={100} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
            labelStyle={{ color: '#fff' }}
            formatter={(value, name) => [
              name === 'amount' ? `₹${(value/100000).toFixed(2)}L` : 
              name === 'interest' ? `${value}%` : value,
              name
            ]}
          />
          <Bar dataKey="amount" fill={COLORS.primary}>
            {data.debt_breakdown.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={priorityColors[entry.priority] || COLORS.primary} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {data.debt_breakdown.map((debt, index) => (
          <div key={index} className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-1">{debt.type}</p>
            <p className="text-sm font-bold text-white">₹{(debt.amount/100000).toFixed(2)}L</p>
            <p className="text-xs text-gray-400">{debt.interest}% interest</p>
            <span className={`text-xs px-2 py-0.5 rounded-full inline-block mt-1 ${
              debt.priority === 'Critical' ? 'bg-red-500/20 text-red-400' :
              debt.priority === 'High' ? 'bg-yellow-500/20 text-yellow-400' :
              debt.priority === 'Medium' ? 'bg-blue-500/20 text-blue-400' :
              'bg-green-500/20 text-green-400'
            }`}>
              {debt.priority}
            </span>
          </div>
        ))}
      </div>
      {data.recommendations && <MarkdownRenderer content={data.recommendations} />}
    </div>
  );
};

// Risk Assessment Radar Chart
export const RiskAssessmentChart = ({ data }) => {
  if (!data || !data.factors || data.factors.length === 0) return null;

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Risk Assessment</h3>
        <span className={`px-4 py-1 rounded-full font-semibold ${
          data.level === 'Low' ? 'bg-green-500/20 text-green-400' :
          data.level === 'Moderate' ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-red-500/20 text-red-400'
        }`}>
          {data.level} Risk
        </span>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data.factors}>
          <PolarGrid stroke="#374151" />
          <PolarAngleAxis dataKey="factor" stroke="#9ca3af" tick={{fill: '#9ca3af', fontSize: 12}} />
          <PolarRadiusAxis angle={90} domain={[0, 10]} stroke="#9ca3af" tick={{fill: '#9ca3af'}} />
          <Radar name="Score" dataKey="score" stroke={COLORS.primary} fill={COLORS.primary} fillOpacity={0.6} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
            labelStyle={{ color: '#fff' }}
          />
        </RadarChart>
      </ResponsiveContainer>
      {data.analysis && <MarkdownRenderer content={data.analysis} />}
    </div>
  );
};
