import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) {
  const base = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-sm hover:shadow-md',
    secondary: 'bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-500 shadow-sm hover:shadow-md',
    outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-500',
    ghost: 'text-primary-500 hover:bg-primary-50 focus:ring-primary-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-sm',
    white: 'bg-white text-primary-500 hover:bg-gray-50 focus:ring-white shadow-sm',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 size={18} className="mr-2 animate-spin" />}
      {children}
    </motion.button>
  );
}
