import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="hero min-h-fit flex-grow">
      <Image
        src="/assets/NextJS-Web.jpg"
        alt="Logo"
        width={1920}
        height={1080}
        className="mx-auto my-24"
      />
      <div className="hero-content text-center bg-slate-700 bg-opacity-90 rounded-lg p-8">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-white">Next JS Projects</h1>
          <p className="text-2xl py-6 text-white">This is my first next app.</p>
          <Link href="./blog" className="btn btn-success text-white ml-4 p-5 text-xl">
            Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
