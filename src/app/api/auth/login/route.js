import { connectDB } from "@/lib/db";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return Response.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return Response.json(
        { error: "Incorrect password" },
        { status: 401 }
      );
    }

     const token = jwt.sign(
      {
        id: user._id,
        name: user.name,   // ⭐ Now included
        email: user.email,
        role: user.role    // ⭐ Already included
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return Response.json(
      { success: true, token,
         user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
       },
      { status: 200 }
    );

  } catch (err) {
    console.error("LOGIN API ERROR:", err);
    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
