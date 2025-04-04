"use client";

import { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import FormattedDate from "./FormattedDate";

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: "", comment: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Add loading state for initial fetch
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      if (!postId) return;

      setIsFetching(true);
      try {
        const res = await fetch(`/api/comments?postId=${postId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch comments");
        }

        const data = await res.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError("Failed to load comments");
      } finally {
        setIsFetching(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!postId) {
      setError("Invalid post ID");
      setIsLoading(false);
      return;
    }

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

      // Update comments list with new comment
      setComments((prevComments) => [data, ...prevComments]);

      // Reset form
      setNewComment({ name: "", comment: "" });

      // Dispatch event for comment count update
      window.dispatchEvent(new Event("commentAdded"));
    } catch (error) {
      setError(error.message);
      console.error("Error posting comment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (commentId) => {
    if (!confirm("Are you sure you want to delete this comment?")) {
      return;
    }

    try {
      const res = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      // First try to parse the response as JSON
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "Failed to delete comment");
      }

      // Update local state
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );

      // Notify other components
      window.dispatchEvent(new Event("commentChanged"));
    } catch (error) {
      console.error("Error deleting comment:", error);
      setError(error.message || "Failed to delete comment");
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

      {isFetching ? (
        <div className="flex justify-center py-4">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      ) : error ? (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      ) : comments.length === 0 ? (
        <p className="text-gray-600 text-center">
          No comments yet. Be the first to comment!
        </p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment._id} className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{comment.name}</p>
                  <FormattedDate date={comment.createdAt} />
                  <p className="mt-2">{comment.comment}</p>
                </div>
                <button
                  onClick={() => handleDelete(comment._id)}
                  className="text-gray-500 hover:text-red-500 transition-colors p-1"
                  title="Delete comment"
                >
                  <TrashIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
