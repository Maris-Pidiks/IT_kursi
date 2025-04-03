"use client";

import { useState, useEffect } from "react";

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [newComment, setNewComment] = useState({ name: "", comment: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments?postId=${postId}`);
      if (!res.ok) throw new Error("Failed to fetch comments");
      const data = await res.json();
      setComments(data);
      setCommentCount(data.length);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          name: newComment.name.trim(),
          comment: newComment.comment.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to post comment");
      }

      // Update comments and count
      setComments((prevComments) => [data, ...prevComments]);
      setCommentCount((prevCount) => prevCount + 1);

      // Reset form
      setNewComment({ name: "", comment: "" });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow-xl p-6">
      <h2 className="text-2xl font-bold mb-6">Comments</h2>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text mb-2">Name</span>
          </label>
          <input
            type="text"
            value={newComment.name}
            onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
            className="input input-bordered w-full"
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text mb-2">Comment</span>
          </label>
          <textarea
            value={newComment.comment}
            onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
            className="textarea textarea-bordered h-24 w-full"
            required
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className={`btn btn-success text-white ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            Post Comment
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment._id} className="border-b pb-4">
            <p className="font-semibold">{comment.name}</p>
            <p className="text-gray-500 text-sm">
              {new Date(comment.createdAt).toLocaleDateString()}
            </p>
            <p className="mt-2">{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
