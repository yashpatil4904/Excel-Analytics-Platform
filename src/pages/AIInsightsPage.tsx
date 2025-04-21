import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BarChart2, TrendingUp, Zap, Info, Loader2 } from 'lucide-react';
import Button from '../components/ui/Button';

const AIInsightsPage: React.FC = () => {
  const { fileId } = useParams<{ fileId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data for AI insights
  const [insights, setInsights] = useState<any>(null);
  
  useEffect(() => {
    // Simulate API call to get insights
    const timer = setTimeout(() => {
      setInsights({
        summary: {
          title: "Sales Performance Analysis",
          dataPoints: 1245,
          variables: 8,
          anomalies: 3,
          trends: 4
        },
        keyFindings: [
          {
            id: 1,
            title: "Revenue Growth Trend",
            description: "Q4 sales showed a 23% increase compared to Q3, significantly outperforming the 15% projected growth.",
            confidence: 92,
            impact: "high"
          },
          {
            id: 2,
            title: "Regional Performance Anomaly",
            description: "The Western region underperformed by 12% compared to other regions despite having the highest marketing budget allocation.",
            confidence: 87,
            impact: "medium"
          },
          {
            id: 3,
            title: "Product Category Insight",
            description: "Electronics category has the highest profit margin (42%) but lowest customer retention rate (23%).",
            confidence: 95,
            impact: "high"
          },
          {
            id: 4,
            title: "Customer Segment Analysis",
            description: "First-time buyers conversion rate increased by 18% following the loyalty program introduction.",
            confidence: 81,
            impact: "medium"
          }
        ],
        recommendations: [
          "Increase marketing budget for high-margin products",
          "Investigate Western region performance issues",
          "Consider bundling high-margin products with complementary items",
          "Expand the loyalty program with tiered rewards"
        ],
        correlations: [
          { variable1: "Marketing Spend", variable2: "New Customer Acquisition", strength: 0.78, significance: "high" },
          { variable1: "Discount Rate", variable2: "Purchase Volume", strength: 0.65, significance: "medium" },
          { variable1: "Shipping Time", variable2: "Customer Satisfaction", strength: -0.72, significance: "high" }
        ]
      });
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [fileId]);
  
  // Helper function to get impact color
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-amber-600 bg-amber-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-blue-600 bg-blue-50';
    }
  };
  
  if (isLoading) {
    return (
      <div className="fade-in flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="w-12 h-12 text-primary-500 animate-spin mb-4" />
        <h2 className="text-xl font-semibold text-slate-700 mb-2">Analyzing Your Data</h2>
        <p className="text-slate-500 text-center max-w-md">
          Our AI is examining patterns, trends, and insights in your dataset. This might take a moment.
        </p>
      </div>
    );
  }
  
  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">
          AI Insights
        </h1>
        <p className="text-slate-600">
          Automatically generated insights and recommendations for "{insights?.summary.title}"
        </p>
      </div>
      
      {insights && (
        <div className="space-y-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-sm font-medium text-slate-500">Data Points Analyzed</h3>
                <span className="p-1.5 bg-primary-50 rounded-md">
                  <BarChart2 className="w-4 h-4 text-primary-600" />
                </span>
              </div>
              <p className="text-2xl font-semibold text-slate-900">{insights.summary.dataPoints}</p>
            </div>
            
            <div className="card p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-sm font-medium text-slate-500">Variables Compared</h3>
                <span className="p-1.5 bg-indigo-50 rounded-md">
                  <TrendingUp className="w-4 h-4 text-indigo-600" />
                </span>
              </div>
              <p className="text-2xl font-semibold text-slate-900">{insights.summary.variables}</p>
            </div>
            
            <div className="card p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-sm font-medium text-slate-500">Anomalies Detected</h3>
                <span className="p-1.5 bg-amber-50 rounded-md">
                  <Info className="w-4 h-4 text-amber-600" />
                </span>
              </div>
              <p className="text-2xl font-semibold text-slate-900">{insights.summary.anomalies}</p>
            </div>
            
            <div className="card p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-sm font-medium text-slate-500">Trends Identified</h3>
                <span className="p-1.5 bg-green-50 rounded-md">
                  <Zap className="w-4 h-4 text-green-600" />
                </span>
              </div>
              <p className="text-2xl font-semibold text-slate-900">{insights.summary.trends}</p>
            </div>
          </div>
          
          {/* Key Findings */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">
              Key Findings
            </h2>
            <div className="space-y-6">
              {insights.keyFindings.map((finding: any) => (
                <div key={finding.id} className="border-b border-slate-100 pb-5 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start mb-3 gap-4">
                    <h3 className="text-base font-medium text-slate-900">{finding.title}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getImpactColor(finding.impact)}`}>
                        {finding.impact.charAt(0).toUpperCase() + finding.impact.slice(1)} Impact
                      </span>
                      <span className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded-full">
                        {finding.confidence}% Confidence
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">
                    {finding.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recommendations */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">
              Recommended Actions
            </h2>
            <ul className="space-y-3 mb-6">
              {insights.recommendations.map((recommendation: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-slate-700">{recommendation}</span>
                </li>
              ))}
            </ul>
            <Button variant="outline" size="sm">
              Export Recommendations
            </Button>
          </div>
          
          {/* Correlations */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">
              Key Correlations
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-xs font-medium text-slate-500 border-b border-slate-200">
                    <th className="px-4 py-3">Variable 1</th>
                    <th className="px-4 py-3">Variable 2</th>
                    <th className="px-4 py-3">Correlation Strength</th>
                    <th className="px-4 py-3">Significance</th>
                  </tr>
                </thead>
                <tbody>
                  {insights.correlations.map((correlation: any, index: number) => (
                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">{correlation.variable1}</td>
                      <td className="px-4 py-3 text-slate-600">{correlation.variable2}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="w-20 bg-slate-200 rounded-full h-2 mr-3">
                            <div 
                              className={`${Math.abs(correlation.strength) > 0.7 ? 'bg-green-500' : 'bg-amber-500'} h-2 rounded-full`} 
                              style={{ width: `${Math.abs(correlation.strength) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-slate-600">
                            {(correlation.strength > 0 ? '+' : '') + correlation.strength.toFixed(2)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          correlation.significance === 'high' 
                            ? 'bg-green-50 text-green-700' 
                            : 'bg-amber-50 text-amber-700'
                        }`}>
                          {correlation.significance.charAt(0).toUpperCase() + correlation.significance.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInsightsPage;