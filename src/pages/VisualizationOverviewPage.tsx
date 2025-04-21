import React from 'react';
import { BarChart, LineChart, PieChart, ScatterChart } from 'lucide-react';

const mockFiles = [
  { id: 'file1', name: 'Sales_Data_2024_Q1.xlsx', uploadedAt: '2024-04-01' },
  { id: 'file2', name: 'Marketing_Analysis_2023.xlsx', uploadedAt: '2024-03-15' },
  { id: 'file3', name: 'Customer_Segments_2024.xlsx', uploadedAt: '2024-02-28' },
];

const VisualizationOverviewPage: React.FC = () => {
  return (
    <div className="fade-in p-6">
      <h1 className="text-2xl font-semibold text-slate-900 mb-4">Visualizations Overview</h1>
      <p className="text-slate-700 mb-6">
        Welcome to the Visualizations section. Here you can create interactive 2D and 3D charts from your uploaded Excel files.
        Select a file below to start analyzing and generating charts.
      </p>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-3">Your Uploaded Files</h2>
        <ul className="space-y-3">
          {mockFiles.map(file => (
            <li key={file.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-md hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center space-x-3">
                <BarChart className="w-6 h-6 text-primary-600" />
                <span className="font-medium text-slate-900">{file.name}</span>
              </div>
              <span className="text-sm text-slate-500">Uploaded: {file.uploadedAt}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-slate-800 mb-3">Chart Types Available</h2>
        <div className="flex space-x-6 text-primary-600">
          <BarChart size={36} />
          <LineChart size={36} />
          <PieChart size={36} />
          <ScatterChart size={36} />
        </div>
      </div>
    </div>
  );
};

export default VisualizationOverviewPage;
