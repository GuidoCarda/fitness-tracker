import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
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
};

export default Unauthorized;
