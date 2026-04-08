import React from 'react';
import RegisterForm from '../components/auth/RegisterForm.jsx';
import { motion } from 'framer-motion';
import { Home, Target, Globe, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../picture/logo.png';

const RegisterPage = () => {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-white dark:bg-[#050507] relative overflow-hidden flex items-center justify-center p-6 transition-colors duration-700"
        >
            {/* Background Canvas */}
            <div className="absolute inset-0 bg-red-600/[0.02] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
            <div className="absolute -top-[500px] -left-[500px] w-[1000px] h-[1000px] bg-red-600/[0.04] rounded-full blur-[200px] -z-10" />
            
            {/* System Home Hub */}
            <Link to="/" className="fixed top-10 left-10 z-[100] group flex items-center gap-4 bg-white/80 dark:bg-white/5 backdrop-blur-2xl border border-red-600/20 px-8 py-4 rounded-3xl shadow-2xl hover:bg-red-600 transition-all active:scale-95">
                <div className="w-10 h-10 bg-red-600/10 rounded-xl flex items-center justify-center text-red-600 group-hover:bg-white transition-all shadow-inner">
                    <Home size={20} />
                </div>
                <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-800 dark:text-white group-hover:text-white leading-none">System Home</span>
                    <span className="text-sm font-black uppercase tracking-tight text-red-600 group-hover:text-white italic">Nexus Terminal</span>
                </div>
            </Link>

            <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-20 items-center relative z-10">
                {/* 3D Focal Node (Idea from Home) */}
                <div className="hidden lg:block relative">
                   <motion.div 
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 6, repeat: Infinity }}
                        className="w-[500px] h-[500px] bg-gradient-to-br from-red-600/5 to-red-600/20 backdrop-blur-3xl rounded-[6rem] border border-red-600/10 flex items-center justify-center relative shadow-2xl overflow-hidden group"
                    >
                        <img src={logo} className="w-72 h-72 object-contain z-10 brightness-110 drop-shadow-[0_0_50px_rgba(255,255,255,0.4)]" alt="Institutional Focal Node" />
                        <BookOpen className="absolute top-12 left-12 text-red-600 opacity-20 animate-pulse" size={40} />
                        <Target className="absolute top-12 right-12 text-red-600 opacity-20 animate-pulse" size={40} />
                        <Globe className="absolute bottom-12 left-12 text-red-600 opacity-20 animate-spin-slow" size={40} />
                        
                        <div className="absolute -bottom-10 -right-10 flex flex-col gap-2 p-10 bg-white dark:bg-[#121214] rounded-3xl border border-red-600/10 shadow-2xl">
                            <span className="text-[9px] font-black text-red-600 uppercase tracking-[0.4em]">Register Node:</span>
                            <span className="text-xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter">REG_NODE_9X</span>
                        </div>
                    </motion.div>
                </div>

                {/* Enrollment Cluster */}
                <div className="w-full">
                     <RegisterForm />
                     <p className="mt-8 text-center text-[10px] font-black uppercase tracking-[0.4em] opacity-30 text-slate-400">
                        Institutional Global Enrollment Gateway // Identity Verified
                     </p>
                </div>
            </div>
            
            {/* Sync Metadata Node */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 opacity-20 hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] italic">KL UNIVERSITY DATA SYNC 2026 // ENROLLMENT PROTOCOL NODE</span>
            </div>
        </motion.div>
    );
};

export default RegisterPage;
