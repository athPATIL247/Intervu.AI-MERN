import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export interface Interview {
  _id: string;
  coverImage: string;
  finalized: boolean;
  level: string;
  questions: string[];
  role: string;
  techstack: string[];
  type: "mixed" | "behavioral" | "technical";
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  interviews?: Interview[];
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};