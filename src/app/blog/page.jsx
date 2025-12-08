import Link from "next/link";

export default async function BlogPage() {
  let posts = [];

  try {
    const res = await fetch("http://localhost:3000/api/posts", {
      cache: "no-store",
    });

    const json = await res.json();

    if (Array.isArray(json)) {
      posts = json;
    } else if (json?.data && Array.isArray(json.data)) {
      posts = json.data;
    }
  } catch (err) {
    console.log("Fetch error:", err);
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      
      <h1 className="text-3xl font-bold mb-4">All Blogs</h1>

      {posts.length === 0 && (
        <p className="text-gray-500">No blogs yet</p>
      )}

      <div className="flex flex-col gap-4 mt-4">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post._id}`}
            className="p-4 border rounded hover:bg-gray-100"
          >
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p>{post.content.substring(0, 100)}...</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
