"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  const API = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("SIGNUP RESPONSE:", data);

      if (data?.success) {
        toast.success("Account created successfully 🎉");
localStorage.setItem("user", JSON.stringify(data.user));
console.log(JSON.parse(localStorage.getItem("user")).role); // "user"

        setTimeout(() => {
          router.push("/guest/login");
        }, 800);
      } else {
        toast.error(data.error || "Signup failed ❌");
      }
    } catch (error) {
      toast.error("Server error, please try again!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-6 relative">
      <Toaster position="top-center" />

      {/* ❌ Cross Icon */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-200 transition"
      >
        <RxCross2 size={26} />
      </button>

      {/* Signup Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
          Create an Account
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              required
              className="w-full p-3 rounded-xl border mt-1"
              placeholder="Enter name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              required
              className="w-full p-3 rounded-xl border mt-1"
              placeholder="email@example.com"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              required
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
            Sign Up
          </motion.button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link className="text-black font-semibold" href="/guest/login">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
