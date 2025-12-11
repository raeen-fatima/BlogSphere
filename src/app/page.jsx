import BlogCard from "@/components/BlogCard";

export default async function BlogPage() {
  let posts = [];
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${API_URL}/api/posts`, { cache: "no-store" });
    const json = await res.json();
    if (Array.isArray(json?.data)) posts = json.data;
  } catch (err) {
    console.error("Error fetching posts:", err);
  }

  return (
    <main className="max-w-4xl  mx-auto px-4 py-10">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-extrabold">Your Daily Source of Truth</h1>
        <p className="text-gray-600 mt-2">
          Read inspiring stories, explore ideas, and publish your thoughts.
        </p>
      </section>

      <section className="flex flex-col gap-6">
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </section>
    </main>
  );
}
