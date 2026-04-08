import React from 'react';
import { BookOpen, Award, Clock, MapPin, ChevronRight, FileText, Download } from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';

const StudentAcademic = () => {
  const stats = [
    { label: 'Academic Standing', value: '4th Sem', icon: BookOpen, color: 'text-red-500', trend: 'Level 4' },
    { label: 'Cumulative GPA', value: '8.4', icon: Award, color: 'text-indigo-500', trend: '+0.2 Boost' },
    { label: 'Active Modules', value: '06', icon: FileText, color: 'text-emerald-500', trend: 'In Sync' },
    { label: 'Class Load', value: '04', icon: Clock, color: 'text-amber-500', trend: 'Today' },
  ];

  const subjects = [
    { code: 'CS401', name: 'Operating Systems Architecture', faculty: 'Dr. Sarah Smith', room: 'L-201', credit: '04', status: 'Stable' },
    { code: 'CS402', name: 'Database Systems Synthesis', faculty: 'Prof. James Wilson', room: 'L-102', credit: '03', status: 'Optimal' },
    { code: 'CS403', name: 'Software Engineering Matrix', faculty: 'Dr. Jane Cooper', room: 'Lab-A', credit: '04', status: 'Stable' },
    { code: 'CS404', name: 'Theory of Computation Node', faculty: 'Prof. Robert Miller', room: 'L-301', credit: '03', status: 'Optimal' },
  ];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      {/* 0. Header Node */}
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white">
          Academic <span className="text-red-600">Terminal.</span>
        </h2>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 opacity-60 italic">Registry Node: CURR_SEM_04 // Academic Data Stream Active</p>
      </div>

      {/* 1. Stat Cluster */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="p-8 space-y-6 bg-white dark:bg-[#0a0a0b] border-white/5 hover:border-red-500/20 transition-all group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-start justify-between relative z-10">
              <div className={`w-12 h-12 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center ${stat.color} group-hover:bg-red-600 group-hover:text-white transition-all`}>
                <stat.icon size={22} />
              </div>
              <span className="text-[9px] font-black uppercase text-emerald-500 tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full">{stat.trend}</span>
            </div>
            <div className="space-y-2 relative z-10">
              <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">{stat.label}</p>
              <h4 className="text-3xl font-black italic tracking-tighter uppercase">{stat.value}</h4>
            </div>
          </Card>
        ))}
      </div>

      {/* 2. Primary Data Grid */}
      <Card className="bg-white dark:bg-[#0a0a0b] border-white/5 overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
            <div className="space-y-1">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3">
                    <BookOpen size={18} className="text-red-500" /> Current Enrollment Matrix
                </h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Academic Modules for Semester 04</p>
            </div>
            <button className="bg-slate-900 text-white dark:bg-white/5 px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-red-600 transition-all flex items-center gap-3">
                <Download size={14} /> Export Curriculum
            </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-white/[0.02]">
                <th className="px-8 py-6 text-left text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Node ID</th>
                <th className="px-8 py-6 text-left text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Knowledge Module</th>
                <th className="px-8 py-6 text-left text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Faculty Supervisor</th>
                <th className="px-8 py-6 text-left text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Location</th>
                <th className="px-8 py-6 text-right text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {subjects.map((sub, i) => (
                <tr key={i} className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-colors">
                  <td className="px-8 py-6">
                    <span className="font-mono text-xs font-black text-red-600 bg-red-600/5 px-3 py-1.5 rounded-lg border border-red-600/10 uppercase">{sub.code}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                        <span className="text-xs font-black uppercase tracking-tight">{sub.name}</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Credits: {sub.credit} AU</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-xs font-bold text-slate-600 dark:text-slate-400 italic">{sub.faculty}</td>
                  <td className="px-8 py-6">
                    <span className="flex items-center gap-2 text-xs font-black uppercase tracking-tighter text-slate-500">
                      <MapPin size={14} className="text-red-500" /> {sub.room}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <Badge className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest">{sub.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* 3. Auxiliary Data Sectors */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-8 bg-white dark:bg-[#0a0a0b] border-white/5 space-y-6">
           <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 flex items-center gap-2">
             <Clock size={14} /> Upcoming Assessments
           </h4>
           <div className="space-y-4">
              {[1, 2].map((_, i) => (
                <div key={i} className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 flex items-center justify-between group cursor-pointer hover:border-indigo-500/20 transition-all">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-black text-xs">T{i+1}</div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-tight">Theory of Computation Test</p>
                        <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">In 3 Days // 10:00 AM</p>
                      </div>
                   </div>
                   <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
              ))}
           </div>
        </Card>

        <Card className="p-8 bg-[#0a0a0b] text-white border-white/5 space-y-6 relative overflow-hidden group">
           <div className="absolute inset-0 bg-red-600/[0.03] pattern-grid-slate-100" />
           <h4 className="relative z-10 text-[10px] font-black uppercase tracking-[0.3em] text-red-500 flex items-center gap-2 italic">
             <Award size={14} /> Achievement Unlocks
           </h4>
           <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/10">
                 <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center text-amber-500 border border-amber-500/20">
                    <Award size={24} />
                 </div>
                 <div>
                    <h5 className="text-xs font-black uppercase tracking-tight">Dean's Honor Roll</h5>
                    <p className="text-[9px] text-slate-400 uppercase tracking-widest mt-1">Consistency Streak: 3 Semesters</p>
                 </div>
              </div>
           </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentAcademic;
