"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

import { NAV_LINKS } from "@/constants";

export const NavbarComponent = () => {
  const { data: session } = useSession();

  const handleLogout = () => signOut();

  return (
    <div className="navbar bg-base-100">
      {/* Start: Dropdown Menu for Small Screens */}
      <div className="navbar-start">
        <div className="dropdown">
          <button
            className="btn btn-ghost btn-circle text-white"
            aria-label="Toggle Menu"
          >
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
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {NAV_LINKS.map((link) => (
              <li key={link.key}>
                <Link href={link.href} className="text-white">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Center: Brand */}
      <div className="navbar-center">
        <Link href="/" className="btn btn-ghost text-4xl text-white">
          UniOD
        </Link>
      </div>

      {/* End: Session-Based Buttons*/}
      <div className="navbar-end">
        {session ? (
          <>
            <span className="mr-4 text-sm font-medium text-slate-200">{session?.user?.name}</span>
            <button
              className="btn btn-error"
              onClick={handleLogout}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="/login">
              <button className="btn btn-accent mr-2">Login</button>
            </Link>
            <Link href="/register">
              <button className="btn btn-info">Register</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
