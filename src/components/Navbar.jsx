"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { jwtDecode } from "jwt-decode";

import { FaFeatherAlt } from "react-icons/fa";
import {
  FiMenu,
  FiX,
  FiHome,
  FiBookOpen,
  FiEdit,
  FiLogOut,
} from "react-icons/fi";
import { MdPersonAddAlt1 } from "react-icons/md";

export default function Navbar() {
  const path = usePathname();
  const router = useRouter();

  const [openDropdown, setOpenDropdown] = useState(false);
  const [open, setOpen] = useState(false);

  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // --- CHECK LOGIN TOKEN ---
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
      setIsLoggedIn(true);
    } catch {
      setIsLoggedIn(false);
    }
  }, []);

  // --- LOGOUT ---
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
    router.push("/");
    window.location.reload();
  };
  useEffect(() => {
    const close = (e) => {
      if (!e.target.closest(".dropdown-area")) setOpenDropdown(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  // --- NAV LINKS ---
  const links = [
    { name: "Home", href: "/", icon: <FiHome size={17} /> },
    { name: "Blogs", href: "/blog", icon: <FiBookOpen size={17} /> },
    { name: "Create", href: "/blog/create", icon: <FiEdit size={17} /> },
    { name: "About Us", href: "/about", icon: <FiEdit size={17} /> },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black backdrop-blur-2xl border-b border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: -10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 250 }}
          >
            <FaFeatherAlt
              size={22}
              className="text-white group-hover:text-sky-400 transition"
            />
          </motion.div>
          <span className="text-xl font-bold tracking-tight bg-linear-to-r from-sky-200 to-sky-100 text-transparent bg-clip-text">
            BlogSphere
          </span>
        </Link>

        {/* CENTER NAV LINKS */}
        <nav className="hidden md:flex items-center gap-10 mx-auto relative">
          {links.map((l) => {
            const isActive = path === l.href;
            return (
              <div key={l.href} className="relative">
                <Link
                  href={l.href}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-xl ${
                    isActive ? "text-sky-200" : "text-sky-100 hover:text-sky-300"
                  }`}
                >
                  {l.icon} {l.name}
                </Link>

                {isActive && (
                  <motion.div
                    layoutId="underline-bar"
                    initial={false}
                    className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-sky-100 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  />
                )}
              </div>
            );
          })}
        </nav>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-4 relative dropdown-area">
          {!isLoggedIn ? (
            <Link
              href="/guest/login"
              className="px-6 py-2 rounded-xl text-sm font-semibold border-2 border-sky-300/60 shadow-[inset_0_0_10px_rgba(0,0,0,0.15)] flex items-center gap-2 text-sky-200 hover:bg-sky-100 hover:text-black transition-all backdrop-blur-md"
            >
              <MdPersonAddAlt1 size={17} /> Be Our Guest
            </Link>
          ) : (
            <>
              {/* Avatar (First letter) */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setOpenDropdown(!openDropdown)}
                className="w-10 h-10 rounded-full bg-sky-200  text-black flex items-center justify-center font-bold shadow-md"
              >
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </motion.button>

              {/* DROPDOWN */}
              <AnimatePresence>
                {openDropdown && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-14 bg-sky-800/30 shadow-lg rounded-xl border border-sky-900/30 w-52 p-3 z-50 space-y-1"
                  >
                    <p className="px-3 py-2 text-sm font-medium text-gray-900">
                      Hi, {user?.name || "User"} 
                    </p>

                    <Link
                      href="/profile"
                      className="block px-3 py-2 text-sm hover:bg-black hover:text-white rounded-lg"
                    >
                      Profile
                    </Link>

                    {user?.role === "admin" && (
                      <Link
                        href="/admin/dashboard"
                        className="block px-3 py-2 text-sm hover:bg-black hover:text-white  rounded-lg"
                      >
                        Admin Dashboard
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-sm text-white bg-black rounded-lg"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded text-sky-400 bg-sky-900/60 shadow"
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-sky-200/70 backdrop-blur-xl  shadow-md py-4 px-6 space-y-2"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-8 py-3 rounded-lg text-sm font-medium transition ${
                  path === l.href
                    ? "bg-black  text-white"
                    : "text-black hover:bg-sky-700/70"
                }`}
              >
                {l.icon} {l.name}
              </Link>
            ))}

            {!isLoggedIn ? (
              <Link
                href="/guest/login"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-semibold  border-2 border-black hover:bg-sky-950 hover:text-black transition"
              >
                <MdPersonAddAlt1 size={17} /> Be Our Guest
              </Link>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-semibold border border-black bg-black text-white hover:bg-red-600 transition"
              >
                <FiLogOut size={17} /> Logout
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
