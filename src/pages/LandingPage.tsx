import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart, 
  Upload, 
  LineChart, 
  PieChart, 
  Brain, 
  Users, 
  Shield, 
  CheckCircle2
} from 'lucide-react';
import Button from '../components/ui/Button';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-tr from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="slide-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
                Transform your data into
                <span className="text-primary-600"> actionable insights</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-700 mb-8 max-w-lg">
                Upload Excel files, visualize data with beautiful charts, and leverage AI to extract meaningful insights—all in one powerful platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button variant="primary" size="lg">
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="fade-in">
              <div className="relative bg-white rounded-xl shadow-xl p-6 border border-slate-200 transform rotate-1">
                <div className="flex justify-between mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="flex justify-center mb-4">
                  <BarChart size={48} className="text-primary-600" />
                </div>
                <div className="h-40 bg-slate-100 rounded-md mb-4 flex items-center justify-center">
                  <span className="text-slate-500">Chart Preview</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-primary-50 rounded-md p-2 text-center text-primary-700 text-sm">Sales Data</div>
                  <div className="bg-secondary-50 rounded-md p-2 text-center text-secondary-700 text-sm">Q2 2025</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Powerful Features for Data Analysis
            </h2>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              Our platform provides everything you need to transform raw data into beautiful visualizations and meaningful insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Easy Excel Upload
              </h3>
              <p className="text-slate-700">
                Upload your Excel files (.xls, .xlsx) with a simple drag-and-drop interface. Our platform handles the data processing for you.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Beautiful Visualizations
              </h3>
              <p className="text-slate-700">
                Transform your data into stunning 2D and 3D charts. Choose from bar, line, pie, scatter plots, and more to represent your data.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                AI-Powered Insights
              </h3>
              <p className="text-slate-700">
                Let our AI analyze your data to identify trends, patterns, and anomalies. Get actionable insights without being a data scientist.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Collaborative Dashboard
              </h3>
              <p className="text-slate-700">
                Access all your visualizations in one place. Share insights with your team and collaborate on data analysis projects.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <LineChart className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Export Options
              </h3>
              <p className="text-slate-700">
                Download your visualizations as PNG or PDF files for easy sharing in presentations, reports, or publications.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Secure Data Handling
              </h3>
              <p className="text-slate-700">
                Your data is encrypted and securely stored. We prioritize data privacy and security at every step of the process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Choose the Right Plan for You
            </h2>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              Whether you're an individual analyst or a large enterprise, we have a plan that fits your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-1">Free</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-slate-900">$0</span>
                  <span className="text-slate-600 ml-1">/month</span>
                </div>
                <p className="text-slate-700">
                  Perfect for individuals getting started with data visualization.
                </p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>10 Excel file uploads per month</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Basic visualizations (2D charts)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Export as PNG</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>7-day data storage</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link to="/register">
                    <Button variant="outline" fullWidth>
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-lg border-2 border-primary-500 shadow-md overflow-hidden transform scale-105 hover:shadow-lg transition-shadow">
              <div className="bg-primary-600 py-2 text-center text-white text-sm font-medium">
                Most Popular
              </div>
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-1">Pro</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-slate-900">$29</span>
                  <span className="text-slate-600 ml-1">/month</span>
                </div>
                <p className="text-slate-700">
                  Ideal for professionals who need advanced visualization tools.
                </p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Unlimited Excel file uploads</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Advanced visualizations (2D & 3D)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Export as PNG & PDF</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>30-day data storage</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Basic AI insights</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link to="/register">
                    <Button variant="primary" fullWidth>
                      Start 14-Day Trial
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-1">Enterprise</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-slate-900">$99</span>
                  <span className="text-slate-600 ml-1">/month</span>
                </div>
                <p className="text-slate-700">
                  For teams and businesses that need comprehensive solutions.
                </p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Everything in Pro plan</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Team collaboration features</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Advanced AI insights & predictions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>1-year data storage</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link to="/register">
                    <Button variant="outline" fullWidth>
                      Contact Sales
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Data?
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-primary-100">
            Join thousands of users who are already turning their Excel data into beautiful visualizations and actionable insights.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button 
                variant="ghost" 
                size="lg"
                className="bg-white text-primary-600 hover:bg-slate-100"
              >
                Get Started Free
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-primary-700"
              >
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;