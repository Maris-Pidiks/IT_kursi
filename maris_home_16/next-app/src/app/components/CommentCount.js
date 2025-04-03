"use client";

import { useState, useEffect } from "react";

export default function CommentCount({ postId, initialCount = 0 }) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    // Subscribe to comment count updates
    const fetchCommentCount = async () => {
      const res = await fetch(`/api/comments?postId=${postId}`);
      if (res.ok) {
        const comments = await res.json();
        setCount(comments.length);
      }
    };

    fetchCommentCount();

    // Setup event listener for comment updates
    window.addEventListener("commentAdded", fetchCommentCount);
    return () => window.removeEventListener("commentAdded", fetchCommentCount);
  }, [postId]);

  return <span className="text-gray-600">Comments ({count})</span>;
}
