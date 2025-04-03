import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongoose";
import Comment from "@/models/Comment";
import mongoose from "mongoose";

export async function POST(request) {
  try {
    await connectToDatabase();

    const body = await request.json();

    // Log the received data for debugging
    console.log("Received comment data:", body);

    // Validate required fields with better error messages
    if (!body.postId) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }
    if (!body.name?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!body.comment?.trim()) {
      return NextResponse.json({ error: "Comment is required" }, { status: 400 });
    }

    // Validate postId format
    if (!mongoose.Types.ObjectId.isValid(body.postId)) {
      return NextResponse.json({ error: "Invalid post ID format" }, { status: 400 });
    }

    const comment = await Comment.create({
      postId: body.postId,
      name: body.name.trim(),
      comment: body.comment.trim(),
      createdAt: new Date(),
    });

    // Log the created comment for debugging
    console.log("Created comment:", comment);

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to create comment",
      },
      { status: 500 }
    );
  }
}
