"use client";

import { useRouter } from "next/navigation";
import LikeButton from "./LikeButton";

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("lv-LV", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export default function CommentList({ comments }) {
  const router = useRouter();

  const handleDelete = async (commentId, postId) => {
    try {
      const response = await fetch("/api/comments", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentId, postId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }

      router.refresh();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment._id} className="card bg-base-100 shadow-sm">
          <div className="card-body border-b border-base-300">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <h3 className="font-bold">{comment.name}</h3>
              </div>
            </div>
            <p className="mt-2">{comment.comment}</p>
            <div className="card-actions justify-start mt-4">
              <span className="text-sm text-gray-600 mr-3">
                {formatDate(comment.createdAt)}
              </span>
              <LikeButton
                id={comment._id}
                type="comment"
                initialLikes={comment.likes || 0}
              />
              <button
                onClick={() => handleDelete(comment._id, comment.postId)}
                className="text-error hover:text-error-focus transition-colors ml-3"
                aria-label="Delete comment"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
