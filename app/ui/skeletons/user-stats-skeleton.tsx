export default function UserStatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="h-10 w-10 rounded-full bg-gray-200" />
            <div className="h-6 w-16 bg-gray-200 rounded" />
          </div>
          <div className="mt-4">
            <div className="h-7 w-20 bg-gray-200 rounded mb-1" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}