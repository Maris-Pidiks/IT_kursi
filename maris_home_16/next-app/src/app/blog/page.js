import { connectToDatabase, convertToPlainObject } from "@/lib/db";
import Post from "@/lib/models/Post";
import Link from "next/link";
import LoadingState from "@/app/components/LoadingState";
import CommentCount from "@/app/components/CommentCount";
import LikeButton from "@/app/components/LikeButton";

async function getPosts() {
  try {
    await connectToDatabase();
    const posts = await Post.find({}).sort({ createdAt: -1 }).lean().exec();
    const plainPosts = convertToPlainObject(posts);
    console.log("Fetched posts:", plainPosts); // Debug log
    return plainPosts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  const truncateText = (text, limit) => {
    if (!text) return "";
    return text.length > limit ? `${text.slice(0, limit)}...` : text;
  };

  return (
    <div className="container w-full max-w-full mx-auto p-4 flex justify-center min-h-screen bg-base-200 px-5 md:px-20">
      <div className="container max-w-3xl mx-auto p-4">
        <h1 className="text-5xl font-bold my-10">Blog Posts</h1>
        {!posts || posts.length === 0 ? (
          <div className="text-center py-10">
            <LoadingState />
          </div>
        ) : (
          <div className="grid gap-4">
            {posts.map((post) => (
              <div
                key={post._id?.toString() || post.id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-200"
              >
                <div className="card-body">
                  <h2 className="card-title text-2xl">{post.title}</h2>
                  <p>{truncateText(post.description, 150)}</p>
                  <div className="card-actions justify-between mt-4">
                    <div className="flex items-center gap-4">
                      <CommentCount
                        postId={post._id?.toString() || post.id}
                        initialCount={0}
                      />
                      <LikeButton
                        postId={post._id?.toString() || post.id}
                        initialLikes={post.likes || 0}
                      />
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="btn btn-success btn-sm text-white"
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
