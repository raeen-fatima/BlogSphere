// import { redirect } from "next/navigation";
// import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";

// export default function AdminLayout({ children }) {
//   const token = cookies().get("token")?.value;

//   if (!token) redirect("/login");

//   const decoded = jwt.verify(token, process.env.JWT_SECRET);

//   if (decoded.role !== "admin") {
//     redirect("/dashboard");
//   }

//   return <>{children}</>;
// }
