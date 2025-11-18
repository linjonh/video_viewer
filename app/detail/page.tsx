import { Suspense } from "react";
import { log } from "console";
import ScrollToTop from "../components/scroll-to-top";
import { cookies } from "next/headers";
import { resourceServers } from "../data/types";
import { DetailWrapper } from "../components/detail-wrapper";
import { DetailSkeleton } from "../components/skeleton";

export default async function detailPage(props: { searchParams: { id: string } }) {
    const searchParams = await props.searchParams;
    log("searchParams=>", searchParams);

    // Get selected server from cookie
    const cookieStore = await cookies();
    const selectedServerId = cookieStore.get("selected_server")?.value || resourceServers[0].id;
    const selectedServer = resourceServers.find(s => s.id === selectedServerId) || resourceServers[0];
    const serverUrl = selectedServer.url;

    return (
        <div className="min-h-screen text-white p-4 sm:p-6 lg:p-10">
            <Suspense fallback={<DetailSkeleton />}>
                <DetailWrapper id={searchParams.id} serverUrl={serverUrl} />
            </Suspense>
            <ScrollToTop />
        </div>
    );
}
