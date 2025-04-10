import { connectToDatabase } from "@/lib/db";
import Post from "@/lib/models/Post";
import Comment from "@/lib/models/Comment";
import Link from "next/link";
import CommentCount from "@/app/components/CommentCount";
import LikeButton from "@/app/components/LikeButton";
import LoadingState from "@/app/components/LoadingState";
import AddComment from "@/app/components/AddComment";
import CommentList from "@/app/components/CommentList";
import DeleteButton from "@/app/components/DeleteButton";

async function getPostWithComments(slug) {
  try {
    await connectToDatabase();
    const post = await Post.findOne({ slug }).lean();

    if (!post) {
      return null;
    }

    const comments = await Comment.find({ postId: post._id })
      .sort({ createdAt: -1 })
      .lean();

    const commentCount = comments.length;

    return {
      ...post,
      _id: post._id.toString(),
      commentCount,
      comments: comments.map((comment) => ({
        ...comment,
        _id: comment._id.toString(),
        postId: comment.postId.toString(),
      })),
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export default async function PostPage({ params }) {
  const post = await getPostWithComments(params.slug);

  if (!post) {
    return (
      <div className="container w-full max-w-full mx-auto p-4 flex justify-center min-h-screen bg-base-200 px-5 md:px-20">
        <div className="container max-w-3xl mx-auto p-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="mb-4">The post you are looking for does not exist.</p>
          <Link href="/blog" className="btn btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container w-full max-w-full mx-auto p-4 flex justify-center min-h-screen bg-base-200 px-5 md:px-20">
      <div className="container max-w-3xl mx-auto p-4">
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-200">
          <div className="card-body">
            <div className="flex justify-between items-start">
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            </div>
            <div className="prose max-w-none mb-6">
              <p>{post.description}</p>
            </div>
            <div className="card-actions justify-between items-center mt-4">
              <div className="flex items-center gap-4">
                <CommentCount postId={post._id} initialCount={post.commentCount} />
                <LikeButton id={post._id} type="post" initialLikes={post.likes || 0} />
                <DeleteButton id={post._id} type="post" />
              </div>
              <Link href="/blog" className="btn btn-success btn-sm text-white">
                ← Back to Blog
              </Link>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-200 mt-8">
          <div className="card-body">
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            <AddComment postId={post._id} />
            <div className="mt-6">
              <CommentList comments={post.comments} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
