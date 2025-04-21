import React from 'react';
import { Users, FileSpreadsheet, BarChart, Settings } from 'lucide-react';

const AdminDashboardPage: React.FC = () => {
  // Mock data for admin stats
  const stats = [
    { id: 1, title: 'Total Users', value: '152', icon: Users, change: '+12%', changeType: 'positive' },
    { id: 2, title: 'Uploaded Files', value: '438', icon: FileSpreadsheet, change: '+23%', changeType: 'positive' },
    { id: 3, title: 'Visualizations', value: '1,204', icon: BarChart, change: '+18%', changeType: 'positive' },
    { id: 4, title: 'System Load', value: '24%', icon: Settings, change: '-3%', changeType: 'positive' },
  ];

  // Mock data for recent users
  const recentUsers = [
    { id: 1, name: 'Alex Johnson', email: 'alex@example.com', joined: '2 days ago', uploads: 12 },
    { id: 2, name: 'Maria Garcia', email: 'maria@example.com', joined: '5 days ago', uploads: 8 },
    { id: 3, name: 'James Wilson', email: 'james@example.com', joined: '1 week ago', uploads: 15 },
    { id: 4, name: 'Emma Brown', email: 'emma@example.com', joined: '2 weeks ago', uploads: 7 },
    { id: 5, name: 'Noah Taylor', email: 'noah@example.com', joined: '3 weeks ago', uploads: 10 },
  ];

  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-slate-600">
          Manage users, monitor system activity, and review analytics.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.id} className="card p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-slate-500">{stat.title}</h3>
              <span className="p-2 bg-slate-100 rounded-lg">
                <stat.icon className="w-5 h-5 text-slate-600" />
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <h2 className="text-2xl font-semibold text-slate-900">{stat.value}</h2>
              <span className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Users */}
      <div className="card p-6 mb-8">
        <h2 className="text-lg font-semibold text-slate-900 mb-6">
          Recent Users
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-xs font-medium text-slate-500 border-b border-slate-200">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3">Uploads</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user) => (
                <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{user.name}</td>
                  <td className="px-4 py-3 text-slate-600">{user.email}</td>
                  <td className="px-4 py-3 text-slate-600">{user.joined}</td>
                  <td className="px-4 py-3 text-slate-600">{user.uploads}</td>
                  <td className="px-4 py-3">
                    <button className="text-primary-600 hover:text-primary-800 font-medium text-xs">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Info */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-6">
          System Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-slate-600 mb-3">Storage Usage</h3>
            <div className="w-full bg-slate-200 rounded-full h-2.5 mb-1">
              <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '35%' }}></div>
            </div>
            <p className="text-xs text-slate-500">8.7 GB of 25 GB used</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-600 mb-3">API Requests (24h)</h3>
            <div className="w-full bg-slate-200 rounded-full h-2.5 mb-1">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '12%' }}></div>
            </div>
            <p className="text-xs text-slate-500">1,204 of 10,000 requests</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;