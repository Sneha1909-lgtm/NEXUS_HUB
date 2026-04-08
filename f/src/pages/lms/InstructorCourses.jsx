import React from 'react';
import { PlusCircle, MoreVertical, Edit2, Play, Users, BarChart, BookOpen, ChevronRight, Zap } from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';

const InstructorCourses = () => {
  const publishedCourses = [
    { title: 'Full-Stack Web Dev with Node Synthesis', students: 450, lessons: 15, rating: 4.8, status: 'PUBLISHED', revenue: '₹45k' },
    { title: 'Designing High-Conversion Logic Systems', students: 120, lessons: 8, rating: 4.9, status: 'PUBLISHED', revenue: '₹12k' },
  ];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      {/* 0. Header Node */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white">
            Instructor <span className="text-red-600">Forge.</span>
            </h2>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 opacity-60 italic">Host Node: FAC_LRN_SYNC // Pedagogical Assets Valid</p>
        </div>
        <button className="w-full md:w-auto bg-red-600 text-white px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] shadow-glow shadow-red-600/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 group">
            <PlusCircle size={20} className="group-hover:rotate-90 transition-transform" />
            Initialize Knowledge Asset
        </button>
      </div>

      {/* 1. Instructor KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatSmall label="Active Students" val="570" icon={Users} color="text-indigo-500" />
        <StatSmall label="LMS Revenue Hub" val="₹57,000" icon={Zap} color="text-amber-500" />
        <StatSmall label="Average Reputation" val="4.85" icon={BarChart} color="text-emerald-500" />
      </div>

      {/* 2. Content Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {publishedCourses.map((course, i) => (
          <Card key={i} className="p-10 flex border-white/5 relative overflow-hidden group bg-white dark:bg-[#0a0a0b] shadow-2xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/5 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:bg-red-600/10 transition-all duration-700" />
            
            <div className="flex-1 space-y-8 relative z-10">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <h3 className="text-xl font-black uppercase tracking-tight leading-tight group-hover:text-red-600 transition-colors italic">{course.title}</h3>
                  <Badge className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/10 rounded-full px-4 py-1.5 text-[8px] font-black tracking-widest">{course.status}</Badge>
                </div>
                <button className="p-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-400 hover:text-white transition-all">
                  <MoreVertical size={20} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6 text-center bg-slate-50 dark:bg-white/5 p-6 rounded-3xl border border-slate-100 dark:border-white/5 transition-colors group-hover:border-red-600/20">
                <div className="space-y-1">
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Impact</p>
                  <p className="text-sm font-black flex items-center justify-center gap-2"><Users size={14} className="text-red-600" /> {course.students}</p>
                </div>
                <div className="border-x border-slate-100 dark:border-white/10 space-y-1">
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Nodes</p>
                  <p className="text-sm font-black flex items-center justify-center gap-2"><Play size={14} className="text-red-600" /> {course.lessons}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Metrics</p>
                  <p className="text-sm font-black flex items-center justify-center gap-2 text-amber-500 italic"><Zap size={14} /> {course.rating}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 py-5 bg-red-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 shadow-glow shadow-red-600/20 hover:scale-[1.02] active:scale-95 transition-all italic">
                  <Edit2 size={16} /> Modify Content
                </button>
                <button className="px-8 py-5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-all">
                  Registry
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* 3. Initiation Link */}
      <Card className="p-12 bg-white dark:bg-[#0a0a0b] border-dashed border-2 border-slate-200 dark:border-white/10 text-center flex flex-col items-center gap-6 group hover:border-red-600/30 transition-all">
        <div className="w-20 h-20 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center justify-center text-slate-400 group-hover:text-red-600 group-hover:bg-red-600/5 group-hover:border-red-600/20 transition-all duration-500 group-hover:rotate-12">
          <BookOpen size={40} />
        </div>
        <div className="max-w-md mx-auto space-y-3">
          <h4 className="text-xl font-black uppercase tracking-tight italic">Expand Your Pedagogical Reach</h4>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic leading-relaxed">System identified optimal bandwidth for new immersive learning nodes. Initialize a new knowledge stream today.</p>
        </div>
        <button className="px-12 py-5 bg-slate-900 text-white dark:bg-white/5 hover:bg-red-600 transition-all border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] italic shadow-glow hover:shadow-red-600/20">
          Begin Content Draft Sequence
        </button>
      </Card>
    </div>
  );
};

const StatSmall = ({ label, val, icon: Icon, color }) => (
    <Card className="p-8 bg-white dark:bg-[#0a0a0b] border-white/5 flex items-center justify-between group overflow-hidden relative">
        <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="space-y-4 relative z-10">
            <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.3em]">{label}</p>
            <h4 className="text-3xl font-black italic tracking-tighter uppercase">{val}</h4>
        </div>
        <div className={`w-14 h-14 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center ${color} group-hover:bg-red-600 group-hover:text-white transition-all`}>
            <Icon size={24} />
        </div>
    </Card>
);

export default InstructorCourses;
