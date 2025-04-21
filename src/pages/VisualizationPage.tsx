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

type ChartType = 'bar' | 'line' | 'pie' | 'scatter' | '3d';

const VisualizationPage: React.FC = () => {
  const { fileId } = useParams<{ fileId: string }>();
  const [chartType, setChartType] = useState<ChartType>('bar');
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
            variant="primary" 
            size="sm"
            leftIcon={<Lightbulb size={16} />}
          >
            AI Insights
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chart Settings - Desktop: Sidebar, Mobile: Collapsible panel */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 lg:block order-2 lg:order-1">
          <div className="flex justify-between items-center mb-4 lg:mb-6">
            <h2 className="text-lg font-semibold text-slate-900">Chart Settings</h2>
            <button 
              className="lg:hidden text-slate-500 hover:text-slate-700"
              onClick={() => setShowSettings(!showSettings)}
            >
              <ChevronDown 
                size={20} 
                className={`transform transition-transform ${showSettings ? 'rotate-180' : ''}`} 
              />
            </button>
          </div>

          <div className={`${showSettings ? 'block' : 'hidden'} lg:block`}>
            {/* Chart Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Chart Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  className={`p-2 rounded-md flex flex-col items-center text-xs ${
                    chartType === 'bar' 
                      ? 'bg-primary-50 text-primary-700 border border-primary-200' 
                      : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                  onClick={() => setChartType('bar')}
                >
                  <BarChartIcon size={18} className="mb-1" />
                  Bar
                </button>
                <button
                  className={`p-2 rounded-md flex flex-col items-center text-xs ${
                    chartType === 'line' 
                      ? 'bg-primary-50 text-primary-700 border border-primary-200' 
                      : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                  onClick={() => setChartType('line')}
                >
                  <LineChartIcon size={18} className="mb-1" />
                  Line
                </button>
                <button
                  className={`p-2 rounded-md flex flex-col items-center text-xs ${
                    chartType === 'pie' 
                      ? 'bg-primary-50 text-primary-700 border border-primary-200' 
                      : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                  onClick={() => setChartType('pie')}
                >
                  <PieChartIcon size={18} className="mb-1" />
                  Pie
                </button>
                <button
                  className={`p-2 rounded-md flex flex-col items-center text-xs ${
                    chartType === 'scatter' 
                      ? 'bg-primary-50 text-primary-700 border border-primary-200' 
                      : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                  onClick={() => setChartType('scatter')}
                >
                  <ScatterChart size={18} className="mb-1" />
                  Scatter
                </button>
                <button
                  className={`p-2 rounded-md flex flex-col items-center text-xs ${
                    chartType === '3d' 
                      ? 'bg-primary-50 text-primary-700 border border-primary-200' 
                      : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                  onClick={() => setChartType('3d')}
                >
                  <Cube size={18} className="mb-1" />
                  3D Column
                </button>
              </div>
            </div>

            {/* Chart Title */}
            <div className="mb-6">
              <label htmlFor="chart-title" className="block text-sm font-medium text-slate-700 mb-2">
                Chart Title
              </label>
              <input
                type="text"
                id="chart-title"
                className="form-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter chart title"
              />
            </div>

            {/* Data Selection */}
            {chartType !== 'pie' && chartType !== '3d' && (
              <>
                <div className="mb-4">
                  <label htmlFor="x-axis" className="block text-sm font-medium text-slate-700 mb-2">
                    X-Axis Data
                  </label>
                  <select
                    id="x-axis"
                    className="form-input"
                    value={xAxis}
                    onChange={(e) => setXAxis(e.target.value)}
                  >
                    {getColumns().map((column) => (
                      <option key={column} value={column}>
                        {column.charAt(0).toUpperCase() + column.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="y-axis" className="block text-sm font-medium text-slate-700 mb-2">
                    Y-Axis Data
                  </label>
                  <select
                    id="y-axis"
                    className="form-input"
                    value={yAxis}
                    onChange={(e) => setYAxis(e.target.value)}
                  >
                    {getColumns()
                      .filter(col => col !== xAxis && col !== 'month')
                      .map((column) => (
                        <option key={column} value={column}>
                          {column.charAt(0).toUpperCase() + column.slice(1)}
                        </option>
                      ))}
                  </select>
                </div>
              </>
            )}

            {/* Colors */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Color Scheme
              </label>
              <div className="flex space-x-2">
                {COLORS.slice(0, 5).map((color, index) => (
                  <div 
                    key={index} 
                    className="w-6 h-6 rounded-full cursor-pointer hover:ring-2 hover:ring-offset-1 ring-slate-400"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Advanced Options */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-slate-700 mb-2">Advanced Options</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="show-grid"
                    className="h-4 w-4 text-primary-600 border-slate-300 rounded focus:ring-primary-500"
                    defaultChecked
                  />
                  <label htmlFor="show-grid" className="ml-2 block text-sm text-slate-700">
                    Show grid lines
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="show-legend"
                    className="h-4 w-4 text-primary-600 border-slate-300 rounded focus:ring-primary-500"
                    defaultChecked
                  />
                  <label htmlFor="show-legend" className="ml-2 block text-sm text-slate-700">
                    Show legend
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="show-tooltip"
                    className="h-4 w-4 text-primary-600 border-slate-300 rounded focus:ring-primary-500"
                    defaultChecked
                  />
                  <label htmlFor="show-tooltip" className="ml-2 block text-sm text-slate-700">
                    Show tooltips
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Display */}
        <div className="card p-6 lg:col-span-3 order-1 lg:order-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
            <div className="flex items-center text-xs text-slate-500">
              <FileSpreadsheet size={14} className="mr-1" />
              Sales_Data_2024_Q1.xlsx
            </div>
          </div>
          
          <div className="border border-slate-200 rounded-lg p-4 bg-white">
            {renderChart()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizationPage;