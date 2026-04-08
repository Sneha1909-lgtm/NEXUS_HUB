import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, Mail, CreditCard, ArrowRight, UserPlus } from 'lucide-react';
import API_BASE_URL from '../../config';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    email: '',
    password: '',
    role: 'STUDENT'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username: formData.id, 
          password: formData.password, 
          role: formData.role || 'STUDENT',
          name: formData.name 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      navigate('/portal/overview');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass p-6 sm:p-10 lg:p-16 rounded-[2rem] sm:rounded-[3rem] border-primary/10 shadow-2xl relative overflow-hidden group">
      <div className="relative z-10 space-y-4 sm:space-y-6">
        <div className="space-y-2 sm:space-y-4">
          <div className="flex items-center gap-3">
            <UserPlus className="text-red-600" size={20} />
            <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Institutional Enrollment Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase italic tracking-tighter text-slate-900 dark:text-white leading-none">
            Join the <span className="text-red-600 italic">Nexus.</span>
          </h2>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {error && (
            <div className="bg-red-600/10 border border-red-600/20 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-red-600 animate-pulse text-center">
              [ ENROLL_ERROR ]: {error}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[8px] font-black uppercase tracking-widest text-slate-500 ml-4">Full Identity Name</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Full Name..."
                  value={formData.name}
                  className="w-full bg-slate-50 dark:bg-white/5 border-2 border-red-500/5 rounded-2xl py-3 sm:py-4 pl-14 pr-6 outline-none focus:border-red-600/40 transition-all font-bold text-sm"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[8px] font-black uppercase tracking-widest text-slate-500 ml-4">Institutional ID</label>
              <div className="relative">
                <CreditCard className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="ID Number..."
                  value={formData.id}
                  className="w-full bg-slate-50 dark:bg-white/5 border-2 border-red-500/5 rounded-2xl py-3 sm:py-4 pl-14 pr-6 outline-none focus:border-red-600/40 transition-all font-bold text-sm"
                  onChange={(e) => setFormData({...formData, id: e.target.value})}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[8px] font-black uppercase tracking-widest text-slate-500 ml-4">Institute Alpha-Mail</label>
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="email" 
                placeholder="Email Address..."
                value={formData.email}
                className="w-full bg-slate-50 dark:bg-white/5 border-2 border-red-500/5 rounded-2xl py-3 sm:py-4 pl-14 pr-6 outline-none focus:border-red-600/40 transition-all font-bold text-sm"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[8px] font-black uppercase tracking-widest text-slate-500 ml-4">Security Sequence</label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="password" 
                placeholder="Password..."
                value={formData.password}
                className="w-full bg-slate-50 dark:bg-white/5 border-2 border-red-500/5 rounded-2xl py-3 sm:py-4 pl-14 pr-6 outline-none focus:border-red-600/40 transition-all font-bold text-sm"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-4 sm:py-5 rounded-2xl font-black uppercase tracking-[0.4em] text-[10px] shadow-lg shadow-red-600/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 group/btn disabled:opacity-50"
          >
            {loading ? 'Processing Sync...' : 'Request Enrollment Sync'} <ArrowRight className="group-hover/btn:translate-x-2 transition-transform" />
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Already have identity? <Link to="/login" className="text-red-600 hover:underline">Identify Node</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
