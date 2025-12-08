import { cookies } from "next/headers";

export async function GET() {
  cookies().set("token", "", { expires: new Date(0), path: "/" });
  return Response.json({ success: true, message: "Logged out" });
}
