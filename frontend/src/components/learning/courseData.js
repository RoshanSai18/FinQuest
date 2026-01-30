// Level 1 Course Data - Money Basics
export const level1CourseData = {
  id: 0,
  title: 'MONEY BASICS',
  shortTitle: 'Money Basics',
  subtitle: 'Survival Mode',
  icon: '🟢',
  theme: 'Understand → Control → Stabilize',
  color: '#10b981',
  description: 'Help yourself stop living paycheck-to-paycheck and gain basic control over your money without fear or confusion. This level teaches you fundamental money management skills to achieve financial stability.',
  
  modules: [
    {
      title: 'Money Mindset Reset',
      chapters: [
        {
          title: 'What Money Really Is',
          duration: '8:30',
          videoUrl: '/videos/learning/level-1/module-1.mp4',
          notes: `
            <div class="space-y-6">
              <div>
                <h4 class="text-lg font-bold mb-3" style="color: #10b981">Understanding Money's True Nature</h4>
                <p class="mb-4">Most people think money is just something that comes and goes. But in reality, money represents much more than that:</p>
                <ul class="space-y-2 ml-4">
                  <li class="flex items-start gap-2">
                    <span style="color: #10b981" class="mt-1">•</span>
                    <div><strong>Money is stored effort</strong> - Every rupee represents time and energy you invested</div>
                  </li>
                  <li class="flex items-start gap-2">
                    <span style="color: #10b981" class="mt-1">•</span>
                    <div><strong>Money is future security</strong> - It protects you from unexpected situations</div>
                  </li>
                  <li class="flex items-start gap-2">
                    <span style="color: #10b981" class="mt-1">•</span>
                    <div><strong>Money is choice and freedom</strong> - It gives you options in life decisions</div>
                  </li>
                </ul>
              </div>

              <div class="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h5 class="text-red-400 font-bold mb-2">❌ Common Myth</h5>
                <p>If I earn more, my money problems will disappear.</p>
              </div>

              <div class="border rounded-lg p-4" style="background-color: rgba(16, 185, 129, 0.1); border-color: rgba(16, 185, 129, 0.3)">
                <h5 class="font-bold mb-2" style="color: #10b981">✅ Reality</h5>
                <p>Without control, more income only means bigger problems. You'll just spend more on bigger things.</p>
              </div>

              <div class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h5 class="text-blue-400 font-bold mb-2">💡 Key Takeaway</h5>
                <p class="text-lg"><strong>Money behavior matters more than money amount.</strong></p>
                <p class="text-sm mt-2 opacity-80">How you manage ₹10,000 is how you'll manage ₹1,00,000. Build good habits now.</p>
              </div>
            </div>
          `
        },
        {
          title: 'Income vs Wealth - The Reality Check',
          duration: '10:15',
          videoUrl: '/videos/learning/level-1/module-2.mp4',
          notes: `
            <div class="space-y-6">
              <h4 class="text-lg font-bold mb-3" style="color: #10b981">Understanding the Difference</h4>
              
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <h5 class="text-purple-400 font-bold mb-3">💼 Income</h5>
                  <ul class="space-y-2 text-sm">
                    <li>• What you earn every month</li>
                    <li>• Salary, stipend, freelance work</li>
                    <li>• <strong class="text-red-400">Stops if you stop working</strong></li>
                  </ul>
                </div>
                
                <div class="bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <h5 class="font-bold mb-3" style="color: #c8ff00">💰 Wealth</h5>
                  <ul class="space-y-2 text-sm">
                    <li>• What stays even when income stops</li>
                    <li>• Savings, investments, assets</li>
                    <li>• <strong style="color: #c8ff00">Provides security & freedom</strong></li>
                  </ul>
                </div>
              </div>

              <div class="bg-dark-100/50 rounded-lg p-4 border border-white/10">
                <h5 class="font-bold mb-3">📊 Real-Life Example</h5>
                <p class="mb-3">Two people earn ₹30,000/month:</p>
                <div class="space-y-3">
                  <div class="flex items-center gap-3">
                    <span class="text-2xl">😰</span>
                    <div>
                      <strong>Person A:</strong> Saves ₹0 → Always stressed about money, lives paycheck-to-paycheck
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="text-2xl">😊</span>
                    <div>
                      <strong>Person B:</strong> Saves ₹5,000 → Slowly becomes financially secure, has options
                    </div>
                  </div>
                </div>
              </div>

              <div class="space-y-2">
                <p class="flex items-center gap-2">
                  <span class="text-xl">📌</span>
                  <strong>High income ≠ being rich</strong>
                </p>
                <p class="flex items-center gap-2">
                  <span class="text-xl">📌</span>
                  <strong style="color: #c8ff00">High savings rate = real progress</strong>
                </p>
              </div>
            </div>
          `
        }
      ],
      quiz: {
        title: 'Module 1 Quiz: Money Mindset',
        questions: [
          {
            question: "What is the primary difference between income and wealth?",
            options: [
              "Income is what you earn, wealth is what you accumulate",
              "Income is passive, wealth is active",
              "Income is taxed, wealth is not",
              "There is no difference"
            ],
            correctAnswer: 0
          },
          {
            question: "Which mindset is most conducive to building wealth?",
            options: [
              "Scarcity mindset - save every penny",
              "Abundance mindset - focus on growth opportunities",
              "Neutral mindset - don't think about money",
              "Risk-averse mindset - avoid all investments"
            ],
            correctAnswer: 1
          },
          {
            question: "According to the wealth formula, wealth is created by:",
            options: [
              "Only increasing income",
              "Only reducing expenses",
              "Income minus expenses plus investment returns",
              "Taking on more debt"
            ],
            correctAnswer: 2
          },
          {
            question: "What should money be viewed as according to the money mindset principles?",
            options: [
              "The ultimate goal in life",
              "A tool to achieve your goals",
              "Something to hoard and never spend",
              "A necessary evil"
            ],
            correctAnswer: 1
          },
          {
            question: "Which of the following is an example of building wealth rather than just earning income?",
            options: [
              "Getting a higher salary at your job",
              "Working overtime for extra pay",
              "Investing in dividend-paying stocks",
              "Receiving a year-end bonus"
            ],
            correctAnswer: 2
          }
        ]
      }
    },
    
    {
      title: 'Spending & Budget Control',
      chapters: [
        {
          title: 'Where Money Secretly Leaks',
          duration: '12:20',
          videoUrl: '/videos/learning/level-1/module-3.mp4',
          notes: `
            <div class="space-y-6">
              <h4 class="text-lg font-bold mb-3" style="color: #10b981">Understanding Money Leaks</h4>
              <p class="mb-4">Money doesn't disappear suddenly. It leaks silently through small, repeated expenses.</p>

              <div class="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <h5 class="text-yellow-400 font-bold mb-3">🚨 Common Money Leaks</h5>
                <ul class="space-y-2">
                  <li class="flex items-start gap-2">
                    <span class="text-yellow-400">•</span>
                    <div><strong>Daily food delivery</strong> - Convenience costs add up fast</div>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-yellow-400">•</span>
                    <div><strong>Auto-renew subscriptions</strong> - Services you forgot you're paying for</div>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-yellow-400">•</span>
                    <div><strong>Small impulse buys</strong> - "Just ₹200" purchases multiple times a day</div>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-yellow-400">•</span>
                    <div><strong>"It's just ₹200" mindset</strong> - The most dangerous money belief</div>
                  </li>
                </ul>
              </div>

              <div class="bg-red-500/10 border border-red-500/30 rounded-lg p-5">
                <h5 class="text-red-400 font-bold mb-3">⚠️ The Hidden Math</h5>
                <div class="space-y-3 text-lg">
                  <p>₹200/day doesn't look dangerous...</p>
                  <p>But: <strong class="text-red-400">₹200/day = ₹6,000/month</strong></p>
                  <p>That's: <strong class="text-red-400">₹72,000/year</strong> 😐</p>
                  <p class="text-sm text-white/70 mt-4">Small expenses repeated daily create big damage monthly.</p>
                </div>
              </div>

              <div class="bg-primary/10 border border-primary/30 rounded-lg p-4">
                <h5 class="font-bold mb-2" style="color: #c8ff00">✅ Solution: Track & Redirect</h5>
                <ol class="space-y-2 ml-4">
                  <li>1. Write down every expense for 7 days</li>
                  <li>2. Identify your top 3 leaks</li>
                  <li>3. Cut or reduce one leak at a time</li>
                  <li>4. Redirect saved money to emergency fund</li>
                </ol>
              </div>
            </div>
          `
        },
        {
          title: 'Needs vs Wants vs Comforts',
          duration: '9:45',
          videoUrl: '/videos/learning/level-1/module-4.mp4',
          notes: `
            <div class="space-y-6">
              <h4 class="text-lg font-bold mb-3" style="color: #10b981">The Spending Hierarchy</h4>
              
              <div class="space-y-4">
                <div class="bg-green-500/10 border-l-4 border-green-500 p-4">
                  <h5 class="text-green-400 font-bold mb-2">✅ NEEDS (Priority #1)</h5>
                  <p class="text-sm text-white/70 mb-3">Things you must have to survive:</p>
                  <ul class="space-y-1 text-white/80">
                    <li>• Food (basic groceries)</li>
                    <li>• Rent/Housing</li>
                    <li>• Basic transport</li>
                    <li>• Utilities (electricity, water)</li>
                    <li>• Essential medicines</li>
                  </ul>
                </div>

                <div class="bg-yellow-500/10 border-l-4 border-yellow-500 p-4">
                  <h5 class="text-yellow-400 font-bold mb-2">⚡ WANTS (Priority #2)</h5>
                  <p class="text-sm text-white/70 mb-3">Things you enjoy but don't need to survive:</p>
                  <ul class="space-y-1 text-white/80">
                    <li>• Eating out at restaurants</li>
                    <li>• Online shopping (clothes, gadgets)</li>
                    <li>• OTT subscriptions (Netflix, Prime)</li>
                    <li>• Entertainment & hobbies</li>
                    <li>• Latest phone upgrades</li>
                  </ul>
                </div>

                <div class="bg-orange-500/10 border-l-4 border-orange-500 p-4">
                  <h5 class="text-orange-400 font-bold mb-2">🎯 COMFORTS (Priority #3)</h5>
                  <p class="text-sm text-white/70 mb-3">Things that make life easier but cost extra:</p>
                  <ul class="space-y-1 text-white/80">
                    <li>• Cab instead of bus/metro</li>
                    <li>• Branded products vs generic</li>
                    <li>• EMIs for lifestyle items</li>
                    <li>• Premium subscriptions</li>
                    <li>• Frequent food delivery</li>
                  </ul>
                </div>
              </div>

              <div class="bg-primary/10 border border-primary/30 rounded-lg p-5">
                <h5 class="font-bold mb-3 text-xl" style="color: #c8ff00">🧠 Rule for Beginners</h5>
                <p class="text-lg text-white/90">If money is tight → <strong>protect needs first</strong></p>
                <p class="text-sm text-white/60 mt-3">Once needs are secure, you can gradually add wants. Comforts come last.</p>
              </div>

              <div class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h5 class="text-blue-400 font-bold mb-2">💡 Pro Tip</h5>
                <p class="text-white/80">Before buying anything, ask: "Is this a need, want, or comfort?" Wait 24 hours before purchasing wants and comforts.</p>
              </div>
            </div>
          `
        },
        {
          title: 'Budgeting Without Spreadsheets',
          duration: '11:00',
          videoUrl: '/videos/learning/level-1/module-5.mp4',
          notes: `
            <div class="space-y-6">
              <h4 class="text-lg font-bold mb-3" style="color: #10b981">Simple Budgeting That Actually Works</h4>
              
              <div class="bg-primary/10 border border-primary/30 rounded-lg p-4">
                <p class="text-lg text-white/90 mb-2">Budgeting is <strong style="color: #c8ff00">NOT punishment</strong></p>
                <p class="text-lg text-white/90">It is <strong style="color: #c8ff00">giving your money a job</strong></p>
              </div>

              <div class="bg-dark-100/50 rounded-lg p-5 border border-white/10">
                <h5 class="font-bold mb-4 text-lg">The 50-30-20 Rule (Flexible Version)</h5>
                
                <div class="space-y-4">
                  <div class="flex items-start gap-4">
                    <div class="w-16 h-16 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <span class="text-2xl font-bold text-green-400">50%</span>
                    </div>
                    <div>
                      <h6 class="font-bold text-green-400 mb-1">NEEDS</h6>
                      <p class="text-sm text-white/70">Rent, food, transport, utilities, essentials</p>
                    </div>
                  </div>

                  <div class="flex items-start gap-4">
                    <div class="w-16 h-16 rounded-lg bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                      <span class="text-2xl font-bold text-yellow-400">30%</span>
                    </div>
                    <div>
                      <h6 class="font-bold text-yellow-400 mb-1">WANTS</h6>
                      <p class="text-sm text-white/70">Entertainment, dining out, hobbies, shopping</p>
                    </div>
                  </div>

                  <div class="flex items-start gap-4">
                    <div class="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span class="text-2xl font-bold" style="color: #c8ff00">20%</span>
                    </div>
                    <div>
                      <h6 class="font-bold mb-1" style="color: #c8ff00">SAVINGS</h6>
                      <p class="text-sm text-white/70">Emergency fund, investments, future goals</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h5 class="text-blue-400 font-bold mb-3">💡 For Low Income</h5>
                <p class="text-white/80 mb-2">Can't save 20%? That's okay!</p>
                <p class="text-white/80"><strong>Even 5-10% savings is a WIN</strong></p>
                <p class="text-sm text-white/60 mt-3">Start small. Consistency matters more than the amount.</p>
              </div>

              <div class="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h5 class="text-purple-400 font-bold mb-2">🎯 Remember</h5>
                <p class="text-lg text-white/90"><strong>Budgeting = Awareness, not restriction</strong></p>
                <p class="text-sm text-white/70 mt-2">You're not limiting yourself. You're directing your money intentionally.</p>
              </div>
            </div>
          `
        }
      ],
      quiz: {
        title: 'Module 2 Quiz: Spending Control',
        questions: [
          {
            question: "What is the primary difference between income and wealth?",
            options: [
              "Income is what you earn, wealth is what you accumulate",
              "Income is passive, wealth is active",
              "Income is taxed, wealth is not",
              "There is no difference"
            ],
            correctAnswer: 0
          },
          {
            question: "Which mindset is most conducive to building wealth?",
            options: [
              "Scarcity mindset - save every penny",
              "Abundance mindset - focus on growth opportunities",
              "Neutral mindset - don't think about money",
              "Risk-averse mindset - avoid all investments"
            ],
            correctAnswer: 1
          },
          {
            question: "According to the wealth formula, wealth is created by:",
            options: [
              "Only increasing income",
              "Only reducing expenses",
              "Income minus expenses plus investment returns",
              "Taking on more debt"
            ],
            correctAnswer: 2
          },
          {
            question: "What should money be viewed as according to the money mindset principles?",
            options: [
              "The ultimate goal in life",
              "A tool to achieve your goals",
              "Something to hoard and never spend",
              "A necessary evil"
            ],
            correctAnswer: 1
          },
          {
            question: "Which of the following is an example of building wealth rather than just earning income?",
            options: [
              "Getting a higher salary at your job",
              "Working overtime for extra pay",
              "Investing in dividend-paying stocks",
              "Receiving a year-end bonus"
            ],
            correctAnswer: 2
          }
        ]
      }
    },

    {
      title: 'Emergency Fund & Banking',
      chapters: [
        {
          title: 'Your Financial Shield - Emergency Fund',
          duration: '10:30',
          videoUrl: '/videos/learning/level-1/module-1.mp4',
          notes: `
            <div class="space-y-6">
              <h4 class="text-lg font-bold mb-3" style="color: #10b981">Building Your Safety Net</h4>

              <div class="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h5 class="text-red-400 font-bold mb-3">⚠️ What Counts as an Emergency?</h5>
                <ul class="space-y-2">
                  <li class="flex items-start gap-2">
                    <span class="text-red-400">•</span>
                    <div><strong>Medical bill</strong> - Unexpected health expenses</div>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-red-400">•</span>
                    <div><strong>Phone or laptop damage</strong> - Essential devices breakdown</div>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-red-400">•</span>
                    <div><strong>Job loss</strong> - Sudden income disruption</div>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-red-400">•</span>
                    <div><strong>Family crisis</strong> - Urgent family needs</div>
                  </li>
                </ul>
              </div>

              <div class="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <p class="text-lg text-white/90 mb-2">Without savings → People panic → Take bad loans</p>
                <p class="text-sm text-white/70">High-interest personal loans and credit card debt trap people for years.</p>
              </div>

              <div class="bg-primary/10 border border-primary/30 rounded-lg p-5">
                <h5 class="font-bold mb-4 text-xl" style="color: #c8ff00">🛡️ Starter Emergency Plan</h5>
                
                <div class="space-y-4">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 font-bold text-green-400">
                      1
                    </div>
                    <div>
                      <strong class="text-white">₹1,000 buffer</strong>
                      <p class="text-sm text-white/60">Your first milestone - covers small emergencies</p>
                    </div>
                  </div>

                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 font-bold text-yellow-400">
                      2
                    </div>
                    <div>
                      <strong class="text-white">₹5,000 - ₹10,000</strong>
                      <p class="text-sm text-white/60">Intermediate goal - handles most unexpected costs</p>
                    </div>
                  </div>

                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold" style="color: #c8ff00">
                      3
                    </div>
                    <div>
                      <strong class="text-white">1-3 months expenses</strong>
                      <p class="text-sm text-white/60">Full protection - survive job loss or major crisis</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-red-500/20 border-2 border-red-500 rounded-lg p-4">
                <h5 class="text-red-400 font-bold mb-2">🛑 EMERGENCY FUND IS NOT FOR:</h5>
                <ul class="space-y-1 text-white/80">
                  <li>❌ Shopping / New clothes</li>
                  <li>❌ Travel / Vacation</li>
                  <li>❌ Gadget upgrades</li>
                  <li>❌ "Good deals" or sales</li>
                </ul>
                <p class="mt-3 text-sm text-white/90">Keep this money <strong>separate and untouched</strong> unless it's a true emergency.</p>
              </div>
            </div>
          `
        },
        {
          title: 'Banking & Digital Money Basics',
          duration: '13:15',
          videoUrl: '/videos/learning/level-1/module-2.mp4',
          notes: `
            <div class="space-y-6">
              <h4 class="text-lg font-bold mb-3" style="color: #10b981">Smart Banking & Digital Safety</h4>

              <div class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h5 class="text-blue-400 font-bold mb-3">🏦 Savings Account Basics</h5>
                <ul class="space-y-2 text-white/80">
                  <li class="flex items-start gap-2">
                    <span class="text-blue-400">✓</span>
                    <div><strong>Keeps your money safe</strong> - FDIC insured up to ₹5 lakh</div>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-blue-400">✓</span>
                    <div><strong>Earns small interest</strong> - Usually 3-4% per year</div>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-blue-400">✓</span>
                    <div><strong>Allows UPI and card usage</strong> - Easy digital payments</div>
                  </li>
                </ul>
              </div>

              <div class="bg-dark-100/50 rounded-lg p-5 border border-white/10">
                <h5 class="font-bold mb-4 text-lg">💳 Debit Card vs Credit Card</h5>
                
                <div class="grid grid-cols-2 gap-4">
                  <div class="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                    <h6 class="text-green-400 font-bold mb-2">Debit Card ✅</h6>
                    <ul class="space-y-1 text-sm text-white/70">
                      <li>• Spends YOUR money</li>
                      <li>• Can't overspend</li>
                      <li>• No debt risk</li>
                      <li>• Safe for beginners</li>
                    </ul>
                  </div>

                  <div class="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <h6 class="text-red-400 font-bold mb-2">Credit Card ⚠️</h6>
                    <ul class="space-y-1 text-sm text-white/70">
                      <li>• Borrows bank's money</li>
                      <li>• Easy to overspend</li>
                      <li>• High interest (36-48%)</li>
                      <li>• Needs discipline</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="bg-red-500/20 border-2 border-red-500 rounded-lg p-5">
                <h5 class="text-red-400 font-bold mb-4 text-lg">🔒 Digital Safety Rules</h5>
                <div class="space-y-3">
                  <div class="flex items-start gap-3">
                    <span class="text-2xl">🚫</span>
                    <div>
                      <strong class="text-white">Never share OTP</strong>
                      <p class="text-sm text-white/70">No bank/company will EVER ask for your OTP. Not even on call.</p>
                    </div>
                  </div>

                  <div class="flex items-start gap-3">
                    <span class="text-2xl">⚠️</span>
                    <div>
                      <strong class="text-white">Avoid unknown loan apps</strong>
                      <p class="text-sm text-white/70">Many fake apps steal data or charge hidden fees. Stick to known banks.</p>
                    </div>
                  </div>

                  <div class="flex items-start gap-3">
                    <span class="text-2xl">📱</span>
                    <div>
                      <strong class="text-white">Check bank SMS regularly</strong>
                      <p class="text-sm text-white/70">Monitor all transactions. Report unknown charges immediately.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-primary/10 border border-primary/30 rounded-lg p-4">
                <h5 class="font-bold mb-2" style="color: #c8ff00">✅ Banking Best Practices</h5>
                <ul class="space-y-2 text-white/80">
                  <li>• Keep a zero-balance or low-fee account</li>
                  <li>• Enable SMS/email alerts for all transactions</li>
                  <li>• Use strong passwords and 2FA authentication</li>
                  <li>• Keep emergency contact numbers saved</li>
                  <li>• Download official bank apps only from Play Store/App Store</li>
                </ul>
              </div>
            </div>
          `
        }
      ],
      quiz: {
        title: 'Module 3 Quiz: Emergency Fund & Banking',
        questions: [
          {
            question: "What is the primary difference between income and wealth?",
            options: [
              "Income is what you earn, wealth is what you accumulate",
              "Income is passive, wealth is active",
              "Income is taxed, wealth is not",
              "There is no difference"
            ],
            correctAnswer: 0
          },
          {
            question: "Which mindset is most conducive to building wealth?",
            options: [
              "Scarcity mindset - save every penny",
              "Abundance mindset - focus on growth opportunities",
              "Neutral mindset - don't think about money",
              "Risk-averse mindset - avoid all investments"
            ],
            correctAnswer: 1
          },
          {
            question: "According to the wealth formula, wealth is created by:",
            options: [
              "Only increasing income",
              "Only reducing expenses",
              "Income minus expenses plus investment returns",
              "Taking on more debt"
            ],
            correctAnswer: 2
          },
          {
            question: "What should money be viewed as according to the money mindset principles?",
            options: [
              "The ultimate goal in life",
              "A tool to achieve your goals",
              "Something to hoard and never spend",
              "A necessary evil"
            ],
            correctAnswer: 1
          },
          {
            question: "Which of the following is an example of building wealth rather than just earning income?",
            options: [
              "Getting a higher salary at your job",
              "Working overtime for extra pay",
              "Investing in dividend-paying stocks",
              "Receiving a year-end bonus"
            ],
            correctAnswer: 2
          }
        ]
      }
    }
  ]
};

