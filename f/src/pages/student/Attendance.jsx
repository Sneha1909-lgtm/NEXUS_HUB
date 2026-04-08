import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { CheckCircle2, XCircle, AlertCircle, Calendar, TrendingUp, Filter, Download } from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';

const StudentAttendance = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const pieData = [
    { name: 'Present Sync', value: 85, color: '#ef4444' },
    { name: 'Node Offline', value: 15, color: '#1e293b' },
  ];

  const historyData = [
    { day: 'Mon', percentage: 100 },
    { day: 'Tue', percentage: 80 },
    { day: 'Wed', percentage: 100 },
    { day: 'Thu', percentage: 60 },
    { day: 'Fri', percentage: 100 },
  ];

  useEffect(() => {
    fetch('http://localhost:5000/api/lms/attendance/1')
      .then(res => res.json())
      .then(data => {
        // We need to group by subject name since the backend returns individual records
        const grouped = data.reduce((acc, current) => {
            const sName = current.Subject ? current.Subject.name : 'Unknown';
            if (!acc[sName]) {
                acc[sName] = { name: sName, total: 0, present: 0 };
            }
            acc[sName].total += 1;
            if (current.status === 'PRESENT') acc[sName].present += 1;
            return acc;
        }, {});

        const mappedData = Object.values(grouped).map(s => ({
            ...s,
            percentage: Math.round((s.present / s.total) * 100),
            status: (s.present / s.total) >= 0.85 ? 'Optimal' : (s.present / s.total) >= 0.75 ? 'Safe' : 'ALARM'
        }));

        setSubjects(mappedData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch attendance:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
    </div>
  );

  return (
    <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 0. Header Node */}
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white">
          Presence <span className="text-red-600">Telemetry.</span>
        </h2>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 opacity-60 italic">Node ID: ATT_STREAM_08 // Global Attendance Synchronization</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 1. Global Metrics Cluster */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="p-8 bg-white dark:bg-[#0a0a0b] border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="flex items-center justify-between mb-8 relative z-10">
                <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    <TrendingUp size={16} className="text-red-600" /> System Aggregation
                </h3>
                <Badge className="bg-emerald-500/10 text-emerald-500 border-none">Active</Badge>
            </div>
            
            <div className="h-64 relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ background: '#0a0a0b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '10px', textTransform: 'uppercase', fontWeight: '900' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <span className="text-4xl font-black italic tracking-tighter uppercase">85%</span>
                 <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Global Sync</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-100 dark:border-white/5">
                <div className="space-y-1">
                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Classes Logged</p>
                    <p className="text-xl font-black italic tracking-tighter">175</p>
                </div>
                <div className="space-y-1 text-right">
                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Total Absences</p>
                    <p className="text-xl font-black italic tracking-tighter text-red-600">26</p>
                </div>
            </div>
          </Card>

          <Card className="p-8 bg-[#0a0a0b] text-white border-white/5 space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 flex items-center gap-2">
                <Calendar size={14} /> Weekly Activity Node
            </h3>
            <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={historyData}>
                        <defs>
                            <linearGradient id="colorWave" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="percentage" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorWave)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest text-center">Stability Factor: High // Logic Sync: 0.98</p>
          </Card>
        </div>

        {/* 2. Module Matrix Cluster */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="bg-white dark:bg-[#0a0a0b] border-white/5 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                <div className="space-y-1">
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3">
                        <Filter size={18} className="text-red-500" /> Module Performance Matrix
                    </h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Detailed presence analytics per knowledge terminal</p>
                </div>
                <button className="bg-slate-900 text-white dark:bg-white/5 px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-red-600 transition-all flex items-center gap-3">
                    <Download size={14} /> Audit Trail
                </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-white/[0.02]">
                    <th className="px-8 py-6 text-left text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Module Label</th>
                    <th className="px-8 py-6 text-left text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Terminal Sync</th>
                    <th className="px-8 py-6 text-left text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Total Count</th>
                    <th className="px-8 py-6 text-right text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Status Node</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {subjects.map((sub, i) => (
                    <tr key={i} className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-colors">
                      <td className="px-8 py-6">
                        <span className="text-xs font-black uppercase tracking-tight">{sub.name}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                            <div className="flex-1 max-w-[100px] h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full rounded-full transition-all duration-1000 ${sub.percentage < 75 ? 'bg-red-600' : 'bg-red-600'}`} 
                                    style={{ width: `${sub.percentage}%` }} 
                                />
                            </div>
                            <span className="text-xs font-black italic tracking-tighter">{sub.percentage}%</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{sub.present} / {sub.total} Logs</span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <Badge className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${sub.status === 'Optimal' ? 'bg-emerald-500/10 text-emerald-500' : sub.status === 'Safe' ? 'bg-indigo-500/10 text-indigo-500' : 'bg-red-600/10 text-red-600 animate-pulse'}`}>
                            {sub.status === 'ALARM' ? <AlertCircle size={10} className="inline mr-1" /> : <CheckCircle2 size={10} className="inline mr-1" />}
                            {sub.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;
