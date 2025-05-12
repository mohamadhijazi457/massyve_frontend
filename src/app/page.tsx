"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "@/app/globals.css";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // To handle loading state
  const router = useRouter();

  useEffect(() => {
    // Simulating authentication check
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated === null) return;

    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-blue-600">Massyve</h1>
          <p className="text-lg text-gray-600">Please wait a few seconds!</p>
        </div>
      </div>
    );
  }

  return null;
}
