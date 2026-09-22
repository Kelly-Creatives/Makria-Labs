import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Image, MessageSquare, Briefcase, Mail, X, LogOut } from 'lucide-react';
import { clearToken } from '../auth';

const navLinkClass = ({ isActive }) => [
  'flex items-center gap-3 rounded-lg px-4 py-3 text-lg font-medium transition-colors duration-200',
  isActive
    ? 'bg-black text-white shadow-sm'
    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
].join(' ');

export default function Sidebar({ isOpen, setIsOpen }) {
  const closeSidebar = () => setIsOpen(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate('/', { replace: true });
    window.location.reload();
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''} fixed left-0 top-0 h-screen w-[260px] flex flex-col gap-6 border-r border-slate-200 bg-white p-6 z-40 transition-transform duration-300`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xl font-bold text-slate-900">
          <img
            src="/makria%20logo.png"
            alt="Makria logo"
            className="block h-8 w-8 rounded-lg object-contain"
          />
          <span className="font-semibold">Makria Admin</span>
        </div>
        <button className="md:hidden text-slate-500 hover:text-slate-900" onClick={closeSidebar}>
          <X size={24} />
        </button>
      </div>

      <nav className="flex flex-col gap-2">
        <NavLink to="/" end className={navLinkClass} onClick={closeSidebar}>
          <LayoutDashboard size={30} />
          Dashboard
        </NavLink>

        <NavLink to="/portfolio" className={navLinkClass} onClick={closeSidebar}>
          <Image size={30} />
          Portfolio
        </NavLink>

        <NavLink to="/services" className={navLinkClass} onClick={closeSidebar}>
          <Briefcase size={30} />
          Services
        </NavLink>

        <NavLink to="/testimonials" className={navLinkClass} onClick={closeSidebar}>
          <MessageSquare size={30} />
          Testimonials
        </NavLink>

        <NavLink to="/contacts" className={navLinkClass} onClick={closeSidebar}>
          <Mail size={30} />
          Contacts
        </NavLink>

        <div className="mt-auto pt-8 space-y-2">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900"
          >
            <LogOut size={18} />
            Logout
          </button>

          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900"
          >
            View client side
          </a>
        </div>
      </nav>
    </div>
  );
}
