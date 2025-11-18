import { loadClassTabs, loadVideoList, search } from "./data/repository";
import { log } from "console";
import Link from "next/link";
import { VideoItem, resourceServers } from "./data/types";
import Pagination from "./components/pagination";
import NavMenu from "./components/nav-menu";
import ScrollToTop from "./components/scroll-to-top";
import { cookies } from "next/headers";
import CustomImage from "./components/custom-image";

export default async function Home(props: { searchParams: { name?: string, page?: number, t?: number } }) {
  const searchParams = await props.searchParams
  const tab_typeId = searchParams.t ?? 1;

  // Get selected server from cookie
  const cookieStore = await cookies();
  const selectedServerId = cookieStore.get("selected_server")?.value || resourceServers[0].id;
  const selectedServer = resourceServers.find(s => s.id === selectedServerId) || resourceServers[0];
  const serverUrl = selectedServer.url;
  // log("selectedServerId:", selectedServerId, "serverUrl:", serverUrl);
  let data;
  if (searchParams != null && searchParams.name != null) {
    // log("searchParams:", searchParams)
    data = await search(searchParams.name, serverUrl)
  } else {
    data = await loadVideoList({ page: searchParams.page ?? 1, clasTab: tab_typeId, serverUrl })
  }
  const tabs = await loadClassTabs(serverUrl);
  const selectedTabName = tabs?.class.find((s: any) => s.type_id == tab_typeId)?.type_name || "全部";
  log("class size:", tabs?.class.length,"tabIndex:",tab_typeId,"tabName",selectedTabName)
  const totalpage = data?.pagecount ?? 1;
  const page = data?.page ?? 1;
  log("data.list.length:", data?.list.length, "page=", page, "totalpage=", totalpage)

  return (
    <div className="flex flex-col min-h-screen font-sans text-white">
      <NavMenu
        tabs={tabs}
        tabIndex={tab_typeId}
        selectedTabName={selectedTabName}
        initialServerId={selectedServerId}
        searchName={searchParams.name}
      />
      <div className="w-full flex flex-col items-center px-4">
        {data == null && (
          <div className="mt-20 text-center">
            <p className="text-red-400 text-lg">出错了，请重试</p>
          </div>
        )}
        {data != null && (data.list?.length == 0) ? (
          <div className="mt-20 text-center">
            <p className="text-gray-400 text-lg">{selectedTabName}分类，暂无数据</p>
          </div>
        ) : (
          <MainContent data={data} totalpage={totalpage} />
        )}
      </div>
      <ScrollToTop />
    </div>
  );
}

function MainContent({ data, totalpage }: { data: any, totalpage: number }) {
  return (
    <>
      <main className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 lg:gap-6 w-full max-w-screen-2xl my-8">
        {data?.list.map((item: VideoItem, index: number) => (
          <div key={item.vod_id} className="flex flex-col group">
            <Link href={`./detail?id=` + item.vod_id} className="flex flex-col h-full">
              <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300 border border-white/10">
                <CustomImage
                  src={item.vod_pic}
                  alt={item.vod_name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading={index < 12 ? "eager" : "lazy"}
                />
                {item.vod_remarks && (
                  <div className="absolute top-2 right-2 bg-linear-to-r from-red-600 to-pink-600 text-white text-xs font-semibold px-2.5 py-1 rounded-lg shadow-md z-10">
                    {item.vod_remarks}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 pointer-events-none" />
              </div>
              <p className="text-center text-white text-sm sm:text-base mt-3 px-1 line-clamp-2 group-hover:text-green-300 transition-colors duration-200 font-medium">
                {item.vod_name}
              </p>
            </Link>
          </div>
        ))}
      </main>
      <Pagination totalPages={totalpage} className="mb-8" />
    </>
  );
}

