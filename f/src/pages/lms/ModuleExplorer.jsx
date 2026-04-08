import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  BookOpen, Code, Lightbulb, CheckCircle2, 
  ChevronLeft, ChevronRight, Play, Info,
  Terminal, Zap, FileText, Award, HelpCircle,
  Shield
} from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';

const ModuleExplorer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('explanation');

  const knowledgeBase = {
    "1": { 
      title: 'Full-Stack Web Synthesis', 
      currentTopic: 'Neural State Propagation',
      explanation: 'Neural State Propagation (NSP) is a sophisticated architectural pattern for broadcasting reactive data clusters across deeply nested node trees without manual prop-drilling.',
      codeSnippet: 'const SyncNode = createContext({ telemetry: "null" });\n\nexport const KnowledgeProvider = ({ children }) => {\n  const [registry, setRegistry] = useState(INITIAL_STATE);\n  return <SyncNode.Provider value={{ registry }}>{children}</SyncNode.Provider>;\n};',
      quiz: [{ q: "What is the primary objective of NSP?", a: ["Manual Prop Drilling", "Global Synchronization", "Hardware Overclocking"], correct: 1 }],
      summary: "Successfully mastered Global Context Reactivity patterns."
    },
    "2": { 
      title: 'Machine Learning Fundamentals', 
      currentTopic: 'Gradient Descent Logic',
      explanation: 'Gradient descent is an optimization algorithm used to minimize cost functions by iteratively moving towards the minimum of a function based on the negative gradient.',
      codeSnippet: 'def gradient_descent(x, learning_rate, epochs):\n    for i in range(epochs):\n        gradient = 2 * x\n        x = x - learning_rate * gradient\n    return x',
      quiz: [{ q: "What does learning rate control?", a: ["Data Size", "Step Size", "CPU Speed"], correct: 1 }],
      summary: "Gradient descent protocols synchronized."
    },
    "3": { 
      title: 'Modern UI/UX Principles', 
      currentTopic: 'Haptic Feedback Design',
      explanation: 'Haptic feedback design focuses on creating tactile responses that simulate physical interactions within a digital environment, enhancing the psychological link between user and system.',
      codeSnippet: '.button:active {\n  transform: scale(0.95);\n  box-shadow: 0 0 20px rgba(255, 0, 0, 0.4);\n  transition: all 50ms cubic-bezier(0, 0, 0, 1);\n}',
      quiz: [{ q: "What is the goal of haptic feedback?", a: ["Color Balance", "Tactile Response", "Load Speed"], correct: 1 }],
      summary: "UI psychology nodes verified."
    },
    "4": { 
      title: 'Ethical Hacking & Sec-Ops', 
      currentTopic: 'Penetration Testing Frameworks',
      explanation: 'A penetration testing framework provides a structured methodology for identifying, exploiting, and validating security vulnerabilities across institutional networks.',
      codeSnippet: 'nmap -sV -p 1-65535 --script vuln 192.168.1.1\n# [RESULT]: Port 80/TCP OPEN // Service: Nginx 1.18.0',
      quiz: [{ q: "What is the result of -sV in Nmap?", a: ["Silent Verification", "Service Versioning", "System Validation"], correct: 1 }],
      summary: "Security audit protocols mastered."
    },
    "5": { 
      title: 'Neural Network Architectures', 
      currentTopic: 'Backpropagation Loops',
      explanation: 'Backpropagation is the core mechanism of supervised learning, allowing neural networks to learn by calculating the contribution of each neuron to the total output error.',
      codeSnippet: 'const delta = error * sigmoidDerivative(output);\nthis.weights += layerInput.T.dot(delta) * this.lr;',
      quiz: [{ q: "Backpropagation is used for what?", a: ["Image Scaling", "Error Calculation", "Data Compression"], correct: 1 }],
      summary: "Neural learning paths verified."
    },
    "6": { 
      title: 'Enterprise ERP Management', 
      currentTopic: 'Ledger Synchronization',
      explanation: 'Enterprise Ledger Synchronization ensures that financial and operational data across all department nodes remain 100% consistent in real-time.',
      codeSnippet: 'UPDATE erp_ledger \nSET sync_status = "VERIFIED" \nWHERE timestamp < NOW() \nAND status = "PENDING";',
      quiz: [{ q: "What does '3NF' mean in databases?", a: ["3rd Node Flow", "3rd Normal Form", "3rd Network Fiber"], correct: 1 }],
      summary: "Operational ledger logic synced."
    },
    "7": { 
      title: 'Big Data Pipeline Logic', 
      currentTopic: 'ETL Processing Clusters',
      explanation: 'Extract, Transform, Load (ETL) clusters process massive datasets by parallelizing operations across distributed node architectures.',
      codeSnippet: 'spark.read.json("s3://data/raw/*.json")\n  .filter(col("status") === "SYNC")\n  .write.parquet("s3://data/lake/clean/")',
      quiz: [{ q: "Spark is primarily used for what?", a: ["Single File Edit", "Distributed Computing", "Local CSS Styling"], correct: 1 }],
      summary: "Big Data pipelines optimized."
    },
    "8": { 
      title: 'Global Supply Chain Sync', 
      currentTopic: 'Logistics Matrix Routing',
      explanation: 'Logistics Matrix Routing calculates the optimal path for physical asset movement across global geographic nodes using real-time telemetry.',
      codeSnippet: 'Route findOptimalPath(Node start, Node end) {\n  return A_Star_Search(start, end, global_telemetry_grid);\n}',
      quiz: [{ q: "A* is an algorithm for what?", a: ["Image Blur", "Pathfinding", "Sound Normalization"], correct: 1 }],
      summary: "Logistics routing nodes verified."
    },
    "9": { 
      title: 'Quantum Logic Systems', 
      currentTopic: 'Qubit Superposition',
      explanation: 'Qubit Superposition allows the system to exist in multiple states simultaneously, exponentially increasing the processing potential of logic gates.',
      codeSnippet: 'circuit.h(qreg[0]); // Apply Hadamard Gate\ncircuit.measure(qreg[0], creg[0]);',
      quiz: [{ q: "What gate creates superposition?", a: ["NOT Gate", "Hadamard Gate", "AND Gate"], correct: 1 }],
      summary: "Quantum logic gates synchronized."
    }
  };

  const moduleData = knowledgeBase[id] || knowledgeBase["1"];

  const tabs = [
    { id: 'explanation', label: 'Theory Node', icon: BookOpen },
    { id: 'code', label: 'Logic Sandbox', icon: Code },
    { id: 'quiz', label: 'Validation Protocol', icon: HelpCircle },
    { id: 'summary', label: 'Sync Summary', icon: FileText }
  ];

  return (
    <div className="space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* 🧭 Header Terminal */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 gap-6">
         <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/portal/lms/global/courses')}
              className="w-12 h-12 bg-white/5 hover:bg-red-600 rounded-2xl flex items-center justify-center text-white transition-all border border-white/10"
            >
               <ChevronLeft size={20} />
            </button>
            <div className="space-y-1">
               <h2 className="text-xl font-black italic tracking-tighter uppercase text-white leading-none underline decoration-red-600/30 decoration-2 underline-offset-4">
                  {moduleData.title}
               </h2>
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 italic">Topic: {moduleData.currentTopic}</p>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <Badge className="bg-emerald-500/10 text-emerald-500 border-none px-4 py-2 text-[9px] font-black tracking-widest">PEDIGREE_READY</Badge>
            <button className="px-8 py-4 bg-white text-black rounded-2xl text-[9px] font-black uppercase tracking-[0.4em] hover:bg-slate-200 transition-all">Submit Sync</button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* 🛠️ Sidebar Control Node */}
         <div className="lg:col-span-3 space-y-4">
            {tabs.map((tab) => (
               <button 
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id)}
                 className={`
                    w-full flex items-center gap-4 p-6 rounded-3xl border transition-all group
                    ${activeTab === tab.id ? 'bg-red-600 border-red-600 text-white shadow-glow shadow-red-600/20' : 'bg-[#0a0a0b] border-white/5 text-slate-500 hover:border-red-600/30'}
                 `}
               >
                  <tab.icon size={18} className={activeTab === tab.id ? 'text-white' : 'group-hover:text-red-600'} />
                  <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
               </button>
            ))}
            
            <Card className="mt-10 p-8 bg-red-600/5 border-red-600/10 space-y-4">
               <h4 className="text-[9px] font-black text-red-600 uppercase tracking-widest flex items-center gap-2 italic">
                  <Zap size={14} /> Critical Insight
               </h4>
               <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase tracking-tight italic">
                  Maintain 100% node integrity to ensure synchronized state propagation across the entire institutional stack.
               </p>
            </Card>
         </div>

         {/* 📟 Execution Plane */}
         <div className="lg:col-span-9">
            <Card className="bg-[#0a0a0b] border-white/10 p-12 min-h-[600px] glossy-panel relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-10 opacity-5">
                  <Terminal size={120} />
               </div>

               <div className="relative z-10 space-y-10 animate-in fade-in duration-500">
                  {activeTab === 'explanation' && (
                     <div className="space-y-10">
                        <div className="flex items-center gap-4 text-red-600">
                           <Lightbulb size={24} />
                           <h3 className="text-lg font-black uppercase tracking-[0.3em] italic">Instructional Explanation</h3>
                        </div>
                        <p className="text-base font-bold text-slate-300 leading-[2] uppercase tracking-tight italic opacity-90 first-letter:text-4xl first-letter:font-black first-letter:text-red-600 first-letter:float-left first-letter:mr-4">
                           {moduleData.explanation}
                        </p>
                        <div className="grid grid-cols-2 gap-6 pt-10 border-t border-white/5">
                           <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 space-y-4">
                              <Shield size={24} className="text-emerald-500" />
                              <h5 className="text-[10px] font-black uppercase tracking-widest text-white">Security Protocol</h5>
                              <p className="text-[9px] font-bold text-slate-500 uppercase leading-relaxed">Encrypted state tunnels ensure zero leaking between parallel modules.</p>
                           </div>
                           <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 space-y-4">
                              <Award size={24} className="text-amber-500" />
                              <h5 className="text-[10px] font-black uppercase tracking-widest text-white">Validation Node</h5>
                              <p className="text-[9px] font-bold text-slate-500 uppercase leading-relaxed">Achieve 95%+ synchronization for full institutional credit.</p>
                           </div>
                        </div>
                     </div>
                  )}

                  {activeTab === 'code' && (
                     <div className="space-y-8">
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-4 text-red-600">
                              <Code size={24} />
                              <h3 className="text-lg font-black uppercase tracking-[0.3em] italic">Logic Sandbox</h3>
                           </div>
                           <Badge className="bg-white/5 text-slate-400 border-none px-4 tracking-widest">NSP_REACTOR.JS</Badge>
                        </div>
                        <div className="p-10 bg-black rounded-[2.5rem] border border-white/10 font-mono text-sm group/code">
                           <pre className="text-emerald-500 leading-loose">
                              {moduleData.codeSnippet}
                           </pre>
                           <div className="mt-8 pt-8 border-t border-white/5 flex justify-end">
                              <button className="px-6 py-3 bg-white/5 hover:bg-emerald-500 hover:text-white rounded-xl transition-all text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                                 <Play size={12} fill="currentColor" /> Initialize Sandbox
                              </button>
                           </div>
                        </div>
                     </div>
                  )}

                  {activeTab === 'quiz' && (
                     <div className="space-y-10">
                        <div className="flex items-center gap-4 text-red-600">
                           <HelpCircle size={24} />
                           <h3 className="text-lg font-black uppercase tracking-[0.3em] italic">Validation Protocol</h3>
                        </div>
                        <div className="space-y-12">
                           {moduleData.quiz.map((q, idx) => (
                              <div key={idx} className="space-y-6">
                                 <h4 className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-4 italic leading-relaxed">
                                    <span className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-red-600 not-italic">{idx + 1}</span>
                                    {q.q}
                                 </h4>
                                 <div className="grid md:grid-cols-2 gap-4 pl-14">
                                    {q.a.map((opt, i) => (
                                       <button key={i} className="p-5 bg-white/5 hover:bg-white text-slate-400 hover:text-black rounded-2xl border border-white/5 transition-all text-[10px] font-black uppercase tracking-widest text-left">
                                          {opt}
                                       </button>
                                    ))}
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {activeTab === 'summary' && (
                     <div className="flex flex-col items-center justify-center py-20 text-center space-y-10">
                        <div className="w-32 h-32 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 border border-emerald-500/10 animate-pulse-glow">
                           <CheckCircle2 size={64} />
                        </div>
                        <div className="space-y-4">
                           <h3 className="text-2xl font-black italic tracking-tighter uppercase text-white">Synchronization Complete</h3>
                           <p className="text-sm font-bold text-slate-500 uppercase tracking-widest italic flex items-center justify-center gap-2">
                              {moduleData.summary}
                           </p>
                        </div>
                        <button className="px-12 py-5 bg-emerald-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-emerald-600 transition-all shadow-glow shadow-emerald-500/20">
                           Finalize Pedigree
                        </button>
                     </div>
                  )}
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
};

export default ModuleExplorer;
