import React, { useState } from 'react';
import { Search, Book, HelpCircle, MessageCircle, FileText, ChevronDown, ExternalLink } from 'lucide-react';
import Button from '../components/ui/Button';

const HelpSupportPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: 'How do I upload an Excel file?',
      answer: 'To upload an Excel file, go to the Upload page from your dashboard. You can either drag and drop your file into the upload area or click to browse your files. We support .xls and .xlsx formats.'
    },
    {
      id: 2,
      question: 'What types of visualizations are available?',
      answer: 'We offer various chart types including bar charts, line charts, pie charts, scatter plots, and 3D visualizations. Each type is suitable for different kinds of data and analysis needs.'
    },
    {
      id: 3,
      question: 'How does the AI insights feature work?',
      answer: 'Our AI analyzes your data to identify patterns, trends, and anomalies. It provides automated insights about your data, including correlations between variables and potential areas of interest.'
    },
    {
      id: 4,
      question: 'Can I export my visualizations?',
      answer: 'Yes, you can export your visualizations in various formats including PNG and PDF. Look for the export button in the visualization page toolbar.'
    },
    {
      id: 5,
      question: 'How do I share my analysis with team members?',
      answer: 'You can share your visualizations and insights by using the Share button on any visualization page. You can set permissions and generate shareable links.'
    }
  ];

  const quickLinks = [
    { icon: Book, title: 'Getting Started Guide', description: 'Learn the basics of using our platform' },
    { icon: FileText, title: 'Documentation', description: 'Detailed technical documentation and API references' },
    { icon: MessageCircle, title: 'Community Forum', description: 'Connect with other users and share knowledge' },
    { icon: HelpCircle, title: 'FAQ', description: 'Frequently asked questions and answers' }
  ];

  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">Help & Support</h1>
        <p className="text-slate-600">Find answers to common questions and learn how to use our platform</p>
      </div>

      {/* Search */}
      <div className="card p-6 mb-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              className="form-input pl-10"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickLinks.map((link, index) => (
          <div key={index} className="card p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center space-x-3 mb-3">
              <span className="p-2 bg-primary-50 rounded-lg">
                <link.icon className="w-5 h-5 text-primary-600" />
              </span>
              <h3 className="font-medium text-slate-900">{link.title}</h3>
            </div>
            <p className="text-sm text-slate-600">{link.description}</p>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <div className="card p-6 mb-8">
        <h2 className="text-lg font-semibold text-slate-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="border border-slate-200 rounded-lg">
              <button
                className="w-full flex items-center justify-between p-4 text-left"
                onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
              >
                <span className="font-medium text-slate-900">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transform transition-transform ${
                    expandedFaq === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedFaq === faq.id && (
                <div className="px-4 pb-4 text-slate-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="card p-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Still need help?</h2>
          <p className="text-slate-600 mb-6">
            Our support team is available 24/7 to help you with any questions or issues.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="primary"
              leftIcon={<MessageCircle size={16} />}
            >
              Contact Support
            </Button>
            <Button 
              variant="outline"
              leftIcon={<ExternalLink size={16} />}
            >
              Visit Help Center
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupportPage;