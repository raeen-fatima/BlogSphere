import mongoose from "mongoose";

// force delete old cached model
delete mongoose.models.User;

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" }
});

export default mongoose.model("User", UserSchema);
