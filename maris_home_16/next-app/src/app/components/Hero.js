import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="w-screen h-screen p-o m-0 bg-slate-400">
      <div className="hero flex-1 w-screen h-screen bg-[url('/assets/NextJS-Web.jpg')] bg-cover bg-center bg-no-repeat p-0">
        <div className="hero-content text-center bg-slate-700 bg-opacity-90 rounded-lg p-10">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold text-white">Next JS Projects</h1>
            <p className="text-xl py-6 text-white">From JS to next app.</p>
            <Link href="./blog" className="btn btn-success text-white ml-4 p-5 text-xl">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
