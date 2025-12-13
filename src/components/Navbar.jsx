"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // fetch logged-in user
  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    };
    getUser();
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/login");
  };

  return (
    <nav className="fixed top-0 w-full z-20 border-b bg-white">
      <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">BlogSphere</span>
        </Link>

        {/* Links */}
        <ul className="hidden md:flex gap-6 font-medium">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>

        {/* Right Side */}
        {!user ? (
          <div className="flex gap-3">
            <Link href="/login" className="px-4 py-2 border rounded">
              Login
            </Link>
            <Link href="/signup" className="px-4 py-2 bg-black text-white rounded">
              Signup
            </Link>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2"
            >
              <Image
                src="/avtar.jpg"
                alt="user"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="font-medium">{user.name}</span>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow">
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Dashboard
                </Link>

                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Admin Panel
                  </Link>
                )}

                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
