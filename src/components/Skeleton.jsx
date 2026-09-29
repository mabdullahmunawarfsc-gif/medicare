export default function Skeleton({ className = '' }) {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg ${className}`} />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card">
      <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
      <Skeleton className="h-5 w-3/4 mx-auto mb-2" />
      <Skeleton className="h-4 w-1/2 mx-auto mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  );
}
