import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getPost(slug) {
  try {
    const response = await fetch(`http://localhost:3000/api/posts/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) {
        return notFound();
      }
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
}

export default async function PostPage({ params }) {
  const post = await getPost(params.id);
  const defaultImage = "https://via.placeholder.com/800x400";

  return (
    <div className="container w-full max-w-full mx-auto p-4 flex justify-center min-h-screen bg-base-200 px-5 md:px-20">
      <div className="container max-w-3xl mx-auto p-4">
        <article className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-6">
            <p className="text-gray-600 mb-4">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            {post.img && post.img !== defaultImage && (
              <div className="relative w-full h-64 my-8">
                <Image
                  src={post.img}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
            )}

            <div className="prose max-w-none mb-6">
              <p>{post.description}</p>
            </div>

            <div className="flex justify-end items-center mt-8">
              <Link
                href="/blog"
                className="flex flex-row justify-end btn btn-success text-white"
              >
                ← Back to Blog
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
