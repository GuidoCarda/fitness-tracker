import React from "react";
import {
  useNavigate,
  Outlet,
  Navigate,
  redirect,
} from "react-router-dom";

const ProtectedRoutes = () => {
  const isAuth = false;
  const navigate = useNavigate();

  console.log(isAuth);

  if (!isAuth) return <Navigate to="/" />;

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedRoutes;
