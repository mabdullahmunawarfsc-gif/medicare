import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Mail, Lock, Eye, EyeOff, Phone, Info } from 'lucide-react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useToast();
  const [formData, setFormData] = useState({ email: '', password: '', remember: false });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      await login(formData.email, formData.password);
      addToast('Login successful! Welcome back.', 'success');
      navigate('/portal');
    } catch (err) {
      addToast(err.message || 'Login failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - MEDICARE Hospital</title>
      </Helmet>

      <section className="min-h-screen flex">
        {/* Left Side - Image */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=1000&fit=crop"
            alt="Medical professionals"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/80 to-primary-800/80" />
          <div className="relative z-10 flex flex-col justify-center px-12 text-white">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="text-4xl font-bold mb-4">Welcome Back to MEDICARE</h2>
              <p className="text-lg text-blue-100 mb-8">
                Access your health records, book appointments, and manage your healthcare journey all in one place.
              </p>
              <ul className="space-y-3">
                {['View medical history and reports', 'Book and manage appointments', 'Track vitals and health metrics', 'Communicate with your doctors'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-teal-400 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-900">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-8">
              <Link to="/" className="inline-block mb-6">
                <svg width="48" height="48" viewBox="0 0 64 64">
                  <rect width="64" height="64" rx="14" fill="#0B5ED7" />
                  <path d="M28 14h8v14h14v8H36v14h-8V36H14v-8h14z" fill="#fff" />
                  <path d="M10 44h10l3-6 4 10 3-6h24" stroke="#14B8A6" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Login to Your Account</h1>
              <p className="text-gray-600 dark:text-gray-400">Enter your credentials to access your patient portal</p>
            </div>

            {/* Demo Credentials Hint */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <Info size={20} className="text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Demo Account</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Email: demo@medicare.com | Password: Demo@1234</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email or Phone"
                type="text"
                placeholder="Enter your email or phone number"
                icon={Mail}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={errors.email}
              />
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  icon={Lock}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  error={errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.remember}
                    onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-primary-500 hover:text-primary-600 font-medium">
                  Forgot Password?
                </Link>
              </div>

              <Button type="submit" className="w-full" size="lg" loading={loading}>
                Login
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-gray-900 text-gray-500">Or continue with</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4" size="lg">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Login with Google
              </Button>
            </div>

            <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary-500 hover:text-primary-600 font-medium">
                Sign Up
              </Link>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
