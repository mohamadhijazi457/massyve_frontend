"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "@/app/globals.css";


export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // This could be a check to see if the user has a valid auth token or similar.
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to dashboard if authenticated
      router.push("/dashboard");
    } else {
      // Redirect to login if not authenticated
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">Massyve</h1>
        <p className="text-lg text-gray-600">Please wait a few seconds!</p>
      </div>
    </div>
  );
}
