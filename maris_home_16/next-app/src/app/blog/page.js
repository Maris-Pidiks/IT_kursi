import Link from "next/link";

async function getData() {
  try {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? `https://${process.env.VERCEL_URL}`
        : process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${baseUrl}/api/posts`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export default async function Blog() {
  const posts = await getData();

  return (
    <div className="container w-full max-w-full mx-auto p-4 flex justify-center min-h-screen bg-base-200 px-5 md:px-20">
      <div className="container max-w-3xl mx-auto p-4">
        <h1 className="text-5xl font-bold my-10">Blog Posts</h1>
        <div className="grid gap-4">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">{post.title}</h2>
                  <p>{post.description}</p>
                  {post.img && (
                    <figure>
                      <img src={post.img} alt={post.title} />
                    </figure>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-lg">No posts available</p>
          )}
        </div>
      </div>
    </div>
  );
}
