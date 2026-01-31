import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Target, 
    Rocket, 
    Zap, 
    TrendingUp,
    HelpCircle,
    CheckCircle2,
    XCircle,
    Activity,
    Compass,
    Layers,
    Cpu
} from 'lucide-react';
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    LineChart,
    Line
} from 'recharts';

const NorthStar = () => {
    const [loading, setLoading] = useState(true);
    const [goalData, setGoalData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);
    
    const [formData, setFormData] = useState({
        monthlyIncome: 0,
        monthlyExpenses: 0,
        monthlyInvestment: 0,
        expectedReturnRate: 12,
        shortTermGoalTitle: "",
        shortTermTarget: 0,
        shortTermDeadline: '',
        longTermGoalTitle: "",
        longTermTarget: 0,
        longTermDeadline: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/goals', { withCredentials: true });
            if (res.data) {
                setGoalData(res.data);
                setFormData(res.data);
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/goals', formData, { withCredentials: true });
            setGoalData(res.data);
            setIsEditing(false);
        } catch (err) {
            alert("Update failed.");
        }
    };

    const calculateAnalytics = () => {
        if (!goalData) return null;

        const parseDate = (d) => d ? new Date(d) : new Date();
        const today = new Date();

        // --- LONG TERM MATH ---
        const ltMonths = Math.max(1, (parseDate(goalData.longTermDeadline).getFullYear() - today.getFullYear()) * 12 + (parseDate(goalData.longTermDeadline).getMonth() - today.getMonth()));
        const ltRequired = goalData.longTermTarget / ltMonths;
        const rawLtDeviation = ((ltRequired - goalData.monthlyInvestment) / ltRequired) * 100;
        
        const r = (goalData.expectedReturnRate / 100) / 12;
        const ltChartData = [];
        for (let i = 0; i <= ltMonths; i += Math.max(1, Math.floor(ltMonths / 12))) {
            const balance = r > 0 ? goalData.monthlyInvestment * ((Math.pow(1 + r, i) - 1) / r) : goalData.monthlyInvestment * i;
            ltChartData.push({ x: `M${i}`, value: Math.round(balance) });
        }

        // --- SHORT TERM MATH ---
        const stMonths = Math.max(1, (parseDate(goalData.shortTermDeadline).getFullYear() - today.getFullYear()) * 12 + (parseDate(goalData.shortTermDeadline).getMonth() - today.getMonth()));
        const stRequired = goalData.shortTermTarget / stMonths;
        const stChartData = [];
        for (let i = 0; i <= stMonths; i++) {
            const progress = (goalData.monthlyIncome - goalData.monthlyExpenses) * i;
            stChartData.push({ x: `M${i}`, value: Math.round(progress) });
        }

        // Display Logic
        let deviationDisplay = rawLtDeviation < -100 ? "SECURED" : rawLtDeviation > 100 ? "UNLIKELY" : `${rawLtDeviation.toFixed(1)}%`;
        let statusColor = rawLtDeviation <= 0 ? "text-[#9AFF3C]" : "text-red-600";
        let verdict = rawLtDeviation <= 0 ? "CONSIDER CONSTRAINTS MET" : "CONSTRAINTS NOT MET";

        return { ltRequired, deviationDisplay, rawLtDeviation, statusColor, verdict, stRequired, ltChartData, stChartData };
    };

    const a = calculateAnalytics();

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center font-mono">
            <div className="text-[#9AFF3C] animate-pulse tracking-[1em] text-2xl uppercase">System Boot...</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#000] text-slate-100 p-4 md:p-10 font-sans selection:bg-[#9AFF3C]/40">
            {/* Cyber Grid Background */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto space-y-10 relative z-10">
                
                {/* NEON HEADER */}
                <header className="flex flex-col lg:flex-row justify-between items-center bg-black/80 backdrop-blur-md border-2 border-[#9AFF3C]/30 p-8 rounded-3xl shadow-[0_0_50px_rgba(74,222,128,0.1)]">
                    <div className="flex items-center gap-6">
                        <div className="p-4 bg-[#9AFF3C]/20 rounded-2xl border border-[#9AFF3C] animate-pulse">
                            <Cpu className="text-[#9AFF3C]" size={36} />
                        </div>
                        <div>
                            <h1 className="text-5xl font-black tracking-tighter uppercase italic">Mission <span className="text-[#9AFF3C]">North Star</span></h1>
                            <p className="text-[#9AFF3C]/60 text-xs font-bold tracking-[0.5em] uppercase">Trajectory v3.0 // Active</p>
                        </div>
                    </div>
                    <button onClick={() => setIsEditing(!isEditing)} className="mt-6 lg:mt-0 px-12 py-5 bg-[#9AFF3C] text-black font-black rounded-full hover:shadow-[0_0_30px_#9AFF3C] transition-all uppercase text-xs tracking-widest">
                        {isEditing ? "Terminate Edit" : "Configure Core"}
                    </button>
                </header>

                {isEditing && (
                    <div className="bg-black border-2 border-[#9AFF3C]/40 p-10 rounded-[2.5rem] shadow-[0_0_40px_rgba(74,222,128,0.1)] animate-in zoom-in-95 duration-300">
                        <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            <div className="space-y-4">
                                <h3 className="text-[#9AFF3C] font-black text-xs uppercase tracking-widest flex items-center gap-2"><Layers size={14}/> Resource Inflow</h3>
                                <input type="number" placeholder="Monthly Income" className="w-full bg-black border border-[#9AFF3C]/20 p-4 rounded-xl text-white focus:border-[#9AFF3C] outline-none" value={formData.monthlyIncome} onChange={e => setFormData({...formData, monthlyIncome: Number(e.target.value)})} />
                                <input type="number" placeholder="Monthly Expenses" className="w-full bg-black border border-[#9AFF3C]/20 p-4 rounded-xl text-white focus:border-[#9AFF3C] outline-none" value={formData.monthlyExpenses} onChange={e => setFormData({...formData, monthlyExpenses: Number(e.target.value)})} />
                                <input type="number" placeholder="Target Investment" className="w-full bg-black border border-[#9AFF3C]/20 p-4 rounded-xl text-white focus:border-[#9AFF3C] outline-none" value={formData.monthlyInvestment} onChange={e => setFormData({...formData, monthlyInvestment: Number(e.target.value)})} />
                                <input type="number" placeholder="Exp. ROI %" className="w-full bg-black border border-[#9AFF3C]/20 p-4 rounded-xl text-white focus:border-[#9AFF3C] outline-none" value={formData.expectedReturnRate} onChange={e => setFormData({...formData, expectedReturnRate: Number(e.target.value)})} />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-[#9AFF3C] font-black text-xs uppercase tracking-widest flex items-center gap-2"><Rocket size={14}/> Phase I: Short</h3>
                                <input type="text" placeholder="Title" className="w-full bg-black border border-[#9AFF3C]/20 p-4 rounded-xl text-white focus:border-[#9AFF3C] outline-none" value={formData.shortTermGoalTitle} onChange={e => setFormData({...formData, shortTermGoalTitle: e.target.value})} />
                                <input type="number" placeholder="Target Amount" className="w-full bg-black border border-[#9AFF3C]/20 p-4 rounded-xl text-white focus:border-[#9AFF3C] outline-none" value={formData.shortTermTarget} onChange={e => setFormData({...formData, shortTermTarget: Number(e.target.value)})} />
                                <input type="date" className="w-full bg-black border border-[#9AFF3C]/20 p-4 rounded-xl text-[#9AFF3C] focus:border-[#9AFF3C] outline-none" value={formData.shortTermDeadline} onChange={e => setFormData({...formData, shortTermDeadline: e.target.value})} />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-[#9AFF3C] font-black text-xs uppercase tracking-widest flex items-center gap-2"><Target size={14}/> Phase II: Long</h3>
                                <input type="text" placeholder="Title" className="w-full bg-black border border-[#9AFF3C]/20 p-4 rounded-xl text-white focus:border-[#9AFF3C] outline-none" value={formData.longTermGoalTitle} onChange={e => setFormData({...formData, longTermGoalTitle: e.target.value})} />
                                <input type="number" placeholder="Target Amount" className="w-full bg-black border border-[#9AFF3C]/20 p-4 rounded-xl text-white focus:border-[#9AFF3C] outline-none" value={formData.longTermTarget} onChange={e => setFormData({...formData, longTermTarget: Number(e.target.value)})} />
                                <input type="date" className="w-full bg-black border border-[#9AFF3C]/20 p-4 rounded-xl text-[#9AFF3C] focus:border-[#9AFF3C] outline-none" value={formData.longTermDeadline} onChange={e => setFormData({...formData, longTermDeadline: e.target.value})} />
                                <button type="submit" className="w-full h-[60px] bg-[#9AFF3C] text-black font-black rounded-xl hover:scale-[1.02] transition-all uppercase text-[11px] tracking-widest shadow-[0_0_20px_rgba(74,222,128,0.5)]">Commit to Database</button>
                            </div>
                        </form>
                    </div>
                )}

                {/* DUAL LINE GRAPHS SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* Graph 1: Short Term Progress */}
                    <div className="bg-black/80 border border-[#9AFF3C]/20 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 transition-opacity">
                            <Rocket className="text-[#9AFF3C]" size={80} />
                        </div>
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-1">{goalData?.shortTermGoalTitle || "N/A"}</h2>
                        <p className="text-[#9AFF3C] text-[10px] font-bold uppercase tracking-widest mb-8">Short-Term Flow Projection</p>
                        
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={a?.stChartData}>
                                    <Line type="monotone" dataKey="value" stroke="#9AFF3C" strokeWidth={4} dot={false} strokeShadow="0 0 10px #9AFF3C" />
                                    <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #9AFF3C', borderRadius: '10px', color: '#9AFF3C' }} />
                                    <CartesianGrid stroke="#9AFF3C10" strokeDasharray="5 5" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-6 flex justify-between items-center">
                            <span className="text-xs font-bold text-gray-500 uppercase">Monthly Requirement</span>
                            <span className="text-2xl font-black text-white">₹{Math.round(a?.stRequired || 0).toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Graph 2: Long Term Compounding */}
                    <div className="bg-black/80 border border-[#9AFF3C]/20 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                         <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 transition-opacity">
                            <TrendingUp className="text-[#9AFF3C]" size={80} />
                        </div>
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-1">{goalData?.longTermGoalTitle || "N/A"}</h2>
                        <p className="text-[#9AFF3C] text-[10px] font-bold uppercase tracking-widest mb-8">Long-Term Wealth Trajectory</p>
                        
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={a?.ltChartData}>
                                    <defs>
                                        <linearGradient id="neonGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#9AFF3C" stopOpacity={0.4}/>
                                            <stop offset="95%" stopColor="#9AFF3C" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="value" stroke="#9AFF3C" strokeWidth={4} fill="url(#neonGradient)" />
                                    <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #9AFF3C', borderRadius: '10px', color: '#9AFF3C' }} />
                                    <CartesianGrid stroke="#9AFF3C10" strokeDasharray="5 5" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-6 flex justify-between items-center">
                            <span className="text-xs font-bold text-gray-500 uppercase">Projected Maturity</span>
                            <span className="text-2xl font-black text-[#9AFF3C]">₹{Math.round(goalData?.longTermTarget || 0).toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* VELOCITY MONITOR HUB */}
                <section className="bg-black/90 border-2 border-[#9AFF3C]/30 p-12 rounded-[3.5rem] shadow-[0_0_60px_rgba(0,0,0,1)]">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <Activity className="text-[#9AFF3C] animate-bounce" size={28} />
                                <h3 className="text-5xl font-black text-white uppercase italic tracking-tighter">Velocity Deviation</h3>
                            </div>
                            <p className="text-[#9AFF3C]/40 text-xs font-bold uppercase tracking-[0.3em]">Live performance analysis vs Mission Requirements</p>
                        </div>
                        <div className={`text-6xl md:text-8xl font-black tracking-tighter italic ${a?.statusColor}`}>
                            {a?.deviationDisplay}
                        </div>
                    </div>

                    <div className="mb-12 p-8 bg-black border border-[#9AFF3C]/20 rounded-3xl flex items-center gap-8 shadow-[inset_0_0_20px_rgba(74,222,128,0.05)]">
                        {a?.rawLtDeviation <= 0 ? <CheckCircle2 className="text-[#9AFF3C] shrink-0" size={40} /> : <XCircle className="text-red-600 shrink-0" size={40} />}
                        <p className="text-lg md:text-xl text-gray-300 font-bold italic leading-relaxed">
                            &quot;{a?.verdict.toUpperCase()}&quot;
                        </p>
                    </div>

                    <div className="relative h-6 bg-[#111] rounded-full border border-[#9AFF3C]/20 overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,1)]">
                        <div className={`h-full transition-all duration-1000 ease-out ${a?.rawLtDeviation <= 0 ? 'bg-[#9AFF3C] shadow-[0_0_30px_#9AFF3C]' : 'bg-red-600 shadow-[0_0_30px_#ef4444]'}`} style={{ width: `${Math.min(100, Math.max(5, 100 - a?.rawLtDeviation))}%` }}></div>
                    </div>

                    <div className="grid grid-cols-2 mt-10 px-4">
                        <div className="space-y-2">
                            <span className="text-[10px] font-black uppercase text-[#9AFF3C]/30 tracking-widest block">Current Allocation</span>
                            <span className="text-4xl font-black text-white">₹{goalData?.monthlyInvestment.toLocaleString()}</span>
                        </div>
                        <div className="space-y-2 text-right">
                            <span className="text-[10px] font-black uppercase text-[#9AFF3C]/30 tracking-widest block">Mission Pace Required</span>
                            <span className="text-4xl font-black text-white">₹{Math.round(a?.ltRequired || 0).toLocaleString()}</span>
                        </div>
                    </div>

                    <button onClick={() => setShowExplanation(!showExplanation)} className="mt-14 flex items-center gap-3 text-xs font-black text-[#9AFF3C]/30 uppercase tracking-[0.3em] hover:text-[#9AFF3C] transition-all">
                        <HelpCircle size={18} /> Decipher Analytics Matrix
                    </button>

                    {showExplanation && (
                        <div className="mt-8 p-10 bg-[#9AFF3C]/5 border border-[#9AFF3C]/10 rounded-[2.5rem] grid grid-cols-1 md:grid-cols-2 gap-12 animate-in fade-in slide-in-from-top-6">
                            <div className="space-y-4">
                                <h4 className="text-[#9AFF3C] font-black uppercase text-xs tracking-widest border-l-4 border-[#9AFF3C] pl-4">Surplus Velocity (Neon)</h4>
                                <p className="text-sm text-gray-400 font-bold leading-relaxed italic">Investment velocity exceeds mission parameters. Success is mathematically secured considering current constraints.</p>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-red-600 font-black uppercase text-xs tracking-widest border-l-4 border-red-600 pl-4">Strategic Deficit (Crimson)</h4>
                                <p className="text-sm text-gray-400 font-bold leading-relaxed italic">Current investment velocity is sub-optimal. Target is unlikely under current constraints.</p>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default NorthStar;
