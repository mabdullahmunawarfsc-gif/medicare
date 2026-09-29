import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useToast } from '../../context/ToastContext';

export default function ResetPassword() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      addToast('Password reset successfully! Please login with your new password.', 'success');
      navigate('/login');
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Reset Password - MEDICARE Hospital</title>
      </Helmet>

      <section className="min-h-screen flex items-center justify-center bg-surface dark:bg-gray-900 p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-6">
              <svg width="48" height="48" viewBox="0 0 64 64">
                <rect width="64" height="64" rx="14" fill="#0B5ED7" />
                <path d="M28 14h8v14h14v8H36v14h-8V36H14v-8h14z" fill="#fff" />
                <path d="M10 44h10l3-6 4 10 3-6h24" stroke="#14B8A6" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Reset Password</h1>
            <p className="text-gray-600 dark:text-gray-400">Create a new password for your account</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-card">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  label="New Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
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
              <div className="relative">
                <Input
                  label="Confirm New Password"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  icon={Lock}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  error={errors.confirmPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <Button type="submit" className="w-full" size="lg" loading={loading}>
                Reset Password
              </Button>
            </form>
          </div>
        </motion.div>
      </section>
    </>
  );
}
