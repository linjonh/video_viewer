import { loadClassTabs, loadVideoList, search } from "../data/repository";
import VideoList from "./video-list";
import Pagination from "./pagination";
import ErrorMessage from "./error-message";

interface VideoContentProps {
    searchName?: string;
    page: number;
    tab_typeId?: number;
    serverUrl: string;
    categoryName?: string;
}

export async function VideoContent({ searchName, page, tab_typeId, serverUrl, categoryName }: VideoContentProps) {
    let data;

    if (searchName != null) {
        data = await search(searchName, serverUrl);
    } else {
        // Only pass clasTab if it's defined (not undefined)
        data = await loadVideoList({ page, clasTab: tab_typeId, serverUrl });
    }

    if (data == null) {
        return <ErrorMessage />;
    }

    if (data.list?.length === 0) {
        // Get category name for display if not provided
        let displayName = categoryName || "全部";
        if (!categoryName && tab_typeId) {
            const tabs = await loadClassTabs(serverUrl);
            displayName = tabs?.class.find((s: any) => s.type_id == tab_typeId)?.type_name || "全部";
        }
        return (
            <div className="mt-20 text-center">
                <p className="text-gray-400 text-lg">
                    {displayName} - 暂无数据
                </p>
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
