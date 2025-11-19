import { Suspense } from "react";
import { resourceServers } from "./data/types";
import ScrollToTop from "./components/scroll-to-top";
import { cookies } from "next/headers";
import { VideoContent } from "./components/video-content";
import { VideoListSkeleton } from "./components/skeleton";
import { NavMenuWrapper } from "./components/nav-menu-wrapper";
import NavMenuSkeleton from "./components/nav-menu-skeleton";

export default async function Home(props: { searchParams: { name?: string, page?: number, t?: number } }) {
  const searchParams = await props.searchParams
  const tab_typeId = searchParams.t;

  // Get selected server from cookie
  const cookieStore = await cookies();
  const selectedServerId = cookieStore.get("selected_server")?.value || resourceServers[0].id;
  const selectedServer = resourceServers.find(s => s.id === selectedServerId) || resourceServers[0];
  const serverUrl = selectedServer.url;

  return (
    <div className="flex flex-col min-h-screen font-sans text-white">
      <Suspense fallback={<NavMenuSkeleton />}>
        <NavMenuWrapper
          tab_typeId={tab_typeId}
          serverUrl={serverUrl}
          initialServerId={selectedServerId}
          searchName={searchParams.name}
        />
      </Suspense>
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

