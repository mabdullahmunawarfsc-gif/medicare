import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, Mail, Clock, MapPin, Menu, X, Sun, Moon, ChevronDown,
  Send, Heart, Globe, MessageCircle, Share2, Play
} from 'lucide-react';
import Logo from '../components/Logo';
import Button from '../components/Button';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import FloatingButtons from '../components/FloatingButtons';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Departments', path: '/departments' },
  { label: 'Doctors', path: '/doctors' },
  { label: 'Services', path: '/services' },
  { label: 'Health Packages', path: '/health-packages' },
  { label: 'Lab Tests', path: '/lab-tests' },
  { label: 'Contact', path: '/contact' },
];

export default function PublicLayout() {
  const { dark, toggle } = useTheme();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState('EN');

  return (
    <div className="min-h-screen bg-surface dark:bg-gray-900 flex flex-col">
      {/* Top Bar */}
      <div className="bg-primary-700 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="tel:080012345" className="flex items-center gap-1 hover:text-teal-300 transition-colors">
              <Phone size={14} />
              <span className="hidden sm:inline">Emergency: 0800-12345</span>
              <span className="sm:hidden">0800-12345</span>
            </a>
            <a href="mailto:info@medicare.com" className="hidden md:flex items-center gap-1 hover:text-teal-300 transition-colors">
              <Mail size={14} />
              info@medicare.com
            </a>
            <span className="hidden lg:flex items-center gap-1">
              <Clock size={14} />
              24/7 Emergency Services
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'EN' ? 'UR' : 'EN')}
              className="px-2 py-0.5 rounded border border-white/30 hover:bg-white/10 transition-colors text-xs font-medium"
            >
              {lang === 'EN' ? 'اردو' : 'English'}
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <a href="#" className="hover:text-teal-300 transition-colors"><Globe size={14} /></a>
              <a href="#" className="hover:text-teal-300 transition-colors"><MessageCircle size={14} /></a>
              <a href="#" className="hover:text-teal-300 transition-colors"><Share2 size={14} /></a>
              <a href="#" className="hover:text-teal-300 transition-colors"><Play size={14} /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Logo />

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={toggle}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {dark ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-gray-600" />}
              </button>

              {user ? (
                <Link to="/portal">
                  <Button size="sm">My Portal</Button>
                </Link>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link to="/login">
                    <Button variant="ghost" size="sm">Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm">Sign Up</Button>
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2.5 text-gray-600 dark:text-gray-300 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex gap-2">
                  {user ? (
                    <Link to="/portal" onClick={() => setMobileOpen(false)} className="flex-1">
                      <Button className="w-full">My Portal</Button>
                    </Link>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1">
                        <Button variant="outline" className="w-full">Login</Button>
                      </Link>
                      <Link to="/signup" onClick={() => setMobileOpen(false)} className="flex-1">
                        <Button className="w-full">Sign Up</Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <Logo light className="mb-4" />
              <p className="text-sm text-gray-400 mb-4">
                MEDICARE Hospital is committed to providing world-class healthcare with compassion and excellence. Serving communities since 2005.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors">
                  <Globe size={16} />
                </a>
                <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors">
                  <MessageCircle size={16} />
                </a>
                <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors">
                  <Share2 size={16} />
                </a>
                <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors">
                  <Play size={16} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-teal-400 transition-colors">About Us</Link></li>
                <li><Link to="/departments" className="hover:text-teal-400 transition-colors">Departments</Link></li>
                <li><Link to="/doctors" className="hover:text-teal-400 transition-colors">Find a Doctor</Link></li>
                <li><Link to="/health-packages" className="hover:text-teal-400 transition-colors">Health Packages</Link></li>
                <li><Link to="/lab-tests" className="hover:text-teal-400 transition-colors">Lab Tests</Link></li>
                <li><Link to="/careers" className="hover:text-teal-400 transition-colors">Careers</Link></li>
                <li><Link to="/gallery" className="hover:text-teal-400 transition-colors">Gallery</Link></li>
                <li><Link to="/news" className="hover:text-teal-400 transition-colors">Health News</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-semibold mb-4">Our Services</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/services" className="hover:text-teal-400 transition-colors">Emergency Care</Link></li>
                <li><Link to="/services" className="hover:text-teal-400 transition-colors">ICU</Link></li>
                <li><Link to="/services" className="hover:text-teal-400 transition-colors">Ambulance</Link></li>
                <li><Link to="/services" className="hover:text-teal-400 transition-colors">Pharmacy</Link></li>
                <li><Link to="/services" className="hover:text-teal-400 transition-colors">Laboratory</Link></li>
                <li><Link to="/services" className="hover:text-teal-400 transition-colors">Radiology</Link></li>
                <li><Link to="/services" className="hover:text-teal-400 transition-colors">Blood Bank</Link></li>
                <li><Link to="/services" className="hover:text-teal-400 transition-colors">Home Sampling</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="shrink-0 mt-0.5 text-teal-400" />
                  <span>123 Healthcare Avenue, Gulberg III, Lahore, Pakistan</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} className="shrink-0 text-teal-400" />
                  <span>0800-12345 (Toll Free)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} className="shrink-0 text-teal-400" />
                  <span>info@medicare.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock size={16} className="shrink-0 text-teal-400" />
                  <span>Emergency: 24/7</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-white font-semibold mb-1">Subscribe to Our Newsletter</h4>
                <p className="text-sm text-gray-400">Get health tips, news, and updates delivered to your inbox.</p>
              </div>
              <form className="flex gap-2 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 md:w-64 px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <Button type="submit" variant="secondary">
                  <Send size={16} />
                  <span className="ml-2 hidden sm:inline">Subscribe</span>
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500">
            <p>&copy; 2026 MEDICARE Hospital. All rights reserved.</p>
            <div className="flex gap-4">
              <Link to="/privacy" className="hover:text-teal-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-teal-400 transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </footer>

      <FloatingButtons />
    </div>
  );
}
