"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddComment({ postId }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          name,
          comment,
        }),
      });

      if (!response.ok) throw new Error("Failed to add comment");

      setName("");
      setComment("");
      router.refresh(); // This will trigger a refresh of the page data
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        className="input input-bordered w-full"
        required
      />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment..."
        className="textarea textarea-bordered w-full h-24"
        required
      />
      <button type="submit" className="btn btn-success btn-sm text-white">
        Add Comment
      </button>
    </form>
  );
}
