import { loadClassTabs } from "../data/repository";
import NavMenu from "./nav-menu";

interface NavMenuWrapperProps {
  tab_typeId?: number;
  serverUrl: string;
  initialServerId: string;
  searchName?: string;
}

export async function NavMenuWrapper({ tab_typeId, serverUrl, initialServerId, searchName }: NavMenuWrapperProps) {
  const tabs = await loadClassTabs(serverUrl);
  // If tab_typeId is undefined or not found, show "全部"
  const selectedTabName = tab_typeId
    ? tabs?.class.find((s: any) => s.type_id == tab_typeId)?.type_name || "全部"
    : "全部";

  return (
    <NavMenu
      tabs={tabs}
      tabId={tab_typeId ?? 0}
      selectedTabName={selectedTabName}
      initialServerId={initialServerId}
      searchName={searchName}
    />
  );
}
