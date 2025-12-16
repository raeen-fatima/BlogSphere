import React from "react";
import Link from "next/link";

function ExploreBtn() {
  return (
    <div className="px-4">
      {/* PAGE HEADER */}
      <div className="max-w-6xl mx-auto mt-10 mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        
        {/* Left Content */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
            Explore Blogs
          </h1>
          <p className="text-gray-600 mt-2 max-w-md">
            Discover creative posts written by community and writers.
          </p>
        </div>

        {/* Button */}
        <Link
          href="/dashboard/create"
          className="inline-flex justify-center border-2 border-black text-black px-6 py-2 rounded-full shadow hover:bg-black hover:text-white transition font-semibold w-full sm:w-auto"
        >
          Create New Blog
        </Link>
      </div>
    </div>
  );
}

export default ExploreBtn;
