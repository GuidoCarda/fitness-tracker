import React from "react";
import { Link } from "react-router-dom";

const Workout = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Workout</h1>
        <Link to="/" className="bg-neutral-300 px-4 py-2 rounded-md">
          Home
        </Link>
      </div>

      <p>test</p>
    </div>
  );
};

export default Workout;
