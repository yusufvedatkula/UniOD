"use client"

import Link from "next/link"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateEmail, validatePassword } from "@/constants";

export default function RegisterForm() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isCapsLock, setIsCapsLock] = useState(false);

    const router = useRouter()

    const baseURL = process.env.NODE_ENV === "production" 
        ? "https://uniod.vercel.app" 
        : "";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Input validations
        if (!validateEmail(email)) {
            setError('Invalid email');
            return;
        } else if (!validatePassword(password)) {
            setError('Password is too weak. Please use a stronger password.');
            return;
        } else if (!name || !email || !password) {
            setError("All fields are necessary");
            return;
        }

        try {
            // Check if user exists
            const resUserExists = await fetch(`${baseURL}/api/userExists`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            if (!resUserExists.ok) {
                const errorText = await resUserExists.text();
                console.error("User exists API error:", errorText);
                setError("Server error while checking email.");
                return;
            }

            const { user } = await resUserExists.json();
            if (user) {
                setError("User already exists");
                return;
            }

            // Register new user
            const res = await fetch(`${baseURL}/api/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error("Registration API error:", errorText);
                setError("Failed to register. Please try again.");
                return;
            }

            // Success
            setName("");
            setEmail("");
            setPassword("");
            setError("");
            router.push('/login');
        } catch (error) {
            console.error("Error during registration:", error);
            setError("An unexpected error occurred. Please try again.");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.getModifierState("CapsLock")) {
            setIsCapsLock(true);
        }
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!e.getModifierState("CapsLock")) {
            setIsCapsLock(false);
        }
    };

    return (
        <div className="grid place-items-center m-12">
            <div className="shadow-lg p-10 rounded-xl border-t-4 border-info" style={{ textAlign: "center", backgroundColor: "#222831" }}>
                <h1 className="text-xl font-bold my-4 text-white">Create your UniOD account</h1>

                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            className="grow text-white"
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            className="grow text-white"
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            className="grow text-white"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onKeyUp={handleKeyUp}
                        />
                    </label>
                    {isCapsLock && (
                        <div className="bg-warning text-black w-auto text-base py-1 px-3 rounded-md mt-2">
                            Caps Lock is ON
                        </div>
                    )}
                    <button type="submit" className="btn btn-info">
                        Register
                    </button>
                    {error && (
                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                            {error}
                        </div>
                    )}
                    <Link className="text-sm mt-3 text-slate-200" href={"/login"}>
                        Already have an account? <span className="text-accent underline">Sign In</span>
                    </Link>
                    <p className="w-64">Password must contain the following: A number, A symbol, Minimum 8 characters</p>
                </form>
            </div>
        </div>
    );
}
