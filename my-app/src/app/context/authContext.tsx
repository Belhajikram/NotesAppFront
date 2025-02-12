"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: () => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Initialize loading state
  const router = useRouter();

  // Check authentication status on load
  const checkAuth = async () => {
    try {
      const response = await axios.get("http://localhost:3001/auth/user", {
        withCredentials: true, // Ensure cookies are sent
      });

      setUser(response.data.user);
    } catch (error) {
      console.error("Authentication error:", error)
      setUser(null);
    } finally {
      setLoading(false); // Set loading to false after the check is complete
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async () => {
    await checkAuth(); // Call checkAuth after login to update user state
    router.push("/dashboard");
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:3001/auth/logout", {}, { withCredentials: true });
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Only render children when loading is complete
  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};