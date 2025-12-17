"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "./LikeButton";
import CommentBox from "./CommentBox";
import { FaComments, FaCommentSlash } from "react-icons/fa";
import Dropdown from "./Dropdown";
import ReactMarkdown from "react-markdown";

export default function BlogCard({ blog }) {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="">
      <div className="border-b border-black/40 py-6 transition-transform hover:scale-[1.01] duration-300">
      {/* Author */}
      <div className="flex items-center gap-2 px-3 mb-3">
        <Image
          src={blog.author?.avatar || "/avtar.jpg"}
          alt={blog.author?.name || "Author avatar"}
          width={40}
          height={40}
          className="rounded-full border border-gray-600"
        />
        <span className="font-semibold  text-gray-600">
          {blog.author?.name || "Anonymous"}
        </span>
      </div>

      {/* Blog Content */}
      <div className="flex flex-col-reverse px-3 sm:flex-row gap-4 sm:gap-8">
        {/* Text */}
        <div className="flex-1">
          <Link href={`/blog/${blog._id}`}>
            <h2 className="text-2xl sm:text-4xl font-bold hover:underline line-clamp-2">
              {blog.title}
            </h2>
          </Link>

          <div className="text-gray-600 dark:text-gray-400 line-clamp-3 mt-2">
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </div>
        </div>

        {/* Image */}
        <div className="relative w-full sm:w-60 h-48 sm:h-40 shrink-0 overflow-hidden shadow-2xl ">
          <Image
            src={blog.image || "/placeholder.jpg"}
            alt={blog.title || "Blog cover image"}
            fill
            sizes="(max-width: 640px) 100vw, 224px"
            priority
            className="object-cover"
          />
        </div>
      </div>

      {/* Metadata */}
      <div className="flex items-center px-3 justify-between mt-4 text-sm text-gray-500">
        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>

        <div className="flex items-center gap-4">
          <LikeButton blogId={blog._id} initialLikes={blog.likes.length} />

          <button
            onClick={() => setShowComments(!showComments)}
            className="text-black hover:text-gray-800"
          >
            {showComments ? (
              <FaCommentSlash size={20} />
            ) : (
              <FaComments size={20} />
            )}
          </button>

          <Dropdown blog={blog} />
        </div>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="mt-4">
          <CommentBox blogId={blog._id} />
        </div>
      )}
    </div>
    </div>
  );
}
