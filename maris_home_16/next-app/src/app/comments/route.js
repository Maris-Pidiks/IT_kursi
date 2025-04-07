import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongoose";
import Comment from "../../lib/models/Comment";

export async function GET(request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    const comments = await Comment.find({ postId }).sort({ createdAt: -1 }).lean();

    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const comment = await Comment.create(body);
    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
  }
}
