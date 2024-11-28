"use client";

import React, { useState } from "react";
import "../app/globals.css";
import Link from "next/link";
import { NAV_LINKS } from "@/constants";
import Image from "next/image";
import Button from "./Button";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session } = useSession();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <nav
      className="flexBetween max-container 
    padding-container relative z-30 py-4 bg-slate-200 w-full"
    >
      <h1 className="text-4xl font-bold">UniOD</h1>

      {/* Desktop Links */}
      <ul className="hidden h-full gap-12 lg:flex">
        {NAV_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className="regular-16 text-black flexCenter 
           cursor-pointer pb-1.5 
           transition-all hover:font-bold 
           no-underline"
          >
            {link.label}
          </Link>
        ))}
      </ul>

      {/* Desktop Auth Actions */}
      <div className="lg:flex hidden items-center space-x-4">
        {session ? (
          <>
            <span className="text-lg font-medium text-black">{session?.user?.name}</span>
            <Button
              type="button"
              title="Logout"
              onClick={handleLogout}
              variant="btn_dark_blue ml-2"
            />
          </>
        ) : (
          <>
            <Link href={"/login"}>
              <Button
                type="button"
                title="Login"
                icon="/user.svg"
                variant="btn_dark_blue"
              />
            </Link>
            <Link href={"/register"}>
              <Button type="button" title="Register" variant="btn_dark_blue" />
            </Link>
          </>
        )}
      </div>


      {/* Mobile Menu Icon */}
      <div className="lg:hidden">
        <Image
          src="/menu.svg"
          alt="menu"
          width={32}
          height={32}
          className="cursor-pointer"
          onClick={toggleMenu}
        />
      </div>

      {/* Collapsible Mobile Menu */}
      <div
        className={`absolute top-full left-0 w-full 
          bg-slate-200 shadow-md lg:hidden z-50 
          transition-all duration-500 ease-in-out ${
            isMenuOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
      >
        <ul className="flex flex-col items-center py-2">
          {NAV_LINKS.map((link) => (
            <li key={link.key} className="my-1">
              <Link
                href={link.href}
                className="regular-14 text-black flexCenter 
               cursor-pointer pb-1 transition-all 
               hover:font-bold transform 
               hover:scale-105 duration-200 
               no-underline"
              >
                {link.label}
              </Link>
            </li>
          ))}
          {session ? (
            <>
              <li className="my-1">
                <h5 className="text-black text-center">{session?.user?.name}</h5>
              </li>
              <li className="my-1 transform hover:scale-105 duration-200">
                <Button
                  type="button"
                  title="Logout"
                  onClick={handleLogout}
                  variant="btn_dark_blue"
                />
              </li>
            </>
          ) : (
            <>
              <li className="my-1 transform hover:scale-105 duration-200">
                <Link href={"/login"}>
                  <Button
                    type="button"
                    title="Login"
                    icon="/user.svg"
                    variant="btn_dark_blue"
                  />
                </Link>
              </li>
              <li className="my-1 transform hover:scale-105 duration-200">
                <Link href={"/register"}>
                  <Button type="button" title="Register" variant="btn_dark_blue" />
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
