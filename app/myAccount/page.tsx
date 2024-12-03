"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function AccountPage() {
  const { data: session } = useSession();
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!session) {
    return (
      <div className="grid place-items-center m-10">
        <h1 className="text-2xl font-bold">You have to Sign In to access this page</h1>
      </div>
    );
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent form from refreshing the page

    try {
      const res = await fetch("/api/updateAccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newName,
          newPassword,
          oldPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(data.message || "Account successfully updated");
        setError("");
        setNewName("");
        setNewPassword("");
        setOldPassword("");
      } else {
        setError(data.message || "An error occurred");
        setSuccess("");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div>
      <div className="grid place-items-center m-16">
        <div
          className="shadow-lg p-10 rounded-xl border-t-4 border-indigo-500"
          style={{ textAlign: "center", backgroundColor: "#222831" }}
        >
          <h1 className="text-2xl font-bold my-4 text-white">Account</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label htmlFor="newName" className="flex items-center gap-2">
              <span className="text-slate-200">Name:</span>
              <span className="text-slate-400">{session?.user?.name}</span>
            </label>
            <input
              id="newName"
              className="input input-bordered grow text-white"
              type="text"
              placeholder="New Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />

            <input
              id="oldPassword"
              className="input input-bordered grow text-white"
              type="password"
              placeholder="Current Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />

            <input
              id="newPassword"
              className="input input-bordered grow text-white"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button type="submit" className="btn btn-primary">
              Save
            </button>

            {error && (
              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {success}
              </div>
            )}
          </form>
        </div>
        <br />
        <p>To see the changes, you have to sign out and sign in again</p>
      </div>
    </div>
  );
}
