import Link from "next/link";

export default function Hero() {
  return (
    <div className="hero min-h-screen flex-grow">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">maris_home_16</h1>
          <p className="text-2xl py-6">This is my first next.js project.</p>
          <Link href="/pages/Githubusers" className="btn btn-success text-white">
            Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
