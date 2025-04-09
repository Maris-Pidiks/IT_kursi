import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Post from "@/lib/models/Post";

export async function POST(request, { params }) {
  try {
    await connectToDatabase();
    const post = await Post.findByIdAndUpdate(
      params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    return NextResponse.json({ likes: post.likes });
  } catch (error) {
    return NextResponse.json({ error: "Failed to like post" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const post = await Post.findByIdAndUpdate(
      params.id,
      { $inc: { likes: -1 } },
      { new: true }
    );
    return NextResponse.json({ likes: post.likes });
  } catch (error) {
    return NextResponse.json({ error: "Failed to unlike post" }, { status: 500 });
  }
}
