"use client";

import { motion } from "framer-motion";
import { FaFeatherAlt, FaUserAlt, FaCode, FaBullhorn } from "react-icons/fa";

const teamMembers = [
  { name: "Fatima Raeen", role: "Founder & CEO", icon: <FaUserAlt size={28} /> },
  { name: "John Doe", role: "Lead Developer", icon: <FaCode size={28} /> },
  { name: "Jane Smith", role: "Marketing Head", icon: <FaBullhorn size={28} /> },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-20">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <FaFeatherAlt size={28} className="text-black/80 mr-2" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            About BlogSphere
          </h1>
        </div>
        <p className="text-gray-700 text-lg md:text-xl mt-4">
          BlogSphere is a modern blogging platform where writers and readers connect,
          share ideas, and inspire each other. Our mission is to make knowledge
          accessible and engaging for everyone.
        </p>
      </motion.div>

      {/* VISION & MISSION */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-16 max-w-5xl mx-auto grid md:grid-cols-2 gap-12"
      >
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">Our Vision</h2>
          <p className="text-gray-700">
            To empower writers to share their voice and readers to discover
            quality content easily. We aim to create a vibrant community driven
            by creativity, learning, and collaboration.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">Our Mission</h2>
          <p className="text-gray-700">
            To provide a seamless blogging experience with modern UI, engaging
            content, and a strong focus on community interaction.
          </p>
        </div>
      </motion.div>

      {/* TEAM MEMBERS */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-20 max-w-6xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-10">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
              className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition flex flex-col items-center gap-4"
            >
              <div className="bg-gray-200 p-4 rounded-full">{member.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CALL TO ACTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mt-20 text-center"
      >
        <h3 className="text-2xl md:text-3xl font-medium mb-4 text-gray-900">
          Join Our Community
        </h3>
        <p className="text-gray-700 mb-6">
          Start reading blogs, create your own, and connect with like-minded people.
        </p>
        <a
          href="/guest/login"
          className="px-8 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition"
        >
          Get Started
        </a>
      </motion.div>
    </div>
  );
}
