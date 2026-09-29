import { motion } from 'framer-motion';

export default function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === tab.value
              ? 'text-white'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          {activeTab === tab.value && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-primary-500 rounded-lg"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
