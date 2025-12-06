import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();
  const { name, email, password } = await req.json();

  const hashedPass = await bcrypt.hash(password, 10);

  await User.create({ name, email, password: hashedPass });

  return Response.json({ success: true, message: "User Created" });
}
