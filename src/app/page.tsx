// // app/page.tsx
"use client";
// import LoginPage from "./login/page";
// import Dashboard from "./dashboard/page";
// import { useAuth } from "@/app/context/page";

// export default function Home() {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return user ? <Dashboard /> : <LoginPage />;
// }
// app/page.tsx

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "@/app/globals.css"; // adjust the path as needed


export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Simulate checking if the user is authenticated (e.g., using a global state or context)
    // This could be a check to see if the user has a valid auth token or similar.
    const user = localStorage.getItem("user"); // Or use your own method of checking auth
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
    <div>
      <h1>Welcome to the Home Page!</h1>
      <p>Please wait while we check your authentication status...</p>
    </div>
  );
}
