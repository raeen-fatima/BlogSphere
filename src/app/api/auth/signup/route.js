import  connectDB  from "@/lib/db";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    // Validation
    if (!name || !email || !password) {
      return new Response("All fields required", { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response("User already exists", { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return Response.json(
      { success: true, message: "Signup successful" },
      { status: 201 }
    );
  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    return new Response("Server error", { status: 500 });
  }
}
