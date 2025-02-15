"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { NAV_LINKS } from "@/constants";

export const NavbarComponent = () => {
  const { data: session } = useSession();
  const router = useRouter()

  const handleLogout = () => signOut();

  return (
    <div className="navbar bg-base-100">
      {/* Start: Dropdown Menu for Small Screens */}
      <div className="navbar-start">
        <div className="dropdown">
          <button
            className="btn btn-ghost btn-circle text-base-content"
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
            className="menu menu-md  dropdown-content 
            bg-base-100 rounded-box z-[1] mt-3 w-60 p-2 shadow"
          >
            {NAV_LINKS.map((link) => (
              <li key={link.key}>
                <Link href={link.href} className="text-base-content">{link.label}</Link>
              </li>
            ))}
          <br />
          {session ? (
            <>
              <button
                className="btn btn-error"
                onClick={handleLogout}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-info" onClick={() => router.push('/register')}>
                  Sign Up
              </button>
            </>
          )}
          </ul>
        </div>
      </div>

      {/* Center: Brand */}
      <div className="navbar-center">
        <Link href="/" className="btn btn-ghost text-5xl text-base-content">
          UniOD
        </Link>
      </div>

      {/* End: Session-Based Buttons*/}
      <div className="navbar-end">
        {session ? (
          <>
            <button onClick={() => router.push('/myAccount')} 
            className="btn bg-base-200 text-xl text-base-content"
            style={{cursor:"pointer"}}>
              {session?.user?.name}
            </button>
          </>
        ) : (
          <>
            <Link href="/login">
            
              <button className="btn btn-accent mr-2 py-3 px-4 inline-flex items-center gap-x-2 text-sm">
                Sign In
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" 
                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
            </Link> 
          </>
        )}
      </div>
    </div>
  );
};
