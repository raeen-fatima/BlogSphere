import mongoose from "mongoose";
import User from "@/models/user";  // <-- Importing User model
const PostSchema = new mongoose.Schema({
  title: String,
      content: String,
      slug: { type: String, unique: true },
      coverImage: String,
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"   // <-- this is why User model is required
      }
    },
    { timestamps: true },
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
