import Link from "next/link";

export default function NotFoundComponent() {
  return (
    <div className="container w-full max-w-full mx-auto p-4 flex justify-center min-h-screen bg-base-200 px-5 md:px-20">
      <div className="container max-w-3xl mx-auto p-4 text-center">
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-200">
          <div className="card-body">
            <h2 className="text-5xl font-bold mb-4">404</h2>
            <p className="text-2xl mb-8">Page Not Found</p>
            <p className="text-gray-600 mb-8">
              The page you are looking for does not exist or has been moved.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/" className="btn btn-success btn-sm text-white">
                Go Home
              </Link>
              <Link href="/blog" className="btn btn-success btn-sm text-white">
                Visit Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
