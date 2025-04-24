import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BarChart as BarChartIcon, LineChart as LineChartIcon, PieChart as PieChartIcon, ScatterChart, Cuboid as Cube, Download, Share, Lightbulb, Save, FileSpreadsheet, ChevronDown } from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  ScatterChart as RechartsScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import Button from '../components/ui/Button';

// Mock data
const mockData = [
  { month: 'Jan', sales: 1200, target: 1000, difference: 200 },
  { month: 'Feb', sales: 1900, target: 1300, difference: 600 },
  { month: 'Mar', sales: 1500, target: 1200, difference: 300 },
  { month: 'Apr', sales: 1800, target: 1500, difference: 300 },
  { month: 'May', sales: 2200, target: 1800, difference: 400 },
  { month: 'Jun', sales: 2600, target: 2000, difference: 600 },
  { month: 'Jul', sales: 2400, target: 2200, difference: 200 },
  { month: 'Aug', sales: 2800, target: 2500, difference: 300 },
  { month: 'Sep', sales: 3000, target: 2800, difference: 200 },
  { month: 'Oct', sales: 3200, target: 3000, difference: 200 },
  { month: 'Nov', sales: 3500, target: 3200, difference: 300 },
  { month: 'Dec', sales: 3800, target: 3500, difference: 300 },
];

const mockPieData = [
  { name: 'North America', value: 35 },
  { name: 'Europe', value: 28 },
  { name: 'Asia', value: 22 },
  { name: 'South America', value: 10 },
  { name: 'Africa', value: 5 },
];

const mockScatterData = [
  { index: 0, weight: 65, height: 170, z: 8 },
  { index: 1, weight: 75, height: 180, z: 10 },
  { index: 2, weight: 68, height: 175, z: 9 },
  { index: 3, weight: 90, height: 185, z: 12 },
  { index: 4, weight: 55, height: 160, z: 7 },
  { index: 5, weight: 60, height: 165, z: 8 },
  { index: 6, weight: 80, height: 178, z: 11 },
  { index: 7, weight: 70, height: 172, z: 10 },
  { index: 8, weight: 85, height: 182, z: 12 },
  { index: 9, weight: 62, height: 168, z: 9 },
];

const COLORS = [
  '#4A90E2', '#6772E5', '#9C59B6', '#F39C12', '#1ABC9C', 
  '#3498DB', '#2ECC71', '#E74C3C', '#34495E', '#16A085'
];

