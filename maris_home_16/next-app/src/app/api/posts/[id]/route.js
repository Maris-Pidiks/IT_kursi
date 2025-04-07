import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/db";
import Post from "@/lib/models/Post";

import mongoose from "mongoose";

export async function GET(request, { params }) {
  try {
    await connectToDatabase();

    const { id } = params;
    let post;

    // Try finding by slug first
    post = await Post.findOne({ slug: id }).lean();

    // If not found by slug, try finding by ID (if it's a valid ObjectId)
    if (!post && mongoose.Types.ObjectId.isValid(id)) {
      post = await Post.findById(id).lean();
    }

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Convert _id to string and clean up the response
    post.id = post._id.toString();
    delete post._id;
    delete post.__v;

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}
