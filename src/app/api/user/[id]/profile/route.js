import connectDB from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const user = await User.findById(id).select("-password");
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    // Auth check
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.userId !== id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const body = await req.json();
    const user = await User.findByIdAndUpdate(
      id,
      { name: body.name, bio: body.bio, avatar: body.avatar },
      { new: true }
    );

    return NextResponse.json({ message: "Profile updated", user });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
