"use client";
import { useAuth } from "@/app/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { TypeAnimation } from "react-type-animation";

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen">
        <ClipLoader size={50} color={"#4C7DFF"} loading={loading} /> {/* Loading spinner */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl md:text-2xl font-extrabold text-gray-800 mb-6 text-center flex flex-wrap justify-center gap-2">
        <TypeAnimation
          sequence={[`Hi ${user.username}, welcome to`, 1000]}
          speed={50}
          wrapper="span"
          repeat={0}
          cursor={false}
        />
        <span className="text-blue-600">Massyve</span>
      </h1>

      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md text-gray-700 space-y-3">
        <p><span className="font-semibold">Country:</span> {user.country}</p>
        <p><span className="font-semibold">City:</span> {user.city}</p>
        <p><span className="font-semibold">Major:</span> {user.major}</p>
        <p><span className="font-semibold">Email:</span> {user.email}</p>
      </div>
      <button
        onClick={logout}
        className="mt-6 px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
