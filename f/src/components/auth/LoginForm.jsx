import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import API_BASE_URL from '../../config';


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      // Identity Sync with Real Database Data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Role-Based Redirection Matrix
      navigate('/portal/overview');
    } catch (err) {
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        setError('[ SYSTEM_ERROR ]: Nexus Backend Offline. Please ensure the API server is running on port 5000.');
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="glass p-10 lg:p-20 rounded-[3rem] border-primary/10 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-primary/20 transition-all duration-700" />
      
      <div className="relative z-10 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-primary" size={24} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Security Protocol Activated</span>
          </div>
          <h2 className="text-4xl font-display font-black uppercase italic tracking-tighter text-slate-900 dark:text-white">
            Identify <span className="text-primary italic">Node.</span>
          </h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-600/10 border border-red-600/20 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-red-600 animate-pulse text-center">
              [ ACCESS_DENIED ]: {error}
            </div>
          )}
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">Credential: 0x_username</label>
            <div className="relative">
              <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Institutional ID..."
                className="w-full bg-slate-50 dark:bg-white/5 border-2 border-primary/5 rounded-2xl py-5 pl-16 pr-6 outline-none focus:border-primary/40 focus:bg-white dark:focus:bg-white/10 transition-all font-bold tracking-tight"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4">Sequence: 0x_pass-key</label>
            <div className="relative">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="password" 
                placeholder="Security Sequence..."
                className="w-full bg-slate-50 dark:bg-white/5 border-2 border-primary/5 rounded-2xl py-5 pl-16 pr-6 outline-none focus:border-primary/40 focus:bg-white dark:focus:bg-white/10 transition-all font-bold tracking-tight"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-primary text-white py-6 rounded-2xl font-display font-black uppercase tracking-[0.4em] text-[10px] shadow-glow shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 group/btn"
          >
            Initiate Access Sync <ArrowRight className="group-hover/btn:translate-x-2 transition-transform" />
          </button>
        </form>

        <div className="flex flex-col items-center gap-4 pt-4 border-t border-slate-100 dark:border-white/5">
          <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-4 w-full space-y-2 border border-slate-100 dark:border-white/5">
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 block text-center">Available Demo Nodes:</span>
            <div className="flex justify-around items-center">
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-900 dark:text-white leading-none">admin</p>
                <p className="text-[8px] text-slate-400 uppercase">Admin</p>
              </div>
              <div className="h-6 w-px bg-slate-200 dark:bg-white/10" />
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-900 dark:text-white leading-none">faculty1</p>
                <p className="text-[8px] text-slate-400 uppercase">Faculty</p>
              </div>
              <div className="h-6 w-px bg-slate-200 dark:bg-white/10" />
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-900 dark:text-white leading-none">student1</p>
                <p className="text-[8px] text-slate-400 uppercase">Student</p>
              </div>
            </div>
            <p className="text-[8px] text-center text-red-600/60 font-black uppercase tracking-widest mt-2">Pass-Key: password123</p>
          </div>

          <a href="#" className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors italic mt-4">Lost Sequence?</a>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            No Identity? <Link to="/register" className="text-primary hover:underline">Enroll Now</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginForm;
