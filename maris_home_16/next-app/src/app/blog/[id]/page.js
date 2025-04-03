import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Comments from "@/app/components/Comments";
import FormattedDate from "@/app/components/FormattedDate";

const defaultImage = "https://via.placeholder.com/800x400";

async function getPost(slug) {
  try {
    // First get the post
    const postResponse = await fetch(`http://localhost:3000/api/posts/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!postResponse.ok) {
      if (postResponse.status === 404) {
        return notFound();
      }
      throw new Error(`Failed to fetch post: ${postResponse.statusText}`);
    }

    const post = await postResponse.json();

    // Then get comments count
    const commentsResponse = await fetch(
      `http://localhost:3000/api/comments?postId=${post.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    let commentCount = 0;
    if (commentsResponse.ok) {
      const comments = await commentsResponse.json();
      commentCount = Array.isArray(comments) ? comments.length : 0;
    }

    return {
      ...post,
      commentCount,
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
}

export default async function PostPage({ params }) {
  const post = await getPost(params.id);

  if (!post) {
    return notFound();
  }

  return (
    <div className="container w-full max-w-full mx-auto p-4 flex justify-center min-h-screen bg-base-200 px-5 md:px-20">
      <div className="container max-w-3xl mx-auto p-4">
        <article className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <FormattedDate date={post.createdAt} />
              <span className="text-gray-600">Comments ({post.commentCount || 0})</span>
            </div>

            <h1 className="text-4xl font-bold mb-4 break-words">{post.title}</h1>

            {post.img && post.img !== defaultImage && (
              <div className="relative w-full h-64 my-8">
                <Image
                  src={post.img}
                  alt={post.title}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
            )}

            <div className="prose max-w-none mb-6">
              <p className="whitespace-pre-wrap">{post.description}</p>
            </div>

            <div className="flex justify-end items-center mt-8">
              <Link
                href="/blog"
                className="btn btn-success text-white hover:bg-success-dark transition-colors"
              >
                ← Back to Blog
              </Link>
            </div>
          </div>
        </article>

        <Comments postId={post.id} />
      </div>
    </div>
  );
}
