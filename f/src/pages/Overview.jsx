import React, { useState, useEffect } from 'react';
import { 
  Shield, Activity, Users, Globe, 
  Terminal, Database, AlertCircle, ChevronRight, Server,
  BookOpen, Clock, Zap, TrendingUp, Calendar, 
  Award, FileText, BarChart3, PieChart as PieIcon,
  ArrowUpRight, Monitor, Cpu
} from 'lucide-react';
import Card from '../components/ui/Card.jsx';
import Badge from '../components/ui/Badge.jsx';

const Overview = () => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);

    const endpoint = userData?.role === 'ADMIN' ? 'admin' : 
                     userData?.role === 'FACULTY' ? 'faculty' : 'student';
    
    fetch(`http://localhost:5000/api/dashboard/${endpoint}`)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setData({});
        setLoading(false);
      });
  }, []);

  if (loading || !user) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
    </div>
  );

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-1000">
      {/* 0. Header Node */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
            <h2 className="text-4xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white leading-none">
            System <span className="text-red-600">Intelligence.</span>
            </h2>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 opacity-60 italic">Deep Analysis // Identity: {user.username} // Node: {user.role}_HUB_01</p>
        </div>
        <div className="flex items-center gap-4 bg-slate-100 dark:bg-white/5 px-6 py-3 rounded-2xl border border-slate-200 dark:border-white/10">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Ledger Status: Optimal</span>
        </div>
      </div>

      {/* 1. Global KPI Cluster */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {user.role === 'STUDENT' ? (
            <>
                <KPIStat label="Academic CGPA" val={data?.cgpa || '8.42'} icon={Award} color="text-red-600" trend="+0.2" />
                <KPIStat label="Presence Sync" val={`${data?.attendancePercentage || 88}%`} icon={Calendar} color="text-indigo-500" trend="Safe" />
                <KPIStat label="LMS Maturity" val={`${data?.completionPercentage || 65}%`} icon={Zap} color="text-amber-500" trend="+12%" />
                <KPIStat label="Knowledge Nodes" val={data?.coursesEnrolled || 6} icon={BookOpen} color="text-emerald-500" trend="Active" />
            </>
        ) : user.role === 'FACULTY' ? (
            <>
                <KPIStat label="Total Impact" val={data?.totalStudents || 156} icon={Users} color="text-red-600" trend="Students" />
                <KPIStat label="Grade Progress" val="92%" icon={TrendingUp} color="text-indigo-500" trend="Semester" />
                <KPIStat label="Average Sync" val={`${data?.averageAttendance || 82}%`} icon={Activity} color="text-emerald-500" trend="Presence" />
                <KPIStat label="Active Modules" val={data?.activeCourses || 4} icon={BookOpen} color="text-amber-500" trend="Courses" />
            </>
        ) : (
            <>
                <KPIStat label="Total Registry" val={data?.totalUsers || 2450} icon={Users} color="text-red-600" trend="Nodes" />
                <KPIStat label="System Uptime" val={data?.systemUptime || '99.9%'} icon={Activity} color="text-indigo-500" trend="Live" />
                <KPIStat label="Active Streams" val={data?.activeLogins || 420} icon={Globe} color="text-emerald-500" trend="Sync" />
                <KPIStat label="Alert Registry" val={data?.pendingRequests || 8} icon={AlertCircle} color="text-amber-500" trend="Watch" />
            </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 2. Main Analysis Sector */}
        <div className="lg:col-span-8 space-y-8">
            {/* Student Analysis: Academic Track */}
            {user.role === 'STUDENT' && (
                <div className="space-y-8">
                    <Card className="bg-white dark:bg-[#0a0a0b] border-white/5 overflow-hidden">
                        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-white/[0.02]">
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3">
                                <BarChart3 size={18} className="text-red-600" /> Academic Performance Matrix
                            </h3>
                            <button className="text-[10px] font-black uppercase text-red-600 border-b border-red-600/30">View Analysis</button>
                        </div>
                        <div className="p-10 grid md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Module Mastery Sync</p>
                                <div className="space-y-5">
                                    {(data?.mastery || [
                                        { name: 'Advanced React Architecture', progress: 65 },
                                        { name: 'Database Management Systems', progress: 30 },
                                        { name: 'Cloud Infrastructure with AWS', progress: 90 },
                                        { name: 'Neural Logic Architectures', progress: 45 },
                                        { name: 'Cyber-Sentinel Protocols', progress: 12 },
                                        { name: 'Enterprise ERP Management', progress: 55 }
                                    ]).map((m, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                                <span>{m.name}</span>
                                                <span>{m.progress}%</span>
                                            </div>
                                            <div className="h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden p-[2px]">
                                                <div className="h-full rounded-full bg-red-600" style={{ width: `${m.progress}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-6">
                                <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Recent Validation Results</p>
                                <div className="space-y-3">
                                    {(data?.results || [
                                        { subject: 'React Sync', grade: 'A+', marks: '94/100' },
                                        { subject: 'DBMS Logic', grade: 'A', marks: '88/100' },
                                        { subject: 'Cloud Arch', grade: 'B+', marks: '76/100' },
                                        { subject: 'Neural Net', grade: 'A-', marks: '82/100' }
                                    ]).map((r, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-white dark:bg-white/10 rounded-xl flex items-center justify-center font-black text-xs text-red-600 shadow-sm">{r.grade}</div>
                                                <span className="text-[10px] font-black uppercase tracking-tight">{r.subject}</span>
                                            </div>
                                            <span className="text-[9px] font-bold text-slate-400 italic">{r.marks}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="bg-white dark:bg-[#0a0a0b] p-8 border-white/5">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3">
                                <Clock size={18} className="text-red-600" /> Operational Timeline
                            </h3>
                            <Badge className="bg-red-600/10 text-red-600 border-none">Cycle 04 Active</Badge>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {(data?.timeline || [
                                { time: '09:00 - 10:00', title: 'React Performance Lab', location: 'L-401', active: true },
                                { time: '11:00 - 12:00', title: 'DBMS Schema Workshop', location: 'A-202', active: false },
                                { time: '14:00 - 15:30', title: 'Neural Logic Seminar', location: 'Tech-01', active: false }
                            ]).map((s, i) => (
                                <div key={i} className={`p-6 rounded-3xl border transition-all ${s.active ? 'bg-red-600 text-white border-red-600 shadow-glow shadow-red-600/20' : 'bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/10'}`}>
                                    <p className="text-[8px] font-black uppercase tracking-widest opacity-60 mb-2">{s.time}</p>
                                    <h4 className="text-sm font-black uppercase tracking-tight italic">{s.title}</h4>
                                    <p className="text-[10px] font-bold uppercase tracking-widest mt-1 opacity-60">{s.location}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            )}

            {/* Faculty Analysis: Class & Course Forge */}
            {user.role === 'FACULTY' && (
                <div className="space-y-8">
                    <Card className="bg-white dark:bg-[#0a0a0b] border-white/5 overflow-hidden">
                        <div className="p-8 border-b border-white/5 flex items-center justify-between">
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3">
                                <Monitor size={18} className="text-indigo-500" /> Pedagogical Performance Matrix
                            </h3>
                        </div>
                        <div className="p-10 space-y-8">
                            <div className="grid md:grid-cols-2 gap-10">
                                {(data?.performance || [
                                    { course: 'Adv Web Systems', presence: 84, assignments: '12/14' },
                                    { course: 'Node Architecture', presence: 76, assignments: '10/12' }
                                ]).map((c, i) => (
                                    <div key={i} className="space-y-4 p-6 rounded-[2rem] bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5">
                                        <div className="flex justify-between items-center">
                                            <h4 className="text-xs font-black uppercase tracking-widest italic">{c.course}</h4>
                                            <Badge className="bg-emerald-500/10 text-emerald-500 border-none">Active</Badge>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-400">
                                                <span>Session Presence</span>
                                                <span className="text-red-600">{c.presence}% Avg</span>
                                            </div>
                                            <div className="h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-red-600" style={{ width: `${c.presence}%` }} />
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-slate-500 pt-2 border-t border-slate-200 dark:border-white/5">
                                            <span>Assignments: {c.assignments} Cleared</span>
                                            <span>Exam: In 2d</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                    <Card className="bg-white dark:bg-[#0a0a0b] p-8 border-white/5">
                         <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3 mb-8">
                            <Award size={18} className="text-amber-500" /> Professional Metrics
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { l: 'Feedback Score', v: data?.metrics?.feedback || '4.85/5', c: 'text-indigo-500' },
                                { l: 'Modules Authored', v: data?.metrics?.authored || '18', c: 'text-emerald-500' },
                                { l: 'Research Citations', v: data?.metrics?.citations || '142', c: 'text-red-600' },
                                { l: 'Industry Sync', v: data?.metrics?.industrySync || '98%', c: 'text-amber-500' }
                            ].map((m, i) => (
                                <div key={i} className="text-center space-y-1">
                                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{m.l}</p>
                                    <h5 className={`text-xl font-black italic tracking-tighter uppercase ${m.c}`}>{m.v}</h5>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            )}

            {/* Admin Analysis: Global Infrastructure */}
            {user.role === 'ADMIN' && (
                <div className="space-y-8">
                    <Card className="bg-white dark:bg-[#0a0a0b] border-white/5 overflow-hidden">
                        <div className="p-8 border-b border-white/5 flex items-center justify-between">
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3">
                                <Cpu size={18} className="text-red-600" /> System Topology Synchronization
                            </h3>
                            <Badge className="bg-emerald-500/10 text-emerald-500 border-none">Optimal Status</Badge>
                        </div>
                        <div className="p-10 space-y-10">
                            <div className="grid md:grid-cols-3 gap-8">
                                {(data?.topology || [
                                    { name: 'ERP Hub Alpha', load: '12%', status: 'Optimal' },
                                    { name: 'LMS Knowledge Stream', load: '84%', status: 'Load Warning' },
                                    { node: 'Auth Gateway Secure', load: '05%', status: 'Optimal' }
                                ]).map((n, i) => (
                                    <div key={i} className="p-6 rounded-[2rem] bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 space-y-4 hover:border-red-600/30 transition-all">
                                        <div className="flex justify-between items-center">
                                            <p className="text-[10px] font-black uppercase tracking-tight">{n.name || n.node}</p>
                                            <div className={`w-2 h-2 rounded-full ${n.status === 'Optimal' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-[8px] font-black uppercase text-slate-400">
                                                <span>IO Load</span>
                                                <span className="text-white">{n.load}</span>
                                            </div>
                                            <div className="h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                                                <div className={`h-full ${n.status === 'Optimal' ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: n.load }} />
                                            </div>
                                        </div>
                                        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 italic">{n.status}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-slate-100 dark:border-white/5">
                                 {[
                                    { l: 'Network Latency', v: '14ms', c: 'text-indigo-500' },
                                    { l: 'Encryption Node', v: 'SHA-512', c: 'text-red-600' },
                                    { l: 'Data Replication', v: 'Real-time', c: 'text-emerald-500' },
                                    { l: 'Auth Sequences', v: '4.2k/h', c: 'text-amber-500' }
                                 ].map((s, i) => (
                                    <div key={i} className="space-y-1">
                                        <p className="text-[8px] font-black uppercase tracking-widest text-slate-500">{s.l}</p>
                                        <h6 className={`text-base font-black italic tracking-tighter uppercase ${s.c}`}>{s.v}</h6>
                                    </div>
                                 ))}
                            </div>
                        </div>
                    </Card>

                    <Card className="bg-[#0a0a0b] text-white p-8 border-white/5 relative overflow-hidden group">
                         <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/[0.04] rounded-full blur-[100px]" />
                         <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-3 italic text-red-600 mb-8">
                            <Shield size={16} /> Identity Security Audit Ledger
                        </h3>
                        <div className="space-y-6 relative z-10">
                            {(data?.auditLogs || [
                                { event: 'New Administrator Node Identification: ADMIN_SEC_01', time: '4m ago' },
                                { event: 'LMS Storage Matrix auto-expansion success', time: '1h ago' },
                                { event: 'Batch user registry sync completed for semester-04', time: '3h ago' },
                                { event: 'Security block: Attempted intrusion at Node_77', time: '5h ago' }
                            ]).map((l, i) => (
                                <div key={i} className="flex justify-between items-start text-[10px] font-bold uppercase tracking-widest pb-4 border-b border-white/5 last:border-0">
                                    <span className="text-slate-400 group-hover:text-white transition-colors">{l.event}</span>
                                    <span className="text-red-600 italic shrink-0 ml-10">{l.time}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            )}
        </div>

        {/* 3. Auxiliary Insights Sector (East) */}
        <div className="lg:col-span-4 space-y-8">
            <Card className="bg-[#0a0a0b] text-white p-10 space-y-10 border-red-600/10 shadow-2xl shadow-red-600/5 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-red-600/20 transition-all duration-700" />
               <div className="relative z-10 flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-3 italic">
                     <Zap size={16} className="text-red-600" /> Pulse Analysis
                  </h3>
                  <ArrowUpRight size={16} className="text-slate-600 group-hover:text-white transition-colors" />
               </div>

               <div className="space-y-8 relative z-10">
                  {user.role === 'STUDENT' ? (
                      <>
                        <div className="space-y-3">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Global Knowledge Sync</p>
                            <h4 className="text-3xl font-black italic tracking-tighter uppercase leading-none">65% <span className="text-xs text-red-600 opacity-60">Complete</span></h4>
                        </div>
                         <div className="space-y-4 pt-4 border-t border-white/10">
                            {['React Synth', 'DBMS Logic', 'Cloud Arch', 'Neural Logic', 'Cyber-Sentinel', 'ERP Sync'].slice(0, 4).map((c, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">
                                        <span>{c}</span>
                                        <span>{80 - (i*15)}%</span>
                                    </div>
                                    <div className="h-1 bg-white/5 rounded-full">
                                        <div className="h-full bg-red-600 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]" style={{ width: `${80 - (i*15)}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                      </>
                  ) : (
                      <>
                        <div className="space-y-3 text-center py-6">
                            <PieIcon size={64} className="text-red-600 mx-auto opacity-20" />
                            <h4 className="text-2xl font-black italic tracking-tighter uppercase leading-none">Operational <span className="text-red-600">Sync</span></h4>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-black italic mt-2">All Nodes Synchronized // 0 Latency</p>
                        </div>
                        <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-6">
                            <div className="text-center">
                                <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Global Load</p>
                                <p className="text-lg font-black text-white italic tracking-tighter">8.4%</p>
                            </div>
                            <div className="text-center">
                                <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Active Auth</p>
                                <p className="text-lg font-black text-white italic tracking-tighter">1.2k/m</p>
                            </div>
                        </div>
                      </>
                  )}
               </div>

               <div className="pt-8 relative z-10">
                  <button className="w-full bg-white/5 border border-white/5 hover:bg-white/10 hover:border-red-600/20 py-4 rounded-3xl text-[9px] font-black uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-3 italic">
                     Detail Registry <ChevronRight size={12} />
                  </button>
               </div>
            </Card>

            <Card className="bg-white dark:bg-[#0a0a0b] p-8 space-y-8 border-white/5 shadow-xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity" />
               <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-3 relative z-10">
                  <FileText size={16} className="text-red-600" /> Active Registry Alert Hub
               </h3>
               <div className="space-y-5 relative z-10">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-5 rounded-3xl bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 flex items-start gap-4 hover:border-red-600/20 transition-all cursor-pointer">
                        <div className={`mt-1 h-1.5 w-1.5 rounded-full shrink-0 ${i === 1 ? 'bg-red-500 animate-pulse' : 'bg-indigo-500'}`} />
                        <div>
                            <p className="text-[9px] font-black text-slate-900 dark:text-slate-300 leading-tight uppercase tracking-tight">System validation required for node ID: 0x{i}82A</p>
                            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-1 block">2h ago // Registry Hub</span>
                        </div>
                    </div>
                  ))}
               </div>
            </Card>
        </div>
      </div>
    </div>
  );
};

const KPIStat = ({ label, val, icon: Icon, color, trend }) => (
    <Card className="p-8 bg-white dark:bg-[#0a0a0b] border-white/5 flex items-center justify-between group overflow-hidden relative shadow-lg hover:border-red-600/20 transition-all">
        <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-3">
                <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.3em]">{label}</p>
                <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[8px] font-black tracking-widest px-2 py-0.5">{trend}</Badge>
            </div>
            <h4 className="text-3xl font-black italic tracking-tighter uppercase leading-none">{val}</h4>
        </div>
        <div className={`w-14 h-14 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center ${color} group-hover:bg-red-600 group-hover:text-white transition-all`}>
            <Icon size={24} />
        </div>
    </Card>
);

export default Overview;
