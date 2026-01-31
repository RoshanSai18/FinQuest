const User = require('../models/User');

// Perplexity API Configuration
const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

// Helper: Call Perplexity API
async function callPerplexityAPI(messages, systemPrompt = null, maxTokens = 2000) {
  const headers = {
    'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
    'Content-Type': 'application/json'
  };

  const requestMessages = systemPrompt 
    ? [{ role: 'system', content: systemPrompt }, ...messages]
    : messages;

  const body = JSON.stringify({
    model: 'sonar-reasoning-pro',
    messages: requestMessages,
    max_tokens: maxTokens,
    temperature: 0.7,
    top_p: 0.9,
    return_citations: false,
    search_domain_filter: ['perplexity.ai'],
    stream: false
  });

  const response = await fetch(PERPLEXITY_API_URL, {
    method: 'POST',
    headers: headers,
    body: body
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Perplexity API error: ${response.status} - ${errorData}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// Multi-user storage: Map of userId -> { financialData, chatHistory }
const userDataStore = new Map();

// Helper: Get or initialize user data
function getUserData(userId) {
  if (!userDataStore.has(userId)) {
    userDataStore.set(userId, {
      financialData: null,
      chatHistory: []
    });
  }
  return userDataStore.get(userId);
}

// Helper: Clear old data (runs every hour to prevent memory leaks)
setInterval(() => {
  const oneHourAgo = Date.now() - (60 * 60 * 1000);
  for (const [userId, data] of userDataStore.entries()) {
    if (data.lastAccessed && data.lastAccessed < oneHourAgo) {
      userDataStore.delete(userId);
      console.log(`🧹 Cleared stale data for user: ${userId}`);
    }
  }
}, 60 * 60 * 1000); // Run every hour

// --- ENHANCED SYSTEM PROMPT WITH MARKDOWN & CHARTS ---
const AUDITOR_PROMPT = `
You are an elite Financial Advisor AI specializing in Indian household finance. Provide comprehensive, data-driven analysis with professional markdown formatting.

### INPUT: 
User's complete financial profile including Income, Investments, Liabilities, Expenses, Age, and Dependents.

### OUTPUT FORMAT:
Return a **STRICT JSON Object** (NO markdown code blocks around the JSON itself). Structure:

{
  "audit": [
    {
      "category": "Liquidity|Debt Management|Growth|Risk Management|Cash Flow",
      "status": "Excellent|Good|Warning|Critical",
      "score": 85,
      "reason": "## Assessment\\n\\n**Current Status:** [detailed markdown]\\n\\n**Key Metrics:**\\n- Metric 1: Value\\n- Metric 2: Value",
      "improvement": "### Recommendations\\n\\n1. **Priority Action:** [specific step]\\n2. **Secondary Action:** [specific step]\\n3. **Long-term Goal:** [specific step]",
      "impact": "High|Medium|Low"
    }
  ],
  "strategy": {
    "summary": "### Investment Strategy Overview\\n\\n[Markdown formatted strategy with bold, lists, and structure]",
    "current_portfolio": {
      "equity_percentage": 30,
      "debt_percentage": 40,
      "gold_percentage": 10,
      "real_estate_percentage": 15,
      "other_percentage": 5
    },
    "recommended_portfolio": {
      "equity_percentage": 45,
      "debt_percentage": 30,
      "gold_percentage": 10,
      "real_estate_percentage": 10,
      "other_percentage": 5
    },
    "current_return": "8-10%",
    "optimized_return": "12-15%",
    "rationale": "### Strategic Rationale\\n\\n**Why This Works:**\\n- Point 1\\n- Point 2\\n\\n**Expected Outcomes:**\\n- Outcome 1\\n- Outcome 2"
  },
  "cashflow_analysis": {
    "monthly_breakdown": [
      {"category": "Income", "amount": 100000, "percentage": 100},
      {"category": "Essential Expenses", "amount": 40000, "percentage": 40},
      {"category": "Discretionary", "amount": 20000, "percentage": 20},
      {"category": "Investments", "amount": 25000, "percentage": 25},
      {"category": "Debt Payments", "amount": 10000, "percentage": 10},
      {"category": "Surplus", "amount": 5000, "percentage": 5}
    ],
    "analysis": "### Cash Flow Analysis\\n\\n[Markdown explanation]"
  },
  "debt_overview": {
    "total_debt": 1500000,
    "debt_breakdown": [
      {"type": "Home Loan", "amount": 1000000, "interest": 8.5, "priority": "Low"},
      {"type": "Car Loan", "amount": 300000, "interest": 9.5, "priority": "Medium"},
      {"type": "Personal Loan", "amount": 150000, "interest": 14, "priority": "High"},
      {"type": "Credit Card", "amount": 50000, "interest": 36, "priority": "Critical"}
    ],
    "debt_to_income_ratio": 25.5,
    "recommendations": "### Debt Repayment Strategy\\n\\n[Markdown recommendations]"
  },
  "wealth_projection": {
    "years": ["Year 1", "Year 3", "Year 5", "Year 7", "Year 10"],
    "conservative": [1000000, 1200000, 1450000, 1750000, 2200000],
    "moderate": [1000000, 1350000, 1800000, 2400000, 3200000],
    "aggressive": [1000000, 1450000, 2100000, 3000000, 4500000],
    "analysis": "### Wealth Growth Projection\\n\\n[Markdown explanation]"
  },
  "overallScore": 75,
  "summary": "# Financial Health Summary\\n\\n## Overall Assessment\\n[Comprehensive markdown summary with **bold**, *italic*, lists, and structure]\\n\\n## Key Strengths\\n- Strength 1\\n- Strength 2\\n\\n## Areas for Improvement\\n- Area 1\\n- Area 2\\n\\n## Next Steps\\n1. Immediate action\\n2. Short-term goal\\n3. Long-term vision",
  "risk_assessment": {
    "level": "Moderate",
    "factors": [
      {"factor": "Income Stability", "score": 8, "status": "Good"},
      {"factor": "Emergency Fund", "score": 6, "status": "Warning"},
      {"factor": "Insurance Coverage", "score": 5, "status": "Warning"},
      {"factor": "Investment Diversification", "score": 7, "status": "Good"},
      {"factor": "Debt Burden", "score": 6, "status": "Warning"}
    ],
    "analysis": "### Risk Analysis\\n\\n[Markdown risk assessment]"
  }
}

### CRITICAL RULES:
1. **MARKDOWN FORMATTING:**
   - Use # for headers, ## for subheaders, ### for sections
   - Use **bold** for emphasis, *italic* for secondary emphasis
   - Use bullet points (-) and numbered lists (1. 2. 3.)
   - Use horizontal rules (---) for separation
   - Format numbers with ₹ symbol and proper Indian notation (Lakhs/Crores)

2. **LOCALIZATION (INDIAN CONTEXT):**
   - All amounts in ₹ (Rupees)
   - Use Lakhs (L) for 1,00,000 and Crores (Cr) for 1,00,00,000
   - Reference Indian investment options: PPF, EPF, NPS, ELSS, Fixed Deposits
   - Consider Indian tax implications: 80C, HRA, home loan interest deduction
   - Factor in Indian inflation rates (6-7%)

3. **FINANCIAL WISDOM:**
   - Emergency fund = 6-12 months of expenses (not 3-6)
   - Debt avalanche method for high-interest debts (>12%)
   - Age-based equity allocation: (100 - age)% in equity
   - 50-30-20 rule: 50% needs, 30% wants, 20% savings minimum
   - Diversification across asset classes

4. **CHART DATA ACCURACY:**
   - Ensure all percentages add up to 100%
   - Wealth projections should be realistic (conservative: 8-10%, moderate: 12-14%, aggressive: 15-18%)
   - Cash flow categories must account for all income
   - Debt priorities: Credit card > Personal loan > Car loan > Home loan

5. **SCORING LOGIC:**
   - Overall Score (0-100): Weighted average of all categories
   - Category Scores: Liquidity (25%), Debt (20%), Growth (20%), Risk (20%), Cash Flow (15%)
   - Status mapping: 90-100=Excellent, 70-89=Good, 50-69=Warning, <50=Critical

6. **ACTIONABILITY:**
   - Every recommendation must have specific numbers and timelines
   - Prioritize actions by impact (High/Medium/Low)
   - Provide step-by-step implementation guidance
   - Include expected outcomes and metrics to track

7. **VALIDATION:**
   - If data is incomplete, make reasonable assumptions and state them
   - Cross-check all calculations
   - Ensure JSON is valid (no trailing commas, proper escaping)
   - All array lengths should match for chart data
`;

// Helper: Robust JSON extraction (handles markdown wrapping)
function extractJSON(text) {
  try {
    // First attempt: direct parse
    return JSON.parse(text);
  } catch (e) {
    console.log('Direct parse failed, trying extraction...');
    
    // Remove markdown code blocks
    const withoutMarkdown = text.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    
    try {
      return JSON.parse(withoutMarkdown);
    } catch (e2) {
      // Find JSON object boundaries
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      
      if (!jsonMatch) {
        throw new Error('No JSON found in AI response');
      }
      
      return JSON.parse(jsonMatch[0]);
    }
  }
}

// Helper: Format Indian currency
function formatINR(val) {
  const num = parseFloat(val) || 0;
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
  return `₹${num.toLocaleString('en-IN')}`;
}

// --- API: POST /api/advisor/analyze ---
exports.analyzeFinancials = async (req, res) => {
  console.log('=== Financial Analysis Request ===');
  console.log('Request Body:', JSON.stringify(req.body, null, 2));
  
  try {
    const { 
      incomeStreams: rawIncomeStreams = [], 
      investments: rawInvestments = [], 
      liabilities: rawLiabilities = [], 
      debtBreakdown,
      monthlyOutflow = {}, 
      notes = '',
      totals = {},
      // Also accept simplified format
      monthlyIncome,
      monthlyExpenses,
      totalDebt,
      age,
      dependents
    } = req.body;

    // Helper to convert object format to array format
    const normalizeToArray = (data) => {
      if (Array.isArray(data)) return data;
      if (typeof data === 'object' && data !== null) {
        return Object.entries(data).map(([key, value]) => ({
          name: key,
          amt: parseFloat(value) || 0
        }));
      }
      return [];
    };

    // Normalize all data to arrays
    const incomeStreams = normalizeToArray(rawIncomeStreams);
    const investments = normalizeToArray(rawInvestments);
    const liabilities = debtBreakdown ? normalizeToArray(debtBreakdown) : normalizeToArray(rawLiabilities);

    // Calculate totals if not provided
    const sum = (arr) => {
      if (!Array.isArray(arr) || arr.length === 0) return 0;
      return arr.reduce((acc, curr) => acc + (parseFloat(curr.amt) || 0), 0);
    };
    
    const calculatedTotals = {
      income: totals.income || sum(incomeStreams) || parseFloat(monthlyIncome) || 0,
      investments: totals.investments || sum(investments) || 0,
      liabilities: totals.liabilities || sum(liabilities) || parseFloat(totalDebt) || 0,
      netPosition: totals.netPosition || 0
    };

    const monthlyNeeds = parseFloat(monthlyOutflow.needs) || 0;
    const monthlyWants = parseFloat(monthlyOutflow.wants) || 0;
    const totalExpenses = monthlyNeeds + monthlyWants || parseFloat(monthlyExpenses) || 0;

    // Validation
    if (calculatedTotals.income === 0) {
      return res.status(400).json({ 
        error: 'No income data provided. Please add at least one income stream.' 
      });
    }

    // Get authenticated user
    const userId = req.user?._id?.toString();
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Store for chat context (multi-user support)
    const userData = getUserData(userId);
    userData.financialData = {
      incomeStreams,
      investments,
      liabilities,
      monthlyOutflow,
      notes,
      totals: calculatedTotals,
      age,
      dependents,
      timestamp: new Date()
    };
    userData.lastAccessed = Date.now();

    // Save to database for persistence
    try {
      await User.findByIdAndUpdate(userId, {
        financialProfile: {
          monthlyIncome: calculatedTotals.income,
          incomeSource: incomeStreams[0]?.name || 'Not specified',
          monthlyExpenses: totalExpenses,
          totalDebt: calculatedTotals.liabilities,
          debtBreakdown: {
            homeLoan: liabilities.find(l => l.name?.toLowerCase().includes('home'))?.amt || 0,
            carLoan: liabilities.find(l => l.name?.toLowerCase().includes('car'))?.amt || 0,
            personalLoan: liabilities.find(l => l.name?.toLowerCase().includes('personal'))?.amt || 0,
            creditCard: liabilities.find(l => l.name?.toLowerCase().includes('credit'))?.amt || 0
          },
          investments: {
            equity: investments.find(i => i.name?.toLowerCase().includes('equity'))?.amt || 0,
            debt: investments.find(i => i.name?.toLowerCase().includes('debt'))?.amt || 0,
            gold: investments.find(i => i.name?.toLowerCase().includes('gold'))?.amt || 0,
            realEstate: investments.find(i => i.name?.toLowerCase().includes('real estate'))?.amt || 0,
            ppf: investments.find(i => i.name?.toLowerCase().includes('ppf'))?.amt || 0,
            otherAssets: calculatedTotals.investments
          },
          age: age || null,
          dependents: dependents || 0,
          lastAnalyzed: new Date()
        }
      });
      console.log(`💾 Saved financial profile to database for user: ${userId}`);
    } catch (dbError) {
      console.error('Database save error (non-critical):', dbError.message);
      // Continue even if DB save fails - analysis still works
    }

    console.log('Calculated Totals:', calculatedTotals);
    console.log('Calling Perplexity AI...');
    // Prepare detailed financial profile
    const financialProfile = `
FINANCIAL PROFILE ANALYSIS:

INCOME STREAMS:
${incomeStreams.length > 0 ? incomeStreams.map(s => `- ${s.name}: ${formatINR(s.amt)}${s.stability ? ` (${s.stability})` : ''}`).join('\n') : `- Monthly Income: ${formatINR(calculatedTotals.income)}`}
Total Income: ${formatINR(calculatedTotals.income)}

INVESTMENTS:
${investments.length > 0 ? investments.map(i => `- ${i.name}: ${formatINR(i.amt)}${i.sip ? ` | SIP: ${formatINR(i.sip)}` : ''}${i.pct ? ` | Return: ${i.pct}%` : ''}`).join('\n') : 'No investments'}
Total Investments: ${formatINR(calculatedTotals.investments)}

LIABILITIES:
${liabilities.length > 0 ? liabilities.map(l => `- ${l.name}: ${formatINR(l.amt)}${l.emi ? ` | EMI: ${formatINR(l.emi)}` : ''}${l.pct ? ` | Interest: ${l.pct}%` : ''}`).join('\n') : 'No liabilities'}
Total Liabilities: ${formatINR(calculatedTotals.liabilities)}

MONTHLY OUTFLOW:
- Needs (essentials): ${formatINR(monthlyNeeds)}
- Wants (discretionary): ${formatINR(monthlyWants)}
- Total Expenses: ${formatINR(totalExpenses)}

NET POSITION: ${formatINR(calculatedTotals.netPosition)}
${age ? `Age: ${age} years` : ''}
${dependents ? `Dependents: ${dependents}` : ''}

USER NOTES: ${notes || 'None'}

Provide a comprehensive financial audit following the JSON schema.
`;

    // Call Perplexity AI with increased token limit for detailed markdown analysis
    const aiText = await callPerplexityAPI(
      [{ role: 'user', content: financialProfile }],
      AUDITOR_PROMPT,
      4000
    );
    
    console.log('AI Response received, length:', aiText.length);
    console.log('Raw AI response:', aiText.substring(0, 200) + '...');

    // Extract and parse JSON
    let analysisResult;
    try {
      analysisResult = extractJSON(aiText);
      console.log('JSON parsed successfully');
    } catch (parseError) {
      console.log('JSON parsing failed, using fallback...');
      
      // Fallback: Create structured response
      const savingsRate = calculatedTotals.income > 0 
        ? ((calculatedTotals.income - totalExpenses) / calculatedTotals.income * 100).toFixed(2)
        : 0;
      
      const debtToIncome = calculatedTotals.income > 0
        ? (calculatedTotals.liabilities / (calculatedTotals.income * 12) * 100).toFixed(2)
        : 0;

      analysisResult = {
        audit: [
          {
            category: 'Liquidity',
            status: calculatedTotals.investments >= totalExpenses * 3 ? 'Good' : 'Warning',
            reason: `Current liquid assets cover ${(calculatedTotals.investments / totalExpenses).toFixed(1)} months of expenses`,
            improvement: 'Build emergency fund to cover 6 months of expenses'
          },
          {
            category: 'Debt Management',
            status: debtToIncome < 30 ? 'Good' : debtToIncome < 50 ? 'Warning' : 'Critical',
            reason: `Debt-to-income ratio is ${debtToIncome}%`,
            improvement: 'Focus on clearing high-interest debt first'
          },
          {
            category: 'Cash Flow',
            status: savingsRate > 20 ? 'Excellent' : savingsRate > 10 ? 'Good' : 'Warning',
            reason: `Savings rate is ${savingsRate}%`,
            improvement: 'Aim to save at least 20% of income monthly'
          },
          {
            category: 'Growth',
            status: calculatedTotals.investments > 0 ? 'Good' : 'Warning',
            reason: 'Investment portfolio needs diversification',
            improvement: 'Consider equity mutual funds and PPF for long-term growth'
          }
        ],
        strategy: {
          current_implied_return: '8-10%',
          optimized_annual_return: '12-15%',
          rationale: 'Shift to higher equity allocation for better long-term returns while maintaining debt instruments for stability'
        },
        overallScore: Math.max(20, Math.min(100,
          (savingsRate > 0 ? 30 : 10) +
          (debtToIncome < 30 ? 30 : 10) +
          (calculatedTotals.investments > totalExpenses * 3 ? 25 : 10) +
          (calculatedTotals.income > totalExpenses ? 15 : 5)
        )),
        summary: `Financial health score based on ${savingsRate}% savings rate, ${debtToIncome}% debt ratio, and emergency fund status. ${calculatedTotals.netPosition >= 0 ? 'Positive net position indicates good fundamentals.' : 'Negative net position requires immediate attention.'}`
      };
    }

    console.log('Sending response to client...');
    
    // Enrich response with default values for missing chart data
    const enrichedResult = {
      ...analysisResult,
      cashflow_analysis: analysisResult.cashflow_analysis || {
        monthly_breakdown: [
          {category: "Income", amount: calculatedTotals.income, percentage: 100},
          {category: "Expenses", amount: totalExpenses, percentage: (totalExpenses/calculatedTotals.income*100).toFixed(1)},
          {category: "Surplus", amount: calculatedTotals.income - totalExpenses, percentage: ((calculatedTotals.income-totalExpenses)/calculatedTotals.income*100).toFixed(1)}
        ],
        analysis: "### Cash Flow Analysis\n\nBased on your current income and expenses."
      },
      debt_overview: analysisResult.debt_overview || {
        total_debt: calculatedTotals.liabilities,
        debt_breakdown: liabilities.map(l => ({
          type: l.name,
          amount: l.amt,
          interest: l.pct || 10,
          priority: l.pct > 15 ? "High" : "Medium"
        })),
        debt_to_income_ratio: ((calculatedTotals.liabilities / (calculatedTotals.income * 12)) * 100).toFixed(2),
        recommendations: "### Debt Management Recommendations\n\nFocus on high-interest debt repayment."
      },
      wealth_projection: analysisResult.wealth_projection || {
        years: ["Year 1", "Year 3", "Year 5", "Year 7", "Year 10"],
        conservative: [calculatedTotals.investments, calculatedTotals.investments*1.2, calculatedTotals.investments*1.45, calculatedTotals.investments*1.75, calculatedTotals.investments*2.2].map(v => Math.round(v)),
        moderate: [calculatedTotals.investments, calculatedTotals.investments*1.35, calculatedTotals.investments*1.8, calculatedTotals.investments*2.4, calculatedTotals.investments*3.2].map(v => Math.round(v)),
        aggressive: [calculatedTotals.investments, calculatedTotals.investments*1.45, calculatedTotals.investments*2.1, calculatedTotals.investments*3.0, calculatedTotals.investments*4.5].map(v => Math.round(v)),
        analysis: "### Wealth Projection Analysis\n\nBased on different investment strategies."
      },
      risk_assessment: analysisResult.risk_assessment || {
        level: "Moderate",
        factors: [
          {factor: "Income Stability", score: 7, status: "Good"},
          {factor: "Emergency Fund", score: 5, status: "Warning"},
          {factor: "Debt Burden", score: 6, status: "Warning"}
        ],
        analysis: "### Risk Analysis\n\nGeneral risk assessment based on financial profile."
      }
    };
    
    res.status(200).json({
      success: true,
      analysis: enrichedResult,
      metadata: {
        analyzedAt: new Date(),
        totals: calculatedTotals,
        monthlySavings: calculatedTotals.income - totalExpenses,
        hasChartData: true
      }
    });

  } catch (error) {
    console.error('=== ANALYSIS ERROR ===');
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
    
    res.status(500).json({ 
      error: 'Analysis failed',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// --- API: POST /api/advisor/chat ---
exports.chatWithAdvisor = async (req, res) => {
  console.log('=== Chat Request Received ===');
  
  try {
    const { message, chatHistory = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Valid message required' });
    }

    // Get authenticated user
    const userId = req.user?._id?.toString();
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const userData = getUserData(userId);
    userData.lastAccessed = Date.now();

    console.log('Message:', message);
    console.log('Has context:', !!userData.financialData);

    // Build conversation history from user's stored history
    const conversationHistory = userData.chatHistory.slice(-10).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    // Inject financial context if available
    let userMessage = message;
    if (userData.financialData) {
      const context = `[FINANCIAL CONTEXT: User has ${formatINR(userData.financialData.totals.income)} monthly income, ${formatINR(userData.financialData.totals.liabilities)} debt, ${formatINR(userData.financialData.totals.investments)} investments. Net position: ${formatINR(userData.financialData.totals.netPosition)}]`;
      userMessage = `${context}\n\nUser Question: ${message}\n\nProvide personalized advice based on their financial situation. Use Indian financial terms (₹, Lakhs, Crores). Format your response in clean Markdown with:\n- Use **bold** for key points\n- Use bullet points for lists\n- Use ### for section headers if needed\n- Use code blocks sparingly only for numbers/calculations\n- Be thorough and complete in your response\n\nMake it easy to read and well-structured.`;
    } else {
      userMessage = `User Question: ${message}\n\nProvide helpful financial advice for Indian households. Format your response in clean Markdown with:\n- Use **bold** for key points\n- Use bullet points for lists\n- Use ### for section headers if needed\n- Be thorough and complete in your response\n\nMake it easy to read and well-structured.`;
    }

    // Add current message to history
    conversationHistory.push({ role: 'user', content: userMessage });

    console.log('Sending to Perplexity...');
    const aiResponse = await callPerplexityAPI(conversationHistory, null, 3000);

    console.log('Chat response generated');
    
    // Store in chat history
    userData.chatHistory.push(
      { role: 'user', content: message, timestamp: new Date() },
      { role: 'assistant', content: aiResponse, timestamp: new Date() }
    );
    // Keep only last 20 messages (10 exchanges)
    if (userData.chatHistory.length > 20) {
      userData.chatHistory = userData.chatHistory.slice(-20);
    }
    
    res.status(200).json({
      success: true,
      response: aiResponse,
      hasContext: !!userData.financialData,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('=== CHAT ERROR ===');
    console.error('Error:', error.message);
    
    res.status(500).json({
      error: 'Chat failed',
      message: error.message
    });
  }
};

// --- API: GET /api/advisor/profile ---
exports.getFinancialProfile = async (req, res) => {
  try {
    // Get authenticated user
    const userId = req.user?._id?.toString();
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const userData = getUserData(userId);
    
    // Try to load from database if not in memory
    if (!userData.financialData) {
      const user = await User.findById(userId).select('financialProfile');
      if (user?.financialProfile?.lastAnalyzed) {
        return res.status(200).json({
          success: true,
          profile: user.financialProfile,
          source: 'database'
        });
      }
      
      return res.status(404).json({ 
        success: false,
        message: 'No financial profile found. Please run an analysis first.' 
      });
    }

    userData.lastAccessed = Date.now();
    res.status(200).json({
      success: true,
      profile: userData.financialData,
      source: 'memory'
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch profile',
      message: error.message 
    });
  }
};

// --- API: DELETE /api/advisor/chat/history ---
exports.clearChatHistory = async (req, res) => {
  try {
    // Get authenticated user
    const userId = req.user?._id?.toString();
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Clear stored data for this user
    userDataStore.delete(userId);
    console.log(`🧹 Cleared data for user: ${userId}`);
    
    res.status(200).json({
      success: true,
      message: 'Chat history and financial data cleared successfully'
    });
  } catch (error) {
    console.error('Clear error:', error);
    res.status(500).json({ 
      error: 'Failed to clear data',
      message: error.message 
    });
  }
};
