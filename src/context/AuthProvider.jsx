import React, { createContext, useContext, useState } from "react";
import { redirect } from "react-router";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});

  const login = (user) => {
    console.log("login...");
    setIsAuth(true);
    setUser(user);
    console.log(user);
    // redirect("/dashboard");
  };

  const logout = () => {
    console.log("logout...");
    setIsAuth(false);
    redirect("/");
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
