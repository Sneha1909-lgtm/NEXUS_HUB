import React from 'react';
import { Save, UserPlus, Filter, Search, Award, FileText, ChevronRight, CheckCircle } from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';

const EnterMarks = () => {
  const students = [
    { id: '2024_S_001', name: 'Alice Moon', internal: 35, external: 50, total: 85, grade: 'A' },
    { id: '2024_S_002', name: 'Bob Smith', internal: 28, external: 48, total: 76, grade: 'B' },
    { id: '2024_S_003', name: 'Charlie Davis', internal: 38, external: 54, total: 92, grade: 'A+' },
    { id: '2024_S_004', name: 'Diana Prince', internal: 32, external: 50, total: 82, grade: 'A' },
  ];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      {/* 0. Header Node */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white">
            Grading <span className="text-red-600">Terminal.</span>
            </h2>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 opacity-60 italic">Module: WEB_SYSTEMS_802 // Performance Validation Matrix</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none p-5 bg-white dark:bg-[#0a0a0b] border border-slate-200 dark:border-white/10 rounded-2xl text-slate-500 hover:text-red-600 transition-all">
                <Filter size={18} />
            </button>
            <button className="flex-1 md:w-64 bg-slate-900 text-white dark:bg-red-600 px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] shadow-glow shadow-red-600/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 group">
                <CheckCircle size={16} className="group-hover:rotate-12 transition-transform" />
                Finalize Ledger
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 1. Statistics Cluster */}
        <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <KPIStat label="Average Score" val="83.5" icon={Award} color="text-indigo-500" />
            <KPIStat label="Pass Rate" val="100%" icon={CheckCircle} color="text-emerald-500" />
            <KPIStat label="Incomplete Nodes" val="0" icon={FileText} color="text-red-500" />
        </div>

        {/* 2. Main Entry Matrix */}
        <div className="lg:col-span-12">
            <Card className="bg-white dark:bg-[#0a0a0b] border-white/5 overflow-hidden shadow-2xl">
                <div className="p-10 border-b border-slate-100 dark:border-white/5">
                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-600 transition-colors" size={20} />
                        <input 
                            type="text" 
                            placeholder="Identify Student Hub..." 
                            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-5 pl-16 pr-6 outline-none focus:border-red-600/30 dark:focus:bg-white/10 transition-all font-bold tracking-tight text-xs uppercase"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-white/[0.02]">
                                <th className="px-10 py-6 text-left text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Registry</th>
                                <th className="px-10 py-6 text-left text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Identification</th>
                                <th className="px-10 py-6 text-center text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Internals (40)</th>
                                <th className="px-10 py-6 text-center text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Terminal (60)</th>
                                <th className="px-10 py-6 text-center text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Synthesis</th>
                                <th className="px-10 py-6 text-right text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Token</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {students.map((student) => (
                                <tr key={student.id} className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-colors">
                                    <td className="px-10 py-8">
                                        <span className="font-mono text-[10px] font-black text-slate-400 bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 italic">
                                            #{student.id}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8">
                                        <h4 className="text-xs font-black uppercase tracking-tight group-hover:text-red-600 transition-colors">{student.name}</h4>
                                    </td>
                                    <td className="px-10 py-8 text-center">
                                        <input 
                                            type="number" 
                                            defaultValue={student.internal} 
                                            className="w-20 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-center font-black text-sm outline-none focus:border-red-600/30 transition-all" 
                                        />
                                    </td>
                                    <td className="px-10 py-8 text-center">
                                        <input 
                                            type="number" 
                                            defaultValue={student.external} 
                                            className="w-20 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-center font-black text-sm outline-none focus:border-red-600/30 transition-all" 
                                        />
                                    </td>
                                    <td className="px-10 py-8 text-center">
                                        <span className="text-xl font-black italic tracking-tighter text-slate-900 dark:text-white">{student.total}</span>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <Badge className={`px-5 py-2 rounded-full text-[10px] font-black italic tracking-tighter ${
                                            student.grade.startsWith('A') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-600'
                                        }`}>
                                            {student.grade}
                                        </Badge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
};

const KPIStat = ({ label, val, icon: Icon, color }) => (
    <Card className="p-8 bg-white dark:bg-[#0a0a0b] border-white/5 flex items-center justify-between group overflow-hidden relative">
        <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="space-y-4 relative z-10">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">{label}</p>
            <h4 className="text-3xl font-black italic tracking-tighter uppercase">{val}</h4>
        </div>
        <div className={`w-14 h-14 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center ${color} group-hover:bg-red-600 group-hover:text-white transition-all`}>
            <Icon size={24} />
        </div>
    </Card>
);

export default EnterMarks;
