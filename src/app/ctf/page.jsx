"use client";

import { motion } from "framer-motion";
import { FaFlagCheckered } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdSecurity } from "react-icons/md";

export default function CTFPage() {
  return (
    <div className="min-h-screen pt-32 px-6 bg-gradient-to-br from-gray-50 to-gray-200">

      {/* HERO SECTION */}
      <section className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center gap-4"
        >
          <FaFlagCheckered size={50} className="text-black" />

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Capture The Flag (CTF) Challenges
          </h1>

          <p className="max-w-2xl text-gray-600 text-lg">
            Practice Ethical Hacking, Cyber Security Skills, Reverse Engineering, 
            Forensics & Web Exploitation with hands-on challenges made specially for learners.
          </p>
        </motion.div>
      </section>

      {/* CTF CATEGORIES SECTION */}
      <section className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* CARD 1 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-white rounded-2xl shadow-lg border hover:shadow-xl transition cursor-pointer"
        >
          <MdSecurity size={45} className="text-black mb-3" />
          <h3 className="text-xl font-bold text-gray-900">Web Exploitation</h3>
          <p className="text-gray-600 mt-2">
            SQLi, XSS, CSRF, Authentication Bypass & more.
          </p>
        </motion.div>

        {/* CARD 2 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-white rounded-2xl shadow-lg border hover:shadow-xl transition cursor-pointer"
        >
          <RiLockPasswordFill size={45} className="text-black mb-3" />
          <h3 className="text-xl font-bold text-gray-900">Cryptography</h3>
          <p className="text-gray-600 mt-2">
            Ciphers, hashing, encoding, decoding & brute force.
          </p>
        </motion.div>

        {/* CARD 3 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-white rounded-2xl shadow-lg border hover:shadow-xl transition cursor-pointer"
        >
          <FaFlagCheckered size={45} className="text-black mb-3" />
          <h3 className="text-xl font-bold text-gray-900">Forensics</h3>
          <p className="text-gray-600 mt-2">
            Metadata analysis, memory dump, logs, steganography.
          </p>
        </motion.div>

      </section>

      {/* CTA SECTION */}
      <section className="max-w-4xl mx-auto text-center mt-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Begin Your CTF Journey?
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Start with easy challenges and level up your cyber security skills step by step.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-black text-white rounded-xl font-semibold shadow-lg hover:bg-gray-900"
          >
            Start Challenge
          </motion.button>
        </motion.div>
      </section>

    </div>
  );
}
