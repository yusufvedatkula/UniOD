"use client"

import Link from "next/link"
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { validateEmail } from "@/constants";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isCapsLock, setIsCapsLock] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (validateEmail(email)) {
      try {
        console.log("Attempting to sign in...");
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
  
        console.log("Sign in response:", res);

        if (res?.error) {
          setError("Invalid email or password. Try Again!");
          return;
        }
  
        router.replace("/home");
      } catch (error) {
        console.error("Sign in error:", error);
      }
    } else {
      setError('Invalid email')
    }
  }

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

    return(
        <div className=" grid place-items-center mt-12">
        <div className=" p-10 rounded-xl border-t-4 border-accent bg-base-200">
          <h1 className="text-xl font-bold my-4 text-base-content">Sign in to your account</h1>
  
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                d="M2.5 3A1.5 1.5 0 0 0 1 
                4.5v.793c.026.009.051.02.076.032L7.674 
                8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 
                5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path
                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 
                6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 
                0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
            className="grow text-base-content"
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5
                   0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0
                    1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4
                     4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 
                     1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd" />
              </svg>
              <input
                className="grow text-base-content"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
              />
            </label>
            {isCapsLock && (
              <div className="bg-warning text-center text-black w-auto text-base py-1 px-3 rounded-md mt-2">
                  Caps Lock is ON
              </div>
              )}
            <button className="btn btn-accent" type="submit">
              Sign In
            </button>

            {error && (
            <div className="w-auto bg-error text-slate-100 text-sm py-1 px-3 rounded-md mt-2 text-center">
              {error}
            </div>
          )}
            <Link className="text-sm mt-3 text-base-content text-center" href={"/register"}>
                Dont have an account? <span className="text-info underline">Sign Up</span>
            </Link>
          </form>
        </div>
      </div>
    )
}

