import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl font-bold leading-tight">
        Share Your Ideas <br />
        With The World 🌍
      </h1>

      <p className="text-gray-600 mt-4 max-w-xl">
        A modern blogging platform built with Next.js, MongoDB and
        secure authentication.
      </p>

      <div className="mt-6 flex gap-4">
        <Link
          href="/signup"
          className="bg-black text-white px-6 py-2 rounded"
        >
          Start Writing
        </Link>

        <Link
          href="/blogs"
          className="border px-6 py-2 rounded"
        >
          Explore Blogs
        </Link>
      </div>
    </section>
  );
}
