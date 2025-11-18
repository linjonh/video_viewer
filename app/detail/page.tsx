import { log } from "console"
import { loadVideoDetail } from "../data/repository"
import Image from "next/image";
import BackButton from "../components/back-button";

export default async function detailPage(props: { searchParams: { id: string } }) {
    const searchParams = await props.searchParams
    log("searchParams=>", searchParams)
    const data = await loadVideoDetail(searchParams.id)
    const info = data.list[0];
    // log(info)
    const urls: string[] = info.vod_play_url.split("$$$")

    return (
        <div className="min-h-screen text-white p-4 sm:p-6 lg:p-10">
            <div className="max-w-7xl mx-auto">
                {/* 返回按钮 */}
                <BackButton />
                {/* 主要内容区域 */}
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* 海报图片 */}
                    <div className="shrink-0 w-full sm:w-64 lg:w-80 mx-auto lg:mx-0">
                        <div className="relative aspect-2/3 w-full overflow-hidden rounded-2xl shadow-2xl border border-white/20 group">
                            <Image
                                src={info.vod_pic}
                                alt={info.vod_name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                width={320}
                                height={480}
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    </div>

                    {/* 信息区域 */}
                    <div className="flex-1 flex flex-col gap-6">
                        {/* 标题和副标题 */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/10">
                            <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-linear-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                                {info.vod_name}
                            </h1>
                            {info.vod_sub && <p className="text-gray-300 text-lg">{info.vod_sub}</p>}
                        </div>

                        {/* 基本信息 */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/10">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-linear-to-b from-blue-400 to-cyan-400 rounded-full"></span>
                                基本信息
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InfoItem label="类型" value={info.type_name} />
                                <InfoItem label="上映日期" value={info.vod_pubdate} />
                                {info.vod_director && <InfoItem label="导演" value={info.vod_director} />}
                                {info.vod_actor && <InfoItem label="演员" value={info.vod_actor} className="sm:col-span-2" />}
                            </div>
                        </div>

                        {/* 剧情简介 */}
                        {info.vod_content && (
                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/10">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-linear-to-b from-purple-400 to-pink-400 rounded-full"></span>
                                    剧情简介
                                </h2>
                                <p className="text-gray-200 leading-relaxed text-justify">{info.vod_content}</p>
                            </div>
                        )}

                        {/* 播放源 */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/10">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-linear-to-b from-green-400 to-teal-400 rounded-full"></span>
                                播放源
                            </h2>
                            <div className="space-y-6">
                                {urls.map((item, index) => {
                                    const episodes = item.split("#").filter(e => e.trim())
                                    const sourceName = info.vod_play_from.split("$$$")[index]

                                    return (
                                        <div key={item} className="space-y-3 p-4 bg-white/5 rounded-xl border border-white/10">
                                            <h3 className="text-base sm:text-lg font-semibold text-yellow-300 flex items-center gap-2">
                                                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                                                {sourceName || `播放源 ${index + 1}`}
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {episodes.map((es: string) => {
                                                    const array = es.split("$")
                                                    if (!array[0] || !array[1]) return null

                                                    return (
                                                        <a
                                                            className="px-3 sm:px-4 py-2 bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-lg text-white text-xs sm:text-sm font-medium transition-all duration-200 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 border border-blue-400/30"
                                                            href={array[1]}
                                                            key={array[1]}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {array[0]}
                                                        </a>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function InfoItem({ label, value, className = "" }: { label: string; value: string; className?: string }) {
    return (
        <div className={`flex flex-col ${className}`}>
            <span className="text-gray-400 text-sm mb-1">{label}</span>
            <span className="text-white font-medium">{value}</span>
        </div>
    )
}