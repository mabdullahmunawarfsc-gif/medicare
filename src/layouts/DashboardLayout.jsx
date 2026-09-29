import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, User, FileText, Calendar, FlaskConical, Pill,
  CreditCard, Activity, AlertCircle, Syringe, MessageSquare, Settings,
  LogOut, Menu, X, Sun, Moon, Bell, ChevronDown, Heart
} from 'lucide-react';
import Logo from '../components/Logo';
import Button from '../components/Button';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const sidebarLinks = [
  { path: '/portal', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/portal/profile', label: 'My Profile', icon: User },
  { path: '/portal/medical-history', label: 'Medical History', icon: FileText },
  { path: '/portal/appointments', label: 'Appointments', icon: Calendar },
  { path: '/portal/reports', label: 'Lab Reports', icon: FlaskConical },
  { path: '/portal/prescriptions', label: 'Prescriptions', icon: Pill },
  { path: '/portal/billing', label: 'Billing & Payments', icon: CreditCard },
  { path: '/portal/vitals', label: 'Vitals Tracker', icon: Activity },
  { path: '/portal/health-records', label: 'Allergies & Vaccines', icon: Syringe },
  { path: '/portal/messages', label: 'Messages', icon: MessageSquare },
  { path: '/portal/settings', label: 'Settings', icon: Settings },
];

export default function DashboardLayout() {
  const { dark, toggle } = useTheme();
  const { user, logout } = useAuth();
  const { addToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    addToast('Logged out successfully', 'info');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-surface dark:bg-gray-900 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 fixed h-full z-40">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <Logo />
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 z-50 lg:hidden flex flex-col"
            >
              <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <Logo />
                <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <X size={20} />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {sidebarLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon size={18} />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <Menu size={20} />
              </button>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white hidden sm:block">
                Patient Portal
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggle}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {dark ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-gray-600" />}
              </button>
              <Link to="/portal/messages" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
                <Bell size={20} className="text-gray-600 dark:text-gray-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Link>
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <ChevronDown size={16} className="text-gray-400" />
                </button>
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-2 z-50"
                    >
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                        <p className="font-medium text-gray-900 dark:text-white text-sm">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      <Link to="/portal/profile" onClick={() => setProfileOpen(false)} className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                        My Profile
                      </Link>
                      <Link to="/portal/settings" onClick={() => setProfileOpen(false)} className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                        Settings
                      </Link>
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
