"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

export default function LikeButton({ blogId, initialLikes }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikes || 0);
  const [loading, setLoading] = useState(false);

  // ❤️ Like / Unlike
  const handleLike = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/blog/${blogId}/like`, {
        method: "POST",
      });

      const data = await res.json();
      setLiked(data.liked);
      setLikesCount(data.likesCount);
    } catch (err) {
      console.error("Like failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      className="flex items-center gap-1text-2xl text-black hover:text-gray-800"
    >
      <Heart
        size={22}
        className={liked ? "fill-red-500 text-red-500" : "text-black"}
      />
      {likesCount}
    </button>
  );
}
