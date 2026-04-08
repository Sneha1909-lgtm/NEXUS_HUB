import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, CalendarCheck, FileText, Globe, 
  TrendingUp, CreditCard, Clock, Bell, AlertTriangle,
  ChevronRight, ArrowUpRight, BookOpen
} from 'lucide-react';
import Badge from '../../components/ui/Badge.jsx';
import Card from '../../components/ui/Card.jsx';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Identity Sync with Backend DTO
    fetch('http://localhost:5000/api/dashboard/student')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
    </div>
  );

  return (
    <div className="space-y-8 pb-12">
      {/* 0. Header Node */}
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white">
          System <span className="text-red-600">Overview.</span>
        </h2>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 opacity-60 italic">Identity Node: {JSON.parse(localStorage.getItem('user'))?.username} // ERP Pulse Active</p>
      </div>

      {/* 1. Industrial KPI Cluster */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPIStat card={{ label: 'Attendance Sync', val: `${data.attendancePercentage}%`, icon: CalendarCheck, color: 'text-emerald-500', trend: '+2%' }} />
        <KPIStat card={{ label: 'Financial Hub (Due)', val: `₹${data.feeDue.toLocaleString()}`, icon: CreditCard, color: 'text-red-500', trend: 'Due 24h' }} />
        <KPIStat card={{ label: 'Knowledge Nodes', val: data.coursesEnrolled, icon: BookOpen, color: 'text-indigo-500', trend: 'Active' }} />
        <KPIStat card={{ label: 'LMS Completion', val: `${data.completionPercentage}%`, icon: TrendingUp, color: 'text-amber-500', trend: '+5% Avg' }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 2. ERP Analytics Sector (West) */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="bg-white dark:bg-[#0a0a0b] border-white/5 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
              <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                 <GraduationCap size={16} className="text-red-500" /> Academic ERP Analytics
              </h3>
              <Badge className="bg-emerald-500/10 text-emerald-500">Node Secure</Badge>
            </div>
            <div className="p-8 grid md:grid-cols-2 gap-12">
               {/* Attendance Matrix */}
               <div className="space-y-6">
                  <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Attendance Matrix</p>
                  <div className="space-y-4">
                    {data.erp.attendanceSummary.map((item, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-tight">
                          <span>{item.subject}</span>
                          <span className={item.percentage < 80 ? 'text-red-500' : 'text-emerald-500'}>{item.percentage}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all duration-1000 ${i % 2 === 0 ? 'bg-red-600' : 'bg-indigo-600'}`} style={{ width: `${item.percentage}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
               
               {/* Recent Results node */}
               <div className="space-y-6">
                  <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Recent Result Sync</p>
                  <div className="space-y-3">
                    {data.erp.recentResults.map((res, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-white dark:bg-white/10 rounded-xl flex items-center justify-center font-black text-red-600 shadow-sm">{res.grade}</div>
                           <span className="text-xs font-black uppercase tracking-tight italic">{res.subject}</span>
                        </div>
                        <span className="text-xs font-bold text-slate-400">{res.marks}/100</span>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </Card>

          {/* Today's Operational Timeline */}
          <div className="grid md:grid-cols-2 gap-8">
             <Card className="p-6 space-y-6 border-white/5 bg-white dark:bg-[#0a0a0b]">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 flex items-center gap-2">
                   <Clock size={14} /> Daily Op Schedule
                </h4>
                <div className="space-y-4">
                   {data.erp.timetable.map((slot, i) => (
                     <div key={i} className="relative pl-8 border-l-2 border-slate-100 dark:border-white/5 last:border-0 pb-6">
                        <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-red-600 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{slot.time}</p>
                        <h5 className="text-xs font-black uppercase tracking-tight mt-1">{slot.subject}</h5>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1 italic">{slot.room}</p>
                     </div>
                   ))}
                </div>
             </Card>

             <Card className="p-6 space-y-6 border-white/5 bg-white dark:bg-[#0a0a0b]">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 flex items-center gap-2">
                   <Bell size={14} /> Notification Cluster
                </h4>
                <div className="space-y-3">
                   {data.notifications.map((note) => (
                     <div key={note.id} className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 flex items-start gap-4 group cursor-pointer hover:border-indigo-500/20 transition-all">
                        <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${note.type === 'ALARM' ? 'bg-red-500 animate-pulse' : 'bg-indigo-500'}`} />
                        <p className="text-[10px] font-bold text-slate-600 dark:text-slate-400 leading-relaxed uppercase tracking-tight">{note.text}</p>
                     </div>
                   ))}
                </div>
             </Card>
          </div>
        </div>

        {/* 3. LMS Analytics Sector (East) */}
        <div className="lg:col-span-4 space-y-8">
           <Card className="bg-[#0a0a0b] text-white p-8 space-y-8 border-indigo-500/10 shadow-2xl shadow-indigo-500/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/20 transition-all duration-700" />
              
              <div className="relative z-10 flex items-center justify-between">
                 <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2 italic">
                    <Globe size={16} className="text-indigo-500" /> LMS Studio Sync
                 </h3>
                 <ArrowUpRight size={16} className="text-slate-600 group-hover:text-indigo-500 transition-colors" />
              </div>

              <div className="space-y-6 relative z-10">
                 {data.lms.courses.map((course, i) => (
                   <div key={i} className="space-y-3">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.1em]">
                        <span className="opacity-70">{course.name}</span>
                        <span className="text-indigo-400">{course.progress}%</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden p-[2px]">
                         <div className="h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(99,102,241,0.5)]" style={{ width: `${course.progress}%`, backgroundColor: course.color }} />
                      </div>
                   </div>
                 ))}
              </div>

              <div className="pt-6 relative z-10">
                 <button className="w-full bg-white/5 border border-white/5 hover:bg-white/10 hover:border-indigo-500/20 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-3 italic">
                    Enter Instructor Core <ChevronRight size={12} />
                 </button>
              </div>
           </Card>

           <Card className="bg-white dark:bg-[#0a0a0b] p-8 space-y-8 border-white/5">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                 <FileText size={16} className="text-red-500" /> Pending Task Vault
              </h3>
              <div className="space-y-4">
                 {data.lms.pendingAssignments.map((task, i) => (
                   <div key={i} className="p-6 rounded-3xl bg-slate-50 dark:bg-white/3 border border-slate-100 dark:border-white/5 group hover:bg-red-500 transition-all duration-500 cursor-pointer">
                      <div className="flex justify-between items-start mb-4">
                         <Badge className={`px-3 py-1 text-[8px] font-black tracking-widest ${task.priority === 'High' ? 'bg-red-500 text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-500'} group-hover:bg-white group-hover:text-red-600 transition-colors`}>{task.priority}</Badge>
                         <span className="text-[10px] font-black text-slate-400 group-hover:text-white/60 uppercase italic tracking-widest">Due: {task.due}</span>
                      </div>
                      <h4 className="text-xs font-black uppercase tracking-tight leading-tight group-hover:text-white transition-colors">{task.title}</h4>
                   </div>
                 ))}
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
};

// UI Atomic Node: KPI Stat
const KPIStat = ({ card }) => (
  <Card className="p-8 space-y-6 bg-white dark:bg-[#0a0a0b] border-white/5 hover:border-red-500/20 transition-all group overflow-hidden relative">
    <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="flex items-start justify-between relative z-10">
      <div className={`w-12 h-12 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center ${card.color} group-hover:bg-red-600 group-hover:text-white transition-all`}>
        <card.icon size={22} />
      </div>
      <span className="text-[9px] font-black uppercase text-emerald-500 tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full">{card.trend}</span>
    </div>
    <div className="space-y-2 relative z-10">
      <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">{card.label}</p>
      <h4 className="text-3xl font-black italic tracking-tighter uppercase">{card.val}</h4>
    </div>
  </Card>
);

export default Dashboard;
