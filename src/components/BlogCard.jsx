import Link from "next/link";

export default function BlogCard({ post }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300">
      <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{post.description}</p>
      <Link
        href={`/blog/${post.id}`}
        className="text-blue-500 hover:text-blue-700 font-semibold"
      >
        Read more →
      </Link>
    </div>
  );
}
