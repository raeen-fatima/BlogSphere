"use client";

import Link from "next/link";
import { MdClose } from "react-icons/md";

export default function ProtectedPage() {
  return (
    <div className="min-h-screen pt-32 px-6 text-center">

      {/* Top-right Cross → Redirect Home */}
      <Link
        href="/"
        className="absolute top-6 right-8 bg-black text-white p-2 rounded-full shadow hover:bg-gray-900 transition"
      >
        <MdClose size={22} />
      </Link>

      <h1 className="text-4xl font-bold text-gray-900">
        Welcome to Protected Area 🔒
      </h1>

      <p className="mt-3 text-gray-700">
        You can access this page only when logged in.
      </p>

      <Link
        href="/api/auth/logout"
        className="mt-6 inline-block bg-red-600 text-white px-6 py-2 rounded-xl"
      >
        Logout
      </Link>
    </div>
  );
}
