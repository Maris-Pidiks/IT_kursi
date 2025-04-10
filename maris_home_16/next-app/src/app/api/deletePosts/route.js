import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Post from "@/lib/models/Post";
import Comment from "@/lib/models/Comment";

export async function DELETE(request) {
  try {
    await connectToDatabase();

    // Parse the request body
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    // Delete all comments associated with the post first
    await Comment.deleteMany({ postId: id });

    // Then delete the post
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      deletedPost: {
        _id: deletedPost._id.toString(),
        title: deletedPost.title,
        deletedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error in DELETE /api/deletePosts:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
