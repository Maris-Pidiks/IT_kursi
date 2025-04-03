import Link from "next/link";
import Image from "next/image";
import Menu from "../config/menus";

export default function Navbar() {
  return (
    <div className="navbar bg-base-300 justify-between px-6">
      <div className="navbar-start">
        <div className="dropdown mr-4">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <Menu className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow" />
        </div>
        <Link href="/">
          <Image src="/assets/next.svg" alt="Logo" width={120} height={200} />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <Menu className="menu menu-horizontal px-1 mr-5" />
      </div>
    </div>
  );
}
