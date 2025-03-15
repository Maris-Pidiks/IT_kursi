// filepath: /Users/webdev/Desktop/GitRepos/IT_kursi/maris_home_16/next-app/src/app/api/posts/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/mongoose";
import Post from "@/models/Post";

export async function GET() {
  try {
    await connectToDatabase();
    const posts = await Post.find();
    return NextResponse.json(posts);
  } catch (error) {
    console.log("__error", error);
  }
}

export async function POST(request) {
  await connectToDatabase();

  const { title, description, img } = await request.json();
  const newPost = newPost({ title, description, img });

  await newPost.save();

  return NextResponse.json(newPost);
}
