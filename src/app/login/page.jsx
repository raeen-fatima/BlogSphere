"use client";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
setLoading(false);
    if (res.ok) {
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
<div className="h-screen flex flex-col items-center justify-center  px-4">
      <Toaster position="top-right" /> 

         <form onSubmit={handleLogin}className="space-y-6 w-full max-w-md p-8 bg-white rounded border border-black/20 shadow-lg">
        <h1 className="text-3xl font-bold text-center">Login</h1>

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

        <button className="w-full py-3 rounded bg-black text-white font-medium hover:bg-gray-800 transition disabled:opacity-60"
        type="submit"
          disabled={loading}>
           {loading ? "Logging in..." : "Login"}
          
        </button>
        <p className="text-center text-gray-600 ">
          Don’t have an account?{" "}
          <Link className="text-black font-semibold hover:underline" href="/signup">
            Sign Up
          </Link>
        </p>
      </form>
      
    </div>
  );
}
