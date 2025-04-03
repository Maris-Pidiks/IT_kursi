import Image from "next/image";
import Link from "next/link";
import LoadingState from "@/app/components/LoadingState";

async function getData() {
  try {
    const response = await fetch("http://localhost:3000/api/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched posts:", data); // Debug log
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getData();
  console.log("Posts in component:", posts);

  const truncateText = (text, limit) => {
    if (text.length <= limit) return text;
    return text.slice(0, limit) + "...";
  };

  return (
    <div className="container w-full max-w-full mx-auto p-4 flex justify-center min-h-screen bg-base-200 px-5 md:px-20">
      <div className="container max-w-3xl mx-auto p-4">
        <h1 className="text-5xl font-bold my-10">Blog Posts</h1>
        {posts.length === 0 ? (
          <LoadingState />
        ) : (
          <div className="grid gap-4">
            {posts.map((post) => (
              <div
                key={post._id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-200"
              >
                <div className="card-body">
                  <h2 className="card-title">{truncateText(post.title, 30)}</h2>
                  <p>{truncateText(post.description, 150)}</p>
                  <div className="card-actions justify-end mt-4">
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
