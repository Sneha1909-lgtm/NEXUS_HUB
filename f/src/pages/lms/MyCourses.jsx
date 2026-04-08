import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, Clock, BarChart, ChevronRight, BookOpen, Globe, Award } from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/lms/my-courses/1')
      .then(res => res.json())
      .then(data => {
        const mappedData = data.map(c => ({
          ...c,
          title: c.name,
          instructor: c.instructor,
          image: c.image,
          progress: c.progress || 0,
          status: c.status || 'In Sync'
        }));
        setCourses(mappedData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch my courses:', err);
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
            Knowledge <span className="text-red-600">Assets.</span>
            </h2>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 opacity-60 italic">LMS Core Sync: ACTIVE // Learning Path Identified</p>
        </div>
        <button className="w-full md:w-auto bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:border-red-600/30 transition-all flex items-center justify-center gap-4 group">
            <Globe size={16} className="text-red-600 group-hover:rotate-45 transition-transform" />
            Explore Knowledge Grid
        </button>
      </div>

      {/* 1. Global Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatSmall label="Modules In Sync" val="03" icon={BookOpen} color="text-red-600" />
        <StatSmall label="Total Hours Logged" val="126.5" icon={Clock} color="text-indigo-500" />
        <StatSmall label="Certificates Earned" val="08" icon={Award} color="text-emerald-500" />
      </div>

      {/* 2. Course Matrix Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <Card key={course.id} className="bg-white dark:bg-[#0a0a0b] overflow-hidden group border-white/5 hover:border-red-600/20 transition-all shadow-2xl">
            <div className="relative h-56">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale-[0.2] group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/40 to-transparent"></div>
              <div className="absolute top-6 left-6">
                <Badge className="bg-red-600 text-white border-none px-4 py-1.5 text-[8px] font-black uppercase tracking-[0.2em]">{course.status}</Badge>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Link to={`/portal/lms/player/${course.id}`} className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center shadow-glow shadow-red-600/40 cursor-pointer hover:scale-110 transition-transform">
                    <PlayCircle size={32} />
                </Link>
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <h3 className="font-black text-lg uppercase tracking-tight leading-tight group-hover:text-red-600 transition-colors uppercase italic">{course.title}</h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">{course.instructor}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-slate-400">
                    <span className="flex items-center gap-2"><Clock size={12} className="text-red-600" /> {course.lessons} Lessons</span>
                    <span>{course.progress}% Complete</span>
                </div>
                
                <div className="w-full h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden p-[2px]">
                    <div 
                        className="h-full bg-red-600 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(239,68,68,0.3)]" 
                        style={{ width: `${course.progress}%` }}
                    ></div>
                </div>
              </div>
              
              <Link to={`/portal/lms/player/${course.id}`} className="w-full py-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-red-600/20 hover:bg-white dark:hover:bg-white/10 transition-all flex items-center justify-center gap-4 group/btn text-[10px] font-black uppercase tracking-[0.3em] italic">
                Resume Sync Cycle
                <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
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

export default MyCourses;
