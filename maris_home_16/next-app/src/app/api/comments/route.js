import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Comment from "@/lib/models/Comment";
import Post from "@/lib/models/Post";

export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    // Create comment
    const comment = await Comment.create(body);

    // Update post's comment count
    const commentCount = await Comment.countDocuments({ postId: body.postId });
    await Post.findByIdAndUpdate(body.postId, { commentCount });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
  }
}
