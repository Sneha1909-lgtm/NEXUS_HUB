import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, 
  Settings, Maximize, CheckCircle2, List, 
  ChevronLeft, MessageSquare, Download, Share2,
  Clock, BookOpen, Shield, Zap
} from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';

const CoursePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeModule, setActiveModule ] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(65);

  const courseData = {
    title: 'Advanced React Architecture',
    instructor: 'Dr. Michael Chen',
    modules: [
      { id: 1, title: 'Introduction to Atomic Design', duration: '12:45', status: 'completed' },
      { id: 2, title: 'Mastering React Suspense', duration: '18:20', status: 'completed' },
      { id: 3, title: 'Concurrency & Render Loops', duration: '24:00', status: 'active' },
      { id: 4, title: 'Design Patterns for Scale', duration: '15:10', status: 'locked' },
      { id: 5, title: 'Final Architectural Audit', duration: '30:00', status: 'locked' }
    ]
  };

  return (
    <div className="space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* 🧭 Navigation Header */}
      <div className="flex items-center justify-between bg-white/5 backdrop-blur-xl p-4 rounded-3xl border border-white/10 group">
         <button 
           onClick={() => navigate('/portal/lms/student/courses')}
           className="flex items-center gap-3 px-6 py-3 hover:bg-white/5 rounded-2xl transition-all text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-white"
         >
            <ChevronLeft size={16} /> Exit Terminal
         </button>
         <div className="text-center">
            <h2 className="text-sm font-black italic tracking-widest text-white uppercase group-hover:text-red-600 transition-colors uppercase">{courseData.title}</h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1 italic">Active Cycle: {courseData.modules[activeModule].title}</p>
         </div>
         <Badge className="bg-red-600/10 text-red-600 border-none px-4 py-2 text-[8px] font-black tracking-[0.2em] shadow-glow shadow-red-600/10">SYNC_ACTIVE</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 🎬 Main Player Node */}
        <div className="lg:col-span-8 space-y-6">
           <div className="relative aspect-video bg-black rounded-[2.5rem] overflow-hidden border border-white/10 shadow-3xl group">
             {/* Holographic Video Placeholder */}
             <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 via-black to-slate-900">
                <div className="w-32 h-32 bg-red-600/20 rounded-full flex items-center justify-center animate-pulse-glow">
                   <Zap size={48} className="text-red-600" />
                </div>
                <div className="absolute bottom-12 left-12 space-y-2 opacity-60">
                   <p className="text-[10px] font-black uppercase tracking-widest text-red-600">Secure Content Stream</p>
                   <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-white">Encrypted Node: {id}-RX-77</p>
                </div>
             </div>

             {/* Player Controls Overlay */}
             <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent p-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="space-y-6">
                   <div className="flex items-center gap-6 text-white">
                      <SkipBack size={24} className="cursor-pointer hover:text-red-600 transition-colors" />
                      <button onClick={() => setIsPlaying(!isPlaying)} className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                         {isPlaying ? <Pause size={32} /> : <Play size={32} fill="black" />}
                      </button>
                      <SkipForward size={24} className="cursor-pointer hover:text-red-600 transition-colors" />
                      
                      <div className="flex-1 px-8 space-y-2">
                         <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <span>{courseData.modules[activeModule].duration}</span>
                            <span>Remaining: 04:22</span>
                         </div>
                         <div className="h-1.5 bg-white/10 rounded-full cursor-pointer relative group/progress">
                            <div className="h-full bg-red-600 rounded-full" style={{ width: '70%' }} />
                            <div className="absolute top-1/2 -translate-y-1/2 left-[70%] w-4 h-4 bg-white border-2 border-red-600 rounded-full opacity-0 group-hover/progress:opacity-100 scale-0 group-hover/progress:scale-100 transition-all shadow-glow shadow-red-600/40" />
                         </div>
                      </div>

                      <div className="flex items-center gap-6 opacity-80">
                         <Volume2 size={20} className="hover:text-red-600 cursor-pointer" />
                         <Settings size={20} className="hover:text-red-600 cursor-pointer" />
                         <Maximize size={20} className="hover:text-red-600 cursor-pointer" />
                      </div>
                   </div>
                </div>
             </div>
           </div>

           <Card className="bg-white/5 border-white/10 p-10 space-y-8 glossy-panel">
              <div className="flex items-center justify-between pb-8 border-b border-white/5">
                 <h3 className="text-xl font-black italic tracking-tighter uppercase text-white">Module Intelligence</h3>
                 <div className="flex gap-4">
                    <button className="p-4 bg-white/5 hover:bg-red-600/10 hover:text-red-600 rounded-2xl border border-white/5 transition-all">
                       <Download size={18} />
                    </button>
                    <button className="p-4 bg-white/5 hover:bg-red-600/10 hover:text-red-600 rounded-2xl border border-white/5 transition-all">
                       <Share2 size={18} />
                    </button>
                 </div>
              </div>
              <div className="space-y-6">
                 <p className="text-sm font-bold text-slate-400 leading-relaxed uppercase tracking-tight italic opacity-80">
                    This session deep dives into the core architectural principles of Atomic Design in React. We will explore how to decouple UI logic from global state containers while maintaining a rigid, testable structure for enterprise-grade scalability.
                 </p>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
                    <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                       <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">XP Gain</p>
                       <p className="text-lg font-black italic text-red-600 leading-none">+450</p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                       <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">IQ Level</p>
                       <p className="text-lg font-black italic text-indigo-500 leading-none">Architect</p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                       <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Validated</p>
                       <p className="text-lg font-black italic text-emerald-500 leading-none">88%</p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                       <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Sync Status</p>
                       <p className="text-lg font-black italic text-amber-500 leading-none">Optimal</p>
                    </div>
                 </div>
              </div>
           </Card>
        </div>

        {/* 📋 Module Knowledge Grid */}
        <div className="lg:col-span-4 space-y-8">
           <Card className="bg-[#0a0a0b] text-white p-8 border-white/10 h-full flex flex-col relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center justify-between mb-10">
                 <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-3 italic">
                    <List size={16} className="text-red-600" /> Module Sync Node
                 </h3>
                 <Badge className="bg-white/5 text-slate-400 border-none px-3 text-[8px]">{courseData.modules.length} Nodes</Badge>
              </div>

              <div className="flex-1 space-y-4">
                 {courseData.modules.map((m, idx) => (
                    <div 
                      key={m.id} 
                      onClick={() => setActiveModule(idx)}
                      className={`
                        p-5 rounded-3xl border transition-all cursor-pointer group/item
                        ${idx === activeModule ? 'bg-red-600 border-red-600 shadow-glow shadow-red-600/20' : 'bg-white/5 border-white/5 hover:border-red-600/30'}
                      `}
                    >
                       <div className="flex items-center justify-between mb-3">
                          <span className={`text-[8px] font-black uppercase tracking-widest opacity-60 ${idx === activeModule ? 'text-white' : 'text-slate-500'}`}>0{idx + 1} // Duration {m.duration}</span>
                          {m.status === 'completed' && <CheckCircle2 size={12} className={idx === activeModule ? 'text-white' : 'text-emerald-500'} />}
                       </div>
                       <h4 className={`text-[11px] font-black uppercase italic tracking-tight ${idx === activeModule ? 'text-white' : 'text-slate-300'}`}>{m.title}</h4>
                    </div>
                 ))}
              </div>

              <div className="mt-10 pt-8 border-t border-white/10 space-y-4">
                 <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                    <span>Course Progress Velocity</span>
                    <span className="text-red-600">{progress}%</span>
                 </div>
                 <div className="h-2 bg-white/5 rounded-full overflow-hidden p-[2px]">
                    <div className="h-full bg-red-600 shadow-glow shadow-red-600/40 rounded-full" style={{ width: `${progress}%` }} />
                 </div>
                 <button className="w-full mt-6 bg-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] text-black hover:bg-slate-200 transition-all flex items-center justify-center gap-3">
                    Validate Module <Zap size={14} className="animate-pulse" />
                 </button>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
