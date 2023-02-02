import React from "react";
import {
  Outlet,
  Navigate,
  NavLink,
  Link,
  useLocation,
} from "react-router-dom";
import useAuth from "../hooks/useAuth";

//Ui animations
import { motion } from "framer-motion";

import Unauthorized from "./Unauthorized";

const ProtectedRoutes = () => {
  const location = useLocation();
  const { isAuth, logout } = useAuth();

  // if (!isAuth) return <Unauthorized />;

  if (!isAuth)
    return (
      <Navigate to="/login" state={{ from: location }} replace />
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
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
    </motion.div>
  );
};

export default ProtectedRoutes;
