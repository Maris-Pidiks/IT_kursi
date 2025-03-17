import Image from "next/image";

export default async function SingleBlog({ params }) {
  const posts = await fetch("http://localhost:3000/api/posts");

  const { id } = params;
  const currentBlogPost = posts.find((post) => post._id === id);

  if (!currentBlogPost) {
    return (
      <div>
        <h1>Post not found</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>{currentBlogPost.title}</h1>

      <p>{currentBlogPost.description}</p>

      {currentBlogPost.img && (
        <div>
          <Image
            src={currentBlogPost.img}
            alt={currentBlogPost.title}
            width={500}
            height={300}
          />
        </div>
      )}
    </div>
  );
}
