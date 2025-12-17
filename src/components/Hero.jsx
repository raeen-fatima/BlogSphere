'use client'
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12">

          {/* Text Section */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="flex-1 text-center md:text-left"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Welcome to{" "}
              <span className="text-gray-600">BlogSphere</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
              A modern hub for creators and readers to share ideas, insights,
              and tech trends. Join us and shape the future of blogging.
            </p>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/login"
              className="inline-block mt-8 px-7 py-2 bg-black text-white font-medium rounded-full shadow-md hover:shadow-xl transition"
            >
              Get Started
            </motion.a>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="flex-1 w-full"
          >
            <div className="relative w-full h-45 sm:h-55 md:h-60 lg:h-65">
              <Image
                src="/hero-about.jpg"
                alt="BlogSphere Hero"
                fill
                priority
                className="object-cover  border border-gray-900/40 shadow-lg shadow-black hover:shadow-2xl transition"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
