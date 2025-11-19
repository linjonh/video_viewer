import { loadVideoList, search } from "../data/repository";
import VideoList from "./video-list";
import Pagination from "./pagination";

interface VideoContentProps {
    searchName?: string;
    page: number;
    tab_typeId?: number;
    serverUrl: string;
}

export async function VideoContent({ searchName, page, tab_typeId, serverUrl }: VideoContentProps) {
    let data;

    if (searchName != null) {
        data = await search(searchName, serverUrl);
    } else {
        // Only pass clasTab if it's defined (not undefined)
        data = await loadVideoList({ page, clasTab: tab_typeId, serverUrl });
    }

    if (data == null) {
        return (
            <div className="mt-20 text-center">
                <p className="text-red-400 text-lg">出错了，请重试</p>
            </div>
        );
    }

    if (data.list?.length === 0) {
        return (
            <div className="mt-20 text-center">
                <p className="text-gray-400 text-lg">暂无数据</p>
            </div>
        );
    }

    const totalpage = data?.pagecount ?? 1;

    return (
        <>
            <VideoList data={data} />
            <Pagination totalPages={totalpage} className="mb-8" />
        </>
    );
}
