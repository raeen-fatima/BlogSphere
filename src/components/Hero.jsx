import React from 'react'
import Image from "next/image";
import { motion } from "framer-motion";

function Hero() {
  return (
    <div>
      <section className="relative flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-24 md:py-36 gap-12">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Welcome to <span className="text-blue-600">BlogSphere</span>
          </h1>
          <p className="text-gray-700 text-lg md:text-xl mb-8">
            We create a hub for modern creators and readers to share ideas, insights,
            and tech trends. Join us and be part of the future of blogging.
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/guest/login"
            className="inline-block px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition"
          >
            Get Started
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1 relative w-full h-80 md:h-[28rem]"
        >
          <Image
            src="/hero-about.jpg"
            alt="Hero Image"
            fill
            className="object-cover rounded-2xl shadow-xl"
          />
        </motion.div>
      </section>
    </div>
  )
}

export default Hero
