
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export type UserRole = "student" | "instructor" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (email: string, password: string) => void;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check for existing user session in localStorage on startup
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // Mock login functionality - in a real app, this would call an API
  const login = (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      // Mock users for demo
      if (email === "student@example.com" && password === "password") {
        const user: User = {
          id: "1",
          name: "Alex Student",
          email: "student@example.com",
          role: "student",
          avatar: "/placeholder.svg"
        };
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        navigate("/student/dashboard");
      } else if (email === "instructor@example.com" && password === "password") {
        const user: User = {
          id: "2",
          name: "Taylor Teacher",
          email: "instructor@example.com",
          role: "instructor",
          avatar: "/placeholder.svg"
        };
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        navigate("/instructor/dashboard");
      } else if (email === "admin@example.com" && password === "password") {
        const user: User = {
          id: "3",
          name: "Admin User",
          email: "admin@example.com",
          role: "admin",
          avatar: "/placeholder.svg"
        };
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        navigate("/admin/dashboard");
      } else {
        setError("Invalid email or password. Please try again.");
      }
      setIsLoading(false);
    }, 1000);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    navigate("/login");
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, login, logout, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
