import React from 'react';
import { BookOpen, MoreVertical, Edit2, Trash2, Search, Filter, Plus } from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';

const AdminCourses = () => {
  const courses = [
    { id: 'CRS_001', name: 'Cloud Native Architecture', category: 'TECHNOLOGY', enrollments: 280, status: 'ACTIVE', rating: '4.7 / 5.0' },
    { id: 'CRS_092', name: 'Project Management Core', category: 'BUSINESS', enrollments: 154, status: 'ACTIVE', rating: '4.2 / 5.0' },
    { id: 'CRS_114', name: 'Cybersecurity Fundamentals', category: 'SECURITY', enrollments: 320, status: 'UPDATING', rating: '4.9 / 5.0' },
    { id: 'CRS_115', name: 'Graphic Design Masterclass', category: 'ARTS', enrollments: 89, status: 'INACTIVE', rating: 'N/A' },
  ];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white">
            Course <span className="text-red-600">Registry.</span>
            </h2>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 opacity-60 italic">Node: CURRICULUM_MATRIX_01 // Read-Write Active</p>
        </div>
        <button className="w-full md:w-auto bg-red-600 text-white px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] shadow-glow shadow-red-600/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 group">
            <Plus size={16} className="group-hover:rotate-90 transition-transform" />
            Initialize Course Node
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatSmall label="Total Course Nodes" val="1,048" color="text-indigo-500" />
            <StatSmall label="Active Synced" val="940" color="text-emerald-500" />
            <StatSmall label="Needs Updates" val="12" color="text-amber-500" />
            <StatSmall label="Global Enrollments" val="45K+" color="text-red-600" />
        </div>

        <div className="lg:col-span-12">
            <Card className="bg-white dark:bg-[#0a0a0b] border-white/5 overflow-hidden shadow-2xl">
                <div className="p-8 border-b border-slate-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-600 transition-colors" size={20} />
                        <input 
                            type="text" 
                            placeholder="Scan Knowledge Matrix..." 
                            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-5 pl-16 pr-6 outline-none focus:border-red-600/30 dark:focus:bg-white/10 transition-all font-bold tracking-tight text-xs uppercase"
                        />
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <button className="flex-1 md:flex-none p-5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-500 hover:text-red-600 transition-all">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-white/[0.02]">
                                <th className="px-10 py-6 text-left text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Knowledge Core</th>
                                <th className="px-10 py-6 text-left text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Category Tag</th>
                                <th className="px-10 py-6 text-left text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Node Status</th>
                                <th className="px-10 py-6 text-left text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Metrics Sync</th>
                                <th className="px-10 py-6 text-right text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Edit Controls</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {courses.map((course) => (
                                <tr key={course.id} className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-colors">
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 font-black text-xs border border-slate-200 dark:border-white/10 group-hover:bg-red-600 group-hover:text-white transition-all">
                                                <BookOpen size={18} />
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-black uppercase tracking-tight group-hover:text-red-600 transition-colors">{course.name}</h4>
                                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">ID: {course.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <Badge className="px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border border-white/5 bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300">
                                            {course.category}
                                        </Badge>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${course.status === 'ACTIVE' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : course.status === 'UPDATING' ? 'bg-amber-500 animate-pulse' : 'bg-slate-500'}`} />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{course.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex flex-col gap-1">
                                           <span className="text-[10px] font-bold text-white uppercase tracking-widest">{course.enrollments} Students</span>
                                           <span className="text-[8px] font-bold text-red-600 uppercase tracking-[0.2em] italic">Rating: {course.rating}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <div className="flex items-center justify-end gap-3 opacity-20 group-hover:opacity-100 transition-opacity">
                                            <button className="p-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-500 hover:text-red-600 hover:bg-white dark:hover:bg-white/10 transition-all">
                                                <Edit2 size={16} />
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

export default AdminCourses;
