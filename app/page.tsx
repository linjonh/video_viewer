import { Suspense } from "react";
import { loadClassTabs } from "./data/repository";
import { log } from "console";
import { resourceServers } from "./data/types";
import NavMenu from "./components/nav-menu";
import ScrollToTop from "./components/scroll-to-top";
import { cookies } from "next/headers";
import { VideoContent } from "./components/video-content";
import { VideoListSkeleton } from "./components/skeleton";

export default async function Home(props: { searchParams: { name?: string, page?: number, t?: number } }) {
  const searchParams = await props.searchParams
  const tab_typeId = searchParams.t ?? 1;

  // Get selected server from cookie
  const cookieStore = await cookies();
  const selectedServerId = cookieStore.get("selected_server")?.value || resourceServers[0].id;
  const selectedServer = resourceServers.find(s => s.id === selectedServerId) || resourceServers[0];
  const serverUrl = selectedServer.url;

  const tabs = await loadClassTabs(serverUrl);
  const selectedTabName = tabs?.class.find((s: any) => s.type_id == tab_typeId)?.type_name || "全部";
  log("class size:", tabs?.class.length,"tabIndex:",tab_typeId,"tabName",selectedTabName)

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
        <Suspense fallback={<VideoListSkeleton count={18} />}>
          <VideoContent
            searchName={searchParams.name}
            page={searchParams.page ?? 1}
            tab_typeId={tab_typeId}
            serverUrl={serverUrl}
          />
        </Suspense>
      </div>
      <ScrollToTop />
    </div>
  );
}

