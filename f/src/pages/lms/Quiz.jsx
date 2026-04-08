import React, { useState } from 'react';
import { Timer, CheckCircle, ChevronRight, AlertCircle, RefreshCw, Layers, ShieldCheck, Flag } from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalQuestions = 10;
  const timer = "45:00";

  const options = [
    "React is a JavaScript library for building user interfaces.",
    "React is a framework for back-end development.",
    "React is a database management system.",
    "React is a design tool for UI/UX designers."
  ];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-1000 max-w-5xl mx-auto space-y-8 pb-12">
      {/* 0. Header Node */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-4">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-3xl bg-red-600/10 flex items-center justify-center text-red-600 font-black italic border border-red-600/20 text-xl shadow-glow shadow-red-600/10">
            {currentQuestion}<span className="text-xs opacity-40 mx-0.5">/</span>{totalQuestions}
          </div>
          <div>
            <h2 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white">
              Validation <span className="text-red-600">Session.</span>
            </h2>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 opacity-60 italic">Node: COG_TEST_MOD_4 // Neural Logic Sync: ACTIVE</p>
          </div>
        </div>
        <Card className="flex items-center gap-4 bg-[#0a0a0b] px-8 py-5 border-red-600/20 rounded-2xl shadow-glow shadow-red-600/10">
          <Timer className="text-red-600 animate-pulse" size={24} />
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Decay Timer</span>
            <span className="font-mono text-3xl font-black italic tracking-tighter text-white">{timer}</span>
          </div>
        </Card>
      </div>

      {/* 1. Question Matrix */}
      <Card className="p-12 md:p-20 relative border-white/5 bg-white dark:bg-[#0a0a0b] shadow-2xl overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10 space-y-12">
            <div className="space-y-4">
                <Badge className="bg-red-600 text-white border-none px-4 py-1 text-[8px] font-black uppercase tracking-[0.3em]">Query Logic Node 0x0{currentQuestion}</Badge>
                <h3 className="text-2xl md:text-3xl font-black italic tracking-tight leading-relaxed text-slate-900 dark:text-white border-l-8 border-red-600 pl-8">
                "Which of the following best describes the core philosophy of React components in a decentralized architecture?"
                </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {options.map((opt, i) => (
                    <button 
                        key={i} 
                        className="p-8 rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-red-600/30 cursor-pointer transition-all group flex items-start gap-6 text-left active:scale-[0.98] relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/[0.02] transition-colors" />
                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center font-black text-slate-400 group-hover:border-red-600 group-hover:text-red-600 transition-all shrink-0">
                            {String.fromCharCode(65 + i)}
                        </div>
                        <span className="text-sm font-black uppercase tracking-tight text-slate-600 dark:text-slate-300 group-hover:text-white leading-relaxed mt-1">{opt}</span>
                    </button>
                ))}
            </div>
        </div>
      </Card>

      {/* 2. Control Matrix */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex gap-8 items-center">
          <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-red-600 transition-all italic">
            <RefreshCw size={16} /> Reset Sequence
          </button>
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-3 italic">
            <Flag size={14} className="text-amber-500" /> Flag For Audit
          </div>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button className="flex-1 md:w-48 py-5 bg-white dark:bg-[#0a0a0b] border border-slate-200 dark:border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white hover:bg-slate-900 transition-all italic">
            Previous Node
          </button>
          <button className="flex-1 md:w-64 py-5 bg-red-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-glow shadow-red-600/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 group italic">
            Next Validation <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* 3. Global Progression Map */}
      <Card className="p-8 bg-white dark:bg-[#0a0a0b] border-white/5 shadow-xl">
        <div className="flex items-center gap-3 mb-6 px-2">
            <Layers size={16} className="text-red-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 opacity-60 italic">Session Progress Map</span>
        </div>
        <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
          {[...Array(totalQuestions)].map((_, i) => (
            <div 
              key={i}
              className={`h-12 rounded-xl flex items-center justify-center text-xs font-black italic transition-all border ${
                i + 1 === currentQuestion 
                ? 'bg-red-600 text-white border-red-600 shadow-glow shadow-red-600/30 scale-110 z-10' 
                : i + 1 < currentQuestion 
                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                : 'bg-slate-50 dark:bg-white/5 text-slate-400 border-slate-200 dark:border-white/10'
              } hover:border-red-600/50 cursor-pointer`}
              onClick={() => setCurrentQuestion(i + 1)}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Quiz;
