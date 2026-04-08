import React from 'react';
import { UserPlus, MoreVertical, Edit2, Trash2, Shield, Search, Filter, ShieldCheck, Mail } from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';

const AdminUsers = () => {
  const users = [
    { id: 'SYS_001', name: 'Identity Admin', username: 'admin_sys', role: 'ADMIN', status: 'ACTIVE', lastRef: '2m ago' },
    { id: 'FAC_092', name: 'Dr. Sarah Smith', username: 'smith_fac', role: 'FACULTY', status: 'ACTIVE', lastRef: '45m ago' },
    { id: 'STD_441', name: 'John Doe', username: 'john_std', role: 'STUDENT', status: 'ACTIVE', lastRef: '1h ago' },
    { id: 'STD_442', name: 'Jane Wilson', username: 'jane_std', role: 'STUDENT', status: 'INACTIVE', lastRef: '3d ago' },
    { id: 'FAC_095', name: 'Prof. James Cooper', username: 'cooper_fac', role: 'FACULTY', status: 'ACTIVE', lastRef: '14m ago' },
  ];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      {/* 0. Header Node */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white">
            Identity <span className="text-red-600">Registry.</span>
            </h2>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 opacity-60 italic">Node: SECURITY_CORE_ALPHA // User Permissions Valid</p>
        </div>
        <button className="w-full md:w-auto bg-red-600 text-white px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] shadow-glow shadow-red-600/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 group">
            <UserPlus size={16} className="group-hover:rotate-12 transition-transform" />
            Initialize User Node
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 1. Global Identity Stats */}
        <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatSmall label="Total Identity Nodes" val="2,450" color="text-indigo-500" />
            <StatSmall label="Active Synced" val="1,220" color="text-emerald-500" />
            <StatSmall label="Inactive/Paused" val="45" color="text-slate-400" />
            <StatSmall label="Permission Alerts" val="02" color="text-red-600" />
        </div>

        {/* 2. Main Identity Matrix */}
        <div className="lg:col-span-12">
            <Card className="bg-white dark:bg-[#0a0a0b] border-white/5 overflow-hidden shadow-2xl">
                <div className="p-8 border-b border-slate-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-600 transition-colors" size={20} />
                        <input 
                            type="text" 
                            placeholder="Identify System Node..." 
                            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-5 pl-16 pr-6 outline-none focus:border-red-600/30 dark:focus:bg-white/10 transition-all font-bold tracking-tight text-xs uppercase"
                        />
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <button className="flex-1 md:flex-none p-5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-500 hover:text-red-600 transition-all">
                            <Filter size={18} />
                        </button>
                        <button className="flex-1 md:flex-none p-5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-500 hover:text-red-600 transition-all text-[10px] font-black uppercase tracking-widest px-8">
                            Bulk Action Matrix
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-white/[0.02]">
                                <th className="px-10 py-6 text-left text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Node Cluster</th>
                                <th className="px-10 py-6 text-left text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Permission Role</th>
                                <th className="px-10 py-6 text-left text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Status Node</th>
                                <th className="px-10 py-6 text-left text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Last Telemetry</th>
                                <th className="px-10 py-6 text-right text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Control Matrix</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {users.map((user) => (
                                <tr key={user.id} className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-colors">
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 font-black text-xs border border-slate-200 dark:border-white/10 group-hover:bg-red-600 group-hover:text-white transition-all">
                                                {user.name.substring(0, 2)}
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-black uppercase tracking-tight group-hover:text-red-600 transition-colors">{user.name}</h4>
                                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">ID: {user.id} // @{user.username}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <Badge className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border border-white/5 ${
                                            user.role === 'ADMIN' ? 'bg-indigo-600/10 text-indigo-500' : user.role === 'FACULTY' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'
                                        }`}>
                                            {user.role}
                                        </Badge>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${user.status === 'ACTIVE' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-500'}`} />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{user.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">{user.lastRef}</span>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <div className="flex items-center justify-end gap-3 opacity-20 group-hover:opacity-100 transition-opacity">
                                            <button className="p-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-500 hover:text-red-600 hover:bg-white dark:hover:bg-white/10 transition-all">
                                                <Edit2 size={16} />
                                            </button>
                                            <button className="p-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-500 hover:text-red-600 hover:bg-white dark:hover:bg-white/10 transition-all">
                                                <Mail size={16} />
                                            </button>
                                            <button className="p-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-500 hover:text-red-600 hover:bg-white dark:hover:bg-white/10 transition-all">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
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

const StatSmall = ({ label, val, color }) => (
    <Card className="p-6 bg-white dark:bg-[#0a0a0b] border-white/5 flex flex-col gap-2 group hover:border-red-600/30 transition-all">
        <p className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-400">{label}</p>
        <h4 className={`text-2xl font-black italic tracking-tighter uppercase ${color}`}>{val}</h4>
    </Card>
);

export default AdminUsers;
