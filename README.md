# 🔐 Auth System (Role-Based) – Next.js App Router

This project implements a **production-grade authentication system** using **Next.js App Router**, **MongoDB**, **JWT**, and **role-based access control (RBAC)**. It is designed as a strong foundation for scalable apps like **Blog Platforms, Admin Panels, SaaS products**, etc.

---

## 🚀 Features

* User Signup & Login
* JWT-based Authentication (stored in HTTP-only cookies)
* Secure Logout
* `me` API for session validation
* Role-Based Access Control (User / Admin)
* Admin-protected APIs & pages
* Middleware-based route protection
* MongoDB + Mongoose integration

---

## 🧱 Tech Stack

* **Frontend**: Next.js (App Router)
* **Backend**: Next.js API Routes
* **Database**: MongoDB
* **ORM**: Mongoose
* **Auth**: JWT (JSON Web Tokens)
* **Security**: HTTP-only Cookies, Middleware Guards

---

## 📁 Project Structure

```
app/
 ├─ api/
 │   └─ auth/
 │       ├─ login/route.js
 │       ├─ signup/route.js
 │       ├─ logout/route.js
 │       ├─ me/route.js
 │       └─ admin/route.js
 ├─ admin/page.jsx
 ├─ login/page.jsx
 ├─ signup/page.jsx

lib/
 ├─ db.js
 └─ auth.js

models/
 └─ User.js

middleware.js
```

---

## 👤 User Model

```js
role: {
  type: String,
  enum: ["user", "admin"],
  default: "user",
}
```

---

## 🔑 Authentication Flow

1. User logs in / signs up
2. Server generates JWT
3. JWT stored in HTTP-only cookie
4. Middleware validates token
5. Role-based access applied

---

## 🛡️ Protected Routes

| Route             | Access          |
| ----------------- | --------------- |
| `/api/auth/me`    | Logged-in users |
| `/api/auth/admin` | Admin only      |
| `/admin`          | Admin only      |

---

## 🧪 API Status Codes

| Code | Meaning             |
| ---- | ------------------- |
| 200  | Success             |
| 401  | Unauthorized        |
| 403  | Forbidden           |
| 409  | User already exists |
| 500  | Server error        |

---

## 🔐 Middleware Protection

* Prevents unauthorized access
* Redirects users based on role
* Blocks non-admin users from `/admin`

---

## 🛠️ Environment Variables

Create a `.env.local` file:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## ✅ Current Status

* Auth system fully functional
* Admin access validated
* Ready to integrate Blog CRUD / Dashboard

---

## ⏭️ Next Steps

* Blog CRUD system
* Admin Dashboard
* Comment & Like system
* Deployment

---

## 👨‍💻 Author

**Raeen (Fatima)**
BCA Student | Full Stack Developer | MERN | Cyber Security

---
