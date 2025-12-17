import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function getUserFromCookie() {
  try {
    await connectDB();

    // ✅ cookies() IS ASYNC IN NEXT 15+
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);
    return user;
  } catch (error) {
    
    return null;
  }
}

// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";

// export async function getUserFromCookie() {
//   try {
//     const cookieStore = await cookies();


//     const token = cookieStore.get("token")?.value;

//     if (!token) return null;

    

//     const user = jwt.verify(token, process.env.JWT_SECRET);

//     return user;
//   } catch (error) {
//     return null;
//   }
// }

