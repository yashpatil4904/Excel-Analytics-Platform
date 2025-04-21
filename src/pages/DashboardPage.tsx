import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileSpreadsheet, 
  BarChart2, 
  Upload, 
  Eye, 
  Trash2, 
  Download,
  FileUp,
  Clock
} from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

// Mock data for uploaded files
const mockFiles = [
  {
    id: '1',
    name: 'Sales_Data_2024_Q1.xlsx',
    uploadDate: '2024-04-15T10:30:00Z',
    size: '245KB',
    rows: 1250,
    columns: 8
  },
  {
    id: '2',
    name: 'Marketing_Campaign_Results.xlsx',
    uploadDate: '2024-04-12T14:20:00Z',
    size: '178KB',
    rows: 523,
    columns: 12
  },
  {
    id: '3',
    name: 'Inventory_Status_March.xlsx',
    uploadDate: '2024-03-31T09:15:00Z',
    size: '320KB',
    rows: 1876,
    columns: 10
  },
  {
    id: '4',
    name: 'Customer_Survey_Responses.xlsx',
    uploadDate: '2024-03-28T16:45:00Z',
    size: '156KB',
    rows: 412,
    columns: 15
  }
];

// Mock charts data
const mockCharts = [
  {
    id: '1',
    name: 'Quarterly Sales Comparison',
    createdDate: '2024-04-16T11:20:00Z',
    type: 'Bar Chart',
    fileId: '1'
  },
  {
    id: '2',
    name: 'Marketing ROI by Channel',
    createdDate: '2024-04-13T15:30:00Z',
    type: 'Pie Chart',
    fileId: '2'
  },
  {
    id: '3',
    name: 'Inventory Trends',
    createdDate: '2024-04-01T10:45:00Z',
    type: 'Line Chart',
    fileId: '3'
  }
];

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'files' | 'visualizations'>('files');

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="fade-in">
      {/* Welcome section */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">
          Welcome back, {user?.name || 'User'}
        </h1>
        <p className="text-slate-600">
          Here's an overview of your data visualizations and uploads.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Uploads</p>
              <h3 className="text-3xl font-semibold text-slate-900 mt-1">{mockFiles.length}</h3>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <FileSpreadsheet className="w-6 h-6 text-primary-600" />
            </div>
          </div>
          <div className="mt-4 text-sm">
            <span className="text-green-600 font-medium">+12%</span>
            <span className="text-slate-500 ml-1">from last month</span>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Visualizations</p>
              <h3 className="text-3xl font-semibold text-slate-900 mt-1">{mockCharts.length}</h3>
            </div>
            <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
              <BarChart2 className="w-6 h-6 text-secondary-600" />
            </div>
          </div>
          <div className="mt-4 text-sm">
            <span className="text-green-600 font-medium">+8%</span>
            <span className="text-slate-500 ml-1">from last month</span>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Storage Used</p>
              <h3 className="text-3xl font-semibold text-slate-900 mt-1">899 KB</h3>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <FileUp className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <div className="mt-4 text-sm">
            <div className="w-full bg-slate-200 rounded-full h-2.5">
              <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '35%' }}></div>
            </div>
            <p className="text-slate-500 mt-1">35% of 2.5 MB</p>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Last Activity</p>
              <h3 className="text-xl font-semibold text-slate-900 mt-1">16 Apr, 11:20 AM</h3>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-slate-500">
            Created "Quarterly Sales Comparison" chart
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/dashboard/upload">
            <div className="card p-6 hover:shadow-md transition-shadow cursor-pointer border-2 border-dashed border-slate-300 hover:border-primary-400 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-3">
                <Upload className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">Upload New File</h3>
              <p className="text-sm text-slate-600">Upload Excel spreadsheets to visualize</p>
            </div>
          </Link>
          
          <div className="card p-6 hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mb-3">
              <BarChart2 className="w-6 h-6 text-secondary-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">Create Visualization</h3>
            <p className="text-sm text-slate-600">Generate charts from your data</p>
          </div>
          
          <div className="card p-6 hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-3">
              <Download className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">Download Reports</h3>
            <p className="text-sm text-slate-600">Export your visualizations as reports</p>
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900">Recent Activity</h2>
          <div className="flex space-x-1 bg-slate-100 p-1 rounded-md">
            <button
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                activeTab === 'files'
                  ? 'bg-white shadow-sm text-slate-900'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
              onClick={() => setActiveTab('files')}
            >
              Files
            </button>
            <button
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                activeTab === 'visualizations'
                  ? 'bg-white shadow-sm text-slate-900'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
              onClick={() => setActiveTab('visualizations')}
            >
              Visualizations
            </button>
          </div>
        </div>

        {activeTab === 'files' ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">File Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Upload Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Records</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {mockFiles.map((file) => (
                  <tr key={file.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileSpreadsheet className="w-5 h-5 text-green-600 mr-2" />
                        <div className="text-sm font-medium text-slate-900">{file.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {formatDate(file.uploadDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {file.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {file.rows} rows × {file.columns} columns
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link to={`/dashboard/visualization/${file.id}`}>
                          <Button variant="ghost" size="sm" leftIcon={<Eye size={14} />}>
                            Visualize
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" leftIcon={<Trash2 size={14} />} className="text-red-600 hover:text-red-700">
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Chart Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Created Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Source File</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {mockCharts.map((chart) => {
                  const sourceFile = mockFiles.find(file => file.id === chart.fileId);
                  return (
                    <tr key={chart.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <BarChart2 className="w-5 h-5 text-primary-600 mr-2" />
                          <div className="text-sm font-medium text-slate-900">{chart.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {formatDate(chart.createdDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {chart.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {sourceFile?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm" leftIcon={<Eye size={14} />}>
                            View
                          </Button>
                          <Button variant="ghost" size="sm" leftIcon={<Download size={14} />}>
                            Export
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;