"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-all duration-200 group border border-white/20"
    >
      <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
      <span className="font-medium">返回上一页</span>
    </button>
  );
}
