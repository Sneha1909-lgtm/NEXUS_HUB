import React from 'react';
import { Award, BookOpen, Download, AlertTriangle, TrendingUp, ShieldCheck, ChevronRight } from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';

const StudentResults = () => {
  const semesterResults = [
    { sem: 'Phase 01 Terminal', gpa: '8.2', status: 'VERIFIED', credits: 24, load: 'Optimal' },
    { sem: 'Phase 02 Terminal', gpa: '8.5', status: 'VERIFIED', credits: 24, load: 'Optimal' },
    { sem: 'Phase 03 Terminal', gpa: '8.4', status: 'VERIFIED', credits: 26, load: 'Optimal' },
  ];

  const currentMarks = [
    { subject: 'Operating Systems Architecture', marks: 88, grade: 'A', status: 'SYNCED', weight: '04' },
    { subject: 'Database Systems Synthesis', marks: 92, grade: 'A+', status: 'SYNCED', weight: '03' },
    { subject: 'Software Engineering Matrix', marks: 75, grade: 'B+', status: 'SYNCED', weight: '04' },
    { subject: 'Theory of Computation Node', marks: 82, grade: 'A', status: 'SYNCED', weight: '03' },
  ];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      {/* 0. Header Node */}
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white">
          Performance <span className="text-red-600">Analytics.</span>
        </h2>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 opacity-60 italic">Record Hash: 0x92A4E...BD // Verified Ledger Active</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 1. Historical Analytics Sector */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="bg-white dark:bg-[#0a0a0b] border-white/5 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3">
                    <Award size={18} className="text-red-600" /> Historical Grade Matrices
                </h3>
                <button className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-red-600 transition-colors flex items-center gap-2">
                  <Download size={14} /> Global Transcript
                </button>
            </div>
            
            <div className="p-8 space-y-4">
              {semesterResults.map((res, i) => (
                <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 hover:border-red-600/20 transition-all group">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/5 flex items-center justify-center text-red-600 font-black italic shadow-inner border border-white/10 group-hover:bg-red-600 group-hover:text-white transition-all">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">{res.sem}</h4>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">{res.credits} Units Logged // {res.load}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <div className="text-2xl font-black italic tracking-tighter text-red-600 line-height-none">{res.gpa}</div>
                      <div className="text-[8px] font-black tracking-[0.3em] text-emerald-500 uppercase flex items-center gap-1">
                        <ShieldCheck size={10} /> {res.status}
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* 2. Cumulative Focus Node */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="bg-[#0a0a0b] text-white p-8 space-y-8 border-white/5 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-indigo-600" />
            <div className="relative mt-4">
              <div className="w-40 h-40 rounded-full border-[6px] border-white/5 flex flex-col items-center justify-center p-2 relative">
                <div className="absolute inset-0 rounded-full border-[6px] border-red-600 border-t-transparent animate-spin-slow opacity-40" />
                <span className="text-5xl font-black italic tracking-tighter leading-none">8.4</span>
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mt-2">Global CGPA</span>
              </div>
            </div>
            <div className="space-y-2">
                <h4 className="text-sm font-black uppercase tracking-tight italic">Elite Progression Node</h4>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-relaxed">System rank: Top 5% Tier // Advanced Research Eligibility: OPTIMAL</p>
            </div>
            <div className="w-full pt-6 border-t border-white/5">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Degree Progress</span>
                    <span className="text-[8px] font-black uppercase tracking-widest text-red-600">75%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-red-600 w-3/4 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                </div>
            </div>
          </Card>
        </div>
      </div>

      {/* 3. Real-Time Result Stream */}
      <Card className="bg-white dark:bg-[#0a0a0b] border-white/5 overflow-hidden shadow-xl">
        <div className="p-8 border-b border-slate-100 dark:border-white/5">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3">
              <BookOpen className="text-red-500" size={18} /> Cycle 04 Knowledge Validation
            </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-white/[0.02]">
                <th className="px-8 py-6 text-left text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Knowledge Module</th>
                <th className="px-8 py-6 text-left text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Validated Score</th>
                <th className="px-8 py-6 text-left text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Grade Token</th>
                <th className="px-8 py-6 text-right text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Sync Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {currentMarks.map((mark, i) => (
                <tr key={i} className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                        <span className="text-xs font-black uppercase tracking-tight">{mark.subject}</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Weightage Factor: {mark.weight}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 font-mono text-xs font-black text-red-600">{mark.marks} / 100.00</td>
                  <td className="px-8 py-6 font-black italic text-sm italic tracking-tighter uppercase">{mark.grade}</td>
                  <td className="px-8 py-6 text-right">
                    <Badge className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/10 px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest">
                      <TrendingUp size={10} className="inline mr-1" /> {mark.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default StudentResults;
