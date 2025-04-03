import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongoose";
import Post from "@/models/Post";

export async function GET() {
  try {
    await connectToDatabase();

    const posts = await Post.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

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

    // Create post with timestamps
    const post = await Post.create({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Convert _id to string and remove __v
    const sanitizedPost = {
      ...post.toObject(),
      id: post._id.toString(),
      _id: undefined,
      __v: undefined,
    };

    return NextResponse.json(sanitizedPost, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create post" },
      { status: 500 }
    );
  }
}
