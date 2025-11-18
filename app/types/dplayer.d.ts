declare module 'dplayer' {
    export interface DPlayerOptions {
        container: HTMLElement;
        video: {
            url: string;
            pic?: string;
            type?: 'auto' | 'hls' | 'flv' | 'dash' | 'webtorrent' | 'normal';
            customType?: any;
        };
        danmaku?: {
            id: string;
            api: string;
            token?: string;
            maximum?: number;
            addition?: string[];
            user?: string;
            bottom?: string;
            unlimited?: boolean;
        };
        fullscreen?: {
            web?: boolean;
            browser?: boolean;
        };
        autoplay?: boolean;
        theme?: string;
        loop?: boolean;
        lang?: string | 'en' | 'zh-cn' | 'zh-tw';
        screenshot?: boolean;
        hotkey?: boolean;
        preload?: 'auto' | 'metadata' | 'none';
        volume?: number;
        mutex?: boolean;
        [key: string]: any;
    }

    export default class DPlayer {
        constructor(options: DPlayerOptions);
        play(): void;
        pause(): void;
        seek(time: number): void;
        toggle(): void;
        on(event: string, handler: () => void): void;
        switchVideo(video: { url: string; pic?: string; type?: string }, danmaku?: any): void;
        notice(text: string, time?: number, opacity?: number): void;
        switchQuality(index: number): void;
        destroy(): void;
        speed(rate: number): void;
        video: HTMLVideoElement;
        danmaku?: any;
        [key: string]: any;
    }
}
