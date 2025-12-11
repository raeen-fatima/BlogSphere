"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart, FaHeart, FaRegComment } from "react-icons/fa";

export default function BlogCard({ post }) {
  const [likes, setLikes] = useState(post.likes || 0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);

  const handleLike = async () => {
    // Optimistic UI update
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);

    // Update backend
    try {
      await fetch(`/api/posts/${post._id}/like`, {
        method: "POST",
      });
    } catch (err) {
      console.error("Error liking post:", err);
      setLiked(liked);
      setLikes(likes); // revert on error
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = { id: Date.now(), text: commentText };
    setComments([...comments, newComment]);
    setCommentText("");

    try {
      await fetch(`/api/posts/${post._id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newComment.text }),
      });
    } catch (err) {
      console.error("Error adding comment:", err);
      setComments(comments); // revert on error
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b py-6 transition-transform hover:scale-[1.02] duration-300">
      {/* Author Avatar */}
      <div className="flex items-center gap-2">
        {post.author?.avatar && (
          <Image
            src={post.author.avatar}
            alt={post.author.name}
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
        <span className="font-medium text-gray-700 dark:text-gray-300">
          {post.author?.name || "Anonymous"}
        </span>
      </div>

      {/* Post Info */}
      <div className="flex-1 mt-2 sm:mt-0">
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-xl font-bold hover:underline">{post.title}</h2>
        </Link>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {post.excerpt || post.content.slice(0, 120)}...
        </p>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-gray-500 text-sm mt-2">
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>

          <button
            onClick={handleLike}
            className="flex items-center gap-1 hover:text-red-500 transition-colors"
          >
            {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />} {likes}
          </button>

          <button
            onClick={() => setShowCommentBox(!showCommentBox)}
            className="flex items-center gap-1 hover:text-blue-500 transition-colors"
          >
            <FaRegComment /> {comments.length}
          </button>
        </div>

        {/* Comment Box */}
        {showCommentBox && (
          <div className="mt-2">
            <form onSubmit={handleCommentSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 border rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors text-sm"
              >
                Post
              </button>
            </form>

            <div className="mt-2 space-y-1 max-h-40 overflow-y-auto">
              {comments.map((c) => (
                <div key={c.id || c._id} className="text-gray-700 text-sm">
                  {c.text}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="hidden sm:block ml-4 flex-shrink-0">
          <Image
            src={post.coverImage}
            alt={post.title}
            width={160}
            height={100}
            className="object-cover rounded"
          />
        </div>
      )}
    </div>
  );
}
