import Link from "next/link";

async function getData() {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Blog() {
  const posts = await getData();

  return (
    <div className="container max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
      {
        <div className="grid gap-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-2xl">{post.title}</h2>
                  <p className="my-3">{post.description}</p>
                  <div className="card-actions justify-end">
                    <Link
                      href={`/blog/${post._id}`}
                      className="btn btn-success hover:bg-green-500 transition-colors text-white"
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
      }
    </div>
  );
}
