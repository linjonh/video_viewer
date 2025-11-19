"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function LoadingBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Use a microtask to avoid synchronous state update
    Promise.resolve().then(() => {
      setLoading(true);
    });

    // Hide loading bar after a short delay to ensure content is rendered
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-1">
      <div className="h-full bg-gradient-to-r from-green-500 via-teal-500 to-green-500 animate-loading-bar" />
    </div>
  );
}
