import { Link } from 'react-router-dom';

export default function Logo({ className = '', light = false }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <svg width="40" height="40" viewBox="0 0 64 64" className="shrink-0">
        <rect width="64" height="64" rx="14" fill="#0B5ED7" />
        <path d="M28 14h8v14h14v8H36v14h-8V36H14v-8h14z" fill="#fff" />
        <path
          d="M10 44h10l3-6 4 10 3-6h24"
          stroke="#14B8A6"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="flex flex-col">
        <span className={`text-xl font-bold tracking-tight ${light ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
          MEDICARE
        </span>
        <span className={`text-[10px] font-medium tracking-wider uppercase ${light ? 'text-gray-300' : 'text-gray-500 dark:text-gray-400'}`}>
          Caring for Life
        </span>
      </div>
    </Link>
  );
}
