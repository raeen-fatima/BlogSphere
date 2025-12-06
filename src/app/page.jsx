// import Link from "next/link";

// export default async function BlogPage() {
//   let posts = [];

//   try {
//     const res = await fetch("http://localhost:3000/api/posts", {
//       cache: "no-store",
//     });

//     const json = await res.json();

//     if (Array.isArray(json)) posts = json;
//     else if (json?.data && Array.isArray(json.data)) posts = json.data;
//   } catch (err) {
//     console.error("Error fetching posts:", err);
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 py-12 px-6">
      
//       {/* PAGE HEADER */}
//       <div className="max-w-6xl mx-auto flex items-center justify-between mb-10">
//         <div>
//           <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
//             Explore Blogs
//           </h1>
//           <p className="text-gray-600 mt-2">
//             Discover creative posts written by community and writers.
//           </p>
//         </div>

//         <Link
//           href="/blog/create"
//           className="bg-black text-white px-5 py-3 rounded-lg shadow hover:bg-gray-900 transition"
//         >
//           Create New Blog
//         </Link>
//       </div>

//       {/* EMPTY STATE */}
//       {posts.length === 0 && (
//         <div className="max-w-3xl mx-auto text-center p-10 bg-white/60 backdrop-blur shadow rounded-xl">
//           <h2 className="text-xl font-semibold text-gray-700">No posts yet</h2>
//           <p className="text-gray-500 mt-2">
//             Start by creating your first blog.
//           </p>
//           <Link
//             href="/blog/create"
//             className="mt-4 inline-block bg-black text-white px-4 py-2 rounded hover:bg-gray-900"
//           >
//             Write One
//           </Link>
//         </div>
//       )}

//       {/* BLOG CARDS GRID */}
//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-6">
//         {posts.map((post) => (
//           <Link
//             key={post._id}
//             href={`/blog/${post._id}`}
//             className="block bg-white/70 backdrop-blur-lg shadow-sm hover:shadow-xl transition-all p-6 rounded-xl border border-white/40 hover:-translate-y-1"
//           >
//             {/* TITLE */}
//             <h2 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
//               {post.title}
//             </h2>

//             {/* CONTENT PREVIEW */}
//             <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
//               {post.content}
//             </p>

//             {/* FOOTER */}
//             <div className="flex items-center justify-between mt-4 border-t pt-3 border-gray-200/50">
//               <span className="text-xs text-gray-500">
//                 {new Date(post.createdAt).toLocaleDateString()}
//               </span>

//               <span className="text-blue-600 text-sm font-medium">
//                 Read More →
//               </span>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }
import { posts } from "../data/posts";
// import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";

export default function HomePage() {
  return (
    <div className="bg-gray-10 dark:bg-gray-20 min-h-screen">
      {/* <Navbar /> */}
      <main className="max-w-6xl mx-auto pt-20 py-12 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </main>
    </div>
  );
}
