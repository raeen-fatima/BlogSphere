"use client";

export default function Loading() {
  return (
    <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm font-bold">Loading dashboard...</p>
        </div>
  );
}
