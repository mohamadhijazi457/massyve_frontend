"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import client from "@/app/bin/client";

interface User {
  id: string;
  email: string;
  username?: string;
  country?: string;
  city?: string;
  major?: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Called on app load to check for existing session
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await client.get("/me"); // token is added by interceptor
        setUser(res.data);
      } catch (err) {
        console.error("Session validation failed", err);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Called after successful login
  const login = async (token: string) => {
    localStorage.setItem("token", token);
    try {
      const res = await client.get("/me");
      setUser(res.data);
      router.push("/dashboard");
    } catch (err) {
      console.error("Login user fetch failed", err);
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  // Clear session
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
