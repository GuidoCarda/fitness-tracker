import React, { useState } from "react";

//Routing
import { Link, useFetcher, useLoaderData } from "react-router-dom";

//Components
import SearchExerciseInput from "../components/SearchExerciseInput";

//Supabase client
import { supabase } from "../supabaseClient";

export const exercises = [
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

const Workout = () => {
  const [loaderData] = useLoaderData();

  // interact with loaders and actions without causing navigation
  const fetcher = useFetcher();

  const [workout, setWorkout] = useState([]);
  const [sets, setSets] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addExercise = (exercise) => {
    const alreadyInWorkout = workout.find(
      (workoutExercise) => workoutExercise.id === exercise.id
    );

    if (alreadyInWorkout) return alert("El ejercicio ya esta en la rutina");

    setWorkout([...workout, exercise]);
    setSets([
      ...sets,
      { exercise_id: exercise.id, set_id: 0, reps: 0, weight: 0 },
    ]);
  };

  const addSet = (id) => {
    const exerciseSets = sets.filter((e) => e.exercise_id === id);

    const {
      exercise_id,
      set_id: lastSetId,
      reps: lastSetReps,
      weight: lastSetWeight,
    } = exerciseSets.at(-1);

    const { name } = workout.find((ex) => ex.id === exercise_id);

    console.log(name, lastSetReps, lastSetWeight);

    if (lastSetReps !== 0) {
      return setSets([
        ...sets,
        {
          exercise_id,
          set_id: lastSetId + 1,
          reps: lastSetReps,
          weight: lastSetWeight,
        },
      ]);
    }

    setSets([
      ...sets,
      { exercise_id, set_id: lastSetId + 1, reps: 0, weight: 0 },
    ]);
  };

  const handleSetChange = (e, set) => {
    const { value, name: fieldName } = e.currentTarget;

    const { exercise_id, set_id } = set;

    setSets(
      sets.map((set) => {
        if (set.exercise_id === exercise_id && set.set_id === set_id) {
          return { ...set, [fieldName]: Number(value) };
        }
        return set;
      })
    );
  };

  const handleWorkoutSave = () => {
    const finalWorkout = sets.map((set) => {
      return { workout_id: loaderData.id, ...set };
    });

    console.log(finalWorkout);

    let formData = new FormData();

    formData.append("finalWorkout", JSON.stringify(finalWorkout));
    formData.append("intent", "save-workout");

    fetcher.submit(formData, {
      method: "post",
      action: `/workouts/${loaderData.id}`,
    });
  };

  // console.log(loaderData);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Workout</h1>
        <Link to="/" className="bg-neutral-300 px-4 py-2 rounded-md">
          Home
        </Link>
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

      <section className="mt-10 ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Exercises</h2>
          <button
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            Agregar ejercicio
          </button>
        </div>

        {isOpen ? (
          <SearchExerciseInput
            addExercise={addExercise}
            setIsOpen={setIsOpen}
          />
        ) : null}

        <ul className="flex flex-col gap-2 mt-6">
          {workout.length !== 0
            ? workout.map((ex) => (
                <li>
                  <WorkoutListExercise
                    name={ex.name}
                    addSet={addSet}
                    handleSetChange={handleSetChange}
                    sets={sets.filter((setEx) => setEx.exercise_id === ex.id)}
                  />
                </li>
              ))
            : null}
        </ul>

        {/* {workout.length !== 0 && (
          <fetcher.Form>
            <button
              type="submit"
              name="intent"
              value="save-workout"
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg absolute bottom-10 right-10"
            >
              Guardar entrenamiento
            </button>
          </fetcher.Form>
        )} */}

        <fetcher.Form>
          <button
            type="button"
            name="intent"
            onClick={handleWorkoutSave}
            value="save-workout"
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg absolute bottom-40 right-10"
          >
            Guardar entrenamiento
          </button>
        </fetcher.Form>
        <fetcher.Form method="post" action={`/workouts/${loaderData.id}`}>
          <button
            type="button"
            name="intent"
            value="edit-workout"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg absolute bottom-24 right-10"
          >
            Editar entrenamiento
          </button>
        </fetcher.Form>
        <fetcher.Form method="post" action={`/workouts/${loaderData.id}`}>
          <button
            type="button"
            name="intent"
            value="delete-workout"
            className="bg-red-600 text-white px-4 py-2 rounded-lg absolute bottom-10 right-10"
          >
            Eliminar entrenamiento
          </button>
        </fetcher.Form>
      </section>
    </div>
  );
};

function WorkoutListExercise({ name, addSet, handleSetChange, sets }) {
  return (
    <div className=" border-2 border-neutral-200 p-4 rounded-md">
      <p>{name}</p>

      {sets.map((set, idx) => {
        // console.log(set);
        return (
          <div className="flex flex-col " key={set.set_id}>
            <div className="flex w-full">
              <span className="w-10 h-10 flex-none grid place-content-center">
                {set.set_id + 1}
              </span>

              <div className="flex gap-2 items-center w-full justify-center">
                <label htmlFor="">reps</label>
                <input
                  type="number"
                  name="reps"
                  value={set.reps}
                  onChange={(e) => handleSetChange(e, set)}
                  className="bg-neutral-200 rounded-md w-10 h-8 grid text-center text-sm"
                />
              </div>

              <div className="flex gap-2 items-center w-full justify-center">
                <label htmlFor="">weight</label>
                <input
                  type="number"
                  name="weight"
                  value={set.weight}
                  onChange={(e) => handleSetChange(e, set)}
                  className="bg-neutral-200 rounded-md w-10 h-8 grid text-center text-sm"
                />
              </div>
            </div>
          </div>
        );
      })}

      <button
        onClick={() => addSet(sets[0].exercise_id)}
        className="place-self-start px-4 py-2 mt-4 bg-neutral-200 rounded-md"
      >
        agregar serie
      </button>
    </div>
  );
}

export async function action({ request }) {
  console.log("entro");

  let formData = Object.fromEntries(await request.formData());

  const { intent, finalWorkout } = formData;

  const parsedWorkout = JSON.parse(finalWorkout);

  if (intent === "save-workout") {
    try {
      const { error, data } = await supabase
        .from("workouts_exercises")
        .insert(parsedWorkout)
        .select("*");

      console.log("saving...");
      console.log(data);

      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  } else if (intent === "edit-workout") {
    console.log("editing workout");
  } else if (intent === "delete-workout") {
    console.log("deleting workout");
  }

  return null;
}

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

  return data;
}

export default Workout;

//   const isOk = true;

// simulated fetch
// async function getWorkout(id) {
//   console.log(id);
//   return new Promise((resolve, reject) => {
//     if (isOk) {
//       resolve(id);
//     }
//     reject("error");
//   });
// }

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
