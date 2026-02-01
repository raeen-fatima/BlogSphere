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

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Form submitted successfully!");
        setForm({ name: "", email: "", message: "" }); // reset state
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      toast.error("Server error!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Toaster position="top-right" />

      <div className="w-full max-w-4xl bg-white rounded shadow-xl border border-black/20 grid md:grid-cols-2 overflow-hidden">

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

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <h3 className="text-4xl font-bold text-center">Contact Us</h3>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            className="w-full border-b border-gray-300 p-3 focus:outline-none focus:border-black"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            className="w-full border-b border-gray-300 p-3 focus:outline-none focus:border-black"
          />

          <textarea
            name="message"
            rows="4"
            value={form.message}
            onChange={handleChange}
            placeholder="Write your message..."
            required
            className="w-full border-b border-gray-300 p-3 resize-none focus:outline-none focus:border-black"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded bg-black text-white font-medium hover:bg-gray-800 disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
