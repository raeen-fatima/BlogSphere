"use client";

import { useState } from "react";
import ExploreBtn from "@/components/ExploreBtn";
import YourBlog from "@/components/YourBlog";
import AuthorProfile from "@/components/AuthorProfile";
import { Toaster } from "react-hot-toast";

function DashboardContent({ userId }) {
  const [activeTab, setActiveTab] = useState("profile");
  

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <Toaster position="top-right" />

      {/* Explore Button */}
      <div className="  items-center mb-6">
        <ExploreBtn />
      </div>
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-center">
          User Dashboard
        </h1>
        <p className="text-gray-500 text-center mt-2">
          Manage your profile and blogs here, {userId?.author?.name || "Author"}.
        </p>
      </div>

      {/* Mini Nav */}
      <div className="flex gap-4 border-b-2 border-black/40 mb-6 px-0">
        <button
          className={`px-4 py-2 rounded-t-lg font-semibold transition ${
            activeTab === "profile"
              ? "bg-black/30 border-t border-l border-r border-black/10 shadow"
              : "text-gray-500 hover:text-black"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg font-semibold transition ${
            activeTab === "blogs"
              ? "bg-black/30 border-t border-l border-r border-black/10 shadow"
              : "text-gray-500 hover:text-black"
          }`}
          onClick={() => setActiveTab("blogs")}
        >
          Your Blogs
        </button>
      </div>

      {/* Tab Content */}
      <div className="">
        {activeTab === "profile" && (
          <div>
            <h2 className="text-3xl font-bold mb-16 text-center bg-black/20">Your Profile</h2>
            <AuthorProfile authorId={userId} />
          </div>
        )}

        {activeTab === "blogs" && (
          <div>
            
           <YourBlog authorId={userId?._id} />
          </div>
        )}
      </div>
    </div>
  );
}

export default  DashboardContent;
