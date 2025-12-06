import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) return Response.json({ error: "User not found" }, { status: 404 });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return Response.json({ error: "Invalid password" }, { status: 400 });

  return Response.json({ success: true, message: "Login Successful" });
}