const VisualizationPage = () => {
  const { fileId } = useParams();
  const [chartType, setChartType] = useState('bar');
  const [xAxis, setXAxis] = useState('month');
  const [yAxis, setYAxis] = useState('sales');
  const [title, setTitle] = useState('Sales Performance');
  const [showSettings, setShowSettings] = useState(true);
  
  useEffect(() => {
    // Set document title when component mounts
    document.title = 'Visualize: ' + fileId;
    
    // Reset document title when component unmounts
    return () => {
      document.title = document.querySelector('[data-default]')?.getAttribute('title') || 'DataViz';
    };
  }, [fileId]);

  // Get available columns for the current data
  const getColumns = () => {
    if (mockData.length > 0) {
      return Object.keys(mockData[0]);
    }
    return [];
  };

  // Render the selected chart type
  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              data={mockData}
              margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey={xAxis} 
                label={{ value: xAxis, position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                label={{ value: yAxis, angle: -90, position: 'insideLeft' }}
              />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey={yAxis} fill="#4A90E2" name={yAxis.charAt(0).toUpperCase() + yAxis.slice(1)} />
              {yAxis === 'sales' && (
                <Bar dataKey="target" fill="#6772E5" name="Target" />
              )}
            </BarChart>
          </ResponsiveContainer>
        );
        
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={500}>
            <LineChart
              data={mockData}
              margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey={xAxis} 
                label={{ value: xAxis, position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                label={{ value: yAxis, angle: -90, position: 'insideLeft' }}
              />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Line 
                type="monotone" 
                dataKey={yAxis} 
                stroke="#4A90E2" 
                activeDot={{ r: 8 }} 
                name={yAxis.charAt(0).toUpperCase() + yAxis.slice(1)}
              />
              {yAxis === 'sales' && (
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#6772E5" 
                  activeDot={{ r: 8 }} 
                  name="Target"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        );
        
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={500}>
            <PieChart>
              <Pie
                data={mockPieData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {mockPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        );
        
      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height={500}>
            <RechartsScatterChart
              margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                dataKey="weight" 
                name="Weight" 
                unit="kg"
                label={{ value: 'Weight (kg)', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                type="number" 
                dataKey="height" 
                name="Height" 
                unit="cm"
                label={{ value: 'Height (cm)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend verticalAlign="top" height={36} />
              <Scatter 
                name="People" 
                data={mockScatterData} 
                fill="#4A90E2"
              />
            </RechartsScatterChart>
          </ResponsiveContainer>
        );
        
      case '3d':
        return (
          <div className="flex items-center justify-center h-[500px] bg-slate-50 border border-slate-200 rounded-lg">
            <div className="text-center p-6">
              <Cube className="w-16 h-16 text-primary-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-700 mb-2">3D Visualization</h3>
              <p className="text-slate-500 max-w-sm">
                3D visualizations require additional processing. 
                This feature will be available in the next update.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fade-in">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            {title || 'Chart Visualization'}
          </h1>
          <p className="text-slate-600">
            File: {mockData.length > 0 ? `Sales_Data_2024_Q1.xlsx` : 'Loading...'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm"
            leftIcon={<Save size={16} />}
          >
            Save
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            leftIcon={<Download size={16} />}
          >
            Export
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            leftIcon={<Share size={16} />}
          >
            Share
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            leftIcon={<Lightbulb size={16} />}
          >
            AI Insights
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          {/* Chart container */}
          <div className="card p-6">
            {renderChart()}
          </div>
        </div>

        <div className="lg:col-span-1">
          {/* Settings panel */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-900">
                Chart Settings
              </h2>
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className="text-slate-500 hover:text-slate-700"
              >
                <ChevronDown 
                  size={20} 
                  className={`transform transition-transform ${showSettings ? 'rotate-180' : ''}`}
                />
              </button>
            </div>

            {showSettings && (
              <div className="space-y-6">
                {/* Chart type selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Chart Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setChartType('bar')}
                      className={`p-3 rounded-lg border flex flex-col items-center justify-center ${
                        chartType === 'bar'
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-slate-200 hover:border-primary-300'
                      }`}
                    >
                      <BarChartIcon size={20} />
                      <span className="text-xs mt-1">Bar</span>
                    </button>
                    <button
                      onClick={() => setChartType('line')}
                      className={`p-3 rounded-lg border flex flex-col items-center justify-center ${
                        chartType === 'line'
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-slate-200 hover:border-primary-300'
                      }`}
                    >
                      <LineChartIcon size={20} />
                      <span className="text-xs mt-1">Line</span>
                    </button>
                    <button
                      onClick={() => setChartType('pie')}
                      className={`p-3 rounded-lg border flex flex-col items-center justify-center ${
                        chartType === 'pie'
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-slate-200 hover:border-primary-300'
                      }`}
                    >
                      <PieChartIcon size={20} />
                      <span className="text-xs mt-1">Pie</span>
                    </button>
                    <button
                      onClick={() => setChartType('scatter')}
                      className={`p-3 rounded-lg border flex flex-col items-center justify-center ${
                        chartType === 'scatter'
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-slate-200 hover:border-primary-300'
                      }`}
                    >
                      <ScatterChart size={20} />
                      <span className="text-xs mt-1">Scatter</span>
                    </button>
                  </div>
                </div>

                {/* Axis selection */}
                {chartType !== 'pie' && chartType !== '3d' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        X-Axis
                      </label>
                      <select
                        value={xAxis}
                        onChange={(e) => setXAxis(e.target.value)}
                        className="form-select w-full"
                      >
                        {getColumns().map((column) => (
                          <option key={column} value={column}>
                            {column.charAt(0).toUpperCase() + column.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Y-Axis
                      </label>
                      <select
                        value={yAxis}
                        onChange={(e) => setYAxis(e.target.value)}
                        className="form-select w-full"
                      >
                        {getColumns().map((column) => (
                          <option key={column} value={column}>
                            {column.charAt(0).toUpperCase() + column.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                {/* Chart title */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Chart Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-input w-full"
                    placeholder="Enter chart title"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizationPage; 