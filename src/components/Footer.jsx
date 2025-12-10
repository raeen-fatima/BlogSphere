"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaFeatherAlt } from "react-icons/fa";
export default function Footer() {
  const links = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { icon: <FaTwitter />, href: "#" },
    { icon: <FaLinkedin />, href: "#" },
    { icon: <FaGithub />, href: "#" },
  ];

  return (
    <footer className="bg-black text-sky-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand */}
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

        {/* Quick Links */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6"
        >
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className= "text-sky-100 hover:text-sky-200 font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="flex gap-6"
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="text-sky-200 hover:text-sky-300 transition"
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Divider */}
      <div className="border-t border-sky-200 mt-8" />

      {/* Copyright */}
      <div className=" max-w-7xl mx-auto px-6 mt-6 text-center text-sm text-sky-100">
        © {new Date().getFullYear()} BlogSphere. All rights reserved.
      </div>
    </footer>
  );
}
