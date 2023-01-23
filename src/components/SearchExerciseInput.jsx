import React, { useState, useEffect } from "react";
import useDebouncedValue from "../hooks/useDebouncedValue";
import { exercises } from "../Pages/workout";

const SearchExerciseInput = ({ addExercise, setIsOpen }) => {
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const debouncedQuery = useDebouncedValue(query);

  function simulatedFetch(query) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          exercises.filter((exercise) =>
            exercise.name.toLowerCase().includes(query)
          )
        );
      }, 1000);
    });
  }

  const fetchData = async () => {
    const data = await simulatedFetch(debouncedQuery);
    setQueryResults(data);
  };

  const handleAddExercise = (result) => {
    addExercise(result);
    setQuery("");
    setQueryResults([]);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!debouncedQuery) return;
    fetchData(debouncedQuery);
  }, [debouncedQuery]);

  console.log(queryResults);

  return (
    <div className=" bg-neutral-100 rounded-md mt-10 px-6 py-8 ">
      <h2 className="text-2xl font-semibold mb-4">Nuevo ejercicio</h2>

      <div className=" relative flex flex-col ">
        <label htmlFor="" className="mb-1">
          Nombre
        </label>
        <input
          className="border-2 border-neutral-300 rounded-md h-10 p-2"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value.toLowerCase())}
        />

        {queryResults.length !== 0 && (
          <ul className="bg-white shadow-md shadow-neutral-300 w-full flex flex-col gap-2 absolute top-20 z-10 left-0 rounded-md p-4">
            {queryResults.length !== 0 && query ? (
              queryResults.map((result) => (
                <li key={result.id}>
                  <button
                    className="w-full text-start text-neutral-500 hover:text-black"
                    onClick={() => handleAddExercise(result)}
                  >
                    {result.name}
                  </button>
                </li>
              ))
            ) : !debouncedQuery ? null : (
              <li>No se encontraron coincidencias</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchExerciseInput;
