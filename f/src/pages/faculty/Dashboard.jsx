import React, { useState, useEffect } from 'react';
import { 
  Users, BookOpen, CalendarCheck, FileText, 
  TrendingUp, Clock, Bell, ChevronRight, ArrowUpRight
} from 'lucide-react';
import Badge from '../../components/ui/Badge.jsx';
import Card from '../../components/ui/Card.jsx';
import API_BASE_URL from '../../config';

const FacultyDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/dashboard/faculty`)
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
          Faculty <span className="text-red-600">Overview.</span>
        </h2>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 opacity-60 italic">Identity Node: {JSON.parse(localStorage.getItem('user'))?.username} // Faculty Terminal Active</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPIStat card={{ label: 'Total Students', val: data.totalStudents, icon: Users, color: 'text-emerald-500', trend: 'Active' }} />
        <KPIStat card={{ label: 'Average Attendance', val: `${data.averageAttendance}%`, icon: CalendarCheck, color: 'text-indigo-500', trend: 'Daily' }} />
        <KPIStat card={{ label: 'Active Courses', val: data.activeCourses, icon: BookOpen, color: 'text-amber-500', trend: 'Semester' }} />
        <KPIStat card={{ label: 'Pending Grades', val: data.pendingGrades, icon: FileText, color: 'text-red-500', trend: 'Urgent' }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <Card className="bg-white dark:bg-[#0a0a0b] p-6 border-white/5">
            <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2 mb-6">
              <Clock size={16} className="text-red-500" /> Faculty Operational Timeline
            </h3>
            <div className="space-y-4">
              {data.timetable.map((slot, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white dark:bg-white/10 rounded-xl flex items-center justify-center font-black text-red-600 shadow-sm">{slot.time.split(' ')[0]}</div>
                    <div>
                        <p className="text-xs font-black uppercase tracking-tight">{slot.subject}</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Room: {slot.room}</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-500">Scheduled</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <Card className="bg-white dark:bg-[#0a0a0b] p-8 space-y-8 border-white/5">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <Bell size={16} className="text-indigo-500" /> Task Queue
            </h3>
            <div className="space-y-4">
              {data.upcomingTasks.map((task, i) => (
                <div key={i} className="p-6 rounded-3xl bg-slate-50 dark:bg-white/3 border border-slate-100 dark:border-white/5 group hover:bg-slate-900 transition-all duration-500 cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <Badge className={`px-3 py-1 text-[8px] font-black tracking-widest ${task.priority === 'High' ? 'bg-red-500 text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-500'}`}>{task.priority}</Badge>
                    <span className="text-[10px] font-black text-slate-400 uppercase italic tracking-widest">{task.due}</span>
                  </div>
                  <h4 className="text-xs font-black uppercase tracking-tight leading-tight transition-colors group-hover:text-white">{task.title}</h4>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

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

export default FacultyDashboard;
