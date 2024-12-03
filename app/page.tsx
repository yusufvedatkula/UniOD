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
                <div className="max-w-2xl">
                <h1 className="text-7xl font-bold text-white">Welcome to UniOD</h1>
                <p className="py-6 text-lg text-white">
                Discover and compare top universities effortlessly. Tailor your
                academic journey by exploring rankings, open days, and personalized
                recommendations. Stay on track with our open day reminders and keep
                your favorites at your fingertips for easy access.
                </p>
                <button className="btn btn-neutral bg-white text-black hover:text-white" onClick={() => router.push('/home')}>Get Started</button>
                </div>
            </div>
        </div>
    </div>
  );
}