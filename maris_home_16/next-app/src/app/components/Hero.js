import Link from "next/link";

export default function Hero() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">maris_home_16</h1>
          <p className="text-2xl py-6">This is my first two next.js projects.</p>
          <Link href="/pages/Recipes" className="btn btn-success text-white">
            Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
