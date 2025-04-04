import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongoose";
import Comment from "@/app/utils src/models/Comment";

export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    const comments = await Comment.find({ postId }).sort({ createdAt: -1 }).lean();

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();

    const body = await request.json();

    // Validate required fields
    if (!body.postId || !body.name?.trim() || !body.comment?.trim()) {
      return NextResponse.json(
        { error: "Name, comment and postId are required" },
        { status: 400 }
      );
    }

    const comment = await Comment.create({
      postId: body.postId,
      name: body.name.trim(),
      comment: body.comment.trim(),
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
  }
}
