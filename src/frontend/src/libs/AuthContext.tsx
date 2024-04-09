import React, { createContext, useState } from "react";
import useCookies from "./useCookies";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (id: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { getCookie, setCookie } = useCookies();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    getCookie("auth") ? true : false
  );

  const login = (id: string) => {
    // Perform authentication logic here
    setIsAuthenticated(getCookie("auth") ? true : false);
    setCookie("userId", id, 1);
  };

  const logout = async () => {
    // Perform logout logic

    const res = await fetch("/api/logout", {
      method: "POST",
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    } else {
      setCookie("auth", "", -1);
      setCookie("userId", "", -1);
    }
    setIsAuthenticated(getCookie("auth") ? true : false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
