import React from "react";
import { Link, Form } from "react-router-dom";

const LogIn = () => {
  return (
    <div>
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

        <button className="block">Log In</button>
        <span className="text-center block w-full border-2 border-black">
          Did you forget your password?
        </span>
        <Link className="block" to="/">
          reset password
        </Link>
      </Form>
    </div>
  );
};

export default LogIn;
