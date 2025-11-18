"use client";

import { useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

interface NavMenuItem {
  type_id: number;
  type_name: string;
}

interface NavMenuProps {
  tabs: { class: NavMenuItem[] };
  tabIndex: number;
  selectedTabName: string;
}

export default function NavMenu({ tabs, tabIndex, selectedTabName }: NavMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleTabClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="sticky top-0 bg-black/30 backdrop-blur-md w-full shadow-xl border-b border-white/10 z-50">
      <div className="max-w-screen-2xl mx-auto px-4 py-3 sm:py-4">
        {/* Header with Logo and Menu Button */}
        <div className="flex items-center justify-between">
          {/* Logo/Selected Tab Name */}
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold bg-linear-to-r from-green-300 to-teal-400 bg-clip-text text-transparent">
              {selectedTabName}
            </h1>
          </div>

          {/* Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 border border-white/20"
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
                <span className="text-sm font-medium hidden sm:inline">分类</span>
              </>
            )}
          </button>
        </div>

        {/* Collapsible Menu */}
        {isOpen && (
          <nav className="mt-4 animate-fadeIn">
            <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-2 sm:gap-3 text-white">
              {tabs.class.map((item) => {
                const isActive = tabIndex == item.type_id;
                if (
                  item.type_name === "伦理片" ||
                  item.type_name.includes("伦理") ||
                  item.type_name.includes("三级")
                ) {
                  return null;
                }

                return (
                  <li
                    className={`px-1 sm:px-2 py-1.5 rounded-lg transition-all duration-200 text-xs sm:text-sm md:text-base whitespace-nowrap text-center ${
                      isActive
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
        )}
      </div>
    </div>
  );
}
