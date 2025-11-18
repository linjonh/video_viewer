import Image from "next/image";
import { loadClassTabs, loadVideoList, search, searchAction } from "./data/repository";
import { log } from "console";
import Link from "next/link";
import { VideoItem, resourceServers } from "./data/types";
import Pagination from "./components/pagination";
import ServerSelector from "./components/server-selector";
import { cookies } from "next/headers";

export default async function Home(props: { searchParams: { name?: string, page?: number, t?: number } }) {
  const searchParams = await props.searchParams
  const tab_typeId = searchParams.t ?? 1;

  // Get selected server from cookie
  const cookieStore = await cookies();
  const selectedServerId = cookieStore.get("selected_server")?.value || resourceServers[0].id;
  const selectedServer = resourceServers.find(s => s.id === selectedServerId) || resourceServers[0];
  const serverUrl = selectedServer.url;
  log("selectedServerId:", selectedServerId, "serverUrl:", serverUrl);
  let data;
  if (searchParams != null && searchParams.name != null) {
    log("searchParams:", searchParams)
    data = await search(searchParams.name, serverUrl)
  } else {
    data = await loadVideoList({ page: searchParams.page ?? 1, clasTab: tab_typeId, serverUrl })
  }
  const tabs = await loadClassTabs(serverUrl);
  log("class size:", tabs.class.length,"tabIndex:",tab_typeId,"tabName",getTabName())
  const action = searchAction.bind(null)
  const totalpage = data?.pagecount ?? 1;
  const page = data?.page ?? 1;
  log("data.list.length:", data?.list.length, "page=", page, "totalpage=", totalpage)

  return (
    <div className="flex flex-col min-h-screen font-sans text-white">
      {/* bg-linear-to-r from-green-900/95 to-teal-900/95 */}
      <NavTab tabs={tabs} tabIndex={tab_typeId} className="sticky top-0  bg-black/30 backdrop-blur-md w-full p-3 sm:p-5 shadow-xl border-b border-white/10 z-50" />
      <div className="w-full flex flex-col items-center px-4">
        <ServerSelector initialServerId={selectedServerId} />
        <FormComponent searchName={searchParams.name} />
        {data == null && (
          <div className="mt-20 text-center">
            <p className="text-red-400 text-lg">出错了，请重试</p>
          </div>
        )}
        {data != null && (data.list?.length == 0) ? (
          <div className="mt-20 text-center">
            <p className="text-gray-400 text-lg">{getTabName()}分类，暂无数据</p>
          </div>
        ) : (
          <MainContent data={data} totalpage={totalpage} />
        )}
      </div>
    </div>
  );

  function getTabName(): any {
    return tabs.class.find((s: any) => s.type_id == tab_typeId).type_name;
  }

  function FormComponent({ searchName }: { searchName?: string }) {
    return (
      <form action={action} className="my-8 sm:my-12 w-full max-w-2xl px-4 sm:px-0">
        <div className="flex flex-col sm:flex-row gap-3 bg-white/5 backdrop-blur-sm rounded-2xl p-3 sm:p-4 shadow-lg border border-white/10">
          <input
            type="text"
            name="name"
            id="searchName"
            defaultValue={searchName}
            placeholder="请输入搜索片名"
            className="sm:flex-1 w-full bg-white/90 text-gray-900 placeholder-gray-500 rounded-xl h-10 sm:h-12 px-4 text-base focus:outline-none focus:ring-2 focus:ring-green-500 transition-all shrink-0"
          />
          <button
            type="submit"
            className="bg-linear-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 rounded-xl h-10 sm:h-12 px-6 text-white font-medium cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap flex items-center justify-center shrink-0"
          >
            搜索
          </button>
        </div>
      </form>
    );
  }
}

function NavTab({ tabs, tabIndex, className }: { tabs: any, tabIndex: number, className: string }) {
  return (
    <nav className={className}>
      <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-2 sm:gap-3 max-w-screen-2xl mx-auto text-white">
        {tabs.class.map((item: any) => {
          const isActive = tabIndex == item.type_id;
          if (item.type_name === '伦理片' || item.type_name.includes('伦理') || item.type_name.includes('三级')) return null;
          return (
            <li
              className={`px-1 sm:px-2 py-1.5 rounded-lg transition-all duration-200 text-xs sm:text-sm md:text-base whitespace-nowrap text-center ${isActive
                ? "bg-white/20 font-bold text-green-300 shadow-lg scale-105"
                : "bg-white/5 hover:bg-white/15 hover:scale-105"
                } active:scale-95`}
              key={item.type_id}
            >
              <Link href={`./?t=` + item.type_id} className="block">
                {item.type_name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function MainContent({ data, totalpage }: { data: any, totalpage: number }) {
  return (
    <>
      <main className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 lg:gap-6 w-full max-w-screen-2xl mb-8">
        {data?.list.map((item: VideoItem) => (
          <div key={item.vod_id} className="flex flex-col group">
            <Link href={`./detail?id=` + item.vod_id} className="flex flex-col h-full">
              <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300 border border-white/10">
                <Image
                  src={item.vod_pic}
                  alt={item.vod_name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  width={200}
                  height={300}
                />
                {item.vod_remarks && (
                  <div className="absolute top-2 right-2 bg-linear-to-r from-red-600 to-pink-600 text-white text-xs font-semibold px-2.5 py-1 rounded-lg shadow-md">
                    {item.vod_remarks}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
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