// Level 2: DEBT & CREDIT Course Data
export const level2CourseData = {
  id: 1,
  title: 'DEBT & CREDIT',
  shortTitle: 'Debt & Credit',
  subtitle: 'Protection Mode',
  icon: '🔵',
  theme: 'Escape → Protect → Rebuild',
  color: '#3b82f6',
  description: 'Break free from debt cycles and build a healthy credit foundation. Learn to manage loans wisely and avoid financial traps.',
  
  modules: [
    {
      title: 'Understanding Debt',
      chapters: [
        {
          title: 'Good Debt vs Bad Debt',
          duration: '8:30',
          videoUrl: '/videos/learning/level-1/module-1.mp4',
          notes: `<div class="space-y-6"><h4 class="text-lg font-bold mb-3" style="color: #3b82f6">Understanding Debt Types</h4><p class="mb-4">Not all debt is bad. Learn to distinguish between debt that builds wealth and debt that destroys it.</p></div>`
        },
        {
          title: 'Credit Score Essentials',
          duration: '10:15',
          videoUrl: '/videos/learning/level-1/module-2.mp4',
          notes: `<div class="space-y-6"><h4 class="text-lg font-bold mb-3" style="color: #3b82f6">Your Financial Reputation</h4><p class="mb-4">Your credit score affects loan approvals, interest rates, and even job opportunities.</p></div>`
        }
      ],
      quiz: {
        title: 'Module 1 Quiz: Debt Basics',
        questions: [
          {
            question: "What is the primary difference between income and wealth?",
            options: [
              "Income is what you earn, wealth is what you accumulate",
              "Income is passive, wealth is active",
              "Income is taxed, wealth is not",
              "There is no difference"
            ],
            correctAnswer: 0
          },
          {
            question: "Which mindset is most conducive to building wealth?",
            options: [
              "Scarcity mindset - save every penny",
              "Abundance mindset - focus on growth opportunities",
              "Neutral mindset - don't think about money",
              "Risk-averse mindset - avoid all investments"
            ],
            correctAnswer: 1
          },
          {
            question: "According to the wealth formula, wealth is created by:",
            options: [
              "Only increasing income",
              "Only reducing expenses",
              "Income minus expenses plus investment returns",
              "Taking on more debt"
            ],
            correctAnswer: 2
          },
          {
            question: "What should money be viewed as according to the money mindset principles?",
            options: [
              "The ultimate goal in life",
              "A tool to achieve your goals",
              "Something to hoard and never spend",
              "A necessary evil"
            ],
            correctAnswer: 1
          },
          {
            question: "Which of the following is an example of building wealth rather than just earning income?",
            options: [
              "Getting a higher salary at your job",
              "Working overtime for extra pay",
              "Investing in dividend-paying stocks",
              "Receiving a year-end bonus"
            ],
            correctAnswer: 2
          }
        ]
      }
    },
    {
      title: 'Credit Card Mastery',
      chapters: [
        {
          title: 'Credit Card Benefits',
          duration: '12:20',
          videoUrl: '/videos/learning/level-1/module-3.mp4',
          notes: `<div class="space-y-6"><h4 class="text-lg font-bold mb-3" style="color: #3b82f6">Using Credit Cards Wisely</h4><p class="mb-4">Learn how to use credit cards to your advantage without falling into debt traps.</p></div>`
        },
        {
          title: 'Avoiding Credit Traps',
          duration: '9:45',
          videoUrl: '/videos/learning/level-1/module-4.mp4',
          notes: `<div class="space-y-6"><h4 class="text-lg font-bold mb-3" style="color: #3b82f6">Credit Card Pitfalls</h4><p class="mb-4">Understand the hidden costs and traps that credit card companies use.</p></div>`
        }
      ],
      quiz: {
        title: 'Module 2 Quiz: Credit Cards',
        questions: [
          {
            question: "What is the primary difference between income and wealth?",
            options: [
              "Income is what you earn, wealth is what you accumulate",
              "Income is passive, wealth is active",
              "Income is taxed, wealth is not",
              "There is no difference"
            ],
            correctAnswer: 0
          },
          {
            question: "Which mindset is most conducive to building wealth?",
            options: [
              "Scarcity mindset - save every penny",
              "Abundance mindset - focus on growth opportunities",
              "Neutral mindset - don't think about money",
              "Risk-averse mindset - avoid all investments"
            ],
            correctAnswer: 1
          },
          {
            question: "According to the wealth formula, wealth is created by:",
            options: [
              "Only increasing income",
              "Only reducing expenses",
              "Income minus expenses plus investment returns",
              "Taking on more debt"
            ],
            correctAnswer: 2
          },
          {
            question: "What should money be viewed as according to the money mindset principles?",
            options: [
              "The ultimate goal in life",
              "A tool to achieve your goals",
              "Something to hoard and never spend",
              "A necessary evil"
            ],
            correctAnswer: 1
          },
          {
            question: "Which of the following is an example of building wealth rather than just earning income?",
            options: [
              "Getting a higher salary at your job",
              "Working overtime for extra pay",
              "Investing in dividend-paying stocks",
              "Receiving a year-end bonus"
            ],
            correctAnswer: 2
          }
        ]
      }
    },
    {
      title: 'Loan Management',
      chapters: [
        {
          title: 'Understanding EMIs',
          duration: '10:30',
          videoUrl: '/videos/learning/level-1/module-1.mp4',
          notes: `<div class="space-y-6"><h4 class="text-lg font-bold mb-3" style="color: #3b82f6">EMI Calculation</h4><p class="mb-4">Learn how EMIs are calculated and how to choose the right loan terms.</p></div>`
        },
        {
          title: 'Debt Payoff Strategies',
          duration: '13:15',
          videoUrl: '/videos/learning/level-1/module-2.mp4',
          notes: `<div class="space-y-6"><h4 class="text-lg font-bold mb-3" style="color: #3b82f6">Becoming Debt-Free</h4><p class="mb-4">Proven strategies to pay off debt faster: snowball vs avalanche methods.</p></div>`
        }
      ],
      quiz: {
        title: 'Module 3 Quiz: Loan Management',
        questions: [
          {
            question: "What is the primary difference between income and wealth?",
            options: [
              "Income is what you earn, wealth is what you accumulate",
              "Income is passive, wealth is active",
              "Income is taxed, wealth is not",
              "There is no difference"
            ],
            correctAnswer: 0
          },
          {
            question: "Which mindset is most conducive to building wealth?",
            options: [
              "Scarcity mindset - save every penny",
              "Abundance mindset - focus on growth opportunities",
              "Neutral mindset - don't think about money",
              "Risk-averse mindset - avoid all investments"
            ],
            correctAnswer: 1
          },
          {
            question: "According to the wealth formula, wealth is created by:",
            options: [
              "Only increasing income",
              "Only reducing expenses",
              "Income minus expenses plus investment returns",
              "Taking on more debt"
            ],
            correctAnswer: 2
          },
          {
            question: "What should money be viewed as according to the money mindset principles?",
            options: [
              "The ultimate goal in life",
              "A tool to achieve your goals",
              "Something to hoard and never spend",
              "A necessary evil"
            ],
            correctAnswer: 1
          },
          {
            question: "Which of the following is an example of building wealth rather than just earning income?",
            options: [
              "Getting a higher salary at your job",
              "Working overtime for extra pay",
              "Investing in dividend-paying stocks",
              "Receiving a year-end bonus"
            ],
            correctAnswer: 2
          }
        ]
      }
    }
  ]
};

