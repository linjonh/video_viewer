import { log } from "console"
import { loadVideoDetail } from "../data/repository"
import BackButton from "../components/back-button";
import ScrollToTop from "../components/scroll-to-top";
import { cookies } from "next/headers";
import { resourceServers } from "../data/types";
import DetailContent from "../components/detail-content";

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
    const info = data.list[0];
    const urls: string[] = info.vod_play_url.split("$$$")

    // Clean HTML from content
    const cleanContent = stripHtmlTags(info.vod_content || "")

    // 准备播放源数据
    const playSources = urls.map((item, index) => {
        const episodes = item.split("#").filter(e => e.trim())
        const sourceName = info.vod_play_from.split("$$$")[index]

        return {
            name: sourceName || `播放源 ${index + 1}`,
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
