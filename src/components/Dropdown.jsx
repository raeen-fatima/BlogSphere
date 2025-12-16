"use client";

import { useState } from "react";
import Link from "next/link";
import { FaLink, FaShareAlt, FaBookmark, FaUser, FaFlag } from "react-icons/fa";
import { MoreVertical } from "lucide-react";    

export default function Dropdown({ blog }) {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!open);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="p-2 rounded text-black hover:bg-gray-600/15 transition"
      >
         <MoreVertical size={18} />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-48 bg-black/10 backdrop-blur-xl rounded-lg shadow-xl border text-black font-semibold border-gray-500/30 p-2 z-50 text-sm">
          {/* Copy Link */}
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/blog/${blog._id}`
              );
              setOpen(false);
            }}
            className="flex items-center gap-3 w-full text-left px-3 py-2 rounded hover:bg-white/20"
          >
            <FaLink size={14} /> Copy link
          </button>

          {/* Share */}
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: blog.title,
                  url: `${window.location.origin}/blog/${blog._id}`,
                });
              }
              setOpen(false);
            }}
            className="flex items-center gap-3 w-full text-left px-3 py-2 rounded hover:bg-white/20"
          >
            <FaShareAlt size={14} /> Share
          </button>

          {/* Bookmark */}
          <button
            onClick={() => {
              // call bookmark API
              setOpen(false);
            }}
            className="flex items-center gap-3 w-full text-left px-3 py-2 rounded hover:bg-white/20"
          >
            <FaBookmark size={14} /> Save
          </button>

          <div className="h-px bg-gray-400/30 my-1" />

          {/* View Author */}
          <Link
            href={`/profile/${blog.author?._id}`}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/20"
          >
            <FaUser size={14} /> View author
          </Link>

          {/* Report */}
          <button
            onClick={() => {
              // open report modal
              setOpen(false);
            }}
            className="flex items-center gap-3 w-full text-left px-3 py-2 rounded text-red-500 hover:bg-white/20"
          >
            <FaFlag size={14} /> Report
          </button>
        </div>
      )}
    </div>
  );
}
