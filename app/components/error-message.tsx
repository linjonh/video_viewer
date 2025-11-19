"use client";

import { useRouter } from "next/navigation";

export default function ErrorMessage() {
  const router = useRouter();

  const handleRefresh = () => {
    router.refresh();
  };

  return (
    <div className="mt-20 text-center">
      <p className="text-red-400 text-lg mb-4">出错了，请重试</p>
      <button
        onClick={handleRefresh}
        className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl active:scale-95"
      >
        刷新页面
      </button>
    </div>
  );
}
