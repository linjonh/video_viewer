export default function NavMenuSkeleton() {
  return (
    <div className="sticky top-0 bg-black/30 backdrop-blur-md w-full shadow-xl border-b border-white/10 z-50">
      <div className="max-w-screen-2xl mx-auto px-4 py-3 sm:py-4">
        {/* Header with Server Logo, Tab Title, Search, and Menu Button */}
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Server Logo Skeleton */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="h-6 w-24 bg-white/10 rounded animate-pulse"></div>
          </div>

          {/* Center: Selected Tab Name Skeleton */}
          <div className="flex-1 flex justify-center min-w-0">
            <div className="h-8 w-32 bg-white/10 rounded animate-pulse"></div>
          </div>

          {/* Right: Search and Menu Toggle Buttons */}
          <div className="flex items-center gap-2">
            {/* Search Toggle Button */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-lg animate-pulse"></div>

            {/* Menu Toggle Button */}
            <div className="w-20 h-9 sm:w-24 sm:h-10 bg-white/10 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
