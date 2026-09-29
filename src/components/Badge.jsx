export default function Badge({ children, variant = 'primary', className = '' }) {
  const variants = {
    primary: 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-300',
    teal: 'bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-300',
    green: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-300',
    red: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-300',
    yellow: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-300',
    gray: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
