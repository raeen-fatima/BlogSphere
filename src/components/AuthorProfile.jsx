"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

export default function DashboardProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", bio: "" });
  const [uploading, setUploading] = useState(false);

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

  //avtar

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setUploading(true);
      const res = await fetch("/api/user/avatar", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data);
        toast.success("Profile picture updated");
      } else {
        toast.error(data.error || "Upload failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  if (loading || !user) {
  return (
    <p className="text-center mt-10 animate-pulse text-gray-500">
      Loading profile...
    </p>
  );
}


  return (
    <div className="max-w-md mx-auto p-6 border border-black/20 bg-white  shadow-2xl relative">
      {/* Avatar */}
      <div className="flex justify-center -mt-16 mb-4 relative">
        <Image
          src={user?.avatar || "/avtar.jpg"}
          alt="Avatar"
          className="w-24 h-24  rounded-full border-2 border-black shadow"
          width={96}
          height={96}
        />
        {/* Optional: Edit Avatar button */}
        <label className="absolute bottom-0 bg-black text-white px-3 py-1 text-xs rounded-full cursor-pointer hover:bg-black/70">
          {uploading ? "Uploading..." : "Change"}
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleAvatarChange}
          />
        </label>
      </div>

      {/* Profile Info */}
      {editing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Name"
            className="w-full border-b border-black/30 focus:border-black focus:outline-none  px-3 py-2"
          />
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="Bio"
            className="w-full border-b border-black/30 focus:border-black focus:outline-none px-3 py-2"
          />
          <div className="flex justify-between">
            <button
              onClick={() => setEditing(false)}
              className="px-6 py-1 rounded-full border-2 text-black hover:bg-black/20"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-1 rounded-full bg-black text-white hover:bg-black/30"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-center text-2xl font-bold">{user.name}</h2>
          <p className="text-center text-gray-500">{user.email}</p>
          <p className="text-center mt-2 text-gray-600">
            {user.bio || "No bio yet"}
          </p>

          {/* Stats */}
          <div className="flex justify-around mt-4 text-black font-semibold">
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
              className="px-6 py-1 rounded-full bg-black text-white hover:bg-black/30 hover:text-black"
            >
              Edit Profile
            </button>
          </div>
        </>
      )}
    </div>
  );
}
