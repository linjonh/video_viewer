import { log } from "console"
import { loadVideoDetail } from "../data/repository"
import BackButton from "../components/back-button";
import ScrollToTop from "../components/scroll-to-top";
import { cookies } from "next/headers";
import { resourceServers } from "../data/types";
import DetailContent from "../components/detail-content";
import Link from "next/link";

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

export default async function detailPage(props: { searchParams: { id: string } }) {
    const searchParams = await props.searchParams
    log("searchParams=>", searchParams)

    // Get selected server from cookie
    const cookieStore = await cookies();
    const selectedServerId = cookieStore.get("selected_server")?.value || resourceServers[0].id;
    const selectedServer = resourceServers.find(s => s.id === selectedServerId) || resourceServers[0];
    const serverUrl = selectedServer.url;

    const data = await loadVideoDetail(searchParams.id, serverUrl)

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
        )
    }

    const info = data.list[0];
    const urls: string[] = info.vod_play_url.split("$$$")

    // Clean HTML from content
    const cleanContent = stripHtmlTags(info.vod_content || "")

    // 准备播放源数据
    const playSources = urls.reverse().map((item, index) => {
        const episodes = item.split("#").filter(e => e.trim())
        // const sourceName = info.vod_play_from.split("$$$")[index]

        return {
            name: `播放源 ${index + 1}`,
            episodes: episodes.map((es: string) => {
                const array = es.split("$")
                return {
                    name: array[0],
                    url: array[1]
                }
            }).filter(ep => ep.name && ep.url)
        }
    })

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
    }

    return (
        <div className="min-h-screen text-white p-4 sm:p-6 lg:p-10">
            {/* 返回按钮 */}
            {/* <BackButton /> */}
            {/* 详情内容 */}
            <DetailContent info={videoInfo} playSources={playSources} />
            {/* 回到顶部按钮 */}
            <ScrollToTop />
        </div>
    )
}
