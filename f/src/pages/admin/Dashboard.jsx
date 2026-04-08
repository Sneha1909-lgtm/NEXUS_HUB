import React, { useState, useEffect } from 'react';
import { 
  Shield, Activity, Users, Globe, 
  Terminal, Database, AlertCircle, ChevronRight, Server
} from 'lucide-react';
import Badge from '../../components/ui/Badge.jsx';
import Card from '../../components/ui/Card.jsx';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/dashboard/admin')
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
          Admin <span className="text-red-600">Overview.</span>
        </h2>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 opacity-60 italic">Identity Node: {JSON.parse(localStorage.getItem('user'))?.username} // System Integrity Optimal</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPIStat card={{ label: 'Total Users', val: data.totalUsers, icon: Users, color: 'text-indigo-500', trend: 'Global' }} />
        <KPIStat card={{ label: 'System Uptime', val: data.systemUptime, icon: Activity, color: 'text-emerald-500', trend: 'Live' }} />
        <KPIStat card={{ label: 'Active Logins', val: data.activeLogins, icon: Globe, color: 'text-amber-500', trend: 'Realtime' }} />
        <KPIStat card={{ label: 'Registry Alerts', val: data.pendingRequests, icon: AlertCircle, color: 'text-red-500', trend: 'Watch' }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-8">
          <Card className="bg-white dark:bg-[#0a0a0b] p-6 border-white/5">
            <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2 mb-6 text-red-600">
              <Server size={16} /> System Infrastructure Nodes
            </h3>
            <div className="space-y-4">
              {data.systemIntegrity.map((node, i) => (
                <div key={i} className="p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5 flex items-center justify-between group hover:border-red-600/30 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white dark:bg-white/10 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-red-600 transition-colors">
                      <Terminal size={20} />
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-widest">{node.node}</h4>
                      <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Status: <span className={node.status === 'Optimal' ? 'text-emerald-500' : 'text-amber-500'}>{node.status}</span></p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Load Factor</p>
                    <div className="w-24 h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-red-600" style={{ width: node.load }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <Card className="bg-[#0a0a0b] text-white p-8 space-y-8 border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2 italic">
               <Shield size={16} className="text-red-600" /> Security Audit Logs
            </h3>
            <div className="space-y-6 relative z-10">
              {data.recentLogs.map((log, i) => (
                <div key={i} className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest border-b border-white/5 pb-4 last:border-0">
                  <span className="text-slate-400">{log.event}</span>
                  <span className="text-red-600 italic">{log.time}</span>
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

export default AdminDashboard;
