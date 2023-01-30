import React from "react";
import { Outlet, Navigate, NavLink, Link } from "react-router-dom";

const ProtectedRoutes = () => {
  const isAuth = false;

  if (!isAuth) {
    return (
      <div>
        <div className="max-w-xl mx-auto text-center flex flex-col items-center">
          <h2 className="text-2xl font-bold text-neutral-800">
            Lo sentimos, no tiene los permisos necesarios
          </h2>
          <Link
            className="mt-6 mx-auto bg-neutral-400 rounded-md px-4 py-1"
            to="/"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

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
      </nav>
      <Outlet />
    </div>
  );
};

export default ProtectedRoutes;
