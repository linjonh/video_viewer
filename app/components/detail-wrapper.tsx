import Link from "next/link";
import { loadVideoDetail } from "../data/repository";
import DetailContent from "./detail-content";

// Function to strip HTML tags from text
function stripHtmlTags(html: string): string {
    if (!html) return "";
    return html
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
        .replace(/&lt;/g, '<')   // Replace &lt; with <
        .replace(/&gt;/g, '>')   // Replace &gt; with >
        .replace(/&amp;/g, '&')  // Replace &amp; with &
        .replace(/&quot;/g, '"') // Replace &quot; with "
        .replace(/&#39;/g, "'")  // Replace &#39; with '
        .trim();
}

interface DetailWrapperProps {
    id: string;
    serverUrl: string;
}

export async function DetailWrapper({ id, serverUrl }: DetailWrapperProps) {
    const data = await loadVideoDetail(id, serverUrl);

    // 如果数据加载失败，显示错误页面
    if (data == null || !data.list || data.list.length === 0) {
        return (
            <div className="min-h-screen text-white flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 text-center">
                    <svg className="w-20 h-20 mx-auto mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-2xl font-bold mb-2">加载失败</h2>
                    <p className="text-gray-400 mb-6">无法加载视频详情，请稍后重试</p>
                    <Link
                        href="/"
                        className="inline-block bg-linear-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                        返回首页
                    </Link>
                </div>
            </div>
        );
    }

    const info = data.list[0];
    const urls: string[] = info.vod_play_url.split("$$$");

    // Clean HTML from content
    const cleanContent = stripHtmlTags(info.vod_content || "");

    // 准备播放源数据
    const playSources = urls.reverse().map((item, index) => {
        const episodes = item.split("#").filter(e => e.trim());

        return {
            name: `播放源 ${index + 1}`,
            episodes: episodes.map((es: string) => {
                const array = es.split("$");
                return {
                    name: array[0],
                    url: array[1]
                };
            }).filter(ep => ep.name && ep.url)
        };
    });

    // 准备视频信息
    const videoInfo = {
        vod_name: info.vod_name,
        vod_pic: info.vod_pic,
        vod_sub: info.vod_sub,
        type_name: info.type_name,
        vod_pubdate: info.vod_pubdate,
        vod_director: info.vod_director,
        vod_actor: info.vod_actor,
        vod_content: cleanContent
    };

    return <DetailContent info={videoInfo} playSources={playSources} />;
}
