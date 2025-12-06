import { cn } from '@/lib/cn';

export function SkeletonView() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar Skeleton */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="w-32 h-8 bg-gray-200 rounded animate-pulse" />
          <div className="hidden md:flex gap-8">
            <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="w-24 h-10 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Hero Skeleton */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="h-12 bg-gray-200 rounded-lg w-3/4 mx-auto animate-pulse" />
            <div className="h-12 bg-gray-200 rounded-lg w-1/2 mx-auto animate-pulse" />
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto animate-pulse" />
          </div>
          <div className="flex justify-center gap-4 pt-4">
            <div className="w-32 h-12 bg-gray-200 rounded-lg animate-pulse" />
            <div className="w-32 h-12 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>

      {/* Grid/Features Skeleton */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm space-y-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
                <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
