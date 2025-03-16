import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongoose";
import Post from "@/models/Post";

export async function GET() {
  try {
    await connectToDatabase();
    const posts = await Post.find({});
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();

    const { title, description, img } = await request.json();
    const newPost = new Post({ title, description, img });

    await newPost.save();

    return NextResponse.json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Error creating post" }, { status: 500 });
  }
}
