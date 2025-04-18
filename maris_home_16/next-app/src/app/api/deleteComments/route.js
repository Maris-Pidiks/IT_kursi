import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/db";
import Comment from "@/lib/models/Comment";
import mongoose from "mongoose";

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;

    const deletedComment = await Comment.findByIdAndDelete(id);

    if (!deletedComment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
  }
}
