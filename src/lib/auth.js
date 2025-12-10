// import jwt from "jsonwebtoken";

// export function generateToken(user) {
//   return jwt.sign(
//     { id: user._id, email: user.email },
//     process.env.JWT_SECRET,
//     { expiresIn: "7d" }
//   );
// }
import jwt from "jsonwebtoken";

export function verifyToken(token) {
  try {
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    console.error("JWT ERROR:", err);
    return null;
  }
}
