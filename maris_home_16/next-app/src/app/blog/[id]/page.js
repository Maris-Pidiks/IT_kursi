import Link from "next/link";
import Image from "next/image";

async function getPost(id) {
  try {
    const response = await fetch(`/api/posts/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

console.log("Fetching post with ID:", id); // Debug log

export default async function BlogPost({ params }) {
  const post = await getPost(params.id);

  if (!post) {
    return (
      <div className="container mx-auto p-4 text-center min-h-screen bg-base-200">
        <div className="max-w-md mx-auto card bg-base-100 shadow-xl p-6">
          <h1 className="text-3xl font-bold mb-4">Post not found</h1>
          <Link href="/blog" className="btn btn-success text-white" target="_self">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-screen bg-base-200">
      <div className="max-w-3xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          {post.img && (
            <figure className="relative w-full h-64">
              <Image
                src={post.img}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </figure>
          )}
          <div className="card-body">
            <h1 className="card-title text-3xl">{post.title}</h1>
            <p className="py-4">{post.description}</p>
            <div className="card-actions justify-between items-center">
              <span className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
              <Link href="/blog" className="btn btn-success text-white" target="_self">
                Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
