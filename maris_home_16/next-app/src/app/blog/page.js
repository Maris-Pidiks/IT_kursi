import { connectToDatabase, convertToPlainObject } from "@/lib/db";
import Post from "@/lib/models/Post";
import Comment from "@/lib/models/Comment";
import Link from "next/link";
import CommentCount from "@/app/components/CommentCount";
import LikeButton from "@/app/components/LikeButton";
import LoadingState from "@/app/components/LoadingState";

export const revalidate = 0;

async function getPostsWithComments() {
  try {
    await connectToDatabase();

    // Fetch posts with lean() for better performance
    const posts = await Post.find({}).sort({ createdAt: -1 }).lean().exec();

    // Fetch comment counts for all posts
    const commentCounts = await Promise.all(
      posts.map(async (post) => {
        const count = await Comment.countDocuments({ postId: post._id });
        return {
          postId: post._id.toString(),
          count,
        };
      })
    );

    // Convert posts to plain objects and add comment counts
    const postsWithComments = posts.map((post) => ({
      ...post,
      _id: post._id.toString(), // Convert ObjectId to string
      commentCount:
        commentCounts.find((c) => c.postId === post._id.toString())?.count || 0,
    }));

    return postsWithComments;
  } catch (error) {
    console.error("Error fetching posts and comments:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPostsWithComments();

  const truncateText = (text, limit) => {
    if (!text) return "";
    return text.length > limit ? `${text.slice(0, limit)}...` : text;
  };

  return (
    <div className="container w-full max-w-full mx-auto p-4 flex justify-center min-h-screen bg-base-200 px-5 md:px-20">
      <div className="container max-w-3xl mx-auto p-4">
        <div className="flex justify-between items-center my-5">
          <h1 className="text-5xl font-bold">Blog Posts</h1>
        </div>
        <Link href="/add-post" className="btn btn-success btn-sm text-white mt-5 mb-10">
          Add Post
        </Link>
        {!posts || posts.length === 0 ? (
          <div className="text-center py-10">
            <LoadingState />
          </div>
        ) : (
          <div className="grid gap-4">
            {posts.map((post) => (
              <div
                key={post._id.toString()}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-200"
              >
                <div className="card-body">
                  <h2 className="card-title text-2xl">{post.title}</h2>
                  <p>{truncateText(post.description, 150)}</p>
                  <div className="card-actions justify-between mt-4">
                    <div className="flex items-center gap-4">
                      <CommentCount
                        postId={post._id.toString()}
                        initialCount={post.commentCount}
                      />
                      <LikeButton
                        id={post._id}
                        type="post"
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
