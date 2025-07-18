// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = (userName, userId, token) => {
    localStorage.setItem("userName", userName);
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", token);

    setUserName(userName);
    setUserId(userId);
    setToken(token);
  };

  const logout = () => {
    localStorage.clear();
    setUserName(null);
    setUserId(null);
    setToken(null);
  };

  useEffect(() => {
    // Keep state in sync with localStorage
    setUserName(localStorage.getItem("userName"));
    setUserId(localStorage.getItem("userId"));
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <AuthContext.Provider value={{ userName, userId, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
