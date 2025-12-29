"use client";

import Link from "next/link";
import { useState } from "react";
import { API_BASE_URL } from "../lib/api";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");

    const payload = { name, email, password };

    try {
      const res = await fetch(`${API_BASE_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Signup failed");

      const data = await res.json();

      if (!data?.token) throw new Error("Token missing");
      sessionStorage.setItem("authToken", data.token);

      setStatus("Signup successful");

      window.location.href = `/profile`;
    } catch {
      setStatus("Signup failed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-lg border bg-white p-6">
        <h1 className="text-xl font-semibold">Sign Up</h1>

        <form onSubmit={handleSignup} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md border bg-black px-4 py-2 text-sm font-medium text-white"
          >
            Sign up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          <Link href="/" className="underline">
            Login
          </Link>
        </p>

        {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
      </div>
    </main>
  );
};

export default SignUp;
