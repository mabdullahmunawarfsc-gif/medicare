import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import Button from '../../components/Button';
import { useToast } from '../../context/ToastContext';

export default function OTPVerification() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.some((v) => !v)) {
      addToast('Please enter the complete OTP', 'error');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      addToast('OTP verified successfully!', 'success');
      navigate('/reset-password');
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>OTP Verification - MEDICARE Hospital</title>
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Verify OTP</h1>
            <p className="text-gray-600 dark:text-gray-400">Enter the 6-digit code sent to your email</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-bold rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                ))}
              </div>
              <Button type="submit" className="w-full" size="lg" loading={loading}>
                Verify OTP
              </Button>
            </form>
            <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
              Didn't receive the code?{' '}
              <button className="text-primary-500 hover:text-primary-600 font-medium">Resend</button>
            </p>
          </div>
        </motion.div>
      </section>
    </>
  );
}
