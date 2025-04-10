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
    await Post.findByIdAndUpdate(body.postId, {
      $set: { commentCount },
    });

    return NextResponse.json(
      {
        ...comment.toObject(),
        _id: comment._id.toString(),
        postId: comment.postId.toString(),
        createdAt: comment.createdAt.toISOString(),
        updatedAt: comment.updatedAt.toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connectToDatabase();
    const { commentId, postId } = await request.json();

    // Delete the comment
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    // Update post's comment count atomically
    await Post.findByIdAndUpdate(postId, {
      $inc: { commentCount: -1 },
    });

    return NextResponse.json({
      success: true,
      deletedComment: {
        _id: deletedComment._id.toString(),
        postId: deletedComment.postId.toString(),
      },
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
  }
}
