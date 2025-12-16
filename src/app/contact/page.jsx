"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 🚧 Backend later
    setTimeout(() => {
      toast.success("Message sent successfully ✨");
      setForm({ name: "", email: "", message: "" });
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Toaster position="top-right" />

      <div className="w-full max-w-4xl bg-white rounded shadow-xl border border-black/20 grid md:grid-cols-2 overflow-hidden">
        
        {/* Left Section */}
        <div className="bg-black text-white p-8 flex flex-col justify-center space-y-4">
          <h2 className="text-3xl font-bold">Get in Touch</h2>
          <p className="text-gray-300">
            Have a question, feedback, or just want to say hi?  
            We'd love to hear from you.
          </p>

          <div className="space-y-2 text-sm text-gray-300">
            <p>📧 support@blogapp.com</p>
            <p>📍 India</p>
          </div>
        </div>

        {/* Right Section */}
        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-6"
        >
          <h3 className="text-4xl font-bold text-center">Contact Us</h3>

          <div className="space-y-1">
            <label className="text-sm text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border-b border-gray-300 p-3 focus:outline-none focus:border-black transition"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border-b border-gray-300 p-3 focus:outline-none focus:border-black transition"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-600">Message</label>
            <textarea
              name="message"
              rows="4"
              placeholder="Write your message..."
              value={form.message}
              onChange={handleChange}
              required
              className="w-full border-b border-gray-300 p-3 resize-none focus:outline-none focus:border-black transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded bg-black text-white font-medium hover:bg-gray-800 transition disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
