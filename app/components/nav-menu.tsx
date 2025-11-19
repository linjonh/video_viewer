"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { resourceServers } from "@/app/data/types";
import { useRouter, useSearchParams } from "next/navigation";

const STORAGE_KEY = "selected_server_id";

interface NavMenuItem {
  type_id: number;
  type_name: string;
}

interface NavMenuProps {
  tabs: { class: NavMenuItem[] };
  tabIndex: number;
  selectedTabName: string;
  initialServerId?: string;
  searchName?: string;
}

export default function NavMenu({ tabs, tabIndex, selectedTabName, initialServerId, searchName }: NavMenuProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [selectedServerId, setSelectedServerId] = useState<string>(
    initialServerId || resourceServers[0].id
  );

  useEffect(() => {
    if (initialServerId) {
      localStorage.setItem(STORAGE_KEY, initialServerId);
    }
  }, [initialServerId]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const selectedServer = resourceServers.find(s => s.id === selectedServerId) || resourceServers[0];
  const serverDisplayName = selectedServer.name.replace('(切)', '');

  const handleTabClick = () => {
    setIsOpen(false);
  };

  const handleServerChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newServerId = e.target.value;
    setSelectedServerId(newServerId);
    localStorage.setItem(STORAGE_KEY, newServerId);

    // Set cookie
    document.cookie = `selected_server=${newServerId}; path=/; max-age=31536000`;

    // Reset to t=1 when switching servers
    const params = new URLSearchParams(searchParams.toString());
    params.set('t', '1');
    params.delete('page');
    params.delete('name');

    router.push(`/?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/?name=${encodeURIComponent(searchInput.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const handleSearchToggle = () => {
    if (isSearchOpen) {
      setIsSearchOpen(false);
      setSearchInput("");
    } else {
      setIsSearchOpen(true);
      setIsOpen(false); // Close menu when opening search
    }
  };

  return (
    <div className="sticky top-0 bg-black/30 backdrop-blur-md w-full shadow-xl border-b border-white/10 z-50">
      <div className="max-w-screen-2xl mx-auto px-4 py-3 sm:py-4">
        {/* Header with Server Logo, Tab Title, Search, and Menu Button */}
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Server Logo */}
          {!isSearchOpen && (
            <div className="flex items-center gap-2 min-w-0">
              <div className="text-sm sm:text-base font-semibold text-green-400 whitespace-nowrap">
                {serverDisplayName}
              </div>
            </div>
          )}

          {/* Center: Selected Tab Name or Search Bar */}
          {isSearchOpen ? (
            <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-2 animate-fadeIn">
              <input
                ref={searchInputRef}
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={searchName || "搜索影片..."}
                className="flex-1 text-center bg-white/90 text-gray-900 placeholder-gray-500 rounded-lg h-9 sm:h-10 px-3 sm:px-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              />
              <button
                type="submit"
                className="px-6 sm:px-10 py-2 sm:py-2.5 bg-green-600 hover:bg-green-500 rounded-lg transition-all duration-200 whitespace-nowrap text-sm sm:text-base font-medium min-w-20 sm:min-w-28"
              >
                搜索
              </button>
            </form>
          ) : (
            <div className="flex-1 flex justify-center min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-linear-to-r from-green-300 to-teal-400 bg-clip-text text-transparent truncate">
                {selectedTabName}
              </h1>
            </div>
          )}

          {/* Right: Search and Menu Toggle Buttons */}
          <div className="flex items-center gap-2">
            {/* Search Toggle Button */}
            <button
              onClick={handleSearchToggle}
              className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 border border-white/20"
              aria-label="Toggle search"
            >
              {isSearchOpen ? (
                <XMarkIcon className="w-5 h-5" />
              ) : (
                <MagnifyingGlassIcon className="w-5 h-5" />
              )}
            </button>

            {/* Menu Toggle Button */}
            {!isSearchOpen && (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 border border-white/20 whitespace-nowrap"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <>
                    <XMarkIcon className="w-5 h-5" />
                    <span className="text-sm font-medium hidden sm:inline">关闭</span>
                  </>
                ) : (
                  <>
                    <Bars3Icon className="w-5 h-5" />
                    <span className="text-sm font-medium hidden sm:inline">菜单</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Collapsible Menu */}
        {isOpen && (
          <div className="mt-4 space-y-4 animate-fadeIn">
            {/* Server Selector */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <label htmlFor="server-select" className="text-xs text-gray-400 mb-2 block">
                切换资源服务器
              </label>
              <select
                id="server-select"
                value={selectedServerId}
                onChange={handleServerChange}
                className="w-full bg-white/90 text-gray-900 rounded-lg h-9 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all cursor-pointer"
              >
                {resourceServers.map((server) => (
                  <option key={server.id} value={server.id}>
                    {server.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Tabs */}
            <nav className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="text-xs text-gray-400 mb-2">选择分类</div>
              <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-2 text-white">
                {tabs?.class.map((item) => {
                  const isActive = tabIndex == item.type_id;
                  if (
                    item.type_name === "伦理片" ||
                    item.type_name.includes("伦理") ||
                    item.type_name.includes("三级") ||
                    item.type_name.includes("写真") ||
                    item.type_name.includes("跳舞")
                    || item.type_name.includes("成人")
                  ) {
                    return null;
                  }

                  return (
                    <li
                      className={`px-1 sm:px-2 py-1.5 rounded-lg transition-all duration-200 text-xs sm:text-sm whitespace-nowrap text-center ${isActive
                          ? "bg-white/20 font-bold text-green-300 shadow-lg scale-105"
                          : "bg-white/5 hover:bg-white/15 hover:scale-105"
                        } active:scale-95`}
                      key={item.type_id}
                    >
                      <Link
                        href={`./?t=${item.type_id}`}
                        className="block"
                        onClick={handleTabClick}
                      >
                        {item.type_name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
