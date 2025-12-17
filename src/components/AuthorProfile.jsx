"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

export default function DashboardProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", bio: "" });

  // Fetch user profile
  useEffect(() => {
    fetch("/api/user/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setFormData({ name: data.name, bio: data.bio || "" });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load profile");
        setLoading(false);
      });
  }, []);

  // Save profile changes
  const handleSave = async () => {
    try {
      const res = await fetch("/api/user/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setUser(data);
        toast.success("Profile updated!");
        setEditing(false);
      } else {
        toast.error(data.error || "Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10 animate-pulse text-gray-500">
        Loading profile...
      </p>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md relative">
      {/* Avatar */}
      <div className="flex justify-center -mt-16 mb-4 relative">
        <Image
          src={user.avatar || "/avtar.jpg"}
          alt="Avatar"
          className="w-24 h-24 rounded-full border-4 border-white shadow"
          width={96}
          height={96}
        />
        {/* Optional: Edit Avatar button */}
        <button
          className="absolute bottom-0 right-0 bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded hover:bg-gray-300"
        >
          Change
        </button>
      </div>

      {/* Profile Info */}
      {editing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="Name"
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            value={formData.bio}
            onChange={(e) =>
              setFormData({ ...formData, bio: e.target.value })
            }
            placeholder="Bio"
            className="w-full border rounded px-3 py-2"
          />
          <div className="flex justify-between">
            <button
              onClick={() => setEditing(false)}
              className="px-4 py-2 rounded border text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-center text-2xl font-bold">{user.name}</h2>
          <p className="text-center text-gray-500">@{user.username}</p>
          <p className="text-center mt-2 text-gray-600">{user.bio || "No bio yet"}</p>

          {/* Stats */}
          <div className="flex justify-around mt-4 text-gray-700 font-medium">
            <div>
              <span className="font-bold">{user.blogs || 0}</span> Blogs
            </div>
            <div>
              <span className="font-bold">{user.followers || 0}</span> Followers
            </div>
            <div>
              <span className="font-bold">{user.following || 0}</span> Following
            </div>
          </div>

          {/* Edit Button */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Edit Profile
            </button>
          </div>
        </>
      )}
    </div>
  );
}
