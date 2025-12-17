import { getUserFromCookie } from "@/lib/auth";
import DashboardContent from "@/components/DashboardContent";

export default async function DashboardPage() {
  const user = await getUserFromCookie();

  if (!user) return <p className="text-center mt-20">Please login</p>;

  const userId = user.userId; // jwt me userId jo hai

  return <DashboardContent userId={userId} />;
}
