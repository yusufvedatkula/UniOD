"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HeroPage() {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, []);

  return (
    <div>
        <div className="hero bg-base-100 min-h-screen text-white">
            <div className="hero-content text-center">
                <div className="max-w-md">
                <h1 className="text-5xl font-bold text-white">Welcome to UniOD</h1>
                <p className="py-6 text-white">
                Unlock your university search with UniOD. 
                Explore top universities, compare their rankings, 
                find the best fit for your academic journey, 
                and stay updated with our open day reminder system. 
                Don{"'"}t forget to check your favorites page for quick access to your top choices.
                </p>
                <button className="btn btn-neutral bg-white text-black hover:text-white" onClick={() => router.push('/home')}>Get Started</button>
                </div>
            </div>
        </div>
    </div>
  );
}