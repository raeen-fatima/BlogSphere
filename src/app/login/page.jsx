// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import toast, { Toaster } from "react-hot-toast";
// import { RxCross2 } from "react-icons/rx";

// export default function LoginPage() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const router = useRouter();

//   const API = process.env.NEXT_PUBLIC_API_URL;

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch(`${API}/api/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();
//       console.log("API RESPONSE:", data);

//       if (data?.success) {
//   toast.success("Login Successful 🎉");

//   // Save token
//   localStorage.setItem("token", data.token);

//   // Save user info (role, name, email)
//   localStorage.setItem("user", JSON.stringify(data.user));

//   setTimeout(() => {
//     router.push("/");
//   }, 800);

//       } else {
//         toast.error(data.error || "Login failed ❌");
//       }
//     } catch (err) {
//       toast.error("Something went wrong!");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-6 relative">
//       <Toaster position="top-center" />

//       {/* ❌ CROSS ICON — redirect to home */}
//       <button
//         onClick={() => router.push("/")}
//         className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-200 transition"
//       >
//         <RxCross2 size={26} />
//       </button>

//       {/* Login Card */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border"
//       >
//         <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
//           Welcome Back
//         </h2>

//         <form className="space-y-5" onSubmit={handleLogin}>
//           <div>
//             <label className="text-sm font-semibold text-gray-700">Email</label>
//             <input
//               type="email"
//               required
//               className="w-full p-3 rounded-xl border mt-1"
//               placeholder="email@example.com"
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//             />
//           </div>

//           <div>
//             <label className="text-sm font-semibold text-gray-700">Password</label>
//             <input
//               type="password"
//               required
//               className="w-full p-3 rounded-xl border mt-1"
//               placeholder="Enter password"
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//             />
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.95 }}
//             type="submit"
//             className="w-full py-3 bg-black text-white rounded-xl font-semibold"
//           >
//             Login
//           </motion.button>
//         </form>

//         <p className="text-center text-gray-600 mt-4">
//           Don’t have an account?{" "}
//           <Link className="text-black font-semibold" href="/guest/signup">
//             Sign Up
//           </Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// }
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
          className=" border-b p-3 w-full  focus:outline-none focus:border-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className=" border-b p-3 w-full  focus:outline-none  focus:border-black" 
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
