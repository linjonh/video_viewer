import { loadClassTabs } from "../data/repository";
import NavMenu from "./nav-menu";

interface NavMenuWrapperProps {
  tab_typeId: number;
  serverUrl: string;
  initialServerId: string;
  searchName?: string;
}

export async function NavMenuWrapper({ tab_typeId, serverUrl, initialServerId, searchName }: NavMenuWrapperProps) {
  const tabs = await loadClassTabs(serverUrl);
  const selectedTabName = tabs?.class.find((s: any) => s.type_id == tab_typeId)?.type_name || "全部";

  return (
    <NavMenu
      tabs={tabs}
      tabIndex={tab_typeId}
      selectedTabName={selectedTabName}
      initialServerId={initialServerId}
      searchName={searchName}
    />
  );
}
