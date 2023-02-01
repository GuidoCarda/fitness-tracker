import React, { createContext, useContext, useState } from "react";
import { redirect } from "react-router";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  const login = () => {
    console.log("login...");
    setIsAuth(true);
    redirect("/dashboard");
  };

  const logout = () => {
    console.log("logout...");
    setIsAuth(false);
    redirect("/");
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
