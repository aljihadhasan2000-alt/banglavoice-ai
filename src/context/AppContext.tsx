import React, { createContext, useContext, useState, useEffect } from "react";
import { User, GenerationHistory } from "../types";
import toast from "react-hot-toast";

interface AppContextType {
  user: User | null;
  history: GenerationHistory[];
  addToHistory: (item: Omit<GenerationHistory, "id" | "timestamp">) => void;
  clearHistory: () => void;
  isLoading: boolean;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: "1",
    name: "Bangla Creator",
    email: "creator@banglavoice.ai",
    subscription: "premium",
  });
  const [history, setHistory] = useState<GenerationHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem("bv_history");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const addToHistory = (item: Omit<GenerationHistory, "id" | "timestamp">) => {
    const newItem: GenerationHistory = {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
    };
    const newHistory = [newItem, ...history].slice(0, 50);
    setHistory(newHistory);
    localStorage.setItem("bv_history", JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("bv_history");
    toast.success("History cleared");
  };

  const logout = () => {
    setUser(null);
    toast.success("Logged out successfully");
  };

  return (
    <AppContext.Provider value={{ user, history, addToHistory, clearHistory, isLoading, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
