import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GlowingEffect } from '../components/GlowingEffect';
import { 
    TrendingUp, 
    ShieldAlert, 
    Landmark,
    ArrowUpRight,
    ArrowDownRight,
    FastForward,
    Calendar,
    Gem, 
    PieChart as PieIcon,
    Zap,
    AlertCircle,
    Activity as ActivityIcon,
    ShieldCheck
} from 'lucide-react';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area,
    ReferenceLine 
} from 'recharts';

const WealthDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [projectionYear, setProjectionYear] = useState(5);
    const [financials, setFinancials] = useState({
        totalInvested: 0,
        totalDebt: 0,
        netWorth: 0,
        portfolio: [],
        monthlyData: [],
        rawInvestments: [],
        rawDebts: [],
        coverageRatio: 0,
        healthLevel: 'Robust',
        diversificationWarning: null
    });

    const COLORS = ['#bef264', '#84cc16', '#a3e635', '#4d7c0f', '#ecfccb', '#ef4444']; 

    useEffect(() => {
        calculateWealthData();
    }, []);

    const calculateWealthData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/expenses', { withCredentials: true });
            const data = res.data.data;

            const investments = data.filter(item => item.classification === 'Investments');
            const debts = data.filter(item => item.classification === 'Debt');

            const totalInvested = investments.reduce((acc, curr) => acc + curr.amount, 0);
            const totalDebt = debts.reduce((acc, curr) => acc + curr.amount, 0);
            const netWorth = totalInvested - totalDebt;

            const portfolioMap = {};
            investments.forEach(inv => {
                const type = inv.subCategory || 'Other';
                if (!portfolioMap[type]) portfolioMap[type] = 0;
                portfolioMap[type] += inv.amount;
            });
            
            const portfolio = Object.keys(portfolioMap).map(key => ({
                name: key,
                value: portfolioMap[key],
                type: 'Asset'
            }));

            if (totalDebt > 0) {
                portfolio.push({
                    name: 'Total Debt',
                    value: totalDebt,
                    type: 'Liability'
                });
            }

            const monthlyMap = {};
            data.forEach(item => {
                const month = new Date(item.date).toLocaleString('default', { month: 'short' });
                if (!monthlyMap[month]) monthlyMap[month] = { name: month, Expenses: 0, Investments: 0, Debt: 0 };
                
                if (item.classification === 'Investments') {
                    monthlyMap[month].Investments += item.amount;
                } else if (item.classification === 'Debt') {
                    monthlyMap[month].Debt += item.amount;
                } else {
                    monthlyMap[month].Expenses += item.amount;
                }
            });

            const coverageRatio = totalDebt > 0 ? (totalInvested / totalDebt) : 10;
            let healthLevel = 'Fragile';
            if (coverageRatio >= 3) healthLevel = 'Robust';
            else if (coverageRatio >= 1.2) healthLevel = 'Vulnerable';

            let diversificationWarning = null;
            portfolio.filter(p => p.type === 'Asset').forEach(asset => {
                const concentration = asset.value / totalInvested;
                if (concentration > 0.6) {
                    diversificationWarning = `Over-reliance detected in ${asset.name} (${Math.round(concentration * 100)}%). Consider diversifying to lower risk.`;
                }
            });

            setFinancials({
                totalInvested,
                totalDebt,
                netWorth,
                portfolio,
                monthlyData: Object.values(monthlyMap),
                rawInvestments: investments,
                rawDebts: debts,
                coverageRatio,
                healthLevel,
                diversificationWarning
            });
            setLoading(false);

        } catch (err) {
            console.error("Error calculating wealth:", err);
            setLoading(false);
        }
    };

    const getFutureValue = (items, years, isDebt = false) => {
        return items.reduce((acc, curr) => {
            let rate = isDebt ? (curr.interestRate || 12) : (curr.expectedReturn || 10);
            return acc + (curr.amount * Math.pow((1 + rate / 100), years));
        }, 0);
    };

    const projectionData = Array.from({ length: 10 }, (_, i) => {
        const year = i + 1;
        const wealth = getFutureValue(financials.rawInvestments, year);
        const debt = getFutureValue(financials.rawDebts, year, true);
        return {
            year: `Year ${year}`,
            Wealth: Math.round(wealth),
            Debt: Math.round(debt),
            NetWorth: Math.round(wealth - debt)
        };
    });

    const futureWealth = getFutureValue(financials.rawInvestments, projectionYear);
    const futureDebt = getFutureValue(financials.rawDebts, projectionYear, true);
    const futureNetWorth = futureWealth - futureDebt;

    const getHealthColor = () => {
        if (financials.healthLevel === 'Robust') return '#84cc16';
        if (financials.healthLevel === 'Vulnerable') return '#facc15';
        return '#ef4444';
    };

    if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-lime-400 font-mono animate-pulse tracking-widest">LOADING MATRIX...</div>;

    return (
        <div className="min-h-screen bg-black text-lime-50 p-4 md:p-8 font-sans pb-24 overflow-x-hidden">
            
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-lime-500/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-lime-600/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto space-y-12 relative z-10">
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 relative p-8 rounded-[2rem] bg-gray-950/80 border border-gray-800 overflow-hidden shadow-2xl">
                        <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
                        
                        <div className="relative z-10">
                            <div className="absolute top-0 right-0 p-6 opacity-40">
                                <Gem className="w-32 h-32 text-lime-400 drop-shadow-[0_0_30px_rgba(132,204,22,0.8)]" strokeWidth={1} />
                            </div>

                            <h2 className="text-lime-400 font-bold uppercase tracking-[0.3em] text-xs mb-4 flex items-center gap-2">
                                <Zap size={14} className="fill-lime-400" /> Total Net Worth
                            </h2>
                            <div className="flex items-baseline gap-2 mb-8">
                                <span className="text-3xl text-lime-700 font-bold">₹</span>
                                <h1 className={`text-7xl md:text-8xl font-black tracking-tighter drop-shadow-2xl ${financials.netWorth >= 0 ? 'text-lime-400' : 'text-red-500'}`}>
                                    {financials.netWorth.toLocaleString()}
                                </h1>
                            </div>
                            
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-black/50 border border-lime-500/30 backdrop-blur-md">
                                    <div className="p-2 bg-lime-500/20 rounded-lg text-lime-400"><ArrowUpRight size={18}/></div>
                                    <div>
                                        <p className="text-[10px] text-lime-600 font-black uppercase tracking-wider">Assets</p>
                                        <p className="text-lg font-bold text-white">₹{financials.totalInvested.toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-black/50 border border-red-500/30 backdrop-blur-md">
                                    <div className="p-2 bg-red-900/40 rounded-lg text-red-500"><ArrowDownRight size={18}/></div>
                                    <div>
                                        <p className="text-[10px] text-lime-600 font-black uppercase tracking-wider">Liabilities</p>
                                        <p className="text-lg font-bold text-white">₹{financials.totalDebt.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex-1 relative bg-gray-950/80 p-6 rounded-[2rem] border border-gray-800 overflow-hidden">
                            <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
                            <div className="flex justify-between items-start z-10 relative">
                                <div>
                                    <p className="text-lime-400 font-bold text-xs uppercase tracking-widest mb-1">Investments</p>
                                    <h3 className="text-3xl font-black text-white">₹{financials.totalInvested.toLocaleString()}</h3>
                                </div>
                                <Landmark className="text-lime-500 opacity-50 transition-opacity" size={28} />
                            </div>
                        </div>

                        <div className="flex-1 relative bg-gray-950/80 p-6 rounded-[2rem] border border-gray-800 overflow-hidden">
                            <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
                            <div className="flex justify-between items-start z-10 relative">
                                <div>
                                    <p className="text-lime-400 font-bold text-xs uppercase tracking-widest mb-1">Active Debt</p>
                                    <h3 className="text-3xl font-black text-white">₹{financials.totalDebt.toLocaleString()}</h3>
                                </div>
                                <ShieldAlert className="text-lime-500 opacity-50 transition-opacity" size={28} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1 relative bg-gray-950/80 p-6 rounded-[2rem] border border-gray-800 overflow-hidden shadow-xl h-full flex flex-col justify-center">
                        <GlowingEffect spread={30} glow={true} color={getHealthColor()} disabled={false} proximity={64} inactiveZone={0.01} />
                        <div className="relative z-10 text-center space-y-2">
                             <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Coverage Ratio</p>
                             <div className="text-5xl font-black" style={{ color: getHealthColor() }}>
                                {financials.coverageRatio.toFixed(1)}x
                             </div>
                             <div className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter" style={{ backgroundColor: `${getHealthColor()}20`, color: getHealthColor(), border: `1px solid ${getHealthColor()}40` }}>
                                {financials.healthLevel}
                             </div>
                        </div>
                    </div>

                    <div className="md:col-span-3 relative bg-gray-950/80 p-6 rounded-[2rem] border border-gray-800 overflow-hidden shadow-xl min-h-[140px] flex flex-col justify-center">
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                            <div className="p-4 rounded-2xl bg-black/40 border border-gray-800">
                                {financials.healthLevel === 'Robust' ? <ShieldCheck size={40} className="text-lime-500" /> : <AlertCircle size={40} className="text-red-500" />}
                            </div>
                            <div className="flex-1 space-y-1">
                                <h3 className="text-lg font-black text-white flex items-center gap-2">
                                    Financial Advisory Core 
                                    <ActivityIcon size={16} className="text-lime-500 animate-pulse" />
                                </h3>
                                <p className="text-sm text-gray-400 font-medium">
                                    {financials.diversificationWarning || "Your portfolio is well-balanced across asset classes. Maintain this ratio to absorb market shocks."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative bg-gray-950/80 p-8 rounded-[2.5rem] border border-gray-800 overflow-hidden">
                    <GlowingEffect spread={60} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
                    
                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                            <div>
                                <h2 className="text-3xl font-black text-white flex items-center gap-3">
                                    <FastForward className="text-lime-400" />
                                    <span className="text-lime-400">Financial Time Machine</span>
                                </h2>
                                <p className="text-lime-700 mt-2 text-sm max-w-md">Real-time future projection engine.</p>
                            </div>

                            <div className="flex items-center gap-6 bg-black/50 p-5 rounded-2xl border border-lime-500/30 backdrop-blur-md">
                                <Calendar className="text-lime-500" size={24} />
                                <div className="flex flex-col w-64">
                                    <div className="flex justify-between text-xs font-bold text-lime-700 mb-3">
                                        <span>Now</span>
                                        <span className="text-black bg-lime-500 px-2 py-0.5 rounded shadow-[0_0_10px_#84cc16]">+{projectionYear} Years</span>
                                        <span>10 Years</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="1" 
                                        max="10" 
                                        value={projectionYear} 
                                        onChange={(e) => setProjectionYear(parseInt(e.target.value))}
                                        className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-lime-500 hover:accent-lime-400 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            <div className="p-6 rounded-2xl bg-black/40 border border-lime-500/30 backdrop-blur-sm">
                                <p className="text-[10px] text-lime-600 font-bold uppercase tracking-widest mb-2">Projected Assets</p>
                                <p className="text-4xl font-black text-white">₹{Math.round(futureWealth).toLocaleString()}</p>
                                <p className="text-xs text-lime-500 mt-2 font-mono">+{(Math.round(futureWealth) - financials.totalInvested).toLocaleString()} growth</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-black/40 border border-lime-500/30 backdrop-blur-sm">
                                <p className="text-[10px] text-lime-600 font-bold uppercase tracking-widest mb-2">Projected Liabilities</p>
                                <p className="text-4xl font-black text-white">₹{Math.round(futureDebt).toLocaleString()}</p>
                                <p className="text-xs text-lime-500 mt-2 font-mono">+{(Math.round(futureDebt) - financials.totalDebt).toLocaleString()} interest</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-black/40 border border-lime-500 backdrop-blur-sm shadow-[0_0_20px_-5px_rgba(132,204,22,0.2)]">
                                <p className="text-[10px] text-lime-400 font-bold uppercase tracking-widest mb-2">Future Net Worth</p>
                                <p className="text-4xl font-black text-lime-400">₹{Math.round(futureNetWorth).toLocaleString()}</p>
                                <p className="text-xs text-lime-600 mt-2 font-mono">in year {new Date().getFullYear() + projectionYear}</p>
                            </div>
                        </div>

                        <div className="h-[350px] w-full bg-black/40 rounded-2xl p-4 border border-lime-500/30 backdrop-blur-sm">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={projectionData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="wealthGradient_v2" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#84cc16" stopOpacity={0.4}/>
                                            <stop offset="95%" stopColor="#84cc16" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="debtGradient_v2" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="year" stroke="#4d7c0f" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#4d7c0f" tickFormatter={(val) => `₹${val/1000}k`} tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1a2e05" vertical={false} />
                                    <Tooltip 
                                        contentStyle={{backgroundColor: '#000', border: '1px solid #84cc16', borderRadius: '8px', color: '#fff'}}
                                        formatter={(val) => `₹${val.toLocaleString()}`}
                                    />
                                    
                                    {/* --- DYNAMIC REFERENCE LINE: SOLID WHITE --- */}
                                    <ReferenceLine 
                                        x={`Year ${projectionYear}`} 
                                        stroke="#ffffff" 
                                        strokeWidth={2}
                                        label={{ position: 'top', value: 'Projected Focus', fill: '#ffffff', fontSize: 10, fontWeight: 'black' }} 
                                    />

                                    <Area type="monotone" dataKey="Wealth" stroke="#84cc16" strokeWidth={3} fillOpacity={1} fill="url(#wealthGradient_v2)" />
                                    <Area type="monotone" dataKey="Debt" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#debtGradient_v2)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative bg-gray-950/80 p-8 rounded-[2.5rem] border border-gray-800 overflow-hidden">
                        <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
                        <div className="relative z-10">
                            <h2 className="text-xl font-black mb-6 text-white flex items-center gap-2">
                                <PieIcon className="text-lime-400" />
                                <span className="text-lime-400">Wealth Composition</span>
                            </h2>
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="w-48 h-48 relative flex-shrink-0">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={financials.portfolio}
                                                cx="50%" cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="value"
                                                stroke="none"
                                            >
                                                {financials.portfolio.map((entry, index) => (
                                                    <Cell 
                                                        key={`cell-${index}`} 
                                                        fill={entry.type === 'Liability' ? '#ef4444' : COLORS[index % (COLORS.length - 1)]} 
                                                    />
                                                ))}
                                            </Pie>
                                            <Tooltip contentStyle={{backgroundColor: '#000', border: '1px solid #84cc16', borderRadius: '8px', color: '#fff'}} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <p className="text-lime-700 text-[10px] font-bold uppercase tracking-widest">Holdings</p>
                                    </div>
                                </div>
                                <div className="flex-1 w-full space-y-3">
                                    {financials.portfolio.length === 0 ? <p className="text-gray-500 italic text-sm text-center">No assets found.</p> : financials.portfolio.map((item, idx) => (
                                        <div key={idx} className={`flex justify-between items-center p-3 rounded-xl bg-black/40 border transition-all cursor-default backdrop-blur-sm ${item.type === 'Liability' ? 'border-red-500/50' : 'border-lime-500/30'}`}>
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-8 rounded-full" style={{backgroundColor: item.type === 'Liability' ? '#ef4444' : COLORS[idx % (COLORS.length - 1)]}}></div>
                                                <span className="font-bold text-gray-300 text-sm">{item.name}</span>
                                            </div>
                                            <span className="font-mono text-white font-bold">₹{item.value.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative bg-gray-950/80 p-8 rounded-[2.5rem] border border-gray-800 overflow-hidden">
                        <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
                        <div className="relative z-10">
                            <h2 className="text-xl font-black mb-6 text-white flex items-center gap-2">
                                <TrendingUp className="text-lime-400" />
                                <span className="text-lime-400">Cash Flow Battle</span>
                            </h2>
                            <div className="h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={financials.monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1a2e05" vertical={false} />
                                        <XAxis dataKey="name" stroke="#4d7c0f" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                                        <YAxis stroke="#4d7c0f" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                                        <Tooltip 
                                            cursor={{fill: '#1a2e05'}}
                                            contentStyle={{backgroundColor: '#000', border: '1px solid #84cc16', borderRadius: '8px'}}
                                        />
                                        <Legend wrapperStyle={{paddingTop: '20px'}} />
                                        <Bar dataKey="Investments" fill="#a3e635" radius={[4, 4, 0, 0]} name="Saved" barSize={20} />
                                        <Bar dataKey="Expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Burned" barSize={20} />
                                        <Bar dataKey="Debt" fill="#ef4444" radius={[4, 4, 0, 0]} name="Debt Taken" barSize={20} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default WealthDashboard;
