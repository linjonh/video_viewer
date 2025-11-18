interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
    return (
        <div
            className={`animate-pulse bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-[length:200%_100%] rounded ${className}`}
            style={{
                animation: 'shimmer 2s infinite linear',
            }}
        />
    );
}

export function ImageSkeleton({ className = '' }: SkeletonProps) {
    return (
        <div className={`relative ${className}`}>
            <Skeleton className="w-full h-full" />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-gray-600/30 border-t-gray-400 rounded-full animate-spin" />
            </div>
        </div>
    );
}

export function VideoCardSkeleton() {
    return (
        <div className="flex flex-col group">
            <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl border border-white/10">
                <ImageSkeleton className="w-full h-full" />
            </div>
            <div className="mt-3 px-1">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
            </div>
        </div>
    );
}

export function VideoListSkeleton({ count = 18 }: { count?: number }) {
    return (
        <main className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 lg:gap-6 w-full max-w-screen-2xl my-8">
            {Array.from({ length: count }).map((_, index) => (
                <VideoCardSkeleton key={index} />
            ))}
        </main>
    );
}

export function DetailSkeleton() {
    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Video player skeleton */}
            <div className="w-full aspect-video rounded-xl overflow-hidden">
                <ImageSkeleton className="w-full h-full" />
            </div>

            {/* Title skeleton */}
            <Skeleton className="h-8 w-3/4" />

            {/* Info skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
            </div>

            {/* Episodes skeleton */}
            <div className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                    {Array.from({ length: 20 }).map((_, index) => (
                        <Skeleton key={index} className="h-10 w-full" />
                    ))}
                </div>
            </div>
        </div>
    );
}
