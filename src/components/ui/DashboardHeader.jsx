import React from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const DashboardHeader = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
      {/* Left side */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleSidebar}
          className="md:hidden text-slate-500 hover:text-slate-700 focus:outline-none"
        >
          <Menu size={20} />
        </button>

        {/* Search */}
        <div className="hidden md:flex items-center bg-slate-50 rounded-md px-3 py-1.5 border border-slate-200">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none outline-none pl-2 text-sm w-48"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="text-slate-500 hover:text-slate-700 relative p-1">
          <Bell size={20} />
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
            3
          </span>
        </button>

        {/* User profile */}
        <div className="relative">
          <button 
            onClick={toggleUserMenu}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <div className="w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center">
              <User size={16} />
            </div>
            <span className="hidden md:block text-sm font-medium text-slate-700">
              {user?.name || 'User'}
            </span>
          </button>

          {/* User dropdown menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-slate-200">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-sm font-medium text-slate-900">{user?.name || 'User'}</p>
                <p className="text-xs text-slate-500">{user?.email || 'user@example.com'}</p>
              </div>
              <a href="#" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                Profile
              </a>
              <a href="#" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                Settings
              </a>
              <button 
                onClick={logout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader; 