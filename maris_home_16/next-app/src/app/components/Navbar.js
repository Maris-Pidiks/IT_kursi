import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar bg-neutral-content">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="../../assets/Next.js_Symbol_Alternative_0.svg"
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
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/"> Home </Link>
          </li>
          <li>
            <Link href="/pages/Githubusers"> GitHubUsers </Link>
          </li>
          <li>
            <Link href="/pages/Recipes"> Recipes </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end"></div>
    </div>
  );
}
