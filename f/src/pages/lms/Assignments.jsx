import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, Filter, Clock, CheckCircle2, AlertTriangle, ChevronRight, Download } from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/lms/assignments/1')
      .then(res => res.json())
      .then(data => {
        const mappedData = data.map(a => ({
          ...a,
          course: a.Course ? a.Course.name : 'Unknown Node',
          deadline: new Date(a.deadline).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        }));
        setAssignments(mappedData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch assignments:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
    </div>
  );

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      {/* 0. Header Node */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white">
            Task <span className="text-red-600">Vault.</span>
            </h2>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 opacity-60 italic">Module: ASSIGN_HUB_07 // Pending Logic Validations</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none p-5 bg-white dark:bg-[#0a0a0b] border border-slate-200 dark:border-white/10 rounded-2xl text-slate-500 hover:text-red-600 transition-all">
                <Filter size={18} />
            </button>
            <button className="flex-1 md:w-64 bg-slate-900 text-white dark:bg-white/5 px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-red-600 transition-all flex items-center justify-center gap-4 group border border-white/5">
                <Download size={16} className="text-red-600 group-hover:text-white transition-colors" />
                Archive Report
            </button>
        </div>
      </div>

      {/* 1. Summary Node */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-10 bg-white dark:bg-[#0a0a0b] border-white/5 relative overflow-hidden flex items-center justify-between group">
            <div className="absolute inset-0 bg-red-600/[0.02] pattern-grid-slate-100" />
            <div className="relative z-10 space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Total Pending</p>
                <h3 className="text-5xl font-black italic tracking-tighter text-red-600">02</h3>
            </div>
            <div className="relative z-10 w-16 h-16 bg-red-600/10 rounded-2xl flex items-center justify-center text-red-600 border border-red-600/10 group-hover:bg-red-600 group-hover:text-white transition-all">
                <Clock size={28} />
            </div>
        </Card>
        <Card className="p-10 bg-white dark:bg-[#0a0a0b] border-white/5 relative overflow-hidden flex items-center justify-between group">
            <div className="absolute inset-0 bg-emerald-500/[0.02] pattern-grid-slate-100" />
            <div className="relative z-10 space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Validated Submissions</p>
                <h3 className="text-5xl font-black italic tracking-tighter text-emerald-500">14</h3>
            </div>
            <div className="relative z-10 w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 border border-emerald-500/10 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                <CheckCircle2 size={28} />
            </div>
        </Card>
      </div>

      {/* 2. Task Stream Cluster */}
      <Card className="bg-white dark:bg-[#0a0a0b] border-white/5 overflow-hidden">
        <div className="p-8 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-3">
                <ClipboardList size={16} className="text-red-600" /> Active Assignment Ledger
            </h3>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-white/5">
            {assignments.map((item, i) => (
                <Link key={i} to={`/portal/lms/assignment/${item.id}`} className="block group p-10 hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-all">
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="flex items-center gap-8">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all ${
                            item.status === 'PENDING' ? 'bg-red-600/5 text-red-600 border-red-600/10 font-black italic' : 'bg-emerald-500/5 text-emerald-500 border-emerald-500/10'
                        }`}>
                            {item.status === 'PENDING' ? <AlertTriangle size={24} /> : <CheckCircle2 size={24} />}
                        </div>
                        <div>
                            <h4 className="text-base font-black uppercase tracking-tight group-hover:text-red-600 transition-colors uppercase italic mb-1">{item.title}</h4>
                            <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-slate-400">
                                <span className="text-red-600 opacity-60 italic">{item.course}</span>
                                <span className="w-1.5 h-1.5 bg-slate-200 dark:bg-white/10 rounded-full" />
                                <span>Priority: {item.priority}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-end gap-12">
                        <div className="text-right">
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Termination Sequence</p>
                            <p className="text-xs font-black italic tracking-tighter text-red-600">{item.deadline}</p>
                        </div>
                        <div className="flex items-center gap-6">
                            <Badge className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                item.status === 'PENDING' ? 'bg-amber-500/10 text-amber-500 border-amber-500/10' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/10'
                            }`}>
                                {item.status}
                            </Badge>
                            <div className="w-12 h-12 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-red-600 group-hover:text-white transition-all group-hover:translate-x-1 group-hover:scale-110 active:scale-95">
                                <ChevronRight size={18} />
                            </div>
                        </div>
                    </div>
                   </div>
                </Link>
            ))}
        </div>
      </Card>
    </div>
  );
};

export default Assignments;
