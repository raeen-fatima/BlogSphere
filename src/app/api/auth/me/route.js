import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import User from "../../../../models/User";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    await connectDB();

     const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return new Response("Unauthorized", { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    return Response.json(user);
  } catch {
    return new Response("Unauthorized", { status: 401 });
  }
}
