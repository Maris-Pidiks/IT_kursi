"use client";

import Link from "next/link";
import { routes } from "../config/routes";
import { usePathname } from "next/navigation";

export default function Menu({ className }) {
  const pathname = usePathname();

  return (
    <ul className={className}>
      {routes.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className={`text-base mx-2 my-1 hover:text-white hover:bg-success transition-colors duration-200
              ${pathname === item.href ? "text-white bg-success" : ""}`}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
