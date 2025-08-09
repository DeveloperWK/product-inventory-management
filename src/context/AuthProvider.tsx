import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

interface User {
  isAuthenticated: boolean;
  role?: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    return { isAuthenticated: !!token, role: role ?? undefined };
  });

  const login = (token: string, role: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setUser({ isAuthenticated: true, role });
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser({ isAuthenticated: false });
  };

  const hasRole = (requiredRole: string): boolean => {
    return user.role === requiredRole;
  };
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      setUser({ isAuthenticated: !!token, role: role ?? undefined });
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const value = {
    user,
    login,
    logout,
    hasRole,
    isAuthenticated: user.isAuthenticated,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
