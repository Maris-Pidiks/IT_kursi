import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Post from "@/lib/models/Post";

export async function POST(request) {
  try {
    await connectToDatabase();

    const body = await request.json();

    // Validate required fields
    if (!body.title?.trim() || !body.description?.trim()) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    // Create new post
    const post = await Post.create({
      title: body.title.trim(),
      description: body.description.trim(),
      slug: body.slug,
      img: body.img,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);

    // Check for duplicate slug error
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "A post with this title already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
