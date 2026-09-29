import { motion } from 'framer-motion';

export default function Card({ children, className = '', hover = false, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: '0 12px 24px -4px rgb(0 0 0 / 0.1)' } : {}}
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-card border border-gray-100 dark:border-gray-700 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
