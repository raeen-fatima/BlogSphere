import { connectDB } from "@/lib/db";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response("Email & password required", { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return new Response("Invalid credentials", { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response("Invalid credentials", { status: 401 });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // cookies().set("token", token, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "strict",
    //   maxAge: 60 * 60 * 24 * 7,
    //   path: "/",
    // });

    const cookieStore = await cookies();
    cookieStore.set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });

    return Response.json({
      success: true,
      message: "Login successful",
      role: user.role,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return new Response("Server error", { status: 500 });
  }
}
