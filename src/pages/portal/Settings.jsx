import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Lock, Bell, Moon, Sun, Save, Eye, EyeOff } from 'lucide-react';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';

export default function Settings() {
  const { dark, toggle } = useTheme();
  const { addToast } = useToast();
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    appointments: true,
    reports: true,
    promotions: false,
  });

  const handlePasswordChange = () => {
    if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
      addToast('Please fill in all password fields', 'error');
      return;
    }
    if (passwordData.new !== passwordData.confirm) {
      addToast('New passwords do not match', 'error');
      return;
    }
    addToast('Password changed successfully!', 'success');
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  return (
    <>
      <Helmet>
        <title>Settings - MEDICARE Patient Portal</title>
      </Helmet>

      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your account settings and preferences.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Change Password */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                  <Lock size={20} className="text-primary-500" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Change Password</h2>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    label="Current Password"
                    type={showPasswords.current ? 'text' : 'password'}
                    placeholder="Enter current password"
                    value={passwordData.current}
                    onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                    className="absolute right-3 top-9 text-gray-400"
                  >
                    {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="relative">
                  <Input
                    label="New Password"
                    type={showPasswords.new ? 'text' : 'password'}
                    placeholder="Enter new password"
                    value={passwordData.new}
                    onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                    className="absolute right-3 top-9 text-gray-400"
                  >
                    {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="relative">
                  <Input
                    label="Confirm New Password"
                    type={showPasswords.confirm ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    value={passwordData.confirm}
                    onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                    className="absolute right-3 top-9 text-gray-400"
                  >
                    {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <Button onClick={handlePasswordChange} className="w-full">
                  <Save size={16} className="mr-2" />
                  Update Password
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Notification Preferences */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-teal-50 dark:bg-teal-900/30 rounded-xl flex items-center justify-center">
                  <Bell size={20} className="text-teal-500" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Notification Preferences</h2>
              </div>
              <div className="space-y-4">
                {[
                  { key: 'email', label: 'Email Notifications', description: 'Receive updates via email' },
                  { key: 'sms', label: 'SMS Notifications', description: 'Get SMS alerts for appointments' },
                  { key: 'appointments', label: 'Appointment Reminders', description: 'Reminders before your appointments' },
                  { key: 'reports', label: 'Report Notifications', description: 'Alerts when reports are ready' },
                  { key: 'promotions', label: 'Promotional Offers', description: 'Health tips and special offers' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{item.label}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                    </div>
                    <button
                      onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                      className={`w-12 h-6 rounded-full transition-colors relative ${
                        notifications[item.key] ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          notifications[item.key] ? 'left-7' : 'left-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Appearance */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-yellow-50 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center">
                  {dark ? <Moon size={20} className="text-yellow-500" /> : <Sun size={20} className="text-yellow-500" />}
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Appearance</h2>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark themes</p>
                </div>
                <button
                  onClick={toggle}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    dark ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      dark ? 'left-7' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            </Card>
          </motion.div>

          {/* Privacy & Security */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Privacy & Security</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <span className="text-gray-700 dark:text-gray-300 text-sm">Two-Factor Authentication</span>
                  <Badge variant="green">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <span className="text-gray-700 dark:text-gray-300 text-sm">Login Alerts</span>
                  <Badge variant="green">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <span className="text-gray-700 dark:text-gray-300 text-sm">Data Encryption</span>
                  <Badge variant="green">Active</Badge>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}
