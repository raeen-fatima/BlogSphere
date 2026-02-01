import connectDB from "@/lib/db";
import Blog from "@/models/Blog";
import User from "@/models/User";
import AdminDashboard from "@/components/AdminDashboard";

export default async function AdminPage() {
  await connectDB();

  const totalBlogs = await Blog.countDocuments();
  const pendingBlogs = await Blog.countDocuments({ status: "pending" });
  const totalUsers = await User.countDocuments();

  return (
    <AdminDashboard
      stats={{ totalBlogs, pendingBlogs, totalUsers }}
    />
    
  );
}
