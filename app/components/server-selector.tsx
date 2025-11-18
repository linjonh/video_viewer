"use client";

import { useEffect, useState } from "react";
import { resourceServers } from "@/app/data/types";
import { useRouter, useSearchParams } from "next/navigation";

const STORAGE_KEY = "selected_server_id";

export default function ServerSelector({ initialServerId }: { initialServerId?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedServerId, setSelectedServerId] = useState<string>(
    initialServerId || resourceServers[0].id
  );

  useEffect(() => {
    // Sync with localStorage on mount
    if (initialServerId) {
      localStorage.setItem(STORAGE_KEY, initialServerId);
    }
  }, [initialServerId]);

  const handleServerChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newServerId = e.target.value;
    setSelectedServerId(newServerId);
    localStorage.setItem(STORAGE_KEY, newServerId);

    // Set cookie
    document.cookie = `selected_server=${newServerId}; path=/; max-age=31536000`; // 1 year

    // Reset to t=1 when switching servers
    const params = new URLSearchParams(searchParams.toString());
    params.set('t', '1');
    params.delete('page'); // Also reset page to 1
    params.delete('name'); // Clear search query

    // Navigate to home with t=1
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-2xl px-4 sm:px-0 mb-4">
      <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/10">
        <label htmlFor="server-select" className="text-sm font-medium text-gray-300 whitespace-nowrap">
          资源:
        </label>
        <select
          id="server-select"
          value={selectedServerId}
          onChange={handleServerChange}
          className="flex-1 bg-white/90 text-gray-900 rounded-lg h-9 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all cursor-pointer"
        >
          {resourceServers.map((server) => (
            <option key={server.id} value={server.id}>
              {server.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
