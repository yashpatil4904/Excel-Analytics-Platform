import React, { useState } from 'react';
import { Save, Bell, Lock, User, Globe, Palette } from 'lucide-react';
import Button from '../components/ui/Button';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      desktop: true,
      updates: false,
      newsletter: true
    },
    appearance: {
      theme: 'light',
      compactMode: false,
      animationsEnabled: true
    },
    privacy: {
      publicProfile: true,
      showActivity: true,
      dataSharing: false
    }
  });

  const handleNotificationChange = (key) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">Settings</h1>
        <p className="text-slate-600">Manage your account preferences and application settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="card p-4">
            <nav className="space-y-1">
              {[
                { id: 'profile', icon: User, label: 'Profile' },
                { id: 'notifications', icon: Bell, label: 'Notifications' },
                { id: 'appearance', icon: Palette, label: 'Appearance' },
                { id: 'privacy', icon: Lock, label: 'Privacy' },
                { id: 'language', icon: Globe, label: 'Language' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                    activeTab === item.id
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="card p-6">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-6">Profile Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Profile Picture
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
                        <User size={32} className="text-slate-400" />
                      </div>
                      <Button variant="outline" size="sm">Change Photo</Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="form-label">Full Name</label>
                      <input type="text" className="form-input" defaultValue="John Doe" />
                    </div>
                    <div>
                      <label className="form-label">Email</label>
                      <input type="email" className="form-input" defaultValue="john@example.com" />
                    </div>
                    <div>
                      <label className="form-label">Company</label>
                      <input type="text" className="form-input" defaultValue="Acme Inc." />
                    </div>
                    <div>
                      <label className="form-label">Role</label>
                      <input type="text" className="form-input" defaultValue="Data Analyst" />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Bio</label>
                    <textarea 
                      className="form-input min-h-[100px]" 
                      defaultValue="Data enthusiast with 5+ years of experience in analytics and visualization."
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-6">Notification Preferences</h2>
                <div className="space-y-4">
                  {Object.entries(settings.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                      <div>
                        <h3 className="text-sm font-medium text-slate-900 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h3>
                        <p className="text-sm text-slate-500">
                          Receive notifications for {key.toLowerCase()} updates
                        </p>
                      </div>
                      <div className="relative inline-block w-12 h-6">
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={value}
                          onChange={() => handleNotificationChange(key)}
                        />
                        <div
                          className={`w-12 h-6 rounded-full transition-colors ${
                            value ? 'bg-primary-600' : 'bg-slate-200'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out ${
                              value ? 'translate-x-7' : 'translate-x-1'
                            } mt-1`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-6 flex justify-end">
              <Button variant="primary" leftIcon={<Save size={16} />}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 