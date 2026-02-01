import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Blog from "@/models/Blog";
import { getUserFromCookie } from "@/lib/auth";

export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const admin = await getUserFromCookie();
    if (!admin || admin.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { status } = await req.json(); // approved / rejected

    if (!["approved", "rejected"].includes(status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 });
    }

    const blog = await Blog.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    );

    return NextResponse.json({ message: "Status updated", blog });
  } catch (err) {
    console.error("ADMIN BLOG UPDATE ERROR 👉", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}


export async function DELETE(req, { params }) {
  await connectDB();

  const user = await getUserFromCookie();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await Blog.findByIdAndDelete(params.id);

  return NextResponse.json({ message: "Blog deleted" });
}
