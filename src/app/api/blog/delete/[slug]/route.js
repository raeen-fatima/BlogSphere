import { connectDB } from "@/lib/db";
import Blog from "@/models/post";
import { verifyToken } from "@/lib/auth";

export async function DELETE(req, { params }) {
  await connectDB();
  const user = verifyToken(req);

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

await Blog.findOneAndDelete({ slug });

  return Response.json({ success: true });
}
