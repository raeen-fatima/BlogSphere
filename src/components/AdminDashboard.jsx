"use client";

import Link from "next/link";

export default function AdminDashboard({ stats }) {
  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">Admin Panel</h1>

        <Link
          href="/admin/manage-blogs"
          className="px-5 py-2 rounded-full bg-black text-white hover:bg-black/80 transition"
        >
          Manage Blogs
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard title="Total Blogs" value={stats.totalBlogs} />
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Admin Access" value="✔" />
      </div>
    </main>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-xl border border-black/20 p-6 bg-white shadow-sm hover:shadow-md transition">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-4xl font-bold mt-2">{value}</p>
    </div>
  );
}
