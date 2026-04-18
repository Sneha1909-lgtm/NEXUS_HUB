import React from 'react';
import { Activity, BarChart2, Server, DownloadCloud, Zap, Users, Shield, Cpu } from 'lucide-react';
import Card from '../../components/ui/Card.jsx';

const AdminReports = () => {
  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white">
            System <span className="text-red-600">Telemetry.</span>
            </h2>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 opacity-60 italic">Node: METRICS_TERMINAL_9X // Real-Time Scan</p>
        </div>
        <button className="w-full md:w-auto bg-red-600 text-white px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] shadow-glow shadow-red-600/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 group">
            <DownloadCloud size={16} className="group-hover:-translate-y-1 transition-transform" />
            Export Data Matrix
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <ReportCard icon={<Users />} title="Concurrent Nodes" value="4,242" trend="+12% Synced" up />
         <ReportCard icon={<Zap />} title="System Latency" value="14 ms" trend="Optimal Output" up />
         <ReportCard icon={<BookOpen />} title="Course Injections" value="8.4K" trend="+4% Weekly" up />
         <ReportCard icon={<Shield />} title="Threat Detentions" value="0" trend="Perimeter Secure" up />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
           <Card className="bg-white dark:bg-[#0a0a0b] border-white/5 overflow-hidden shadow-2xl p-8 h-full min-h-[400px] flex flex-col justify-between">
              <div className="flex justify-between items-center mb-8">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2">
                    <Activity size={14} className="text-red-600" />
                    Network Traffic Waveform
                 </h3>
                 <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full animate-pulse">Live Tracking</span>
              </div>
              <div className="w-full h-48 bg-gradient-to-t from-red-600/20 to-transparent blur-3xl absolute bottom-0 left-0 right-0 pointer-events-none" />
              <div className="w-full flex-1 border-b border-l border-white/10 flex items-end justify-between px-4 pb-2 pt-20 relative z-10">
                 {/* Mock Chart Bars */}
                 {[40, 70, 45, 90, 65, 100, 30, 80, 50, 85, 60, 40].map((h, i) => (
                    <div key={i} className="w-[4%] bg-red-600 rounded-t-sm hover:bg-white transition-colors cursor-crosshair group relative" style={{ height: `${h}%` }}>
                       <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{h}K Req</div>
                    </div>
                 ))}
              </div>
              <div className="flex justify-between mt-4 px-4 text-[9px] font-black text-slate-600 uppercase tracking-widest">
                 <span>00:00</span>
                 <span>06:00</span>
                 <span>12:00</span>
                 <span>18:00</span>
                 <span>23:59</span>
              </div>
           </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
           <Card className="bg-white dark:bg-[#0a0a0b] border-white/5 p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-[50px] group-hover:bg-red-600/20 transition-colors" />
              <div className="relative z-10 flex items-center gap-4 mb-4">
                 <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-600/40 flex items-center justify-center text-red-500"><Server size={18} /></div>
                 <div>
                    <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Database Sync</h4>
                    <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Primary Cluster</p>
                 </div>
              </div>
              <div className="space-y-4">
                 <div>
                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest mb-1.5"><span className="text-slate-400">Storage Cap</span><span className="text-white">68%</span></div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="w-[68%] h-full bg-red-600 rounded-full" /></div>
                 </div>
                 <div>
                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest mb-1.5"><span className="text-slate-400">Compute Load</span><span className="text-white">42%</span></div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="w-[42%] h-full bg-indigo-500 rounded-full" /></div>
                 </div>
              </div>
           </Card>
           
           <Card className="bg-gradient-to-br from-red-900 to-black border-red-600/30 p-8 relative overflow-hidden group">
              <div className="absolute -right-8 -bottom-8 opacity-20 group-hover:scale-110 transition-transform"><Cpu size={120} /></div>
              <div className="relative z-10">
                 <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white mb-2">Generate<br/>Full Audit.</h2>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-red-200/60 mb-6 max-w-[80%] line-clamp-3">Compile all system metrics, security logs, and user identity states into a single encrypted matrix.</p>
                 <button className="bg-white text-black px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-glow hover:scale-[1.02] shadow-white/20 transition-all">Initiate Sequence</button>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
};

const ReportCard = ({ icon, title, value, trend, up }) => (
    <Card className="p-6 bg-white dark:bg-[#0a0a0b] border-white/5 group hover:border-red-600/30 transition-all flex flex-col justify-between min-h-[140px] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-white/[0.02] rounded-full blur-3xl pointer-events-none group-hover:bg-red-600/10 transition-all" />
        <div className="flex items-start justify-between relative z-10">
           <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-2xl text-slate-400 group-hover:text-red-500 group-hover:bg-red-500/10 transition-all border border-transparent group-hover:border-red-500/20">{icon}</div>
           <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 bg-white/5 px-2 py-1 rounded-md">{trend}</span>
        </div>
        <div className="relative z-10 mt-auto">
           <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 mb-1">{title}</p>
           <h4 className="text-3xl font-black italic tracking-tighter uppercase text-white">{value}</h4>
        </div>
    </Card>
);

const BookOpen = ({ size = 24, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;

export default AdminReports;
