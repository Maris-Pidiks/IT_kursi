import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Comment from "@/lib/models/Comment";
import Post from "@/lib/models/Post";

export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    // Create new comment
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

export async function GET(request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    const comments = await Comment.find({ postId }).sort({ createdAt: -1 }).lean();

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}
