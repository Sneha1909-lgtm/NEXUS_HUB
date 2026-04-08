import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ClipboardList, Clock, CheckCircle2, AlertTriangle, 
  ChevronLeft, Upload, File, FileText, Download, 
  Trash2, Shield, Zap, Info, MessageSquare
} from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';

const AssignmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Mock data lookup based on ID - in a real app, this would be a fetch
  useEffect(() => {
     const mockAssignments = {
        "1": { title: 'Project Proposal: Neural Logic', course: 'React Architecture', deadline: '24 Apr 2024', status: 'PENDING', priority: 'High', description: 'Develop a comprehensive proposal for a neural-network powered logic gate system using React context for state propagation.' },
        "2": { title: 'Normalization Hub Exercise', course: 'DBMS Synthesis', deadline: '20 Apr 2024', status: 'SUBMITTED', priority: 'Normal', description: 'Extract and normalize a complex flat-file dataset into a 3NF relational schema suitable for institutional ERP deployment.', submittedFile: 'normalization_schema_v2.pdf', submittedDate: '12 Apr 2024' },
        "3": { title: 'React Performance Audit', course: 'Advanced Web Logic', deadline: '28 Apr 2024', status: 'PENDING', priority: 'Medium', description: 'Perform a full performance audit on the provided Nexus HUB dashboard using React Profiler and implement memoization strategies.' }
     };
     setAssignment(mockAssignments[id] || mockAssignments["1"]);
  }, [id]);

  if (!assignment) return null;

  const handleUpload = () => {
     setIsUploading(true);
     setTimeout(() => {
        setIsUploading(false);
        setAssignment({...assignment, status: 'SUBMITTED', submittedFile: 'active_submission_0x8.pdf', submittedDate: new Date().toLocaleDateString()});
     }, 2000);
  };

  return (
    <div className="space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* 🧭 Header Terminal */}
      <div className="flex items-center justify-between bg-white/5 backdrop-blur-xl p-4 rounded-3xl border border-white/10">
         <button 
           onClick={() => navigate('/portal/lms/student/assignments')}
           className="flex items-center gap-3 px-6 py-3 hover:bg-white/5 rounded-2xl transition-all text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-white"
         >
            <ChevronLeft size={16} /> Ledger Return
         </button>
         <Badge className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest ${
            assignment.status === 'PENDING' ? 'bg-amber-500/10 text-amber-500 border-amber-500/10' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/10 shadow-glow shadow-emerald-500/10'
         }`}>
            {assignment.status} SYNC
         </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* 📜 Content Node */}
         <div className="lg:col-span-8 space-y-8">
            <Card className="bg-white/5 border-white/10 p-10 glossy-panel space-y-10 relative group">
               <div className="space-y-4">
                  <div className="flex items-center gap-3">
                     <Badge className="bg-red-600/10 text-red-600 border-none text-[8px] font-black tracking-widest">{assignment.course}</Badge>
                     {assignment.priority === 'High' && <Badge className="bg-red-600 text-white border-none text-[8px] animate-pulse">CRITICAL_PRIORITY</Badge>}
                  </div>
                  <h1 className="text-4xl font-black italic tracking-tighter uppercase text-white leading-tight underline decoration-red-600/30 decoration-4 underline-offset-8">
                     {assignment.title}
                  </h1>
               </div>

               <div className="p-8 bg-black/40 rounded-[2rem] border border-white/5 space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-2">
                     <Info size={14} /> Mission Instructions
                  </h3>
                  <p className="text-sm font-bold text-slate-300 leading-relaxed uppercase tracking-tight italic opacity-80">
                     {assignment.description}
                  </p>
               </div>

               <div className="grid md:grid-cols-3 gap-6 pt-6">
                  <div className="space-y-2">
                     <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Termination Sequence</span>
                     <p className="text-sm font-black italic text-red-600 uppercase">{assignment.deadline}</p>
                  </div>
                  <div className="space-y-2">
                     <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Points Potential</span>
                     <p className="text-sm font-black italic text-indigo-500 uppercase">100 / 100 XP</p>
                  </div>
                  <div className="space-y-2">
                     <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Validation Status</span>
                     <p className="text-sm font-black italic text-emerald-500 uppercase">Authorized</p>
                  </div>
               </div>
            </Card>

            {/* 📤 Submission Protocol Zone */}
            {assignment.status === 'PENDING' ? (
               <Card className="bg-[#050507] border-white/10 p-12 border-dashed border-2 relative group overflow-hidden flex flex-col items-center justify-center space-y-8 min-h-[400px]">
                  <div className="absolute inset-0 bg-red-600/[0.01] group-hover:bg-red-600/[0.03] transition-all" />
                  <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-slate-500 group-hover:text-red-600 group-hover:scale-110 transition-all border border-white/10 group-hover:border-red-600/30">
                     {isUploading ? <Zap size={40} className="animate-spin" /> : <Upload size={40} />}
                  </div>
                  <div className="text-center relative z-10 space-y-3">
                     <h3 className="text-xl font-black italic tracking-widest text-white uppercase">Upload Sync Package</h3>
                     <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] italic">Drag & Drop valid .pdf, .zip, or .docx files // Max Payload 50MB</p>
                  </div>
                  <button 
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="relative z-10 px-12 py-5 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-slate-200 transition-all shadow-2xl disabled:opacity-50"
                  >
                     {isUploading ? 'SYNCHRONIZING...' : 'INITIALIZE UPLOAD'}
                  </button>
               </Card>
            ) : (
               <Card className="bg-white/5 border-white/10 p-10 glossy-panel overflow-hidden group">
                  <div className="flex items-center justify-between mb-8">
                     <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-3 italic text-emerald-500">
                        <Shield size={16} /> Submission Verified
                     </h3>
                     <Badge className="bg-emerald-500/10 text-emerald-500 border-none px-4 py-1.5 text-[8px] font-black tracking-widest">ENCRYPTED</Badge>
                  </div>
                  <div className="flex items-center justify-between p-8 bg-black/50 rounded-[2rem] border border-white/5 group/file hover:border-emerald-500/30 transition-all">
                     <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 border border-emerald-500/10">
                           <FileText size={32} />
                        </div>
                        <div>
                           <p className="text-[11px] font-black uppercase tracking-tight text-white mb-1">{assignment.submittedFile}</p>
                           <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">SYNC_DATE: {assignment.submittedDate} // 4.2 MB</p>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <button className="p-4 bg-white/5 hover:bg-emerald-500/10 hover:text-emerald-500 rounded-xl transition-all border border-white/5">
                           <Download size={18} />
                        </button>
                        <button className="p-4 bg-white/5 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all border border-white/5">
                           <Trash2 size={18} />
                        </button>
                     </div>
                  </div>
               </Card>
            )}
         </div>

         {/* 🛠️ Sidebar Insights */}
         <div className="lg:col-span-4 space-y-8">
            <Card className="bg-[#0a0a0b] border-white/10 p-8 space-y-8">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-2">
                  <Clock size={14} /> Knowledge Lifecycles
               </h3>
               <div className="space-y-6">
                  {[
                     { l: 'Assigned Node', v: '12 Apr 2024', c: 'text-white' },
                     { l: 'Last Sync Attempt', v: '14 Apr 2024', c: 'text-white' },
                     { l: 'Termination Sync', v: assignment.deadline, c: 'text-red-600' }
                  ].map((s, i) => (
                     <div key={i} className="space-y-1">
                        <p className="text-[8px] font-black uppercase tracking-widest text-slate-600">{s.l}</p>
                        <p className={`text-xs font-black uppercase italic ${s.c}`}>{s.v}</p>
                     </div>
                  ))}
               </div>
            </Card>

            <Card className="bg-red-600/5 border-red-600/20 p-8 space-y-4">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 flex items-center gap-2">
                  <AlertTriangle size={14} /> Attention
               </h3>
               <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase tracking-tight italic">
                  Submissions after the termination sequence will require manual override from instructional coordinator. Ensure all modules are synchronized before final validation.
               </p>
            </Card>

            {/* 📁 Asset Hub */}
            <Card className="p-8 bg-white/5 border-white/10 space-y-6">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white flex items-center gap-2">
                  <Download size={14} className="text-red-600" /> Instructional Assets
               </h3>
               <div className="space-y-3">
                  {[
                     { name: 'Mission_Brief.pdf', size: '1.2 MB' },
                     { name: 'Evaluation_Rubric.xlsx', size: '440 KB' }
                  ].map((asset, idx) => (
                     <div key={idx} className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5 hover:border-white/20 transition-all cursor-pointer group">
                        <div className="flex items-center gap-3">
                           <File size={14} className="text-slate-500 group-hover:text-white" />
                           <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tight">{asset.name}</span>
                        </div>
                        <span className="text-[8px] font-black text-slate-600 italic">{asset.size}</span>
                     </div>
                  ))}
               </div>
            </Card>
         </div>
      </div>

      {/* 🧾 Validation Ledger (Feedback Cluster) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         <div className="lg:col-span-12">
            <Card className="bg-white/5 border-white/10 overflow-hidden">
               <div className="p-8 border-b border-white/5 bg-white/[0.02]">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-3">
                     <MessageSquare size={16} className="text-indigo-500" /> Instructional Validation Ledger
                  </h3>
               </div>
               <div className="p-10 space-y-8">
                  {assignment.status === 'SUBMITTED' ? (
                     <div className="flex items-start gap-6 group">
                        <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500 border border-indigo-500/10 shrink-0">
                           <Shield size={24} />
                        </div>
                        <div className="space-y-2">
                           <div className="flex items-center gap-4">
                              <span className="text-[11px] font-black uppercase tracking-widest text-white">System Automata</span>
                              <span className="text-[9px] font-bold text-slate-500 italic">2h ago</span>
                           </div>
                           <p className="text-sm font-bold text-slate-400 italic leading-relaxed uppercase tracking-tight p-6 bg-white/5 rounded-[2rem] border border-white/5">
                              Preliminary integrity check complete. File hash verified against registry. Waiting for manual validation from <span className="text-indigo-500">Dr. Michael Chen</span>.
                           </p>
                        </div>
                     </div>
                  ) : (
                     <div className="flex flex-col items-center justify-center py-20 space-y-4 opacity-40">
                        <MessageSquare size={48} className="text-slate-600" />
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">No Validation Log Entries Yet</p>
                     </div>
                  )}
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
};

export default AssignmentDetail;
