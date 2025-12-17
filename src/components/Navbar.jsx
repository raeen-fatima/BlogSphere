"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  FiLogOut,
  FiUser,
  FiMenu,
  FiX,
  FiHome,
  FiInfo,
  FiMail,
  FiSettings,
} from "react-icons/fi";
import { IoCreateOutline } from "react-icons/io5";
import { FaFeatherAlt } from "react-icons/fa";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dropRef = useRef(null);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/api/auth/me");
      if (res.ok) setUser(await res.json());
    };
    getUser();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/login");
  };

  const navLink = (href, label, Icon) => (
    
    <Link
      href={href}
      onClick={() => setMenuOpen(false)}
      className={`flex  items-center gap-2 px-5 py-1 rounded transition ${
        pathname === href
          ? " bg-black text-white  rounded-full shadow hover:bg-black/40 transition hover:text-black font-semibold"
          : "text-gray-900 hover:bg-black/40  border-2 border-gray-400/20   rounded-full shadow  transition hover:text-gray-800 font-semibold"
      }`}
    >
      <Icon />
      {label}
    </Link>
  );

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur border-b border-black/15 ">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <FaFeatherAlt className="text-black hover:text-gray-600" />
          BlogSphere
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-2">
          {navLink("/", "Home", FiHome)}
          {navLink("/dashboard/create", "Create", IoCreateOutline)}
          {navLink("/about", "About", FiInfo)}
          {navLink("/contact", "Contact", FiMail)}

        </div>

        {/* Right Side */}
        {!user ? (
          <Link
            href="/login"
            className="hidden md:inline px-6 py-2 bg-black text-white  rounded-full shadow hover:bg-black/40  hover:text-black font-semibold  transition"
          >
            Be Our Guest
          </Link>
        ) : (
          <div className="relative" ref={dropRef}>
            <button
              onClick={() => setDropdown(!dropdown)}
              className="flex items-center gap-2 px-6 py-2 rounded-full hover:bg-black/20 transition"
            >
              <Image
                src={user?.avatar || "/avtar.jpg"}
                width={36}
                height={36}
                className="rounded-full border-2 border-black"
                alt="user"
              />
              <span className="font-semibold">{user.name}</span>
            </button>

            {dropdown && (
              <div className="absolute right-0 mt-4 w-56 p-2 bg-black/5 backdrop-blur-3xl rounded shadow-xl border border-gray-500/50 font-semibold">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-black hover:text-white"
                >
                  <FiUser /> Dashboard
                </Link>

                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-black hover:text-white"
                  >
                    <FiSettings /> Admin Panel
                  </Link>
                )}

                <button
                  onClick={logout}
                  className="flex items-center gap-2 w-full px-4 py-2 mt-1 rounded-full text-red-600 hover:bg-red-600 hover:text-white"
                >
                  <FiLogOut /> Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden p-4 space-y-2 bg-white/60 backdrop-blur border-t">
          {navLink("/", "Home", FiHome)}
          {navLink("/dashboard/create", "Create", IoCreateOutline)}

          {navLink("/about", "About", FiInfo)}
          {navLink("/contact", "Contact", FiMail)}

          {!user && (
            <Link
              href="/login"
              className="block text-center px-4 py-2 bg-black text-white  rounded-full shadow hover:bg-black/40  hover:text-black font-semibold  transition">
              Be Our Guest
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
