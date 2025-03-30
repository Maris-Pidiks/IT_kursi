import Image from "next/image";
import Link from "next/link";

async function getData() {
  try {
    const baseUrl =
      process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_API_URL : "";

    console.log("Fetching from:", `${baseUrl}/api/posts`); // Debug log

    const response = await fetch(`${baseUrl}/api/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Replace revalidate with no-store
    });

    const data = await response.json();
    console.log("Response data:", data); // Debug log

    if (!response.ok) {
      console.error("Response not OK:", response.status);
      return [];
    }

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getData();
  return (
    <div className="container w-full max-w-full mx-auto p-4 flex justify-center min-h-screen bg-base-200 px-5 md:px-20">
      <div className="container max-w-3xl mx-auto p-4">
        <h1 className="text-5xl font-bold my-10">Blog Posts</h1>
        <div className="grid gap-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Link
                href={`/blog/${post._id}`}
                key={post._id}
                target="_blank"
                rel="noopener noreferrer"
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-200"
              >
                <div className="card-body">
                  <h2 className="card-title">{post.title}</h2>
                  <p>{post.description}</p>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center">
              <p className="text-lg mb-4">No posts available</p>
              <Link href="/pages/add-post" className="btn btn-success text-white">
                Add Your First Post
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
