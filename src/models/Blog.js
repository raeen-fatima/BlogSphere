import mongoose from "mongoose";
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Cover Image
    image: {
      type: String,
    },

    imagePublicId: {
      type: String, 
      default: "",
    } ,

    //for likes

    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    // comments: [commentSchema],

  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
