"use client"
import React, { useState } from 'react';
import "../app/globals.css";
import Link from 'next/link';
import { NAV_LINKS } from '@/constants';
import Image from 'next/image';
import Button from './Button';



export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flexBetween max-container 
    padding-container relative z-30 py-4 bg-slate-200">
      <h1 className="text-4xl font-bold">UniOD</h1>
      <ul className="hidden h-full gap-12 lg:flex">
        {NAV_LINKS.map((link) => (
          <Link href={link.href} key={link.key} className="regular-16
           text-black flexCenter 
           cursor-pointer pb-1.5 
           transition-all hover:font-bold 
           no-underline">
            {link.label}
          </Link>
        ))}
      </ul>

      <div className="lg:flexCenter hidden">
        <Button 
          type="button"
          title="Login"
          icon="/user.svg"
          variant="btn_dark_blue"
        />
      </div>

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

      <div 
        className={`absolute top-full left-0 w-full 
          bg-slate-200 shadow-md lg:hidden z-50 
          transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <ul className="flex flex-col items-center py-2">
          {NAV_LINKS.map((link) => (
            <li key={link.key} className="my-1">
              <Link href={link.href} className="regular-14
               text-black flexCenter 
               cursor-pointer pb-1 transition-all 
               hover:font-bold transform 
               hover:scale-105 duration-200 
               no-underline">
                {link.label}
              </Link>
            </li>
          ))}
          <li className="my-1 transform hover:scale-105 duration-200" >
            <Button 
              type="button"
              title="Login"
              icon="/user.svg"
              variant="btn_dark_blue"
            />
          </li>
        </ul>
      </div>
    </nav>
  )
}
