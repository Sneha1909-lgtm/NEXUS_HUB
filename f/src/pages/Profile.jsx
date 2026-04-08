import React, { useState, useEffect } from 'react';
import { 
  User, Shield, Mail, Key, Phone, 
  MapPin, Globe, Fingerprint, Camera, 
  Settings, LogOut, Award, Briefcase,
  ExternalLink, CheckCircle2, AlertTriangle
} from 'lucide-react';
import Card from '../components/ui/Card.jsx';
import Badge from '../components/ui/Badge.jsx';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
    setLoading(false);
  }, []);

  if (loading || !user) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-1000 pb-20">
      {/* 🧬 Identity Header */}
      <div className="relative group">
         <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent rounded-[2.5rem] -z-10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
         <div className="flex flex-col md:flex-row items-center gap-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 glossy-panel">
            <div className="relative">
                <div className="w-32 h-32 md:w-44 md:h-44 bg-gradient-to-br from-red-600 to-red-800 rounded-3xl shadow-2xl border-4 border-white/10 flex items-center justify-center text-white text-5xl font-black group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                   {user.username.substring(0, 2).toUpperCase()}
                   <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Camera size={32} />
                   </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center text-emerald-500 shadow-xl">
                   <Shield size={20} />
                </div>
            </div>
            
            <div className="text-center md:text-left space-y-4">
                <div className="space-y-1">
                    <Badge className="bg-red-600/10 text-red-600 border-none px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
                        {user.role} CORE ACCESS
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none text-white transition-all">
                        {user.username}<span className="text-red-600 opacity-60">.SYS</span>
                    </h1>
                </div>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] flex items-center justify-center md:justify-start gap-4 italic opacity-80">
                   <span className="flex items-center gap-2 text-emerald-500"><CheckCircle2 size={12} /> IDENTITY_VERIFIED</span>
                   <span className="w-1 h-1 bg-white/20 rounded-full" />
                   <span>NODE_ID: 0x82A_{user.role}_ALPHA</span>
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
                   <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg shadow-red-600/20">
                      <Settings size={14} /> Configure Node
                   </button>
                   <button className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/10 flex items-center gap-2">
                      <ExternalLink size={14} /> Export Logs
                   </button>
                </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* 📊 Biometric Data Cluster */}
         <div className="lg:col-span-8 space-y-8">
            <Card className="bg-white/5 border-white/10 p-10 overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <Fingerprint size={120} className="text-white" />
                </div>
                <div className="relative z-10 space-y-10">
                    <h3 className="text-sm font-black uppercase tracking-[0.3em] flex items-center gap-3 italic">
                       <User size={18} className="text-red-600" /> Identity Record Matrix
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                        {[
                           { icon: Mail, label: 'Primary Nexus', value: `${user.username.toLowerCase()}@nexus.erp` },
                           { icon: Briefcase, label: 'Instructional Unit', value: 'Dept. of Advanced Computing' },
                           { icon: Phone, label: 'Secure Line', value: '+91 98765 43210' },
                           { icon: MapPin, label: 'Resident Node', value: 'Sector 7, Block-A, Hub-12' },
                           { icon:Globe, label: 'Region Sync', value: 'Asia/Kolkata (IST)' },
                           { icon: Award, label: 'Security Level', value: 'Level 4 // Administrator' }
                        ].map((item, i) => (
                           <div key={i} className="space-y-2 group/item">
                              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 opacity-60">
                                 <item.icon size={12} /> {item.label}
                              </p>
                              <p className="text-sm font-bold text-white uppercase tracking-tight group-hover/item:text-red-500 transition-colors">{item.value}</p>
                           </div>
                        ))}
                    </div>
                </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
               <Card className="bg-white/5 border-white/10 p-8 space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 flex items-center gap-2">
                     <Key size={14} /> Security Protocol
                  </h4>
                  <div className="space-y-4 pt-2">
                     <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-red-600/30 transition-all cursor-pointer">
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Password Matrix</span>
                        <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[8px]">Updated 12d ago</Badge>
                     </div>
                     <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-red-600/30 transition-all cursor-pointer">
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Two-Factor Sync</span>
                        <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[8px]">Active</Badge>
                     </div>
                  </div>
               </Card>

               <Card className="bg-[#0a0a0b] border-white/10 p-8 space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-3xl" />
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500 flex items-center gap-2">
                     <AlertTriangle size={14} /> Critical Systems
                  </h4>
                  <p className="text-[10px] font-bold text-slate-500 leading-relaxed pt-2"> Warning: Modifying root identity parameters may result in temporary node lockout. Contact the system administrator for hardware-level changes.</p>
                  <button className="w-full py-4 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-black uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all">
                     System Validation
                  </button>
               </Card>
            </div>
         </div>

         {/* 🔐 Sidebar Security Feed */}
         <div className="lg:col-span-4 space-y-8">
            <Card className="bg-[#0a0a0b] text-white p-8 border-white/10 relative group h-full">
               <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-3 italic text-red-600 mb-10">
                  <Shield size={16} /> Device Authentication Ledger
               </h3>
               
               <div className="space-y-8">
                  {[
                     { device: 'MacBook Pro - Node 99', loc: 'Mumbai, IN', time: 'ACTIVE_NOW', browser: 'Chrome 122' },
                     { device: 'iPhone 15 Pro - Node 12', loc: 'Delhi, IN', time: '2h ago', browser: 'Safari Mobile' },
                     { device: 'Linux System - Arch_0x', loc: 'Chennai, IN', time: 'Yesterday', browser: 'Firefox Quantum' }
                  ].map((d, i) => (
                     <div key={i} className="space-y-3 relative">
                        <div className="flex justify-between items-start">
                           <div>
                              <p className="text-[11px] font-black uppercase tracking-tight text-white mb-1">{d.device}</p>
                              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{d.loc} • {d.browser}</p>
                           </div>
                           <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${i === 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-white/5 text-slate-500'}`}>
                              {d.time}
                           </span>
                        </div>
                        {i < 2 && <div className="absolute -bottom-4 inset-x-0 h-px bg-white/5" />}
                     </div>
                  ))}
               </div>

               <div className="mt-12 pt-8 border-t border-white/5">
                  <button className="w-full bg-red-600/10 hover:bg-red-600 text-red-600 hover:text-white py-4 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all">
                     <LogOut size={16} /> Revoke All Active Sessions
                  </button>
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
};

export default Profile;
