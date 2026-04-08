import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import logo from '../picture/logo.png';
import { 
  LogOut, GraduationCap, CalendarCheck, FileText, 
  Users, BookOpen, Globe, LayoutDashboard, ChevronRight, Menu, X,
  Bell, Search
} from 'lucide-react';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const menuItems = {
    STUDENT: [
      { group: 'Master Hub', items: [
        { path: '/portal/overview', icon: LayoutDashboard, label: 'System Overview' },
      ]},
      { group: 'ERP Terminal', items: [
        { path: '/portal/student/academic', icon: GraduationCap, label: 'Academic' },
        { path: '/portal/student/attendance', icon: CalendarCheck, label: 'Attendance' },
        { path: '/portal/student/results', icon: FileText, label: 'Results' },
      ]},
      { group: 'LMS Platform', items: [
        { path: '/portal/lms/student/courses', icon: BookOpen, label: 'My Courses' },
        { path: '/portal/lms/student/assignments', icon: FileText, label: 'Assignments' },
        { path: '/portal/lms/global/courses', icon: Globe, label: 'Global Knowledge' },
      ]}
    ],
    FACULTY: [
      { group: 'Master Hub', items: [
        { path: '/portal/overview', icon: LayoutDashboard, label: 'System Overview' },
      ]},
      { group: 'ERP Faculty', items: [
        { path: '/portal/faculty/attendance', icon: CalendarCheck, label: 'Mark Attendance' },
        { path: '/portal/faculty/marks', icon: FileText, label: 'Enter Marks' },
      ]},
      { group: 'LMS Instructor', items: [
        { path: '/portal/lms/instructor/courses', icon: BookOpen, label: 'Manage Courses' },
      ]}
    ],
    ADMIN: [
      { group: 'Master Hub', items: [
        { path: '/portal/overview', icon: LayoutDashboard, label: 'System Overview' },
      ]},
      { group: 'ERP Admin', items: [
        { path: '/portal/admin/users', icon: Users, label: 'User Management' },
        { path: '/portal/admin/courses', icon: GraduationCap, label: 'Courses' },
      ]},
      { group: 'LMS Admin', items: [
        { path: '/portal/lms/admin/reports', icon: FileText, label: 'LMS Reports' },
      ]}
    ]
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  const activeMenu = menuItems[user.role] || [];

  return (
    <div className="relative min-h-screen bg-[#050507] text-slate-200 selection:bg-red-600/30 font-sans overflow-hidden">
      {/* 🔮 System Telemetry Background */}
      <div className="bg-mesh" />
      <div className="fixed inset-0 neo-grid pointer-events-none opacity-40" />
      
      {/* 🔴 Pulsing Blobs */}
      <div className="fixed -top-24 -left-24 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="fixed top-1/2 -right-48 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[150px] animate-pulse-glow" style={{ animationDelay: '-4s' }} />
      <div className="fixed -bottom-48 left-1/4 w-80 h-80 bg-red-900/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '-2s' }} />

      <div className="relative z-10 p-4 gap-4 flex min-h-screen">
      {/* 🚀 Floating Glossy Sidebar */}
      <aside className={`
        fixed md:relative z-30 h-[calc(100vh-2rem)] 
        bg-white/5 backdrop-blur-2xl border border-white/10 
        rounded-[2.5rem] flex-shrink-0 transition-all duration-500 ease-in-out
        flex flex-col overflow-hidden shadow-2xl shadow-black/20
        ${isSidebarOpen ? 'w-72' : 'w-24'}
      `}>
        {/* Logo Section */}
        <div className="p-8 pb-4 relative group/sidebar">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/95 rounded-[1.25rem] flex items-center justify-center p-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] group transition-transform hover:scale-105 duration-300">
                <img src={logo} alt="Logo" className="w-full h-full object-contain" />
            </div>
            {isSidebarOpen && (
              <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                <h2 className="text-lg font-black text-white tracking-widest uppercase italic leading-none">
                  Nexus <span className="text-red-600">Hub</span>
                </h2>
                <div className="h-[2px] w-12 bg-red-600 rounded-full mt-2" />
              </div>
            )}
          </div>

          {/* 🔘 Internal Toggle Node */}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`
              absolute -right-3 top-10 w-6 h-10 bg-red-600 rounded-lg 
              flex items-center justify-center text-white shadow-lg 
              hover:scale-110 active:scale-95 transition-all z-50
              hidden md:flex
            `}
          >
            {isSidebarOpen ? <ChevronRight size={14} className="rotate-180" /> : <ChevronRight size={14} />}
          </button>
        </div>

        {/* Navigation Scroll Area */}
        <div className="flex-1 overflow-y-auto py-8 px-4 scrollbar-hide">
          <nav className="flex flex-col gap-10">
            {activeMenu.map((group, idx) => (
              <div key={idx} className="space-y-4">
                {isSidebarOpen && (
                  <span className="px-5 text-[9px] font-black uppercase tracking-[0.4em] text-slate-500 opacity-60 italic block animate-in fade-in duration-700">
                    {group.group}
                  </span>
                )}
                {!isSidebarOpen && <div className="h-px bg-white/5 mx-4" />}
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`
                          flex items-center gap-4 px-5 py-4 rounded-[1.5rem] transition-all duration-300 relative group
                          ${location.pathname === item.path 
                            ? 'bg-red-600 text-white shadow-[0_10px_20px_rgba(220,38,38,0.3)] scale-[1.02]' 
                            : 'text-slate-400 hover:bg-white/5 hover:text-white hover:translate-x-1'
                          }
                        `}
                      >
                        <item.icon size={20} className={`${location.pathname === item.path ? 'scale-110' : 'group-hover:scale-110'} transition-transform`} />
                        {isSidebarOpen && (
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
                            {item.label}
                          </span>
                        )}
                        {location.pathname === item.path && isSidebarOpen && (
                          <div className="ml-auto w-1 h-1 rounded-full bg-white opacity-60" />
                        )}
                        
                        {/* Hover Tooltip for collapsed mode */}
                        {!isSidebarOpen && (
                           <div className="absolute left-full ml-4 px-3 py-2 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 whitespace-nowrap">
                              {item.label}
                           </div>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Actions Cluster */}
        <div className="p-4 bg-white/[0.02] border-t border-white/5">
          <button 
            onClick={handleLogout}
            className={`
              flex items-center gap-4 px-5 py-5 w-full rounded-[1.5rem]
              font-black text-[10px] uppercase tracking-[0.3em] transition-all duration-300
              hover:bg-red-600 group text-slate-500 hover:text-white
              ${!isSidebarOpen && 'justify-center'}
            `}
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            {isSidebarOpen && <span className="animate-in fade-in duration-300 italic">Eject Node</span>}
          </button>
        </div>
      </aside>

      {/* 🚀 Main Command Center */}
      <main className="flex-1 flex flex-col h-[calc(100vh-2rem)] overflow-hidden">
        {/* Glossy Top Navigation */}
        <header className="
          bg-white/5 backdrop-blur-xl border border-white/10 
          rounded-[2rem] h-24 flex items-center justify-between 
          px-10 z-20 shadow-xl shadow-black/5 mb-4
        ">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="group p-3.5 bg-white/5 hover:bg-red-600 rounded-2xl transition-all duration-500 border border-white/10 shadow-lg"
          >
            {isSidebarOpen ? (
              <X size={20} className="text-white group-hover:rotate-90 transition-transform duration-500" />
            ) : (
              <Menu size={20} className="text-white group-hover:scale-110 transition-transform duration-500" />
            )}
          </button>

          <div className="flex items-center gap-8">
             <div className="hidden lg:flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-slate-500 group focus-within:border-red-600/50 transition-all cursor-text">
                <Search size={16} className="group-focus-within:text-red-600 transition-colors" />
                <input 
                  type="text" 
                  placeholder="TERMINAL SEARCH..." 
                  className="bg-transparent border-none outline-none text-[9px] font-black tracking-[0.3em] w-48 placeholder:text-slate-600 text-white"
                />
             </div>

             <div className="flex items-center gap-4">
               <button className="relative p-3.5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all group overflow-hidden">
                  <Bell size={20} className="text-slate-400 group-hover:text-red-500 transition-colors" />
                  <span className="absolute top-4 right-4 w-2 h-2 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)] animate-pulse" />
               </button>

               <div className="h-10 w-px bg-white/10 mx-2" />

               <Link to="/portal/profile" className="flex items-center gap-5 p-2 pr-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/[0.08] transition-all group cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl shadow-lg border border-white/20 flex items-center justify-center text-white font-black text-sm group-hover:rotate-6 transition-transform">
                     {user.username.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-black uppercase tracking-widest leading-none text-white italic">{user.username}</p>
                    <p className="text-[8px] font-black text-red-600 uppercase tracking-[0.3em] mt-1.5 flex items-center gap-1.5 opacity-80">
                      <div className="w-1 h-1 rounded-full bg-red-600 animate-pulse" />
                      {user.role} CORE
                    </p>
                  </div>
               </Link>
             </div>
          </div>
        </header>
        
        {/* Main Workspace Frame */}
        <div className="flex-1 overflow-y-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2.5rem] p-10 scrollbar-hide shadow-inner">
           <div className="max-w-7xl mx-auto pb-20">
              <Outlet />
           </div>
        </div>
      </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
