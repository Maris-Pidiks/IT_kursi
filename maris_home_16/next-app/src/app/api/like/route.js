import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Comment from "@/lib/models/Comment";
import Post from "@/lib/models/Post";

export async function POST(request) {
  try {
    await connectToDatabase();
    const { id, type, action } = await request.json();

    const updateValue = action === "like" ? 1 : -1;
    let result;

    if (type === "post") {
      result = await Post.findByIdAndUpdate(
        id,
        { $inc: { likes: updateValue } },
        { new: true }
      ).lean();
    } else if (type === "comment") {
      result = await Comment.findByIdAndUpdate(
        id,
        { $inc: { likes: updateValue } },
        { new: true }
      ).lean();
    }

    if (!result) {
      return NextResponse.json({ error: `${type} not found` }, { status: 404 });
    }

    return NextResponse.json({ likes: result.likes });
  } catch (error) {
    console.error(`Error updating ${type} likes:`, error);
    return NextResponse.json({ error: "Failed to update likes" }, { status: 500 });
  }
}
