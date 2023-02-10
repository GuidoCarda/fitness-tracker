import React, { useState } from "react";
import {
  Outlet,
  Navigate,
  NavLink,
  Link,
  useLocation,
  useLoaderData,
  Form,
  redirect,
} from "react-router-dom";
import useAuth from "../hooks/useAuth";

//Ui animations
import { motion } from "framer-motion";

import { supabase } from "../supabaseClient";
import authService from "../services/authService";
import Sidebar from "../components/Sidebar";

const ProtectedRoutes = () => {
  const data = useLoaderData();
  const location = useLocation();

  console.log(`loaderData  ->`, data);

  if (!data.session)
    return (
      <Navigate to="/login" state={{ from: location }} replace />
    );

  return (
    <motion.div
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      // transition={{ duration: 0.5 }}
      className="flex min-h-screen"
    >
      <Sidebar />

      <Outlet />
    </motion.div>
  );
};

export default ProtectedRoutes;

export async function action({ request }) {
  const { intent, ...formData } = Object.fromEntries(
    await request.formData()
  );

  console.log("intent: ", intent);
  console.log(formData);

  if (intent === "logout") {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      // return redirect("/dashboard");
      console.log("logged out...");

      return redirect("/");
    } catch (error) {
      console.log(error);
    }
  }

  return;
}

export async function loader({ params }) {
  console.log("se ejecuto el loader");
  try {
    const { data, error } = await supabase.auth.getSession();

    // const { data, error } = await supabase.auth.signInWithPassword({
    //   email: "test@email.com",
    //   password: "example-password",
    // });
    if (error) throw error;

    // console.log("data in loader: ", data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

{
  /* <nav className="h-14 flex items-center">
        {" "}
        <span>Logo</span>{" "}
        <NavLink
          className="ml-auto text-neutral-500 hover:text-black"
          to="/workouts"
        >
          Home
        </NavLink>{" "}
        <NavLink
          to="dashboard/profile"
          className="ml-4 text-neutral-500 hover:text-black"
        >
          Profile
        </NavLink>{" "}
        <NavLink
          to="dashboard/settings"
          className="ml-4 text-neutral-500 hover:text-black"
        >
          Settings
        </NavLink>{" "}
        <Form method="post" action="/login">
          <button
            type="submit"
            name="intent"
            value="logout"
            className="ml-4 text-neutral-500 hover:text-black"
          >
            logout
          </button>{" "}
        </Form>
      </nav>*/
}
