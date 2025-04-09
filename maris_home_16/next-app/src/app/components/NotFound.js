"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container w-full max-w-full mx-auto p-4 flex justify-center min-h-screen bg-base-200 px-5 md:px-20">
      <div className="container max-w-3xl mx-auto p-4 text-center">
        <div className="card bg-base-100 shadow-xl p-8">
          <h2 className="text-4xl font-bold mb-4">Post Not Found</h2>
          <p className="text-gray-600 mb-8">
            Sorry, we could not find the post you are looking for.
          </p>
          <Link href="/blog" className="btn btn-success btn-sm text-white">
            ← Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
