import Image from "next/image";
import Link from "next/link";

async function getData(id) {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const posts = await res.json();
  return posts.find((post) => post._id === id);
}

export default async function SingleBlog({ params }) {
  const currentBlogPost = await getData(params.id);

  if (!currentBlogPost) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-red-500">Post not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{currentBlogPost.title}</h1>
      <p className="mb-4 text-gray-700">{currentBlogPost.description}</p>

      {currentBlogPost.img && (
        <div className="rounded-lg overflow-hidden shadow-lg">
          <Image
            src={currentBlogPost.img}
            alt={currentBlogPost.title}
            width={500}
            height={300}
            className="object-cover w-full"
          />
        </div>
      )}
      <Link
        href="/blog"
        className="btn btn-success mt-10 hover:bg-green-500 transition-colors text-white"
      >
        Back to Blog page
      </Link>
    </div>
  );
}
