import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    // Mock data - replace with your database query
    const post = {
      _id: id,
      title: "Sample Blog Post",
      description:
        "This is a detailed blog post description. Replace this with actual content from your database.",
      img: "https://via.placeholder.com/800x400",
      createdAt: new Date().toISOString(),
    };

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}
