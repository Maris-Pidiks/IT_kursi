"use client";

import { useState, useEffect } from "react";

export default function CommentCount({ postId, initialCount = 0 }) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch(`/api/comments?postId=${postId}`);
        if (res.ok) {
          const comments = await res.json();
          setCount(Array.isArray(comments) ? comments.length : 0);
        }
      } catch (error) {
        console.error("Error fetching comment count:", error);
      }
    };

    fetchCount();

    const handleCommentChange = () => fetchCount();
    window.addEventListener("commentChanged", handleCommentChange);
    return () => window.removeEventListener("commentChanged", handleCommentChange);
  }, [postId]);

  return <span className="text-gray-600 text-sm">Comments ({count})</span>;
}
