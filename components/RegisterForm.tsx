"use client"

import Link from "next/link"
import { useState } from "react";

export default function RegisterForm() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async () => {

        if(!name || !email || !password) {
            setError("All fields are necessary")
        }

        try {
            const res = await fetch('api/register', {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    name, email, password
                })
            })

            if (res.ok) {
                setName("");
                setEmail("");
                setPassword("");
                setError("");
            } else {
                console.log("User registration failed.");
            }
        } catch (error) {
            console.log("Error during registration: ", error);
        }
    }

    return (
        <div className="grid place-items-center m-10 ">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-600">
            <h1 className="text-xl font-bold my-4">Register</h1>
    
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <input
                 className="bg-gray-50 border
                 border-gray-300 
                 text-white text-sm rounded-lg 
                 focus:ring-blue-500 
                 focus:border-blue-500 block w-full p-2.5 
                 dark:bg-gray-700
                  dark:border-gray-600 
                  dark:placeholder-white 
                  dark:text-white 
                  dark:focus:ring-blue-500 
                  dark:focus:border-blue-500"
                type="text"
                placeholder="Full Name"
                onChange={(e) => setName(e.target.value)}
                />
                <input
                 className="bg-gray-50 border
                 border-gray-300 
                 text-white text-sm rounded-lg 
                 focus:ring-blue-500 
                 focus:border-blue-500 block w-full p-2.5 
                 dark:bg-gray-700
                  dark:border-gray-600 
                  dark:placeholder-white 
                  dark:text-white 
                  dark:focus:ring-blue-500 
                  dark:focus:border-blue-500"
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                />
                <input
                 className="bg-gray-50 border
                 border-gray-300 
                 text-white text-sm rounded-lg 
                 focus:ring-blue-500 
                 focus:border-blue-500 block w-full p-2.5 
                 dark:bg-gray-700
                  dark:border-gray-600 
                  dark:placeholder-white 
                  dark:text-white 
                  dark:focus:ring-blue-500 
                  dark:focus:border-blue-500"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="bg-blue-700 text-white 
                font-bold cursor-pointer px-6 py-2
                rounded-md hover:bg-blue-950
                transition-all duration-300 ease-in-out">
                Register
                </button>

                {error && (
                    <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                    {error}
                    </div>
                )}
    
                <Link className="text-sm mt-3 text-right" href={"/login"}>
                Already have an account? <span className="underline">Login</span>
                </Link>
            </form>
            </div>
        </div>
    )
}