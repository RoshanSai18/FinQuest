import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tesseract from 'tesseract.js';
import { parseReceipt } from '../utils/receiptParser';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, AreaChart, Area, XAxis } from 'recharts';
import { Camera, Loader2, Save, Activity, IndianRupee, Trash2, AlertTriangle, TrendingUp, Layers } from 'lucide-react';

// Theme Colors
const COLORS = { 
    Needs: '#84cc16',       // Lime Green
    Wants: '#ef4444',       // Red
    Investments: '#3b82f6', // Blue
    Debt: '#f59e0b'         // Orange
};

const ExpenseTracker = () => {
    // State
    const [expenses, setExpenses] = useState([]);
    const [analytics, setAnalytics] = useState({ breakdown: [], dailyTrend: [] });
    const [loading, setLoading] = useState(false);
    const [scanning, setScanning] = useState(false);
    
    // Form State
    const [form, setForm] = useState({
        title: '',
        amount: '',
        category: 'Food',
        classification: 'Wants',
        subCategory: '',       // NEW: For Asset Type
        interestRate: '',      // NEW: For Debt
        expectedReturn: '',    // NEW: For Investments
        date: new Date().toISOString().split('T')[0]
    });

    // 1. Fetch Data
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/expenses', { withCredentials: true });
            const stats = await axios.get('http://localhost:5000/api/expenses/analytics', { withCredentials: true });
            setExpenses(res.data.data);
            setAnalytics(stats.data);
        } catch (err) {
            console.error("API Error:", err);
        }
    };

    // 2. Delete Expense
    const handleDelete = async (id) => {
        if(!window.confirm("Delete this expense?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/expenses/${id}`, { withCredentials: true });
            fetchData();
        } catch (err) {
            alert("Failed to delete");
        }
    };

    // 3. OCR Scan
    const handleScan = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setScanning(true);
        try {
            const result = await Tesseract.recognize(file, 'eng');
            const { amount, date } = parseReceipt(result.data.text);
            
            setForm(prev => ({
                ...prev,
                amount: amount || prev.amount,
                date: date || prev.date,
                title: "Scanned Receipt"
            }));
        } catch (err) {
            alert("Scan Failed.");
        }
        setScanning(false);
    };

    // 4. Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/expenses', form, { withCredentials: true });
            await fetchData();
            // Reset form but keep date
            setForm({ 
                title: '', 
                amount: '', 
                category: 'Food', 
                classification: 'Wants', 
                subCategory: '', 
                interestRate: '', 
                expectedReturn: '',
                date: form.date 
            });
        } catch (err) {
            alert("Error Saving");
        }
        setLoading(false);
    };

    // Helper: Filter expenses by category
    const getExpensesByType = (type) => expenses.filter(e => e.classification === type);
    const getTotalByType = (type) => getExpensesByType(type).reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 p-4 md:p-8 font-sans relative overflow-x-hidden">
            
            {/* CSS Animation Injection */}
            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slide-up { animation: slideUp 0.6s ease-out forwards; }
                .delay-100 { animation-delay: 0.1s; }
                .delay-200 { animation-delay: 0.2s; }
                .delay-300 { animation-delay: 0.3s; }
                .delay-400 { animation-delay: 0.4s; }
            `}</style>

            {/* --- BACKGROUND ANIMATIONS --- */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none fixed">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-lime-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10 space-y-8">
                
                {/* TOP SECTION: GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* LEFT COLUMN: Input & List */}
                    <div className="space-y-6">
                        {/* INPUT CARD */}
                        <div className="bg-gray-900 p-6 rounded-2xl shadow-2xl border border-gray-800 relative overflow-hidden backdrop-blur-sm bg-opacity-80 animate-slide-up">
                            <h2 className="text-2xl font-black mb-6 flex items-center gap-2 uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-600">
                                <Camera className="text-lime-400 w-6 h-6" /> Transaction Terminal
                            </h2>
                            
                            <div className="relative mb-6 group">
                                <input 
                                    type="file" 
                                    onChange={handleScan}
                                    accept="image/*"
                                    className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-lime-500/10 file:text-lime-400 hover:file:bg-lime-500/20 transition-all cursor-pointer border border-dashed border-gray-700 rounded-xl p-4 group-hover:border-lime-500/50"
                                />
                                {scanning && <span className="absolute right-4 top-5 flex items-center gap-1 text-sm text-lime-400 animate-pulse"><Loader2 className="w-4 h-4 animate-spin"/> AI Analyzing...</span>}
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input 
                                    placeholder="Expense Title (e.g. Starbucks)" 
                                    className="w-full p-3 bg-gray-800 rounded-xl border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all outline-none"
                                    value={form.title}
                                    onChange={e => setForm({...form, title: e.target.value})}
                                    required
                                />
                                
                                <div className="flex gap-4">
                                    <div className="relative w-1/2">
                                        <IndianRupee className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                                        <input 
                                            type="number" 
                                            placeholder="0.00" 
                                            className="w-full p-3 pl-9 bg-gray-800 rounded-xl border border-gray-700 text-white font-mono font-bold focus:ring-2 focus:ring-lime-500 outline-none"
                                            value={form.amount}
                                            onChange={e => setForm({...form, amount: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <input 
                                        type="date" 
                                        className="w-1/2 p-3 bg-gray-800 rounded-xl border border-gray-700 text-white focus:ring-2 focus:ring-lime-500 outline-none"
                                        value={form.date}
                                        onChange={e => setForm({...form, date: e.target.value})}
                                    />
                                </div>

                                {/* CLASSIFICATION BUTTONS */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                    {['Needs', 'Wants', 'Investments', 'Debt'].map(type => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setForm({...form, classification: type})}
                                            className={`p-2 rounded-lg text-sm font-bold transition-all border ${
                                                form.classification === type 
                                                ? 'bg-lime-500 text-black border-lime-500 shadow-[0_0_15px_rgba(132,204,22,0.4)] transform scale-105' 
                                                : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-500 hover:text-white'
                                            }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>

                                {/* --- DYNAMIC FIELDS BASED ON SELECTION --- */}
                                
                                {/* 1. INVESTMENTS: Show Asset Class & Return */}
                                {form.classification === 'Investments' && (
                                    <div className="grid grid-cols-2 gap-4 bg-gray-800/50 p-3 rounded-xl border border-blue-500/30 animate-slide-up">
                                        <select 
                                            className="w-full p-2 bg-gray-900 rounded-lg text-sm text-white border border-gray-700 outline-none focus:border-blue-500"
                                            value={form.subCategory}
                                            onChange={e => setForm({...form, subCategory: e.target.value})}
                                        >
                                            <option value="">Select Asset Type</option>
                                            <option value="Mutual Funds">Mutual Funds</option>
                                            <option value="Stocks">Stocks</option>
                                            <option value="Gold">Gold / Silver</option>
                                            <option value="Real Estate">Real Estate</option>
                                            <option value="Crypto">Crypto</option>
                                            <option value="FD">Fixed Deposit</option>
                                        </select>
                                        <input 
                                            type="number" 
                                            placeholder="Exp. Return %" 
                                            className="w-full p-2 bg-gray-900 rounded-lg text-sm text-white border border-gray-700 outline-none focus:border-blue-500"
                                            value={form.expectedReturn}
                                            onChange={e => setForm({...form, expectedReturn: e.target.value})}
                                        />
                                    </div>
                                )}

                                {/* 2. DEBT: Show Interest Rate */}
                                {form.classification === 'Debt' && (
                                    <div className="bg-gray-800/50 p-3 rounded-xl border border-orange-500/30 animate-slide-up">
                                        <label className="text-xs text-orange-400 font-bold uppercase mb-1 block">Annual Interest Rate (%)</label>
                                        <input 
                                            type="number" 
                                            placeholder="e.g. 12%" 
                                            className="w-full p-2 bg-gray-900 rounded-lg text-sm text-white border border-gray-700 outline-none focus:border-orange-500"
                                            value={form.interestRate}
                                            onChange={e => setForm({...form, interestRate: e.target.value})}
                                        />
                                    </div>
                                )}

                                <button disabled={loading} className="w-full bg-gradient-to-r from-lime-400 to-lime-600 hover:from-lime-500 hover:to-lime-700 text-black font-black uppercase tracking-wider p-4 rounded-xl flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-lg shadow-lime-500/20">
                                    {loading ? <Loader2 className="animate-spin" /> : <Save className="w-5 h-5" />}
                                    Add to Ledger
                                </button>
                            </form>
                        </div>

                        {/* LIVE LEDGER CARD */}
                        <div className="bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-800 backdrop-blur-sm bg-opacity-80 animate-slide-up delay-100">
                            <h3 className="text-xl font-black mb-4 flex items-center gap-2 uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                                <Layers className="text-purple-400 w-5 h-5" /> All Transactions
                            </h3>
                            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-900 [&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-thumb]:rounded-full">
                                {expenses.map(exp => (
                                    <div key={exp._id} className="flex justify-between items-center p-3 hover:bg-gray-800/50 rounded-lg transition-colors border border-transparent hover:border-gray-700 group relative">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-1 h-8 rounded-full shadow-[0_0_8px]`} style={{backgroundColor: COLORS[exp.classification], boxShadow: `0 0 10px ${COLORS[exp.classification]}`}}></div>
                                            <div>
                                                <p className="font-bold text-gray-200 group-hover:text-white transition-colors">{exp.title}</p>
                                                <p className="text-xs text-gray-500">{new Date(exp.date).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="font-mono font-bold text-lime-400">₹{exp.amount}</span>
                                            <button 
                                                onClick={() => handleDelete(exp._id)}
                                                className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-500 transition-all"
                                                title="Delete Transaction"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Analytics */}
                    <div className="space-y-6">
                        {/* SURVIVAL INDEX */}
                        <div className="bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-800 relative backdrop-blur-sm bg-opacity-80 animate-slide-up delay-200">
                            <h2 className="text-xl font-black mb-6 flex items-center gap-2 uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
                                <AlertTriangle className="text-orange-500 w-5 h-5" /> Survival Index
                            </h2>
                            <div style={{ width: '100%', height: 300 }}>
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie 
                                            data={analytics.breakdown} 
                                            dataKey="totalAmount" 
                                            nameKey="_id" 
                                            cx="50%" cy="50%" 
                                            innerRadius={80} 
                                            outerRadius={110}
                                            paddingAngle={5}
                                            stroke="none"
                                        >
                                            {analytics.breakdown.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[entry._id]} />
                                            ))}
                                        </Pie>
                                        <Tooltip 
                                            contentStyle={{backgroundColor: '#1f2937', borderRadius: '12px', border: '1px solid #374151', color: '#fff'}}
                                            itemStyle={{color: '#fff'}}
                                            formatter={(value) => `₹${value}`}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex justify-center gap-4 mt-2">
                                {Object.keys(COLORS).map(key => (
                                    <div key={key} className="flex items-center gap-2 text-xs text-gray-400 font-bold bg-gray-800 px-3 py-1 rounded-full border border-gray-700">
                                        <div className="w-2 h-2 rounded-full" style={{background: COLORS[key]}}></div>
                                        {key}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CASH VELOCITY */}
                        <div className="bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-800 backdrop-blur-sm bg-opacity-80 animate-slide-up delay-300">
                             <h2 className="text-xl font-black mb-6 flex items-center gap-2 uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
                                <Activity className="text-blue-500 w-5 h-5" /> Cash Velocity
                            </h2>
                            <div style={{ width: '100%', height: 350 }}>
                                <ResponsiveContainer>
                                    <AreaChart data={analytics.dailyTrend}>
                                        <defs>
                                            <linearGradient id="colorBurn" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#84cc16" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#84cc16" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <XAxis 
                                            dataKey="_id" 
                                            tickFormatter={(str) => {
                                                const date = new Date(str);
                                                return `${date.getDate()}/${date.getMonth()+1}`;
                                            }}
                                            tick={{fill: '#6b7280', fontSize: 12}}
                                            tickLine={false}
                                            axisLine={false}
                                            dy={10}
                                        />
                                        <Tooltip 
                                            contentStyle={{backgroundColor: '#1f2937', borderRadius: '12px', border: '1px solid #374151', color: '#fff'}}
                                            labelFormatter={(label) => new Date(label).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                            formatter={(value) => `₹${value}`}
                                        />
                                        <Area type="monotone" dataKey="dailyTotal" stroke="#84cc16" strokeWidth={3} fillOpacity={1} fill="url(#colorBurn)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- NEW SECTION: GLOWING EDGE CATEGORIES --- */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12">
                    {['Needs', 'Wants', 'Investments', 'Debt'].map((type, index) => (
                        <div 
                            key={type} 
                            // Base styles
                            className="bg-gray-900/50 rounded-2xl border flex flex-col h-[450px] transition-all duration-300 hover:-translate-y-2 animate-slide-up backdrop-blur-sm"
                            // DYNAMIC GLOWING EDGES HERE
                            style={{ 
                                animationDelay: `${400 + (index * 100)}ms`,
                                borderColor: COLORS[type],                 // The Edge Color
                                boxShadow: `0 0 15px ${COLORS[type]}30`    // The Edge "Shine" (30% opacity)
                            }}
                        >
                            {/* Simple Clean Header */}
                            <div className="p-5 border-b border-gray-800">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-black uppercase tracking-[0.2em] text-sm" style={{ color: COLORS[type] }}>
                                        {type}
                                    </h3>
                                    <Activity className="w-4 h-4 opacity-50" style={{ color: COLORS[type] }} />
                                </div>
                                <p className="text-3xl font-black text-white flex items-baseline gap-1">
                                    <span className="text-base text-gray-500 font-medium">₹</span>
                                    {getTotalByType(type).toLocaleString()}
                                </p>
                            </div>

                            {/* Scrollable List */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-800 [&::-webkit-scrollbar-thumb]:rounded-full">
                                {getExpensesByType(type).length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-700 opacity-50">
                                        <Layers className="w-8 h-8 mb-2" />
                                        <p className="text-xs font-bold uppercase tracking-widest">Empty</p>
                                    </div>
                                ) : (
                                    getExpensesByType(type).map((exp, i) => (
                                        <div 
                                            key={exp._id} 
                                            className="p-3 rounded-xl bg-gray-950 border border-gray-800/50 hover:border-gray-600 transition-all group"
                                        >
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="font-bold text-gray-300 text-sm line-clamp-1">{exp.title}</span>
                                                <button 
                                                    onClick={() => handleDelete(exp._id)}
                                                    className="text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-[10px] text-gray-500 font-mono">
                                                    {new Date(exp.date).toLocaleDateString(undefined, { day: '2-digit', month: 'short' })}
                                                </span>
                                                <span className="text-sm font-bold" style={{ color: COLORS[type] }}>
                                                    ₹{exp.amount}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ExpenseTracker;
