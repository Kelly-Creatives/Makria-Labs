import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      {/* Mobile Header */}
      <div className="mobile-header">
        <div className="flex items-center gap-2 font-bold text-slate-900">
          <img src="/makria%20logo.png" alt="Makria logo" className="h-8 w-8 rounded-lg object-contain" />
          <span>Makria Admin</span>
        </div>
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
