import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Tesseract from 'tesseract.js';
import { parseReceipt } from '../utils/receiptParser';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, AreaChart, Area, XAxis } from 'recharts';
import { Camera, Loader2, Save, Activity, IndianRupee, Trash2, AlertTriangle, Layers } from 'lucide-react';

// Theme Colors
const COLORS = { 
    Needs: '#c8ff00',       // Primary (Lime Green)
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
        } catch {
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
        } catch {
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
        } catch {
            alert("Error Saving");
        }
        setLoading(false);
    };

    // Helper: Filter expenses by category
    const getExpensesByType = (type) => expenses.filter(e => e.classification === type);
    const getTotalByType = (type) => getExpensesByType(type).reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0B0C10] via-gray-950 to-[#0B0C10] text-gray-100 p-6 md:p-8 font-sans relative overflow-hidden">
            
            {/* Animated Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.05, 0.1, 0.05],
                        rotate: [0, 90, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl"
                />
                <motion.div 
                    animate={{ 
                        scale: [1.2, 1, 1.2],
                        opacity: [0.05, 0.08, 0.05],
                        rotate: [90, 0, 90]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-primary/5 to-transparent rounded-full blur-3xl"
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 space-y-8">
                
                {/* TOP SECTION: GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* LEFT COLUMN: Input & List */}
                    <div className="space-y-6">
                        {/* INPUT CARD */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-gray-800/50 relative overflow-hidden group"
                        >
                            {/* Glow effect on hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <div className="relative z-10">
                                <h2 className="text-2xl font-black mb-6 flex items-center gap-3 uppercase tracking-tight text-white">
                                    <motion.div
                                        animate={{ rotate: [0, 10, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <Camera className="text-primary w-6 h-6" />
                                    </motion.div>
                                    Transaction Terminal
                                </h2>
                                
                                <motion.div 
                                    whileHover={{ scale: 1.01 }}
                                    className="relative mb-6 group/upload"
                                >
                                    <input 
                                        type="file" 
                                        onChange={handleScan}
                                        accept="image/*"
                                        className="w-full text-sm text-gray-400 file:mr-4 file:py-3 file:px-5 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all cursor-pointer border-2 border-dashed border-gray-700 hover:border-primary/50 rounded-xl p-4"
                                    />
                                    {scanning && (
                                        <motion.span 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="absolute right-4 top-5 flex items-center gap-2 text-sm text-primary"
                                        >
                                            <Loader2 className="w-4 h-4 animate-spin"/>
                                            <span className="animate-pulse">AI Analyzing...</span>
                                        </motion.span>
                                    )}
                                </motion.div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <motion.input 
                                        whileFocus={{ scale: 1.01, borderColor: 'rgb(200, 255, 0)' }}
                                        placeholder="Expense Title (e.g. Starbucks)" 
                                        className="w-full p-4 bg-gray-800/50 backdrop-blur rounded-xl border-2 border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none"
                                        value={form.title}
                                        onChange={e => setForm({...form, title: e.target.value})}
                                        required
                                    />
                                    
                                    <div className="flex gap-4">
                                        <motion.div 
                                            whileFocus={{ scale: 1.01 }}
                                            className="relative w-1/2"
                                        >
                                            <IndianRupee className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                                            <input 
                                                type="number" 
                                                placeholder="0.00" 
                                                className="w-full p-4 pl-11 bg-gray-800/50 backdrop-blur rounded-xl border-2 border-gray-700 text-white font-mono font-bold focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                                                value={form.amount}
                                                onChange={e => setForm({...form, amount: e.target.value})}
                                                required
                                            />
                                        </motion.div>
                                        <motion.input 
                                            whileFocus={{ scale: 1.01 }}
                                            type="date" 
                                            className="w-1/2 p-4 bg-gray-800/50 backdrop-blur rounded-xl border-2 border-gray-700 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                                            value={form.date}
                                            onChange={e => setForm({...form, date: e.target.value})}
                                        />
                                    </div>

                                    {/* CLASSIFICATION BUTTONS */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {['Needs', 'Wants', 'Investments', 'Debt'].map(type => (
                                            <motion.button
                                                key={type}
                                                type="button"
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setForm({...form, classification: type})}
                                                className={`p-3 rounded-xl text-sm font-bold transition-all border-2 ${
                                                    form.classification === type 
                                                    ? 'bg-primary text-black border-primary shadow-[0_0_20px_rgba(200,255,0,0.4)]' 
                                                    : 'bg-gray-800/50 text-gray-400 border-gray-700 hover:border-gray-500 hover:text-white'
                                                }`}
                                            >
                                                {type}
                                            </motion.button>
                                        ))}
                                    </div>

                                    {/* DYNAMIC FIELDS */}
                                    {form.classification === 'Investments' && (
                                        <motion.div 
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="grid grid-cols-2 gap-4 bg-blue-500/10 p-4 rounded-xl border-2 border-blue-500/30"
                                        >
                                            <select 
                                                className="w-full p-3 bg-gray-900 rounded-lg text-sm text-white border border-gray-700 outline-none focus:border-blue-500"
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
                                                className="w-full p-3 bg-gray-900 rounded-lg text-sm text-white border border-gray-700 outline-none focus:border-blue-500"
                                                value={form.expectedReturn}
                                                onChange={e => setForm({...form, expectedReturn: e.target.value})}
                                            />
                                        </motion.div>
                                    )}

                                    {form.classification === 'Debt' && (
                                        <motion.div 
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="bg-orange-500/10 p-4 rounded-xl border-2 border-orange-500/30"
                                        >
                                            <label className="text-xs text-orange-400 font-bold uppercase mb-2 block">Annual Interest Rate (%)</label>
                                            <input 
                                                type="number" 
                                                placeholder="e.g. 12%" 
                                                className="w-full p-3 bg-gray-900 rounded-lg text-sm text-white border border-gray-700 outline-none focus:border-orange-500"
                                                value={form.interestRate}
                                                onChange={e => setForm({...form, interestRate: e.target.value})}
                                            />
                                        </motion.div>
                                    )}

                                    <motion.button 
                                        whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(200, 255, 0, 0.3)' }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={loading} 
                                        className="w-full bg-gradient-to-r from-primary to-green-500 hover:from-green-500 hover:to-primary text-black font-black uppercase tracking-wider p-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? <Loader2 className="animate-spin" /> : <Save className="w-5 h-5" />}
                                        Add to Ledger
                                    </motion.button>
                                </form>
                            </div>
                        </motion.div>

                        {/* LIVE LEDGER CARD */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-gray-800/50 group hover:border-gray-700 transition-all"
                        >
                            <h3 className="text-xl font-black mb-5 flex items-center gap-3 uppercase tracking-tight text-white">
                                <Layers className="text-gray-400 w-5 h-5" />
                                Transaction History
                            </h3>
                            <div className="space-y-2 max-h-[350px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-900 [&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-600">
                                {expenses.map((exp, index) => (
                                    <motion.div 
                                        key={exp._id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ scale: 1.02, x: 4 }}
                                        className="flex justify-between items-center p-4 bg-gray-800/50 hover:bg-gray-800 rounded-xl transition-all border border-transparent hover:border-gray-700 group/item cursor-pointer"
                                    >
                                        <div className="flex items-center gap-3">
                                            <motion.div 
                                                animate={{ boxShadow: [`0 0 5px ${COLORS[exp.classification]}`, `0 0 15px ${COLORS[exp.classification]}`, `0 0 5px ${COLORS[exp.classification]}`] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className="w-1 h-10 rounded-full" 
                                                style={{backgroundColor: COLORS[exp.classification]}}
                                            />
                                            <div>
                                                <p className="font-bold text-gray-200 group-hover/item:text-white transition-colors">{exp.title}</p>
                                                <p className="text-xs text-gray-500">{new Date(exp.date).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="font-mono font-bold text-primary">₹{exp.amount}</span>
                                            <motion.button 
                                                whileHover={{ scale: 1.2, rotate: 180 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => handleDelete(exp._id)}
                                                className="opacity-0 group-hover/item:opacity-100 text-gray-500 hover:text-red-500 transition-all"
                                                title="Delete Transaction"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: Analytics */}
                    <div className="space-y-6">
                        {/* SURVIVAL INDEX */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-gray-800/50 relative group hover:border-gray-700 transition-all"
                        >
                            <h2 className="text-xl font-black mb-6 flex items-center gap-3 uppercase tracking-tight text-white">
                                <AlertTriangle className="text-gray-400 w-5 h-5" />
                                Survival Index
                            </h2>
                            <motion.div 
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                style={{ width: '100%', height: 300 }}
                            >
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
                                            animationBegin={0}
                                            animationDuration={1000}
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
                            </motion.div>
                            <div className="flex justify-center gap-3 mt-4 flex-wrap">
                                {Object.keys(COLORS).map((key, index) => (
                                    <motion.div 
                                        key={key}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 + index * 0.1 }}
                                        className="flex items-center gap-2 text-xs text-gray-400 font-bold bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700 hover:border-gray-600 transition-all"
                                    >
                                        <motion.div 
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                                            className="w-2.5 h-2.5 rounded-full" 
                                            style={{background: COLORS[key]}}
                                        />
                                        {key}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* CASH VELOCITY */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-gray-800/50 group hover:border-gray-700 transition-all"
                        >
                            <h2 className="text-xl font-black mb-6 flex items-center gap-3 uppercase tracking-tight text-white">
                                <Activity className="text-gray-400 w-5 h-5" />
                                Cash Velocity
                            </h2>
                            <motion.div 
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                                style={{ width: '100%', height: 350 }}
                            >
                                <ResponsiveContainer>
                                    <AreaChart data={analytics.dailyTrend}>
                                        <defs>
                                            <linearGradient id="colorBurn" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#c8ff00" stopOpacity={0.4}/>
                                                <stop offset="95%" stopColor="#c8ff00" stopOpacity={0}/>
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
                                        <Area 
                                            type="monotone" 
                                            dataKey="dailyTotal" 
                                            stroke="#c8ff00" 
                                            strokeWidth={3} 
                                            fillOpacity={1} 
                                            fill="url(#colorBurn)"
                                            animationBegin={0}
                                            animationDuration={1500}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* CATEGORY CARDS SECTION */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8">
                    {['Needs', 'Wants', 'Investments', 'Debt'].map((type, index) => (
                        <motion.div 
                            key={type}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                            className="bg-gray-900/80 backdrop-blur-xl rounded-2xl border-2 flex flex-col h-[450px] transition-all duration-300 group/card"
                            style={{ 
                                borderColor: COLORS[type],
                                boxShadow: `0 0 20px ${COLORS[type]}20`
                            }}
                        >
                            {/* Header */}
                            <div className="p-5 border-b border-gray-800">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-black uppercase tracking-widest text-sm" style={{ color: COLORS[type] }}>
                                        {type}
                                    </h3>
                                    <motion.div
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Activity className="w-4 h-4" style={{ color: COLORS[type], opacity: 0.5 }} />
                                    </motion.div>
                                </div>
                                <motion.p 
                                    key={getTotalByType(type)}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-3xl font-black text-white flex items-baseline gap-2"
                                >
                                    <span className="text-base text-gray-500 font-medium">₹</span>
                                    {getTotalByType(type).toLocaleString()}
                                </motion.p>
                            </div>

                            {/* Scrollable List */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-800 [&::-webkit-scrollbar-thumb]:rounded-full">
                                {getExpensesByType(type).length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-700 opacity-50">
                                        <motion.div
                                            animate={{ y: [0, -10, 0] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <Layers className="w-10 h-10 mb-3" />
                                        </motion.div>
                                        <p className="text-xs font-bold uppercase tracking-widest">No Transactions</p>
                                    </div>
                                ) : (
                                    getExpensesByType(type).map((exp, i) => (
                                        <motion.div 
                                            key={exp._id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            whileHover={{ scale: 1.03, x: 5 }}
                                            className="p-3 rounded-xl bg-gray-950/50 border border-gray-800/50 hover:border-gray-700 transition-all group/expense"
                                        >
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="font-bold text-gray-300 text-sm line-clamp-1 group-hover/expense:text-white transition-colors">
                                                    {exp.title}
                                                </span>
                                                <motion.button 
                                                    whileHover={{ scale: 1.2, rotate: 90 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleDelete(exp._id)}
                                                    className="text-gray-600 hover:text-red-500 opacity-0 group-hover/expense:opacity-100 transition-all"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </motion.button>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-[10px] text-gray-500 font-mono">
                                                    {new Date(exp.date).toLocaleDateString(undefined, { day: '2-digit', month: 'short' })}
                                                </span>
                                                <span className="text-sm font-bold" style={{ color: COLORS[type] }}>
                                                    ₹{exp.amount}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ExpenseTracker;
