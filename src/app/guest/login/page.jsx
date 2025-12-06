"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  const API = process.env.NEXT_PUBLIC_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-6">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border"
      >

        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
          Welcome Back
        </h2>

        <form className="space-y-5" onSubmit={handleLogin}>

          <div>
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-xl border mt-1"
              placeholder="email@example.com"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-3 rounded-xl border mt-1"
              placeholder="Enter password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-black text-white rounded-xl font-semibold"
          >
            Login
          </motion.button>

        </form>

        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link className="text-black font-semibold" href="/guest/signup">
            Sign Up
          </Link>
        </p>

      </motion.div>

    </div>
  );
}
