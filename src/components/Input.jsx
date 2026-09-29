import { forwardRef } from 'react';

const Input = forwardRef(({ label, error, icon: Icon, className = '', ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-2.5 rounded-xl border ${Icon ? 'pl-10' : ''} ${
            error
              ? 'border-red-400 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-200 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500'
          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
