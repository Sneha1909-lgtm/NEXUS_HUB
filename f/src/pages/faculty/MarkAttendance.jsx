import React, { useState } from 'react';
import { Save, UserCheck, UserX, Search, ShieldCheck, Filter, Clock, Users } from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';

const MarkAttendance = () => {
  const [students, setStudents] = useState([
    { id: '2024_S_001', name: 'Alice Johnson', status: 'PRESENT', lastSeen: '09:00 AM' },
    { id: '2024_S_002', name: 'Bob Smith', status: 'PRESENT', lastSeen: '09:05 AM' },
    { id: '2024_S_003', name: 'Charlie Davis', status: 'ABSENT', lastSeen: '---' },
    { id: '2024_S_004', name: 'Diana Prince', status: 'PRESENT', lastSeen: '08:58 AM' },
    { id: '2024_S_005', name: 'Evan Wright', status: 'PRESENT', lastSeen: '09:10 AM' },
  ]);

  const toggleStatus = (id) => {
    setStudents(students.map(s => 
      s.id === id ? { ...s, status: s.status === 'PRESENT' ? 'ABSENT' : 'PRESENT', lastSeen: s.status === 'PRESENT' ? '---' : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) } : s
    ));
  };

  const presentCount = students.filter(s => s.status === 'PRESENT').length;

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      {/* 0. Header Node */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white">
            Registry <span className="text-red-600">Entry.</span>
            </h2>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 opacity-60 italic">Session: OS_ARCH_401 // Auth Token: SYS_882</p>
        </div>
        <button className="w-full md:w-auto bg-red-600 text-white px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] shadow-glow shadow-red-600/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 group">
            <Save size={16} className="group-hover:rotate-12 transition-transform" />
            Commit Sync to Ledger
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 1. Context Cluster */}
        <div className="lg:col-span-12">
            <Card className="bg-white dark:bg-[#0a0a0b] p-8 border-white/5 flex flex-wrap items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-red-600/10 rounded-2xl flex items-center justify-center text-red-600 border border-red-600/20">
                        <Clock size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">Subject Node</p>
                        <h4 className="text-sm font-black uppercase tracking-tight">CS401 - Operating Systems Architecture</h4>
                    </div>
                </div>
                <div className="flex items-center gap-12">
                     <div className="text-center">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Authenticated</p>
                        <Badge className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/10 px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest">
                            <ShieldCheck size={10} className="inline mr-1" /> Identity Verified
                        </Badge>
                     </div>
                     <div className="text-right">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Presence Logic</p>
                        <h4 className="text-2xl font-black italic tracking-tighter text-red-600">{presentCount} / {students.length}</h4>
                     </div>
                </div>
            </Card>
        </div>

        {/* 2. Main Work Matrix */}
        <div className="lg:col-span-12">
            <Card className="bg-white dark:bg-[#0a0a0b] border-white/5 overflow-hidden shadow-2xl">
                <div className="p-8 border-b border-slate-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-600 transition-colors" size={18} />
                        <input 
                            type="text" 
                            placeholder="Identify Student Node..." 
                            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-5 pl-16 pr-6 outline-none focus:border-red-600/30 dark:focus:bg-white/10 transition-all font-bold tracking-tight text-xs uppercase"
                        />
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <button className="flex-1 md:flex-none p-5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-500 hover:text-red-600 transition-all">
                            <Filter size={18} />
                        </button>
                        <button className="flex-1 md:flex-none p-5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-500 hover:text-red-600 transition-all">
                            <Users size={18} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-white/[0.02]">
                                <th className="px-10 py-6 text-left text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Registry ID</th>
                                <th className="px-10 py-6 text-left text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Identification</th>
                                <th className="px-10 py-6 text-left text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Identity Status</th>
                                <th className="px-10 py-6 text-left text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Node Sync</th>
                                <th className="px-10 py-6 text-right text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Override Matrix</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {students.map((student) => (
                                <tr key={student.id} className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-colors">
                                    <td className="px-10 py-8">
                                        <span className="font-mono text-xs font-black text-slate-400 bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 uppercase italic">
                                            #{student.id}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8">
                                        <h4 className="text-xs font-black uppercase tracking-tight group-hover:text-red-600 transition-colors">{student.name}</h4>
                                    </td>
                                    <td className="px-10 py-8">
                                        <Badge className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                                            student.status === 'PRESENT' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-600/10 text-red-600'
                                        }`}>
                                            {student.status}
                                        </Badge>
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">{student.lastSeen}</span>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <button 
                                            onClick={() => toggleStatus(student.id)}
                                            className={`w-12 h-12 rounded-2xl transition-all flex items-center justify-center border ${
                                                student.status === 'PRESENT' 
                                                ? 'bg-red-600/5 text-red-600 border-red-600/10 hover:bg-red-600 hover:text-white' 
                                                : 'bg-emerald-500/5 text-emerald-500 border-emerald-500/10 hover:bg-emerald-500 hover:text-white'
                                            } active:scale-90`}
                                        >
                                            {student.status === 'PRESENT' ? <UserX size={20} /> : <UserCheck size={20} />}
                                        </button>
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

export default MarkAttendance;
