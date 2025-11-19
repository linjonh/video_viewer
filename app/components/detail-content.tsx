"use client";

import { useState } from "react";
import VideoPlayer from "./video-player";
import CustomImage from "./custom-image";

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

  // 为不同的播放源定义颜色主题
  const sourceThemes = [
    {
      tab: "bg-green-600/80 text-white",
      tabHover: "text-gray-300 hover:bg-white/10",
      episodeNormal: "border-green-500/30 bg-green-500/10 text-gray-200 hover:border-green-400/50 hover:bg-green-500/20 hover:text-white",
      episodeActive: "border-green-400 bg-green-600/30 text-green-300 font-medium shadow-lg shadow-green-500/20",
    },
    {
      tab: "bg-blue-600/80 text-white",
      tabHover: "text-gray-300 hover:bg-white/10",
      episodeNormal: "border-blue-500/30 bg-blue-500/10 text-gray-200 hover:border-blue-400/50 hover:bg-blue-500/20 hover:text-white",
      episodeActive: "border-blue-400 bg-blue-600/30 text-blue-300 font-medium shadow-lg shadow-blue-500/20",
    },
    {
      tab: "bg-purple-600 text-white",
      tabHover: "text-gray-300 hover:bg-white/10",
      episodeNormal: "border-purple-500/30 bg-purple-500/10 text-gray-200 hover:border-purple-400/50 hover:bg-purple-500/20 hover:text-white",
      episodeActive: "border-purple-400 bg-purple-600/30 text-purple-300 font-medium shadow-lg shadow-purple-500/20",
    },
    {
      tab: "bg-orange-600 text-white",
      tabHover: "text-gray-300 hover:bg-white/10",
      episodeNormal: "border-orange-500/30 bg-orange-500/10 text-gray-200 hover:border-orange-400/50 hover:bg-orange-500/20 hover:text-white",
      episodeActive: "border-orange-400 bg-orange-600/30 text-orange-300 font-medium shadow-lg shadow-orange-500/20",
    },
    {
      tab: "bg-pink-600 text-white",
      tabHover: "text-gray-300 hover:bg-white/10",
      episodeNormal: "border-pink-500/30 bg-pink-500/10 text-gray-200 hover:border-pink-400/50 hover:bg-pink-500/20 hover:text-white",
      episodeActive: "border-pink-400 bg-pink-600/30 text-pink-300 font-medium shadow-lg shadow-pink-500/20",
    },
  ];

  // 获取当前播放源的主题，如果超出定义的主题数量，循环使用
  const currentTheme = sourceThemes[activeSourceIndex % sourceThemes.length];

  return (
    <div className="max-w-[1920px] mx-auto">
      {/* 顶部：播放器（左）+ 集数列表（右） */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
        {/* 左侧：播放器区域 */}
        <div className="lg:col-span-9 w-full">
          {currentVideo ? (
            <VideoPlayer
              url={currentVideo.url}
              title={`${info.vod_name} - ${currentVideo.name}`}
              pic={info.vod_pic}
            />
          ) : (
            <div className="w-full aspect-video bg-black rounded-lg overflow-hidden relative">
              {/* <CustomImage
                                src={info.vod_pic}
                                alt={info.vod_name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            /> */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 pointer-events-none">
                <div className="text-center">
                  <svg
                    className="w-20 h-20 mx-auto mb-4 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  <p className="text-white text-lg font-medium">选择剧集开始播放</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 右侧：集数列表 - 固定使用 aspect-video 匹配左侧高度 */}
        <div className="lg:col-span-3 w-full">
          <div className="w-full h-50 sm:h-100 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden flex flex-col">
            <h1 className=" text-center text-2xl sm:text-3xl  text-white p-2 bg-black/30">{info.vod_name}</h1>
            {playSources.length > 1 ? (
              <>
                {/* <p className="px-3 pt-3 pb-2 text-sm text-gray-400 shrink-0">播放源：</p> */}
                {/* Tab 切换源 */}
                <div className="flex border-b border-white/10 bg-white/5 shrink-0">
                  {playSources.map((source, index) => {
                    const theme = sourceThemes[index % sourceThemes.length];
                    return (
                      <button
                        key={index}
                        onClick={() => setActiveSourceIndex(index)}
                        className={`flex-1 px-4 py-1 text-sm font-medium transition-colors ${
                          activeSourceIndex === index ? theme.tab : theme.tabHover
                        }`}
                      >
                        {source.name}
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
            //   <p className="px-3 pt-3 pb-2 text-sm text-gray-400 shrink-0">选集：</p>
            <>  </>
            )}

            {/* 集数列表 - 3列Grid布局，可滚动 */}
            <div className="flex-1 overflow-y-auto min-h-0">
              <div className="p-2 grid grid-cols-3 gap-2">
                {playSources[activeSourceIndex]?.episodes.map((episode) => (
                  <button
                    key={episode.url}
                    onClick={() => handlePlayEpisode(episode.url, episode.name)}
                    className={`px-2 py-2 text-center text-xs rounded-lg border transition-all ${
                      currentVideo?.url === episode.url ? currentTheme.episodeActive : currentTheme.episodeNormal
                    }`}
                  >
                    {episode.name}
                  </button>
                ))}
              </div>
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
              <CustomImage
                src={info.vod_pic}
                alt={info.vod_name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* 信息 */}
          <div className="md:col-span-9 space-y-4">
            {/* 标题 */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{info.vod_name}</h1>
              {info.vod_sub && <p className="text-gray-400 text-lg">{info.vod_sub}</p>}
            </div>

            {/* 基本信息 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <InfoItem
                label="类型"
                value={info.type_name}
              />
              <InfoItem
                label="上映"
                value={info.vod_pubdate}
              />
              {info.vod_director && (
                <InfoItem
                  label="导演"
                  value={info.vod_director}
                />
              )}
              {info.vod_actor && (
                <div className="col-span-2 sm:col-span-3">
                  <InfoItem
                    label="演员"
                    value={info.vod_actor}
                  />
                </div>
              )}
            </div>

            {/* 剧情简介 */}
            {info.vod_content && (
              <div>
                <h3 className="text-lg font-semibold text-green-300 mb-2">剧情简介</h3>
                <p className="text-gray-300 leading-relaxed">{info.vod_content}</p>
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
