"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPost() {
  const router = useRouter();
  const [formdata, setFormData] = useState({
    title: "",
    description: "",
    img: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onChangeHandler = (e) =>
    setFormData({ ...formdata, [e.target.name]: e.target.value });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create post");
      }

      // Reset form
      setFormData({
        title: "",
        description: "",
        img: "",
      });

      // Show success message
      setSuccess("Post successfully added!");

      // Navigate to blog page after delay
      setTimeout(() => {
        router.push("/blog");
        router.refresh();
      }, 2000);
    } catch (error) {
      console.error("Error creating post:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container w-full max-w-full mx-auto p-4 flex justify-center min-h-screen bg-base-200 px-5 md:px-20">
      <div className="container max-w-3xl mx-auto p-4">
        <h1 className="text-5xl font-bold my-10">Add Post</h1>

        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="alert alert-success mb-4">
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={onSubmitHandler} className="bg-white p-6 rounded-lg shadow-xl">
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Post Title</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Post title"
              className="input input-bordered w-full"
              onChange={onChangeHandler}
              value={formdata.title}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              placeholder="Description"
              className="textarea textarea-bordered w-full h-32"
              onChange={onChangeHandler}
              value={formdata.description}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Image URL</span>
            </label>
            <input
              type="url"
              name="img"
              placeholder="https://example.com/image.jpg"
              className="input input-bordered w-full"
              onChange={onChangeHandler}
              value={formdata.img}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-control">
            <button
              type="submit"
              className="btn mt-3 btn-success text-white hover:bg-green-500 transition-colors min-w-40"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Adding...
                </>
              ) : (
                "Add Post"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
