"use client";
import { useState } from "react";
import { useAuth } from "@/app/context/page"; // Adjust if the path differs
import client from "@/app/bin/client";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { TypeAnimation } from "react-type-animation"; // Importing TypeAnimation component

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await client.post("/login", { username, password });
      const token = res.data.token;
      if (token) {
        login(token);
      } else {
        setError("Invalid response from server.");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed. Please try again.");
    }
};
return(
  <>
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
      <h1 className="text-2xl md:text-2xl font-extrabold text-gray-800 mb-6 text-center flex flex-wrap justify-center gap-2">
        <TypeAnimation
        sequence={[`Welcome to`, 1000]}
        speed={50}
        wrapper="span"
        repeat={0}
        cursor={false}
        />
      <span className="text-blue-600">Massyve</span>
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm text-center w-full left-1/2">
            {error}
          </p>
        )}
        <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  </div>
  </>
);
}
