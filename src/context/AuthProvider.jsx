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
  };

  const logout = () => {
    console.log("logout...");
    setIsAuth(false);
    redirect("/");
  };

  const getSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const signUp = async () => {};

  return (
    <AuthContext.Provider
      value={{ isAuth, login, logout, user, getSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
