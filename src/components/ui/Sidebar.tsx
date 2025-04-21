import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart2, 
  Home, 
  Upload, 
  BarChart, 
  Users, 
  Lightbulb,
  Settings,
  HelpCircle,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden" 
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } md:static md:z-0`}
      >
        {/* Close button (mobile only) */}
        <button 
          onClick={toggleSidebar}
          className="absolute right-4 top-4 md:hidden text-slate-500 hover:text-slate-700"
        >
          <X size={20} />
        </button>

        {/* Logo */}
        <div className="flex items-center space-x-2 px-6 py-5 border-b border-slate-200">
          <BarChart2 className="w-7 h-7 text-primary-600" />
          <span className="text-xl font-semibold text-slate-900">DataViz</span>
        </div>

        {/* Navigation Links */}
        <nav className="px-4 py-6">
          <ul className="space-y-1">
            {/* Dashboard */}
            <li>
              <NavLink 
                to="/dashboard" 
                end
                className={({ isActive }) => `
                  flex items-center space-x-3 px-3 py-2 rounded-md transition-colors
                  ${isActive 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-slate-700 hover:bg-slate-100'
                  }
                `}
              >
                <Home size={18} />
                <span>Dashboard</span>
              </NavLink>
            </li>

            {/* Upload */}
            <li>
              <NavLink 
                to="/dashboard/upload" 
                className={({ isActive }) => `
                  flex items-center space-x-3 px-3 py-2 rounded-md transition-colors
                  ${isActive 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-slate-700 hover:bg-slate-100'
                  }
                `}
              >
                <Upload size={18} />
                <span>Upload Data</span>
              </NavLink>
            </li>

            {/* Charts */}
            <li>
              <NavLink 
                to="/dashboard/visualizations" 
                className={({ isActive }) => `
                  flex items-center space-x-3 px-3 py-2 rounded-md transition-colors
                  ${isActive 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-slate-700 hover:bg-slate-100'
                  }
                `}
              >
                <BarChart size={18} />
                <span>Visualizations</span>
              </NavLink>
            </li>

            {/* AI Insights */}
            <li>
              <NavLink 
                to="/dashboard/insights" 
                className={({ isActive }) => `
                  flex items-center space-x-3 px-3 py-2 rounded-md transition-colors
                  ${isActive 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-slate-700 hover:bg-slate-100'
                  }
                `}
              >
                <Lightbulb size={18} />
                <span>AI Insights</span>
              </NavLink>
            </li>

            {/* Admin Dashboard (only for admins) */}
            {isAdmin && (
              <li>
                <NavLink 
                  to="/admin" 
                  className={({ isActive }) => `
                    flex items-center space-x-3 px-3 py-2 rounded-md transition-colors
                    ${isActive 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-slate-700 hover:bg-slate-100'
                    }
                  `}
                >
                  <Users size={18} />
                  <span>Admin</span>
                </NavLink>
              </li>
            )}
          </ul>

          {/* Secondary links */}
          <div className="mt-10 pt-6 border-t border-slate-200">
            <ul className="space-y-1">
              <li>
                <NavLink 
                  to="/dashboard/settings" 
                  className={({ isActive }) => `
                    flex items-center space-x-3 px-3 py-2 rounded-md transition-colors
                    ${isActive 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-slate-700 hover:bg-slate-100'
                    }
                  `}
                >
                  <Settings size={18} />
                  <span>Settings</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/dashboard/help" 
                  className={({ isActive }) => `
                    flex items-center space-x-3 px-3 py-2 rounded-md transition-colors
                    ${isActive 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-slate-700 hover:bg-slate-100'
                    }
                  `}
                >
                  <HelpCircle size={18} />
                  <span>Help & Support</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;