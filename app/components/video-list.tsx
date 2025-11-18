import Link from "next/link";
import CustomImage from "./custom-image";
import { VideoItem } from "../data/types";

interface VideoListProps {
    data: any;
}

export default function VideoList({ data }: VideoListProps) {
    return (
        <main className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 lg:gap-6 w-full max-w-screen-2xl my-8">
            {data?.list.map((item: VideoItem, index: number) => (
                <div key={item.vod_id} className="flex flex-col group">
                    <Link href={`./detail?id=` + item.vod_id} className="flex flex-col h-full">
                        <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300 border border-white/10">
                            <CustomImage
                                src={item.vod_pic}
                                alt={item.vod_name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                loading={index < 12 ? "eager" : "lazy"}
                            />
                            {item.vod_remarks && (
                                <div className="absolute top-2 right-2 bg-linear-to-r from-red-600 to-pink-600 text-white text-xs font-semibold px-2.5 py-1 rounded-lg shadow-md z-10">
                                    {item.vod_remarks}
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 pointer-events-none" />
                        </div>
                        <p className="text-center text-white text-sm sm:text-base mt-3 px-1 line-clamp-2 group-hover:text-green-300 transition-colors duration-200 font-medium">
                            {item.vod_name}
                        </p>
                    </Link>
                </div>
            ))}
        </main>
    );
}
