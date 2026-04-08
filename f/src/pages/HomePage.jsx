import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, GraduationCap, MapPin, Globe, 
  BookOpen, Sparkles, Monitor, Award,
  Instagram, Twitter, Facebook, ChevronRight, Mail, Phone, Flame, Target
} from 'lucide-react';
import Badge from '../components/ui/Badge.jsx';
import Card from '../components/ui/Card.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

// Institutional Assets from src/picture/
import logo from '../picture/logo.png';
import campusAerial from '../picture/hero_campus.png';
import roboticsLab from '../picture/activity_lab.png';
import campusEvent from '../picture/lgu_event.png';
import campusSports from '../picture/activity_sports.png';

const HomePage = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

    const stats = [
        { label: 'PhD FACULTY NODE', val: '500+', icon: GraduationCap, color: 'text-red-500' },
        { label: 'ACRE CAMPUS HUB', val: '100+', icon: MapPin, color: 'text-indigo-500' },
        { label: 'INDEXED PUBLISH', val: '12K+', icon: BookOpen, color: 'text-emerald-500' },
        { label: 'PLACEMENT SYNC', val: '100%', icon: Award, color: 'text-amber-500' }
    ];

    const colleges = [
        { name: "College of Engineering", desc: "Digital Architecture & Code Synthesis" },
        { name: "School of Management", desc: "Economic Strategy & Global Commerce" },
        { name: "Architecture Hub", desc: "Structural Vision & Urban Design" },
        { name: "Pharmacy Matrix", desc: "Biomedical Logic & Synth-Research" },
        { name: "Legal Academy", desc: "Constitutional Core & Justice Ops" },
        { name: "Fine Arts Center", desc: "Creative Logic & Aesthetic Pulse" }
    ];

    return (
        <div className="bg-white dark:bg-[#050507] text-slate-900 dark:text-white transition-colors duration-700 overflow-hidden selection:bg-red-500/20 pt-24 min-h-screen">
            
            <nav className="fixed top-0 w-full z-[100] bg-white/60 dark:bg-black/60 backdrop-blur-3xl border-b border-red-500/10">
                <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
                    <motion.div initial={{ x: -20 }} animate={{ x: 0 }} className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center p-2 shadow-2xl border border-red-50">
                            <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
                        </div>
                        <div className="hidden sm:block">
                            <span className="block font-black text-xl italic uppercase tracking-tighter text-slate-900 dark:text-white">KL Nexus Portal</span>
                            <span className="block text-[8px] font-black tracking-[0.4em] uppercase text-red-500">Institutional Terminal</span>
                        </div>
                    </motion.div>

                    <div className="hidden lg:flex items-center gap-12">
                        {['Admissions', 'Academics', 'Research', 'Campus'].map(item => (
                            <a key={item} href="#" className="relative group text-[10px] font-black uppercase tracking-[0.2em] hover:text-red-500 transition-colors">
                                {item}
                                <span className="absolute -bottom-2 left-0 w-0 h-px bg-red-500 group-hover:w-full transition-all duration-500" />
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-6">
                        <Link to="/login" className="hidden sm:flex bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.3em] px-10 py-4 rounded-xl shadow-lg shadow-red-500/20 hover:scale-105 active:scale-95 transition-all">Portal Entry <ArrowRight size={14} className="ml-2" /></Link>
                    </div>
                </div>
            </nav>

            <header className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <img src={campusAerial} className="w-full h-full object-cover opacity-30 dark:opacity-20 grayscale hover:grayscale-0 transition-all duration-1000" alt="KL Nexus Canvas" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050507]/0 via-[#050507]/50 to-[#050507]" />
                </div>
                
                <div className="max-w-6xl w-full grid lg:grid-cols-12 gap-12 items-center relative z-10">
                    <div className="lg:col-span-8 space-y-8 text-center lg:text-left">
                        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                            <Badge className="bg-red-500/10 text-red-500 border-red-500/10 px-6 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.5em] mb-6">Asset Sync: Institutional Master Node</Badge>
                            <h1 className="text-4xl sm:text-[6rem] font-black tracking-tighter italic uppercase leading-none text-slate-900 dark:text-white">
                                NEXUS <br /> <span className="text-red-600 opacity-90">PORTAL.</span>
                            </h1>
                            <p className="max-w-lg lg:ml-0 mx-auto text-lg font-bold text-slate-400 dark:text-slate-500 mt-6 tracking-tight leading-relaxed italic border-l-4 border-red-600 pl-6">
                                Converging Academic Excellence with <span className="text-red-600">Industrial Synergy</span>. Recognized as Category-I University by UGC.
                            </p>
                        </motion.div>
                        
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8">
                            <button className="primary-button relative overflow-hidden group">
                                <span className="relative z-10 flex items-center gap-3">Enquire Node <Sparkles size={18} /></span>
                            </button>
                            <Link to="/register" className="px-12 py-5 bg-white dark:bg-white/5 border-2 border-red-600/10 rounded-2xl font-black uppercase tracking-[0.3em] hover:bg-red-600/10 transition-all flex items-center gap-3 group">
                                Enrollment Terminal <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    <div className="lg:col-span-4 relative hidden lg:block">
                        <motion.div 
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 6, repeat: Infinity }}
                            className="w-full aspect-square bg-white/5 backdrop-blur-3xl rounded-[5rem] border border-red-500/10 flex items-center justify-center relative shadow-2xl overflow-hidden group"
                        >
                            <img src={logo} className="w-56 h-56 object-contain z-10 brightness-110 drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]" alt="KL Nexus Node" />
                            <img src={roboticsLab} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity" alt="Nodal Pulse" />
                        </motion.div>
                    </div>
                </div>
            </header>

            <section className="relative py-20 px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {stats.map((s, i) => (
                        <Card key={i} className="bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[1.5rem] text-center group hover:bg-red-600 transition-all duration-700 shadow-xl">
                            <div className={`w-12 h-12 rounded-xl bg-slate-50 dark:bg-white/10 flex items-center justify-center mx-auto mb-6 ${s.color} group-hover:bg-white group-hover:text-red-500 transition-all`}>
                                <s.icon size={24} />
                            </div>
                            <h3 className="text-4xl font-black group-hover:text-white transition-colors tracking-tighter italic">{s.val}</h3>
                            <p className="text-[8px] font-black text-slate-400 group-hover:text-white/40 uppercase tracking-[0.2em] mt-2">{s.label}</p>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="py-40 px-8 max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-10 relative">
                     <Badge className="bg-red-500/5 text-red-500 border-none text-[8px] font-black uppercase tracking-[0.5em] px-6 py-2 rounded-full">Visionary Synthesis</Badge>
                     <h2 className="text-4xl sm:text-6xl font-black tracking-tighter italic uppercase text-slate-900 dark:text-white leading-none">
                        World Class <br /> <span className="text-red-600">Intelligence.</span>
                     </h2>
                     <p className="text-xl font-bold leading-relaxed text-slate-400 border-l-4 border-slate-100 dark:border-white/5 pl-10">
                        KLEF revels fosters amicable learning environment. Recognized as Category-I University by UGC, we consistently achieve top national/international rankings.
                     </p>
                     <div className="grid grid-cols-2 gap-6">
                        <img src={campusSports} className="rounded-3xl h-40 w-full object-cover grayscale hover:grayscale-0 transition-all" alt="Life Hub" />
                        <img src={campusEvent} className="rounded-3xl h-40 w-full object-cover grayscale hover:grayscale-0 transition-all" alt="Center Pulse" />
                     </div>
                </div>
                <div className="relative group">
                     <Card className="p-0 rounded-[4rem] overflow-hidden border-8 border-white dark:border-white/5 shadow-2xl relative z-10 transition-transform duration-1000 group-hover:rotate-1">
                        <img src={campusAerial} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Institutional Node View" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-16">
                            <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase">Academic Hub</h3>
                            <p className="text-[10px] font-black text-white/60 tracking-widest uppercase mt-4">Structural Vision & Digital Architecture</p>
                        </div>
                     </Card>
                </div>
            </section>

            <section className="py-40 bg-slate-100/50 dark:bg-white/[0.02]">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="text-center mb-24 max-w-2xl mx-auto space-y-6">
                        <Badge className="bg-red-600 text-white border-none text-[8px] font-black px-6 py-2 rounded-full uppercase tracking-[0.4em]">Integrated Hubs</Badge>
                        <h2 className="text-5xl sm:text-7xl font-black italic tracking-tighter uppercase">Academic <span className="text-red-600 italic">Colleges.</span></h2>
                        <div className="w-24 h-1.5 bg-red-600 mx-auto rounded-full" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {colleges.map((c, i) => (
                             <Card key={i} className="bg-white dark:bg-white/5 p-8 rounded-3xl border border-red-500/5 hover:bg-red-600 transition-all duration-700 group cursor-pointer shadow-lg relative overflow-hidden">
                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500 mb-6 group-hover:bg-white group-hover:text-red-600 transition-all">
                                         <GraduationCap size={24} />
                                    </div>
                                    <h4 className="text-xl font-black uppercase mb-3 leading-tight group-hover:text-white">{c.name}</h4>
                                    <p className="text-[9px] font-bold text-slate-400 group-hover:text-white/40 uppercase tracking-widest leading-none">{c.desc}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="bg-white dark:bg-black pt-40 border-t border-red-500/10 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 mb-32 relative z-10">
                    <div className="space-y-12">
                        <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center p-2 shadow-2xl overflow-hidden">
                            <img src={logo} className="w-20 h-20 object-contain" alt="Footer Node" />
                        </div>
                        <p className="text-sm font-black text-slate-400 leading-relaxed uppercase tracking-tighter opacity-60">
                            Koneru Lakshmaiah Education Foundation. <br />Category-I Deemed to be University.
                        </p>
                        <div className="flex gap-8">
                           <Instagram size={24} className="hover:text-red-500 transition-colors cursor-pointer" />
                           <Twitter size={24} className="hover:text-red-500 transition-colors cursor-pointer" />
                           <Facebook size={24} className="hover:text-red-500 transition-colors cursor-pointer" />
                        </div>
                    </div>

                    <div className="space-y-10">
                        <h4 className="text-xl font-black uppercase italic text-red-500">Nodal Sectors</h4>
                        <ul className="space-y-5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                             {['Admissions 2026', 'PG Academic Hub', 'PhD Research Node', 'Hostel Matrix', 'Skill Sync'].map(link => (
                                 <li key={link} className="hover:text-red-500 transition-colors cursor-pointer flex items-center gap-2 group whitespace-nowrap">
                                     <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500" /> {link}
                                 </li>
                             ))}
                        </ul>
                    </div>

                    <div className="space-y-10">
                        <h4 className="text-xl font-black uppercase italic text-red-500">Institutional Ops</h4>
                        <ul className="space-y-5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                             {['Careers @ KLEF', 'Photo Artifacts', 'Student Grievance', 'Anti-Ragging Node', 'Women Cell'].map(link => (
                                 <li key={link} className="hover:text-red-500 transition-colors cursor-pointer flex items-center gap-2 group whitespace-nowrap">
                                     <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500" /> {link}
                                 </li>
                             ))}
                        </ul>
                    </div>

                    <div className="space-y-10">
                        <Card className="bg-red-600 p-10 rounded-[3rem] text-white shadow-2xl shadow-red-500/20 border-none group cursor-pointer overflow-hidden relative">
                            <div className="relative z-10">
                                <h4 className="text-2xl font-black italic tracking-tighter uppercase mb-6">Contact Access</h4>
                                <div className="space-y-6 text-[10px] font-black uppercase tracking-widest text-white/70">
                                     <div className="flex items-center gap-4"><Mail size={16} /> admissions@klu.in</div>
                                     <div className="flex items-center gap-4"><Phone size={16} /> +91-863-2399999</div>
                                     <div className="flex items-center gap-4"><MapPin size={16} /> Guntur, AP, India</div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                <div className="border-t border-red-500/5 py-10 px-8 text-center bg-slate-50 dark:bg-black/40">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.4em] opacity-30 italic">© 2026 KLEF Deemed to be University. System Status: Optimal Sync.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
