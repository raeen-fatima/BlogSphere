"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

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
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-white"
        >
          BlogSphere
        </motion.div>

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
              className="hover:text-white transition-colors"
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
              className="text-gray-400 hover:text-white transition"
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-8" />

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 mt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} BlogSphere. All rights reserved.
      </div>
    </footer>
  );
}
