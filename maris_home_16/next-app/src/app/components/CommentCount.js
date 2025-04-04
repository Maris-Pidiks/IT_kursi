"use client";

import { useState, useEffect } from "react";

export default function CommentCount({ postId, initialCount = 0 }) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const handleCommentChange = async () => {
      try {
        const res = await fetch(`/api/comments?postId=${postId}`);
        if (res.ok) {
          const comments = await res.json();
          setCount(comments.length);
        }
      } catch (error) {
        console.error("Error updating comment count:", error);
      }
    };

    // Listen for comment changes
    window.addEventListener("commentChanged", handleCommentChange);
    return () => window.removeEventListener("commentChanged", handleCommentChange);
  }, [postId]);

  return <span className="text-gray-600">Comments ({count})</span>;
}
