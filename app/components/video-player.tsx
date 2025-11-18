'use client';

import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';

interface VideoPlayerProps {
    url: string;
    title?: string;
    pic?: string;
}

export interface VideoPlayerRef {
    enterPIP: () => Promise<void>;
}

const VideoPlayer = forwardRef<VideoPlayerRef, VideoPlayerProps>(({ url, title, pic }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<any>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient || !containerRef.current) return;

        // 动态导入 DPlayer（仅在客户端）
        const initPlayer = async () => {
            const DPlayer = (await import('dplayer')).default;

            // 销毁旧的播放器实例
            if (playerRef.current) {
                playerRef.current.destroy();
            }

            // 创建新的播放器实例
            playerRef.current = new DPlayer({
                container: containerRef.current!,
                video: {
                    url: url,
                    pic: pic,
                    type: 'auto',
                },
                autoplay: false,
                theme: '#10b981', // 绿色主题，与网站配色一致
                loop: false,
                lang: 'zh-cn',
                screenshot: true,
                hotkey: true,
                preload: 'auto',
                volume: 0.7,
                mutex: true,
                danmaku: {
                    id: title || 'default',
                    api: 'https://api.prprpr.me/dplayer/',
                    token: 'tokendemo',
                    maximum: 1000,
                    addition: [],
                    user: 'Guest',
                    bottom: '15%',
                    unlimited: true,
                },
            });
        };

        initPlayer();

        // 清理函数
        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
        };
    }, [isClient, url, pic, title]);

    // 暴露 PIP 方法给父组件
    useImperativeHandle(ref, () => ({
        enterPIP: async () => {
            if (playerRef.current && playerRef.current.video) {
                const video = playerRef.current.video;
                if (document.pictureInPictureEnabled && !video.disablePictureInPicture) {
                    try {
                        if (document.pictureInPictureElement) {
                            await document.exitPictureInPicture();
                        }
                        await video.requestPictureInPicture();
                    } catch (error) {
                        console.error('PIP failed:', error);
                        alert('画中画功能不可用，请确保浏览器支持此功能');
                    }
                } else {
                    alert('您的浏览器不支持画中画功能');
                }
            }
        }
    }));

    if (!isClient) {
        return (
            <div className="w-full aspect-video bg-black rounded-xl shadow-2xl border border-white/10 flex items-center justify-center">
                <div className="text-white text-lg">加载播放器...</div>
            </div>
        );
    }

    return (
        <div className="w-full aspect-video bg-black rounded-xl shadow-2xl border border-white/10" style={{ position: 'relative' }}>
            <div ref={containerRef} className="w-full h-full rounded-xl overflow-hidden" />
        </div>
    );
});

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;
