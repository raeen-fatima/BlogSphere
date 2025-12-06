import mongoose from "mongoose";

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connected");
  } catch (err) {
    console.error("DB Error:", err.message);
  }
}
