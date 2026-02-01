import { redirect } from "next/navigation";
import { getUserFromCookie } from "@/lib/auth";

export default async function AdminLayout({ children }) {
  const user = await getUserFromCookie();

  if (!user || user.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-10">
        <h1 className="text-2xl text-center font-bold mb-6">Admin Panel</h1>
        {children}
      </div>
    </div>
  );
}
