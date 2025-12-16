"use client";

import { useState } from "react";
import Image from "next/image";
import LikeButton from "@/components/LikeButton";
import CommentBox from "@/components/CommentBox";
import CommentsList from "@/components/CommentList";
import { FaComments, FaCommentSlash } from "react-icons/fa";
import Dropdown from "@/components/Dropdown";
import ReactMarkdown from "react-markdown";

export default function BlogDetailClient({ blog }) {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex text-sm text-gray-500 mt-6 just justify-between">
        {/* Author */}
        <div className="flex items-center gap-2 mb-3 ">
          <Image
            src="/avtar.jpg"
            alt={blog.author?.name || "Author avatar"}
            width={36}
            height={36}
            className="rounded-full border border-gray-600 "
          />
          <span className="font-medium text-gray-600">
            {blog.author?.name || "You"}
          </span>
        </div>
        {new Date(blog.createdAt).toDateString()}
      </div>

      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

      <div className="relative w-full h-86 mb-8">
        <Image
          src={blog.image || "/placeholder.jpg"}
          alt={blog.title || "Blog cover image"}
          fill
          className="object-cover rounded-xl"
        />
      </div>

      <div className="prose prose-lg max-w-none">
        <ReactMarkdown>{blog.content}</ReactMarkdown>
      </div>

      <div className="mt-8 flex gap-4  items-center">
        <LikeButton blogId={blog._id} initialLikes={blog.likes.length} />

        <button
          onClick={() => setShowComments(!showComments)}
          className=" text-black hover:text-gray-800"
          size={22}
        >
          {showComments ? (
            <FaCommentSlash size={22} />
          ) : (
            <FaComments size={22} />
          )}
        </button>
        <div className="flex-1 justify-between" />
        <Dropdown blog={blog} />
      </div>

      {showComments && (
        <div className="mt-6">
          <CommentBox blogId={blog._id} />
          <CommentsList blogId={blog._id} />
        </div>
      )}
    </div>
  );
}
