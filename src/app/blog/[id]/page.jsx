export default async function SingleBlog({ params }) {
  const res = await fetch(`http://localhost:3000/api/posts/${params.id}`, {
    cache: "no-store"
  });

  const post = await res.json();

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="mt-4">{post.content}</p>

      <p className="text-gray-500 mt-4">
        Posted on: {new Date(post.createdAt).toLocaleString()}
      </p>
    </div>
  );
}
