'use client';

import { useState } from 'react';
import VideoPlayer from './video-player';
import Image from 'next/image';

interface Episode {
    name: string;
    url: string;
}

interface PlaySource {
    name: string;
    episodes: Episode[];
}

interface VideoInfo {
    vod_name: string;
    vod_pic: string;
    vod_sub?: string;
    type_name: string;
    vod_pubdate: string;
    vod_director?: string;
    vod_actor?: string;
    vod_content?: string;
}

interface DetailContentProps {
    info: VideoInfo;
    playSources: PlaySource[];
}

export default function DetailContent({ info, playSources }: DetailContentProps) {
    const [currentVideo, setCurrentVideo] = useState<{ url: string; name: string } | null>(null);
    const [activeSourceIndex, setActiveSourceIndex] = useState(0);

    const handlePlayEpisode = (url: string, name: string) => {
        setCurrentVideo({ url, name });
    };


    return (
        <div className="max-w-[1920px] mx-auto">
            {/* 顶部：播放器（左）+ 集数列表（右） */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6 items-start">
                {/* 左侧：播放器区域 - 无边框 */}
                <div className="lg:col-span-9">
                    {currentVideo ? (
                        <VideoPlayer
                            url={currentVideo.url}
                            title={`${info.vod_name} - ${currentVideo.name}`}
                            pic={info.vod_pic}
                        />
                    ) : (
                        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden relative">
                            <Image
                                src={info.vod_pic}
                                alt={info.vod_name}
                                className="w-full h-full object-cover"
                                width={1280}
                                height={720}
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                <div className="text-center">
                                    <svg className="w-20 h-20 mx-auto mb-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                    </svg>
                                    <p className="text-white text-lg font-medium">选择剧集开始播放</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* 右侧：集数列表 */}
                <div className="lg:col-span-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden flex flex-col aspect-video">
                    {/* Tab 切换源 */}
                    {playSources.length > 1 && (
                        <div className="flex border-b border-white/10 bg-white/5 shrink-0">
                            {playSources.map((source, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveSourceIndex(index)}
                                    className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${activeSourceIndex === index
                                            ? 'bg-green-600 text-white'
                                            : 'text-gray-300 hover:bg-white/10'
                                        }`}
                                >
                                    {source.name}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* 集数列表 - 3列Grid布局，可滚动 */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="p-2 grid grid-cols-3 gap-2">
                            {playSources[activeSourceIndex]?.episodes.map((episode) => (
                                <button
                                    key={episode.url}
                                    onClick={() => handlePlayEpisode(episode.url, episode.name)}
                                    className={`px-2 py-2 text-center text-xs rounded-lg border transition-all ${currentVideo?.url === episode.url
                                            ? 'border-purple-400/50 bg-purple-600/20 text-purple-300 font-medium'
                                            : 'border-transparent hover:border-green-400/30 hover:bg-white/5 text-gray-200 hover:text-white'
                                        }`}
                                >
                                    {episode.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 中间：海报和详细信息 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* 海报 */}
                    <div className="md:col-span-3">
                        <div className="aspect-2/3 w-full overflow-hidden rounded-lg">
                            <Image
                                src={info.vod_pic}
                                alt={info.vod_name}
                                className="w-full h-full object-cover"
                                width={300}
                                height={450}
                            />
                        </div>
                    </div>

                    {/* 信息 */}
                    <div className="md:col-span-9 space-y-4">
                        {/* 标题 */}
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                                {info.vod_name}
                            </h1>
                            {info.vod_sub && (
                                <p className="text-gray-400 text-lg">{info.vod_sub}</p>
                            )}
                        </div>

                        {/* 基本信息 */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            <InfoItem label="类型" value={info.type_name} />
                            <InfoItem label="上映" value={info.vod_pubdate} />
                            {info.vod_director && <InfoItem label="导演" value={info.vod_director} />}
                            {info.vod_actor && (
                                <div className="col-span-2 sm:col-span-3">
                                    <InfoItem label="演员" value={info.vod_actor} />
                                </div>
                            )}
                        </div>

                        {/* 剧情简介 */}
                        {info.vod_content && (
                            <div>
                                <h3 className="text-lg font-semibold text-green-300 mb-2">剧情简介</h3>
                                <p className="text-gray-300 leading-relaxed line-clamp-4">
                                    {info.vod_content}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoItem({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <span className="text-gray-400 text-sm">{label}: </span>
            <span className="text-white text-sm">{value}</span>
        </div>
    );
}
