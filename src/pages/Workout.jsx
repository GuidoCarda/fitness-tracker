import React, { useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import useDebouncedValue from "../hooks/useDebouncedValue";

function simulatedFetch(query) {
  const exercises = [
    "push ups",
    "pull ups",
    "rows",
    "bench press",
    "shoulder press",
    "squats",
    "front squats",
    "back squats",
    "flor press",
    "bicep curls",
    "tricep extensions",
    "tricep pushdown",
    "lat pulldown",
    "weighted rows",
    "barbell rows",
    "dumbell rows",
    "declined push ups",
    "inclined push ups",
  ];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        exercises.filter((exercise) => exercise.toLowerCase().includes(query))
      );
    }, 1000);
  });
}

const Workout = () => {
  const loaderData = useLoaderData();

  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const debouncedQuery = useDebouncedValue(query);

  console.log(debouncedQuery);

  const fetchData = async () => {
    const data = await simulatedFetch(debouncedQuery);
    setQueryResults(data);
    console.log(data);
  };

  useEffect(() => {
    if (!debouncedQuery) return;
    fetchData(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Workout</h1>
        <Link to="/" className="bg-neutral-300 px-4 py-2 rounded-md">
          Home
        </Link>
      </div>

      <div className="border-2 mt-20">
        <h2 className="text-2xl font-semibold mb-4">Nuevo ejercicio</h2>

        <div className="flex flex-col">
          <label htmlFor="" className="mb-1">
            Nombre
          </label>
          <input
            className="border-2 border-neutral-600 rounded-md h-10 p-2"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value.toLowerCase())}
          />
        </div>

        <button
          disabled={query.length === 0}
          className="mt-4 ml-auto bg-cyan-700 text-white px-4 py-1 rounded-lg disabled:bg-neutral-500"
        >
          Agregar
        </button>
      </div>

      <ul className="mt-10">
        {queryResults.length !== 0 && query ? (
          queryResults.map((result) => <li>{result}</li>)
        ) : !debouncedQuery ? null : (
          <li>No se encontraron coincidencias</li>
        )}
      </ul>
    </div>
  );
};

async function getWorkouts() {
  const isOk = true;
  return new Promise((resolve, reject) => {
    if (isOk) {
      resolve({ name: "test", workout: "test" });
    }
    reject("error");
  });
}

export function loader() {
  return getWorkouts();
}

export default Workout;
