import React from 'react'
import Link from 'next/link'
function ExploreBtn() {
  return (
    <div>
          {/* PAGE HEADER */}
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Explore Blogs
          </h1>
          <p className="text-gray-600 mt-2">
            Discover creative posts written by community and writers.
          </p>
        </div>

        <Link
          href="/blog/create"
          className="bg-black text-white px-5 py-3 rounded-lg shadow hover:bg-gray-900 transition"
        >
          Create New Blog
        </Link>
      </div>

      {/* EMPTY STATE */}
      {posts.length === 0 && (
        <div className="max-w-3xl mx-auto text-center p-10 bg-white/60 backdrop-blur shadow rounded-xl">
          <h2 className="text-xl font-semibold text-gray-700">No posts yet</h2>
          <p className="text-gray-500 mt-2">
            Start by creating your first blog.
          </p>
          <Link
            href="/blog/create"
            className="mt-4 inline-block bg-black text-white px-4 py-2 rounded hover:bg-gray-900"
          >
            Write One
          </Link>
        </div>
      )}

    </div>
  )
}

export default ExploreBtn