// Level 3: PROTECTION & SECURITY Course Data
export const level3CourseData = {
  id: 2,
  title: 'PROTECTION & SECURITY',
  shortTitle: 'Protection',
  subtitle: 'Shield Mode',
  icon: '🟣',
  theme: 'Protect → Insure → Secure',
  color: '#a855f7',
  description: 'Build a comprehensive financial safety net with insurance and protection strategies.',
  
  modules: [
    {
      title: 'Insurance Basics',
      chapters: [
        {
          title: 'Why Insurance Matters',
          duration: '8:30',
          videoUrl: '/videos/learning/level-1/module-1.mp4',
          notes: `<div class="space-y-6"><h4 class="text-lg font-bold mb-3" style="color: #a855f7">Financial Protection</h4><p class="mb-4">Insurance protects your wealth from unexpected catastrophic events.</p></div>`
        },
        {
          title: 'Types of Insurance',
          duration: '10:15',
          videoUrl: '/videos/learning/level-1/module-2.mp4',
          notes: `<div class="space-y-6"><h4 class="text-lg font-bold mb-3" style="color: #a855f7">Coverage Options</h4><p class="mb-4">Health, life, and property insurance - choosing what you need.</p></div>`
        }
      ],
      quiz: {
        title: 'Module 1 Quiz: Insurance',
        questions: [
          {
            question: "What is the primary difference between income and wealth?",
            options: [
              "Income is what you earn, wealth is what you accumulate",
              "Income is passive, wealth is active",
              "Income is taxed, wealth is not",
              "There is no difference"
            ],
            correctAnswer: 0
          },
          {
            question: "Which mindset is most conducive to building wealth?",
            options: [
              "Scarcity mindset - save every penny",
              "Abundance mindset - focus on growth opportunities",
              "Neutral mindset - don't think about money",
              "Risk-averse mindset - avoid all investments"
            ],
            correctAnswer: 1
          },
          {
            question: "According to the wealth formula, wealth is created by:",
            options: [
              "Only increasing income",
              "Only reducing expenses",
              "Income minus expenses plus investment returns",
              "Taking on more debt"
            ],
            correctAnswer: 2
          },
          {
            question: "What should money be viewed as according to the money mindset principles?",
            options: [
              "The ultimate goal in life",
              "A tool to achieve your goals",
              "Something to hoard and never spend",
              "A necessary evil"
            ],
            correctAnswer: 1
          },
          {
            question: "Which of the following is an example of building wealth rather than just earning income?",
            options: [
              "Getting a higher salary at your job",
              "Working overtime for extra pay",
              "Investing in dividend-paying stocks",
              "Receiving a year-end bonus"
            ],
            correctAnswer: 2
          }
        ]
      }
    },
    {
      title: 'Estate Planning',
      chapters: [
        {
          title: 'Wills and Nominations',
          duration: '12:20',
          videoUrl: '/videos/learning/level-1/module-3.mp4',
          notes: `<div class="space-y-6"><h4 class="text-lg font-bold mb-3" style="color: #a855f7">Securing Your Legacy</h4><p class="mb-4">Ensure your assets are distributed according to your wishes.</p></div>`
        },
        {
          title: 'Power of Attorney',
          duration: '9:45',
          videoUrl: '/videos/learning/level-1/module-4.mp4',
          notes: `<div class="space-y-6"><h4 class="text-lg font-bold mb-3" style="color: #a855f7">Legal Protection</h4><p class="mb-4">Understand how to protect your interests through legal instruments.</p></div>`
        }
      ],
      quiz: {
        title: 'Module 2 Quiz: Estate Planning',
        questions: [
          {
            question: "What is the primary difference between income and wealth?",
            options: [
              "Income is what you earn, wealth is what you accumulate",
              "Income is passive, wealth is active",
              "Income is taxed, wealth is not",
              "There is no difference"
            ],
            correctAnswer: 0
          },
          {
            question: "Which mindset is most conducive to building wealth?",
            options: [
              "Scarcity mindset - save every penny",
              "Abundance mindset - focus on growth opportunities",
              "Neutral mindset - don't think about money",
              "Risk-averse mindset - avoid all investments"
            ],
            correctAnswer: 1
          },
          {
            question: "According to the wealth formula, wealth is created by:",
            options: [
              "Only increasing income",
              "Only reducing expenses",
              "Income minus expenses plus investment returns",
              "Taking on more debt"
            ],
            correctAnswer: 2
          },
          {
            question: "What should money be viewed as according to the money mindset principles?",
            options: [
              "The ultimate goal in life",
              "A tool to achieve your goals",
              "Something to hoard and never spend",
              "A necessary evil"
            ],
            correctAnswer: 1
          },
          {
            question: "Which of the following is an example of building wealth rather than just earning income?",
            options: [
              "Getting a higher salary at your job",
              "Working overtime for extra pay",
              "Investing in dividend-paying stocks",
              "Receiving a year-end bonus"
            ],
            correctAnswer: 2
          }
        ]
      }
    },
    {
      title: 'Fraud Prevention',
      chapters: [
        {
          title: 'Common Financial Scams',
          duration: '10:30',
          videoUrl: '/videos/learning/level-1/module-1.mp4',
          notes: `<div class="space-y-6"><h4 class="text-lg font-bold mb-3" style="color: #a855f7">Spotting Scams</h4><p class="mb-4">Learn to recognize and avoid common financial fraud schemes.</p></div>`
        },
        {
          title: 'Identity Protection',
          duration: '13:15',
          videoUrl: '/videos/learning/level-1/module-2.mp4',
          notes: `<div class="space-y-6"><h4 class="text-lg font-bold mb-3" style="color: #a855f7">Securing Your Identity</h4><p class="mb-4">Best practices for protecting your personal and financial information.</p></div>`
        }
      ],
      quiz: {
        title: 'Module 3 Quiz: Fraud Prevention',
        questions: [
          {
            question: "What is the primary difference between income and wealth?",
            options: [
              "Income is what you earn, wealth is what you accumulate",
              "Income is passive, wealth is active",
              "Income is taxed, wealth is not",
              "There is no difference"
            ],
            correctAnswer: 0
          },
          {
            question: "Which mindset is most conducive to building wealth?",
            options: [
              "Scarcity mindset - save every penny",
              "Abundance mindset - focus on growth opportunities",
              "Neutral mindset - don't think about money",
              "Risk-averse mindset - avoid all investments"
            ],
            correctAnswer: 1
          },
          {
            question: "According to the wealth formula, wealth is created by:",
            options: [
              "Only increasing income",
              "Only reducing expenses",
              "Income minus expenses plus investment returns",
              "Taking on more debt"
            ],
            correctAnswer: 2
          },
          {
            question: "What should money be viewed as according to the money mindset principles?",
            options: [
              "The ultimate goal in life",
              "A tool to achieve your goals",
              "Something to hoard and never spend",
              "A necessary evil"
            ],
            correctAnswer: 1
          },
          {
            question: "Which of the following is an example of building wealth rather than just earning income?",
            options: [
              "Getting a higher salary at your job",
              "Working overtime for extra pay",
              "Investing in dividend-paying stocks",
              "Receiving a year-end bonus"
            ],
            correctAnswer: 2
          }
        ]
      }
    }
  ]
};

