'use client';

import { useState, useRef } from 'react';
import VideoPlayer, { type VideoPlayerRef } from './video-player';
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
    const playerRef = useRef<HTMLDivElement>(null);
    const videoPlayerRef = useRef<VideoPlayerRef>(null);

    const handlePlayEpisode = (url: string, name: string) => {
        setCurrentVideo({ url, name });
        // 滚动到播放器位置
        setTimeout(() => {
            playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const handlePIPPlay = async (url: string, name: string) => {
        // 如果当前播放的不是这个视频，先切换视频
        if (currentVideo?.url !== url) {
            setCurrentVideo({ url, name });
            // 等待播放器加载
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        // 触发 PIP
        if (videoPlayerRef.current) {
            await videoPlayerRef.current.enterPIP();
        } else {
            alert('请先播放视频');
        }
    };

    return (
        <div className="max-w-[1920px] mx-auto space-y-6">
            {/* 标题区域 - 居中占满屏幕 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/10 text-center">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 bg-linear-to-r from-green-300 to-teal-400 bg-clip-text text-transparent">
                    {info.vod_name}
                </h1>
                {info.vod_sub && <p className="text-gray-300 text-lg sm:text-xl">{info.vod_sub}</p>}
            </div>

            {/* 顶部区域：播放器（左）+ 详情（右） */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 左侧：播放器或海报 */}
                <div ref={playerRef} className="lg:col-span-2">
                    {currentVideo ? (
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-white/10">
                            <VideoPlayer
                                ref={videoPlayerRef}
                                url={currentVideo.url}
                                title={`${info.vod_name} - ${currentVideo.name}`}
                                pic={info.vod_pic}
                            />
                        </div>
                    ) : (
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-white/10">
                            <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                                <Image
                                    src={info.vod_pic}
                                    alt={info.vod_name}
                                    className="w-full h-full object-cover"
                                    width={1280}
                                    height={720}
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                    <div className="text-center">
                                        <svg className="w-20 h-20 mx-auto mb-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                        </svg>
                                        <p className="text-white text-lg font-medium">点击下方剧集开始播放</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* 右侧：海报 + 基本信息 */}
                <div className="space-y-6">
                    {/* 海报图片 */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/10">
                        {currentVideo && (
                            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-green-300">
                                正在播放: {currentVideo.name}
                            </h2>
                        )}
                        <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl shadow-2xl border border-white/20 group">
                            <Image
                                src={info.vod_pic}
                                alt={info.vod_name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                width={320}
                                height={480}
                            />
                        </div>
                    </div>

                    {/* 基本信息 */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-white/10">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <span className="w-1 h-5 bg-linear-to-b from-green-400 to-teal-400 rounded-full"></span>
                            基本信息
                        </h2>
                        <div className="space-y-3">
                            <InfoItem label="类型" value={info.type_name} />
                            <InfoItem label="上映日期" value={info.vod_pubdate} />
                            {info.vod_director && <InfoItem label="导演" value={info.vod_director} />}
                            {info.vod_actor && <InfoItem label="演员" value={info.vod_actor} />}
                        </div>
                    </div>
                </div>
            </div>

            {/* 剧情简介 - 居中占满屏幕 */}
            {info.vod_content && (
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/10">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center justify-center gap-2">
                        <span className="w-1 h-6 bg-linear-to-b from-purple-400 to-pink-400 rounded-full"></span>
                        剧情简介
                    </h2>
                    <p className="text-gray-200 leading-relaxed text-justify max-w-5xl mx-auto">{info.vod_content}</p>
                </div>
            )}

            {/* 播放源和剧集列表 - 平铺展示，每个按钮包含两个操作 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/10">
                <h2 className="text-xl sm:text-2xl font-semibold mb-6 flex items-center justify-center gap-2">
                    <span className="w-1 h-6 bg-linear-to-b from-green-400 to-teal-400 rounded-full"></span>
                    选集播放
                </h2>
                <div className="space-y-6">
                    {playSources.map((source, index) => (
                        <div key={index} className="space-y-4">
                            <h3 className="text-base sm:text-lg font-semibold text-green-300 flex items-center justify-center gap-2">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                {source.name}
                                <span className="text-sm text-gray-400">({source.episodes.length}集)</span>
                            </h3>
                            <div className="space-y-2">
                                {source.episodes.map((episode) => (
                                    <div
                                        key={episode.url}
                                        className={`flex items-stretch gap-2 rounded-lg overflow-hidden border transition-all duration-200 ${
                                            currentVideo?.url === episode.url
                                                ? 'border-purple-400/50 ring-2 ring-purple-400/30'
                                                : 'border-green-400/30'
                                        }`}
                                    >
                                        {/* 播放按钮 - 占主要空间 */}
                                        <button
                                            onClick={() => handlePlayEpisode(episode.url, episode.name)}
                                            className={`flex-1 px-4 py-3 sm:py-4 text-white text-sm sm:text-base font-medium transition-all duration-200 text-left ${
                                                currentVideo?.url === episode.url
                                                    ? 'bg-linear-to-r from-purple-600 to-pink-600'
                                                    : 'bg-linear-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500'
                                            }`}
                                        >
                                            {episode.name}
                                        </button>

                                        {/* PIP 按钮 */}
                                        <button
                                            onClick={() => handlePIPPlay(episode.url, episode.name)}
                                            className="px-4 bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white transition-all duration-200 flex items-center justify-center group"
                                            title="画中画播放 (可在浏览器外播放)"
                                        >
                                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function InfoItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col">
            <span className="text-gray-400 text-xs sm:text-sm mb-1">{label}</span>
            <span className="text-white text-sm sm:text-base font-medium break-words">{value}</span>
        </div>
    );
}
