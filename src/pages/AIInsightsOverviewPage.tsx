import React from 'react';

const mockInsights = [
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
];

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

const AIInsightsOverviewPage: React.FC = () => {
  return (
    <div className="fade-in p-6">
      <h1 className="text-2xl font-semibold text-slate-900 mb-4">AI Insights Overview</h1>
      <p className="text-slate-700 mb-6">
        Welcome to the AI Insights section. Here you can view automatically generated insights and recommendations from your uploaded data.
        Select an insight below to explore detailed analysis.
      </p>

      <div className="space-y-6">
        {mockInsights.map(insight => (
          <div key={insight.id} className="border border-slate-200 rounded-md p-4 hover:shadow-md transition-shadow cursor-pointer">
            <h3 className="text-lg font-medium text-slate-900 mb-2">{insight.title}</h3>
            <p className="text-slate-700 mb-2">{insight.description}</p>
            <div className="flex items-center space-x-4 text-sm">
              <span className={`px-2 py-1 rounded-full font-semibold ${getImpactColor(insight.impact)}`}>
                {insight.impact.charAt(0).toUpperCase() + insight.impact.slice(1)} Impact
              </span>
              <span className="text-slate-500">{insight.confidence}% Confidence</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIInsightsOverviewPage;
