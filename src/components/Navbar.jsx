"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { FaFeatherAlt } from "react-icons/fa";
import { FiMenu, FiX, FiHome, FiBookOpen, FiEdit } from "react-icons/fi";
import { MdPersonAddAlt1 } from "react-icons/md";

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", href: "/", icon: <FiHome size={17} /> },
    { name: "Blogs", href: "/blog", icon: <FiBookOpen size={17} /> },
    { name: "Create", href: "/blog/create", icon: <FiEdit size={17} /> },
    { name: "About Us", href: "/about", icon: <FiEdit size={17} /> },
  ];

  return (
    <header
      suppressHydrationWarning
      className="fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-2xl 
      border-b border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO (NO initial animation) */}
        <div>
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: -10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 250 }}
            >
              <FaFeatherAlt size={22} className="text-gray-800 group-hover:text-black transition" />
            </motion.div>

            <span className="text-xl font-bold tracking-tight 
            bg-gradient-to-r from-black to-gray-700 text-transparent bg-clip-text">
              BlogSphere
            </span>
          </Link>
        </div>

        {/* CENTER NAV LINKS */}
        <nav className="hidden md:flex items-center gap-10 mx-auto relative">

          {links.map((l) => {
            const isActive = path === l.href;

            return (
              <div key={l.href} className="relative">
                <Link
                  href={l.href}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium 
                    transition-all rounded-xl
                    ${isActive ? "text-black" : "text-gray-700 hover:text-black"}`}
                >
                  {l.icon} {l.name}
                </Link>

                {/* Smooth underline - hydration safe */}
                {isActive && (
                  <motion.div
                    layoutId="underline-bar"
                    initial={false}
                    className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-black rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  />
                )}
              </div>
            );
          })}

        </nav>

        {/* CTA BUTTON (NO initial animation) */}
        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} className="hidden md:flex">
          <Link
            href="/guest/login"
            className="px-6 py-2 rounded-xl text-sm font-semibold border border-black/60 
            shadow-[inset_0_0_10px_rgba(0,0,0,0.15)] flex items-center gap-2 
            bg-white/40 hover:bg-black hover:text-white transition-all backdrop-blur-md"
          >
            <MdPersonAddAlt1 size={17} /> Be Our Guest
          </Link>
        </motion.div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded bg-white/60 border border-gray-200 shadow"
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
            className="md:hidden bg-white/90 backdrop-blur-xl border-b border-gray-200 
            shadow-md py-4 px-6 space-y-2"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition 
                  ${path === l.href ? "bg-black text-white" : "text-gray-700 hover:bg-gray-200/70"}`}
              >
                {l.icon} {l.name}
              </Link>
            ))}

            <Link
              href="/guest/login"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold
              border border-black hover:bg-black hover:text-white transition"
            >
              <MdPersonAddAlt1 size={17} /> Be Our Guest
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