// Level 4: RISK & WEALTH GROWTH Course Data
export const level4CourseData = {
  id: 3,
  title: 'RISK & WEALTH GROWTH',
  shortTitle: 'Wealth Growth',
  subtitle: 'Growth Mode',
  icon: '🟠',
  theme: 'Invest → Grow → Thrive',
  color: '#f97316',
  description: 'Master investing strategies to build long-term wealth through smart asset allocation and risk management.',
  
  modules: [
    {
      title: 'Investment Basics',
      chapters: [
        {
          title: 'Understanding Risk & Return',
          duration: '8:30',
          videoUrl: '/videos/learning/level-1/module-1.mp4',
          notes: `<div class="space-y-6"><h4 class="text-lg font-bold mb-3" style="color: #f97316">Risk-Return Tradeoff</h4><p class="mb-4">Higher returns come with higher risk. Learn to balance both for your goals.</p></div>`
        },
        {
          title: 'Asset Classes Explained',
          duration: '10:15',
          videoUrl: '/videos/learning/level-1/module-2.mp4',
          notes: `<div class="space-y-6"><h4 class="text-lg font-bold mb-3" style="color: #f97316">Investment Options</h4><p class="mb-4">Stocks, bonds, mutual funds, real estate - understanding your choices.</p></div>`
        }
      ],
      quiz: {
        title: 'Module 1 Quiz: Investment Basics',
        questions: [
          {
            question: "What is the primary difference between income and wealth?",
            options: [
              "Income is what you earn, wealth is what you accumulate",
              "Income is passive, wealth is active",
              "Income is taxed, wealth is not",
              "There is no difference"
            ],
            correctAnswer: 0
          },
          {
            question: "Which mindset is most conducive to building wealth?",
            options: [
              "Scarcity mindset - save every penny",
              "Abundance mindset - focus on growth opportunities",
              "Neutral mindset - don't think about money",
              "Risk-averse mindset - avoid all investments"
            ],
            correctAnswer: 1
          },
          {
            question: "According to the wealth formula, wealth is created by:",
            options: [
              "Only increasing income",
              "Only reducing expenses",
              "Income minus expenses plus investment returns",
              "Taking on more debt"
            ],
            correctAnswer: 2
          },
          {
            question: "What should money be viewed as according to the money mindset principles?",
            options: [
              "The ultimate goal in life",
              "A tool to achieve your goals",
              "Something to hoard and never spend",
              "A necessary evil"
            ],
            correctAnswer: 1
          },
          {
            question: "Which of the following is an example of building wealth rather than just earning income?",
            options: [
              "Getting a higher salary at your job",
              "Working overtime for extra pay",
              "Investing in dividend-paying stocks",
              "Receiving a year-end bonus"
            ],
            correctAnswer: 2
          }
        ]
      }
    },
    {
      title: 'Portfolio Building',
      chapters: [
        {
          title: 'Diversification Strategies',
          duration: '12:20',
          videoUrl: '/videos/learning/level-1/module-3.mp4',
          notes: `<div class="space-y-6"><h4 class="text-lg font-bold mb-3" style="color: #f97316">Don't Put All Eggs in One Basket</h4><p class="mb-4">Learn how to spread risk across different investments.</p></div>`
        },
        {
          title: 'Rebalancing Your Portfolio',
          duration: '9:45',
          videoUrl: '/videos/learning/level-1/module-4.mp4',
          notes: `<div class="space-y-6"><h4 class="text-lg font-bold mb-3" style="color: #f97316">Maintaining Balance</h4><p class="mb-4">When and how to adjust your investment allocations.</p></div>`
        }
      ],
      quiz: {
        title: 'Module 2 Quiz: Portfolio Management',
        questions: [
          {
            question: "What is the primary difference between income and wealth?",
            options: [
              "Income is what you earn, wealth is what you accumulate",
              "Income is passive, wealth is active",
              "Income is taxed, wealth is not",
              "There is no difference"
            ],
            correctAnswer: 0
          },
          {
            question: "Which mindset is most conducive to building wealth?",
            options: [
              "Scarcity mindset - save every penny",
              "Abundance mindset - focus on growth opportunities",
              "Neutral mindset - don't think about money",
              "Risk-averse mindset - avoid all investments"
            ],
            correctAnswer: 1
          },
          {
            question: "According to the wealth formula, wealth is created by:",
            options: [
              "Only increasing income",
              "Only reducing expenses",
              "Income minus expenses plus investment returns",
              "Taking on more debt"
            ],
            correctAnswer: 2
          },
          {
            question: "What should money be viewed as according to the money mindset principles?",
            options: [
              "The ultimate goal in life",
              "A tool to achieve your goals",
              "Something to hoard and never spend",
              "A necessary evil"
            ],
            correctAnswer: 1
          },
          {
            question: "Which of the following is an example of building wealth rather than just earning income?",
            options: [
              "Getting a higher salary at your job",
              "Working overtime for extra pay",
              "Investing in dividend-paying stocks",
              "Receiving a year-end bonus"
            ],
            correctAnswer: 2
          }
        ]
      }
    },
    {
      title: 'Advanced Strategies',
      chapters: [
        {
          title: 'Tax-Advantaged Investing',
          duration: '10:30',
          videoUrl: '/videos/learning/level-1/module-1.mp4',
          notes: `<div class="space-y-6"><h4 class="text-lg font-bold mb-3" style="color: #f97316">Tax-Efficient Growth</h4><p class="mb-4">Maximize returns by minimizing taxes through smart investment choices.</p></div>`
        },
        {
          title: 'Passive Income Streams',
          duration: '13:15',
          videoUrl: '/videos/learning/level-1/module-2.mp4',
          notes: `<div class="space-y-6"><h4 class="text-lg font-bold mb-3" style="color: #f97316">Money Working For You</h4><p class="mb-4">Building multiple income streams for financial freedom.</p></div>`
        }
      ],
      quiz: {
        title: 'Module 3 Quiz: Advanced Investing',
        questions: [
          {
            question: "What is the primary difference between income and wealth?",
            options: [
              "Income is what you earn, wealth is what you accumulate",
              "Income is passive, wealth is active",
              "Income is taxed, wealth is not",
              "There is no difference"
            ],
            correctAnswer: 0
          },
          {
            question: "Which mindset is most conducive to building wealth?",
            options: [
              "Scarcity mindset - save every penny",
              "Abundance mindset - focus on growth opportunities",
              "Neutral mindset - don't think about money",
              "Risk-averse mindset - avoid all investments"
            ],
            correctAnswer: 1
          },
          {
            question: "According to the wealth formula, wealth is created by:",
            options: [
              "Only increasing income",
              "Only reducing expenses",
              "Income minus expenses plus investment returns",
              "Taking on more debt"
            ],
            correctAnswer: 2
          },
          {
            question: "What should money be viewed as according to the money mindset principles?",
            options: [
              "The ultimate goal in life",
              "A tool to achieve your goals",
              "Something to hoard and never spend",
              "A necessary evil"
            ],
            correctAnswer: 1
          },
          {
            question: "Which of the following is an example of building wealth rather than just earning income?",
            options: [
              "Getting a higher salary at your job",
              "Working overtime for extra pay",
              "Investing in dividend-paying stocks",
              "Receiving a year-end bonus"
            ],
            correctAnswer: 2
          }
        ]
      }
    }
  ]
};
