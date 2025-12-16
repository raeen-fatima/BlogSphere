import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getUserFromCookie() {
  try {
    const cookieStore = await cookies();


    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const user = jwt.verify(token, process.env.JWT_SECRET);

    return user;
  } catch (error) {
    return null;
  }
}
