// context/AuthContext.js
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    return token && userId && userName ? { token, userId, userName } : null;
  });

  useEffect(() => {
    if (authUser) {
      localStorage.setItem("token", authUser.token);
      localStorage.setItem("userId", authUser.userId);
      localStorage.setItem("userName", authUser.userName);
    }
  }, [authUser]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
