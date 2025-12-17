export const runtime = "nodejs";

import { NextResponse } from "next/server";
import cloudinary from "@/lib/Cloudinary";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { getUserFromCookie } from "@/lib/auth";

export async function POST(req) {
  try {
    await connectDB();

    const user = await getUserFromCookie(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("avatar");

    if (!file) {
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadRes = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "blog-avatars" },
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      ).end(buffer);
    });

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { avatar: uploadRes.secure_url },
      { new: true }
    ).select("-password");

    return NextResponse.json(updatedUser);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Avatar upload failed" },
      { status: 500 }
    );
  }
}
