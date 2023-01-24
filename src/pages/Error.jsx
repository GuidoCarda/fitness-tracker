import React from "react";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <main className="bg-slate-100">
      <div className="max-w-5xl min-h-screen mx-auto pt-6 px-4 border-2">
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-3xl font-bold text-center">
            {error ? error.data : "Lo sentimos! Hubo un error"}
          </h1>
          <Link to="/" className="w-max bg-neutral-400 px-6 py-2 rounded-md">
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
