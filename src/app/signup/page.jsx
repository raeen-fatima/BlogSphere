"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    setLoading(false);

    if (res.ok) {
      toast.success("Account created successfully 🎉");
      router.push("/login");
    } else {
      const data = await res.json();
      toast.error(data?.message || "Signup failed ❌");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center  px-4">
      <Toaster position="top-right" />
      <form
        onSubmit={handleSignup}
        className="space-y-6 w-full max-w-md p-8 bg-white rounded border border-black/20 shadow-lg"
      >
        <h1 className="text-3xl font-bold text-center">Create Account</h1>

        <input
          type="text"
          placeholder="Name"
          className="border-b p-3 w-full  focus:outline-none focus:ring-0 focus:ring-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className=" border-b p-3 w-full  focus:outline-none focus:ring-0 focus:ring-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className=" border-b p-3 w-full  focus:outline-none focus:ring-0 focus:ring-none" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded bg-black text-white font-medium hover:bg-gray-800 transition disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link className="text-black font-semibold hover:underline" href="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
