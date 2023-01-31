import React from "react";
import { Link, Form, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const LogIn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/dashboard");
  };

  return (
    <div className="border-2 border-black min-h-full">
      <Link
        to="/"
        className="block mb-6 text-neutral-500 hover:text-black "
      >
        Volver al inicio
      </Link>
      <Form className="max-w-md mx-auto bg-neutral-100 rounded-md px-4 py-8">
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
    </div>
  );
};

export default LogIn;
