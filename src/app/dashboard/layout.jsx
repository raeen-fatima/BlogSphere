// import { redirect } from "next/navigation";
// import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";

// export default function DashboardLayout({ children }) {
//   const token = cookies().get("token")?.value;

//   if (!token) redirect("/login");

//   try {
//     jwt.verify(token, process.env.JWT_SECRET);
//   } catch {
//     redirect("/login");
//   }

//   return <>{children}</>;
// }
import React from 'react'

function layout() {
  return (
    <div>
      <h1>hello</h1>
    </div>
  )
}

export default layout
