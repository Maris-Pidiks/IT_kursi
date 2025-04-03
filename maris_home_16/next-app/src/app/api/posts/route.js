import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongoose";
import Post from "@/models/Post";

export async function POST(request) {
  try {
    await connectToDatabase();

    const body = await request.json();

    if (!body.title || !body.description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const post = await Post.create(body);

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create post" },
      { status: 500 }
    );
  }
}
