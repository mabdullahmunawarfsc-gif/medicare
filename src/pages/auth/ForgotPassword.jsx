import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useToast } from '../../context/ToastContext';

export default function ForgotPassword() {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      addToast('Password reset link sent to your email!', 'success');
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password - MEDICARE Hospital</title>
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Forgot Password?</h1>
            <p className="text-gray-600 dark:text-gray-400">Enter your email and we'll send you a reset link</p>
          </div>

          {sent ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-card">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Check Your Email</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We've sent a password reset link to <strong>{email}</strong>. Please check your inbox.
              </p>
              <Link to="/login">
                <Button className="w-full">Back to Login</Button>
              </Link>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-card">
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter your registered email"
                  icon={Mail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" className="w-full" size="lg" loading={loading}>
                  Send Reset Link
                </Button>
              </form>
              <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
                Remember your password?{' '}
                <Link to="/login" className="text-primary-500 hover:text-primary-600 font-medium">
                  Back to Login
                </Link>
              </p>
            </div>
          )}
        </motion.div>
      </section>
    </>
  );
}
