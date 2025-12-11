// import Link from "next/link";
// import Image from "next/image";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// // Fetch blogs from backend
// async function getBlogs() {
//   try {
//     const res = await fetch(`${API_URL}/api/posts`, { cache: "no-store" });
//     if (!res.ok) throw new Error("Failed to fetch posts");

//     const data = await res.json();
//     return data.data || []; // backend returns { data: [...] }
//   } catch (err) {
//     console.error("Server Error fetching posts:", err);
//     return [];
//   }
// }

// export default async function BlogsPage() {
//   const blogs = await getBlogs();

//   return (
//     <div className="max-w-6xl mx-auto p-6 pt-24">
//       <h1 className="text-4xl font-bold mb-8 text-center">All Blogs</h1>

//       {blogs.length === 0 ? (
//         <p className="text-center text-gray-500">No blogs available.</p>
//       ) : (
//         <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {blogs.map((blog) => (
//             <div
//               key={blog._id}
//               className="bg-white border rounded-xl shadow hover:shadow-xl transition p-4 flex flex-col"
//             >
//               {blog.image && (
//                 <div className="relative w-full h-48 mb-4 rounded overflow-hidden">
//                   <Image
//                     src={blog.image}
//                     alt={blog.title}
//                     fill
//                     className="object-cover"
//                     sizes="(max-width: 768px) 100vw,
//                            (max-width: 1200px) 50vw,
//                            33vw"
//                   />
//                 </div>
//               )}

//               <h2 className="text-xl font-semibold mb-2 line-clamp-2">{blog.title}</h2>

//               <p className="text-gray-600 mb-4 line-clamp-3">
//                 {blog.content}
//               </p>

//               <div className="mt-auto">
//                 <Link
//                   href={`/blog/${blog.slug}`}
//                   className="text-blue-600 hover:underline font-medium"
//                 >
//                   Read More →
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
import React from 'react'

function page() {
  return (
    <div>
      <h2>helllooo</h2>
    </div>
  )
}

export default page
