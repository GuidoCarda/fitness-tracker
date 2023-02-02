import React from "react";

//Routing
import { Link, Form, useNavigate } from "react-router-dom";

//Auth
import useAuth from "../hooks/useAuth";

//Ui animations
import { motion } from "framer-motion";

//Icons
import { BiLeftArrowAlt } from "react-icons/bi";

const LogIn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/dashboard");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 bg-white border-2 border-black/5 h-screen grid place-content-center"
    >
      <Link
        to="/"
        className="absolute flex items-center gap-2 left-20 top-20 text-neutral-500 hover:text-black bg-neutral-100 py-2 px-4 rounded-md transition-colors"
      >
        <BiLeftArrowAlt className="h-6 w-6" />
        Volver al inicio
      </Link>
      <Form className="w-96 mx-auto bg-neutral-100 rounded-md px-4 py-8">
        <fieldset className="mb-4 flex flex-col gap-2">
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
          type="button"
          onClick={handleLogin}
          className="block w-full my-4 outline:none h-12 rounded-md bg-emerald-700 text-white"
        >
          Log In
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
