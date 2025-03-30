import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongoose";
import Post from "@/models/Post";

export async function GET(request) {
  try {
    await connectToDatabase();
    const posts = await Post.find({}).sort({ createdAt: -1 });

    if (!posts) {
      return NextResponse.json({ error: "No posts found" }, { status: 404 });
    }

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
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

    const newPost = new Post({
      title: body.title,
      description: body.description,
      img: body.img || "",
    });

    await newPost.save();

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Error creating post" }, { status: 500 });
  }
}
