import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, Users, ArrowRight, Globe, Zap, Shield, BookOpen } from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';
import API_BASE_URL from '../../config';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All Nodes');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All Nodes', 'Computer Science', 'Data Flow', 'Neural Design', 'Management'];

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/lms/courses`)
      .then(res => res.json())
      .then(data => {
        // Map database name to UI title
        const mappedData = data.map(c => ({
          ...c,
          title: c.name,
          students: c.studentsCount > 1000 ? `${(c.studentsCount / 1000).toFixed(1)}k` : c.studentsCount
        }));
        setCourses(mappedData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch courses:', err);
        setLoading(false);
      });
  }, []);

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
  };

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'All Nodes' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
    </div>
  );

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      {/* 0. Header Node */}
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white">
          Knowledge <span className="text-red-600">Exchange.</span>
        </h2>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 opacity-60 italic">Global Registry Node: LRN_HUB_GLOBAL // Access Level: UNRESTRICTED</p>
      </div>

      {/* 1. Global Search & Filter Sector */}
      <Card className="p-10 bg-white dark:bg-[#0a0a0b] border-white/5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10">
            <div className="space-y-4 max-w-xl text-center lg:text-left">
                <h3 className="text-xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white leading-tight">
                    Synchronize your skillset with <span className="text-red-600">Institutional Knowledge Assets.</span>
                </h3>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 leading-relaxed italic">Acquire official certification nodes from world-class faculty. Secure your digital pedigree.</p>
            </div>
            <div className="relative w-full lg:max-w-md group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-600 transition-colors" size={20} />
                <input 
                    type="text" 
                    placeholder="Search Knowledge Nodes..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-6 pl-16 pr-6 outline-none focus:border-red-600/30 dark:focus:bg-white/10 transition-all font-black tracking-tight text-xs uppercase"
                />
            </div>
        </div>
      </Card>

      {/* 2. Category Matrix */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((cat, i) => (
          <button 
            key={i} 
            onClick={() => setSelectedCategory(cat)}
            className={`px-8 py-4 rounded-2xl whitespace-nowrap text-[10px] font-black uppercase tracking-[0.3em] transition-all border ${
            selectedCategory === cat
            ? 'bg-red-600 text-white shadow-glow shadow-red-600/20 border-red-600' 
            : 'bg-white dark:bg-[#0a0a0b] text-slate-400 border-white/5 hover:border-red-600/20 hover:text-white'
          }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* 3. Knowledge Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course, i) => (
          <Card key={i} className="bg-white dark:bg-[#0a0a0b] group cursor-pointer hover:border-red-600/20 transition-all overflow-hidden border-white/5 shadow-2xl flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="h-56 bg-slate-100 dark:bg-white/[0.02] relative overflow-hidden">
                <img 
                  src={course.image} 
                  alt="" 
                  className="w-full h-full object-cover group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000" 
                  onError={handleImageError}
                />
                {/* 🛡️ Holographic Fallback Node */}
                <div className="hidden absolute inset-0 bg-[#0a0a0b] flex items-center justify-center">
                   <div className="w-full h-full bg-gradient-to-br from-red-600/20 via-transparent to-red-600/10 animate-pulse" />
                   <BookOpen size={48} className="absolute text-white/10" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/20 to-transparent" />
                
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                    <Badge className="bg-red-600 text-white shadow-glow shadow-red-600/20 text-[8px] font-black tracking-[0.3em] border-none">{course.complexity}</Badge>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0a0a0b]/60 backdrop-blur-md rounded-full text-amber-500 border border-white/10">
                        <Star size={10} fill="currentColor" />
                        <span className="text-[10px] font-black">{course.rating}</span>
                    </div>
                </div>
            </div>

            <div className="p-8 flex-1 flex flex-col space-y-6">
                <div className="space-y-3">
                    <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em] italic opacity-60">{course.category}</span>
                    <h3 className="text-lg font-black uppercase tracking-tight leading-tight group-hover:text-red-600 transition-colors italic whitespace-nowrap overflow-hidden text-overflow-ellipsis">{course.title}</h3>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-white/5">
                    <div className="flex items-center gap-4 text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">
                        <span className="flex items-center gap-2"><Users size={12} className="text-red-600" /> {course.students} Learners</span>
                    </div>
                    <span className="text-[9px] font-black text-slate-500 italic uppercase">Inst: {course.instructor}</span>
                </div>

                <Link to={`/portal/lms/module/${course.id}`} className="w-full py-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center gap-4 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all shadow-glow hover:shadow-red-600/30 font-black text-[10px] uppercase tracking-[0.4em] italic group/btn">
                    Initiate Modules <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
