import React, { useState, useEffect, useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { WorkoutsContext } from "../context/WorkoutsContext";
import useDebouncedValue from "../hooks/useDebouncedValue";
import { supabase } from "../supabaseClient";

const exercises = [
  { id: 1, name: "push ups", body_part: "chest" },
  { id: 2, name: "pull ups", body_part: "back" },
  { id: 3, name: "rows", body_part: "back" },
  { id: 4, name: "bench press", body_part: "chest" },
  { id: 5, name: "shoulder press", body_part: "shoulders" },
  { id: 6, name: "squats", body_part: "legs" },
  { id: 7, name: "front squats", body_part: "legs" },
  { id: 8, name: "back squats", body_part: "legs" },
  { id: 9, name: "flor press", body_part: "chest" },
  { id: 10, name: "bicep curls", body_part: "biceps" },
  { id: 11, name: "tricep extensions", body_part: "triceps" },
  { id: 12, name: "tricep pushdown", body_part: "triceps" },
  { id: 13, name: "lat pulldown", body_part: "back" },
  { id: 14, name: "weighted rows", body_part: "back" },
  { id: 15, name: "barbell rows", body_part: "back" },
  { id: 16, name: "dumbell rows", body_part: "back" },
  { id: 17, name: "declined push ups", body_part: "chest" },
  { id: 18, name: "inclined push ups", body_part: "chest" },
];

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

const Workout = () => {
  const [loaderData] = useLoaderData();

  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const debouncedQuery = useDebouncedValue(query);

  const [workout, setWorkout] = useState([]);

  console.log(loaderData);

  const { workouts, addExercise } = useContext(WorkoutsContext);

  // const currentWorkout = workouts.find((w) => w.id == loaderData);

  const fetchData = async () => {
    const data = await simulatedFetch(debouncedQuery);
    setQueryResults(data);
    console.log(data);
  };

  // const pushExercises = async () => {
  //   try {
  //     exercises.forEach(async (value) => {
  //       const { error, data } = await supabase
  //         .from("exercises")
  //         .insert({
  //           name: value.name,
  //           body_part: value.body_part,
  //         })
  //         .select("*");

  //       if (error) throw error;
  //       console.log(data);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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

      <div className="bg-neutral-100 rounded-md mt-20 px-6 py-8">
        <h2 className="text-2xl font-semibold mb-4">Nuevo ejercicio</h2>

        <div className="flex flex-col ">
          <label htmlFor="" className="mb-1">
            Nombre
          </label>
          <input
            className="border-2 border-neutral-300 rounded-md h-10 p-2"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value.toLowerCase())}
          />
        </div>
        {queryResults.length !== 0 && (
          <ul className="pt-6 flex flex-col gap-2">
            {queryResults.length !== 0 && query ? (
              queryResults.map((result) => (
                <li>
                  <button
                    onClick={() => addExercise(currentWorkout?.id, result)}
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

      <section className="mt-10">
        {loaderData ? (
          <div>
            <h2 className="text-2xl font-bold">
              Workout name: {loaderData.name}
            </h2>
            <p className="mt-2">{loaderData.created_at}</p>
          </div>
        ) : null}
      </section>
    </div>
  );
};

// simulated fetch
// async function getWorkout(id) {
//   const isOk = true;

//   console.log(id);
//   return new Promise((resolve, reject) => {
//     if (isOk) {
//       resolve(id);
//     }
//     reject("error");
//   });
// }

export async function loader({ params }) {
  console.log(params.id);
  try {
    const { error, data } = await supabase
      .from("workouts")
      .select("*")
      .eq("id", params.id);

    if (error) throw error;

    return data;
  } catch (error) {
    console.log(error);
  }
}

export default Workout;
