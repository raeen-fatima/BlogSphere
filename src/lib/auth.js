import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getUserFromCookie() {
  try {
    const cookieStore = await cookies();

    console.log("ALL COOKIES 👉", cookieStore.getAll());

    const token = cookieStore.get("token")?.value;
    console.log("TOKEN 👉", token);

    if (!token) return null;

    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED USER 👉", user);

    return user;
  } catch (error) {
    console.error("COOKIE AUTH ERROR 👉", error);
    return null;
  }
}
