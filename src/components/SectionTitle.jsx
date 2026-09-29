import { motion } from 'framer-motion';

export default function SectionTitle({ subtitle, title, description, align = 'center', dark = false }) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`max-w-2xl ${alignClass} mb-12`}
    >
      {subtitle && (
        <span className="inline-block text-teal-500 font-semibold text-sm uppercase tracking-wider mb-2">
          {subtitle}
        </span>
      )}
      <h2 className={`text-3xl md:text-4xl font-bold ${dark ? 'text-white' : 'text-gray-900 dark:text-white'} mb-4`}>
        {title}
      </h2>
      {description && (
        <p className={`text-lg ${dark ? 'text-gray-300' : 'text-gray-600 dark:text-gray-400'}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
