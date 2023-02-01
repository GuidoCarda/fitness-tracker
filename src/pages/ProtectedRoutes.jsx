import React from "react";
import { Outlet, Navigate, NavLink, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Unauthorized from "./Unauthorized";

const ProtectedRoutes = () => {
  const { isAuth, logout } = useAuth();

  // if (!isAuth) return <Unauthorized />;

  if (!isAuth) return <Navigate to="/login" />;

  return (
    <div>
      <nav className="h-14 flex items-center">
        {" "}
        <span>Logo</span>{" "}
        <NavLink
          className="ml-auto text-neutral-500 hover:text-black"
          to="/"
        >
          Home
        </NavLink>{" "}
        <NavLink
          to="profile"
          className="ml-4 text-neutral-500 hover:text-black"
        >
          Profile
        </NavLink>{" "}
        <NavLink
          to="settings"
          className="ml-4 text-neutral-500 hover:text-black"
        >
          Settings
        </NavLink>{" "}
        <button
          onClick={logout}
          type="button"
          className="ml-4 text-neutral-500 hover:text-black"
        >
          logout
        </button>{" "}
      </nav>
      <Outlet />
    </div>
  );
};

export default ProtectedRoutes;
