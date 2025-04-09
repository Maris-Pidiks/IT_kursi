import LikeButton from "./LikeButton";

export default function CommentList({ comments }) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment._id} className="card bg-base-100 shadow-sm">
          <div className="card-body  border-b border-base-300">
            <div className="flex justify-between items-start">
              <h3 className="font-bold">{comment.name}</h3>
              <span className="text-sm text-gray-600">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="mt-2">{comment.comment}</p>
            <div className="card-actions justify-end mt-4">
              <div className="flex items-center gap-4">
                <LikeButton
                  id={comment._id}
                  type="comment"
                  initialLikes={comment.likes || 0}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
