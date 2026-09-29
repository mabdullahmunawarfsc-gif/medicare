import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Mail, Lock, Eye, EyeOff, User, Phone, CreditCard, Calendar, Users, Droplet } from 'lucide-react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', cnic: '', dob: '', gender: '', bloodGroup: '',
    password: '', confirmPassword: '', terms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.cnic) newErrors.cnic = 'CNIC is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood group is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.terms) newErrors.terms = 'You must accept the terms and conditions';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await signup(formData);
      addToast('Account created successfully! Welcome to MEDICARE.', 'success');
      navigate('/portal');
    } catch (err) {
      addToast(err.message || 'Signup failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up - MEDICARE Hospital</title>
      </Helmet>

      <section className="min-h-screen flex">
        {/* Left Side - Form */}
        <div className="w-full lg:w-3/5 flex items-center justify-center p-8 bg-white dark:bg-gray-900 overflow-y-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg py-8">
            <div className="text-center mb-8">
              <Link to="/" className="inline-block mb-6">
                <svg width="48" height="48" viewBox="0 0 64 64">
                  <rect width="64" height="64" rx="14" fill="#0B5ED7" />
                  <path d="M28 14h8v14h14v8H36v14h-8V36H14v-8h14z" fill="#fff" />
                  <path d="M10 44h10l3-6 4 10 3-6h24" stroke="#14B8A6" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Your Account</h1>
              <p className="text-gray-600 dark:text-gray-400">Join MEDICARE and manage your healthcare online</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                icon={User}
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                error={errors.fullName}
              />
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  icon={Mail}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  error={errors.email}
                />
                <Input
                  label="Phone Number"
                  placeholder="0300-1234567"
                  icon={Phone}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  error={errors.phone}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="CNIC"
                  placeholder="35202-1234567-8"
                  icon={CreditCard}
                  value={formData.cnic}
                  onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
                  error={errors.cnic}
                />
                <Input
                  label="Date of Birth"
                  type="date"
                  icon={Calendar}
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  error={errors.dob}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Select
                  label="Gender"
                  placeholder="Select gender"
                  icon={Users}
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  options={[
                    { value: 'Male', label: 'Male' },
                    { value: 'Female', label: 'Female' },
                    { value: 'Other', label: 'Other' },
                  ]}
                  error={errors.gender}
                />
                <Select
                  label="Blood Group"
                  placeholder="Select blood group"
                  icon={Droplet}
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  options={[
                    { value: 'A+', label: 'A+' }, { value: 'A-', label: 'A-' },
                    { value: 'B+', label: 'B+' }, { value: 'B-', label: 'B-' },
                    { value: 'AB+', label: 'AB+' }, { value: 'AB-', label: 'AB-' },
                    { value: 'O+', label: 'O+' }, { value: 'O-', label: 'O-' },
                  ]}
                  error={errors.bloodGroup}
                />
              </div>
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
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
                  label="Confirm Password"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Confirm your password"
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

              <div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.terms}
                    onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                    className="w-4 h-4 mt-0.5 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    I agree to the{' '}
                    <Link to="/terms" className="text-primary-500 hover:underline">Terms & Conditions</Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-primary-500 hover:underline">Privacy Policy</Link>
                  </span>
                </label>
                {errors.terms && <p className="mt-1 text-sm text-red-500">{errors.terms}</p>}
              </div>

              <Button type="submit" className="w-full" size="lg" loading={loading}>
                Create Account
              </Button>
            </form>

            <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-500 hover:text-primary-600 font-medium">
                Login
              </Link>
            </p>
          </motion.div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden lg:flex lg:w-2/5 relative">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=1000&fit=crop"
            alt="Hospital"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-primary-600/80 to-primary-800/80" />
          <div className="relative z-10 flex flex-col justify-center px-12 text-white">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="text-4xl font-bold mb-4">Your Health, Our Priority</h2>
              <p className="text-lg text-blue-100">
                Create your account to access a wide range of healthcare services and manage your health journey with ease.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
