import mongoose from "mongoose";

const PostScheme = new mongoose.Schema(
  {
    title: { String, required: true },
    description: { String, required: true },
    img: { String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model.Post || mongoose.model("Post", PostScheme);
