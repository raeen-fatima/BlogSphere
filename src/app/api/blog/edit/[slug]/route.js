import { connectDB } from "@/lib/db";
import Blog from "@/models/post";
import { verifyToken } from "@/lib/auth";

export async function PUT(req, { params }) {
  await connectDB();
  const user = verifyToken(req);

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, content, coverImage } = await req.json();

const blog = await Blog.findOneAndUpdate({ slug }, updateData, { new: true });
    params.id,
    {
      title,
      content,
      coverImage,
      slug: title.toLowerCase().replace(/ /g, "-"),
    },
    { new: true }
  );

  return Response.json(updated);
}
