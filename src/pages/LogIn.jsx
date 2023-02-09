import React from "react";

//Routing
import { Link, Form, useNavigate, redirect } from "react-router-dom";

//Auth
import useAuth from "../hooks/useAuth";

//Ui animations
import { motion } from "framer-motion";

//Icons
import { BiLeftArrowAlt } from "react-icons/bi";
import { supabase } from "../supabaseClient";

const LogIn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: "test@email.com",
        password: "example-password",
      });

      if (error) throw error;

      console.log(data);
      login({ data });
    } catch (error) {
      console.log(error);
    }

    // console.log("se ejecuta")
    navigate("/dashboard");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-indigo-800 order-2 border-black/5 h-screen grid place-content-center"
    >
      <Link
        to="/"
        className="absolute flex items-center gap-2 left-20 top-20 text-white/70 hover:text-white hover:bg-white/20 bg-white/10 py-2 px-4 rounded-md transition-colors"
      >
        <BiLeftArrowAlt className="h-6 w-6" />
        Volver al inicio
      </Link>
      <Form
        method="post"
        action="/login"
        className="w-96 mx-auto bg-neutral-100  rounded-md px-4 py-8"
      >
        <h2 className="text-2xl font-bold text-center mb-10">
          Log In
        </h2>
        <fieldset className="mb-3 flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            className="h-12 rounded-md px-2 text-neutral-800 border-2 focus:border-emerald-400 outline-none"
          />
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            className="h-12 bg:white rounded-md px-2 text-neutral-800 autofill:bg-white border-2 focus:border-emerald-600 outline-none"
          />
        </fieldset>

        <button
          // type="button"
          // onClick={handleLogin}
          type="submit"
          name="intent"
          value="signup"
          className="block w-full my-4 outline:none h-12 rounded-md bg-emerald-500 text-white"
        >
          Sign Up
        </button>

        <button
          // type="button"
          // onClick={handleLogin}
          type="submit"
          name="intent"
          value="signin"
          className="block w-full my-4 outline:none h-12 rounded-md bg-red-500 text-white"
        >
          Sign in
        </button>

        <button
          // type="button"
          // onClick={handleLogin}
          type="submit"
          name="intent"
          value="logout"
          className="block w-full my-4 outline:none h-12 rounded-md bg-blue-500 text-white"
        >
          Log Out
        </button>
        <div className="flex items-center flex-col">
          <span className="">Did you forget your password?</span>
          <Link
            className="text-sm text-emerald-600 hover:underline"
            to="/"
          >
            reset password
          </Link>
        </div>
      </Form>
    </motion.div>
  );
};

export default LogIn;

export async function action({ request }) {
  console.log("entro");
  const { intent, ...formValues } = Object.fromEntries(
    await request.formData()
  );

  console.log(formValues);
  console.log(intent);

  if (intent === "signup") {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: "test@email.com",
        password: "example-password",
      });

      if (error) throw error;

      // return redirect("/dashboard");
      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  if (intent === "signin") {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: "test@email.com",
        password: "example-password",
      });

      if (error) throw error;

      // return redirect("/dashboard");
      console.log(data);

      return redirect("/home");
    } catch (error) {
      console.log(error);
    }
  }

  return null;
}
