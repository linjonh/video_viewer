import Link from "next/link";
import CustomImage from "./custom-image";
import { VideoItem } from "../data/types";

interface VideoListProps {
    data: any;
}

export default function VideoList({ data }: VideoListProps) {
    const formatLanguage = (lang: string | undefined) => {
        if (!lang) return lang;
        return lang.replace(/汉语普通话/g, '普通话');
    };

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
                            {(item.vod_year || item.vod_area || item.type_name || item.vod_lang) && (
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-2 z-10">
                                    <div className="flex flex-wrap gap-1 text-[10px] sm:text-xs text-white/90">
                                        {item.type_name && (
                                            <span className="bg-blue-600/80 px-1.5 py-0.5 rounded">
                                                {item.type_name}
                                            </span>
                                        )}
                                        {item.vod_year && (
                                            <span className="bg-purple-600/80 px-1.5 py-0.5 rounded">
                                                {item.vod_year}
                                            </span>
                                        )}
                                        {item.vod_area && (
                                            <span className="bg-green-600/80 px-1.5 py-0.5 rounded">
                                                {item.vod_area}
                                            </span>
                                        )}
                                        {item.vod_lang && (
                                            <span className="bg-orange-600/80 px-1.5 py-0.5 rounded">
                                                {formatLanguage(item.vod_lang)}
                                            </span>
                                        )}
                                    </div>
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
