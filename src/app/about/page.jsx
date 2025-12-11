"use client";

import { motion } from "framer-motion";
import { FaFeatherAlt, FaUserAlt, FaCode, FaBullhorn } from "react-icons/fa";
import { SparklesCore } from "@/components/ui/Sparkles";
import { Card, CardContent } from "@/components/ui/card";

const teamMembers = [
  { name: "Catherine", role: "Founder & CEO", icon: <FaUserAlt size={28} /> },
  { name: "John Doe", role: "Lead Developer", icon: <FaCode size={28} /> },
  { name: "Jane Smith", role: "Marketing Head", icon: <FaBullhorn size={28} /> },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-100 via-white to-gray-100 text-white relative overflow-hidden px-6 py-20">
      {/* BACKGROUND SPARKLES */}
      <div className="absolute inset-0 z-0 opacity-40">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1.4}
          particleDensity={80}
          className="w-full h-full"
          particleColor="#005461"
        />
      </div>

      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center mb-4"
        >
          <FaFeatherAlt size={34} className="text-sky-900  mr-2" />
          <h1 className="text-5xl md:text-5xl font-extrabold bg-gradient-to-r from-sky-950 to-sky-800 bg-clip-text text-transparent">
            About BlogSphere
          </h1>
        </motion.div>

        <p className="text-gray-800 text-lg md:text-sm mt-4 leading-relaxed">
          BlogSphere is a premium blogging universe where creativity meets luxury.
          A place where writers shine, readers enjoy seamless experiences, and the
          community grows together.
        </p>
      </motion.div>

      {/* VISION & MISSION */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-20 max-w-5xl mx-auto grid md:grid-cols-2 gap-12 relative z-10"
      >
        {[{
          title: "Our Vision",
          text: "Empowering writers with a futuristic platform and connecting readers with premium knowledge effortlessly.",
        }, {
          title: "Our Mission",
          text: "Deliver a modern, smooth, and visually stunning blogging experience powered by next‑gen UI/UX.",
        }].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 * index }}
          >
            <Card className="border border-sky-500/10 bg-sky-900/5 backdrop-blur-xl shadow-xl rounded-2xl">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-4 text-sky-900">
                  {item.title}
                </h2>
                <p className="text-gray-900 leading-relaxed">{item.text}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* TEAM MEMBERS */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-24 max-w-6xl mx-auto text-center relative z-10"
      >
        <h2 className="text-4xl font-bold text-black mb-10 tracking-wide">
          Meet Our Premium Team
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.3 }}
              className="group bg-sky-500/10 backdrop-blur-xl border border-sky-700/10 rounded-2xl p-8 shadow-xl flex flex-col items-center hover:bg-sky-800/20 transition"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 1 }}
                className="bg-sky-500/20 p-5 rounded-full mb-4"
              >
                {member.icon}
              </motion.div>
              <h3 className="text-2xl font-bold text-sky-700">
                {member.name}
              </h3>
              <p className="text-gray-700">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.7 }}
        className="mt-28 text-center relative z-10"
      >
        <h3 className="text-3xl md:text-4xl font-bold mb-4 text-sky-900">
          Join the Premium Community
        </h3>
        <p className="text-gray-800 mb-8 text-md">
          Write. Read. Inspire. Build your identity with BlogSphere Elite.
        </p>
        <a
          href="/guest/login"
          className="px-10 py-2 rounded border border-sky-800 text-sky-800 hover:text-white font-semibold hover:bg-sky-900 transition shadow-lg"
        >
          Get Started
        </a>
      </motion.div>
    </div>
  );
}
