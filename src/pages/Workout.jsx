import React, { useState } from "react";
import { useEffect } from "react";

//Routing
import { Link, redirect, useFetcher, useLoaderData } from "react-router-dom";

//Components
import SearchExerciseInput from "../components/SearchExerciseInput";

//Supabase client
import { supabase } from "../supabaseClient";

//React-icons
import { FaRegTrashAlt, FaTimes } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";

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

const exercisesPlaceholderData = [
  { id: 1, name: "push ups", body_part: "chest" },
  { id: 3, name: "rows", body_part: "back" },
  { id: 17, name: "declined push ups", body_part: "chest" },
  { id: 10, name: "bicep curls", body_part: "biceps" },
  { id: 6, name: "squats", body_part: "legs" },
];

const setsPlaceholderData = [
  {
    exercise_id: 1,
    set_id: 0,
    reps: 12,
    weight: 0,
  },
  {
    exercise_id: 1,
    set_id: 1,
    reps: 12,
    weight: 0,
  },
  {
    exercise_id: 1,
    set_id: 2,
    reps: 12,
    weight: 0,
  },
  {
    exercise_id: 3,
    set_id: 0,
    reps: 10,
    weight: 10,
  },
  {
    exercise_id: 3,
    set_id: 1,
    reps: 10,
    weight: 10,
  },
  {
    exercise_id: 3,
    set_id: 2,
    reps: 10,
    weight: 10,
  },
  {
    exercise_id: 6,
    set_id: 0,
    reps: 18,
    weight: 0,
  },
  {
    exercise_id: 10,
    set_id: 0,
    reps: 12,
    weight: 8,
  },
  {
    exercise_id: 10,
    set_id: 1,
    reps: 12,
    weight: 8,
  },
  {
    exercise_id: 10,
    set_id: 2,
    reps: 2,
    weight: 8,
  },
  {
    exercise_id: 17,
    set_id: 0,
    reps: 8,
    weight: 0,
  },
  {
    exercise_id: 17,
    set_id: 1,
    reps: 8,
    weight: 0,
  },
  {
    exercise_id: 17,
    set_id: 2,
    reps: 8,
    weight: 0,
  },
  {
    exercise_id: 17,
    set_id: 3,
    reps: 8,
    weight: 0,
  },
];

const Workout = () => {
  const workoutData = useLoaderData();

  const { data, data2 } = workoutData;

  const [loaderData] = data;

  // interact with loaders and actions without causing navigation
  const fetcher = useFetcher();

  const [workout, setWorkout] = useState([]);
  const [sets, setSets] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (data2.length === 0) return;
    //remove exerciseIds duplicates
    const [...exercisesIds] = new Set(data2.map((item) => item.exercise_id));

    //get a list of this workout exercises based on the list of exercisesIds
    const workoutExercises = exercises.filter((exercise) =>
      exercisesIds.includes(exercise.id)
    );

    //set to state the actual workout fetched exercises
    setWorkout(workoutExercises);
    //set to state the actual workout fetched sets, reps, weight per exercise
    setSets(data2);
  }, []);

  const addExercise = (exercise) => {
    const alreadyInWorkout = workout.find(
      (workoutExercise) => workoutExercise.id === exercise.id
    );

    if (alreadyInWorkout) return alert("El ejercicio ya esta en la rutina");

    setWorkout([...workout, exercise]);
    setSets(
      [
        ...sets,
        { exercise_id: exercise.id, set_id: 0, reps: 0, weight: 0 },
      ].sort((a, b) => a.exercise_id - b.exercise_id)
    );
  };

  const deleteExercise = (id) => {
    setWorkout(workout.filter((ex) => ex.id !== id));
    setSets(sets.filter((set) => set.exercise_id !== id));
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

    setSets(
      [
        ...sets,
        { exercise_id, set_id: lastSetId + 1, reps: 0, weight: 0 },
      ].sort((a, b) => a.exercise_id - b.exercise_id)
    );
  };

  const deleteSet = (setToDelete) => {
    const { exercise_id: setToDelete_exercise_id, set_id: setToDelete_id } =
      setToDelete;

    const setsCopy = [...sets];

    const exercise_id_sets = sets
      .filter(
        (set) =>
          set.exercise_id === setToDelete_exercise_id &&
          set.set_id !== setToDelete_id
      )
      .map((set, idx) => ({ ...set, set_id: idx }));

    const firstIndex = sets.findIndex(
      (set) => set.exercise_id === setToDelete_exercise_id
    );

    setsCopy.splice(
      firstIndex,
      exercise_id_sets.length + 1,
      ...exercise_id_sets
    );

    setSets([...setsCopy].sort((a, b) => a.exercise_id - b.exercise_id));
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

    let formData = new FormData();

    formData.append("finalWorkout", JSON.stringify(finalWorkout));
    formData.append("intent", "save-workout");

    fetcher.submit(formData, {
      method: "post",
      action: `/workouts/${loaderData.id}`,
    });
  };

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
        <div className="flex items-center mb-4">
          <h2 className="text-2xl font-bold">Exercises</h2>

          <div className="flex gap-2 ml-auto">
            {data2.length === 0 && workout.length !== 0 && (
              <>
                <fetcher.Form>
                  <button
                    type="button"
                    name="intent"
                    onClick={handleWorkoutSave}
                    value="save-workout"
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg"
                  >
                    Guardar entrenamiento
                  </button>
                </fetcher.Form>
              </>
            )}

            {data2.length !== 0 && (
              <fetcher.Form method="post" action={`/workouts/${loaderData.id}`}>
                <input
                  type="text"
                  value={loaderData.id}
                  name="workout_id"
                  hidden
                  readOnly
                />
                <button
                  type="submit"
                  name="intent"
                  value="delete-workout"
                  className="bg-red-600 text-sm sm:text-base text-white p-2 flex items-center justify-center gap-2 md:px-4 md:py-2 rounded-lg"
                >
                  <FaRegTrashAlt className="w-4 h-4" />
                  <span className="hidden md:block">
                    {fetcher.state === "submiting" ||
                    fetcher.state === "loading"
                      ? "Eliminando..."
                      : "Eliminar"}
                  </span>
                </button>
              </fetcher.Form>
            )}

            {data2.length !== 0 && workout.length !== 0 && (
              <>
                <fetcher.Form
                  method="post"
                  action={`/workouts/${loaderData.id}`}
                >
                  <input
                    type="text"
                    value={loaderData.id}
                    readOnly
                    hidden
                    name="workout_id"
                  />
                  <button
                    type="submit"
                    name="intent"
                    value="edit-workout"
                    className="bg-blue-600 text-white text-sm sm:text-base p-2 flex items-center justify-center gap-2 md:px-4 md:py-2 rounded-lg"
                  >
                    <BiEdit className="w-4 h-4" />
                    <span className="hidden md:block">
                      {fetcher.state === "submitting" ||
                      fetcher.state === "loading"
                        ? "Editando..."
                        : "Editar"}{" "}
                    </span>
                  </button>
                </fetcher.Form>
              </>
            )}
          </div>

          {data2.length === 0 ? (
            <button
              className="bg-emerald-600 text-white ml-2 px-4 py-2 rounded-lg"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              Agregar ejercicio
            </button>
          ) : null}
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
                <li key={ex.id}>
                  <WorkoutListExercise
                    exerciseName={ex.name}
                    addSet={addSet}
                    handleSetChange={handleSetChange}
                    deleteExercise={deleteExercise}
                    deleteSet={deleteSet}
                    sets={sets.filter((setEx) => setEx.exercise_id === ex.id)}
                    // canEdit={data2.length === 0}
                    canEdit={data2.length === 0}
                  />
                </li>
              ))
            : null}
        </ul>
      </section>
    </div>
  );
};

function WorkoutListExercise({
  exerciseName,
  addSet,
  handleSetChange,
  deleteExercise,
  deleteSet,
  sets,
  canEdit,
}) {
  const exercise_id = sets.at(0).exercise_id;

  const handleDelete = () => deleteExercise(exercise_id);

  return (
    <div className=" border-2 border-neutral-200 p-4 rounded-md">
      <p>{exerciseName}</p>

      {sets.map((set, idx) => {
        return (
          <div className="flex flex-col mt-2" key={set.set_id}>
            <div className="flex w-ful">
              <span className="w-10 h-10 flex-none grid place-content-center">
                {set.set_id + 1}
              </span>

              <div className="flex gap-2 items-center w-full justify-center">
                <label htmlFor="">reps</label>
                {canEdit ? (
                  <input
                    type="number"
                    name="reps"
                    value={set.reps}
                    onChange={(e) => handleSetChange(e, set)}
                    className="bg-neutral-200 rounded-md w-10 h-8 grid text-center text-sm"
                  />
                ) : (
                  <span className="bg-neutral-200 rounded-md w-10 h-8 grid place-items-center text-sm">
                    {set.reps}
                  </span>
                )}
              </div>

              <div className="flex gap-2 items-center w-full justify-center">
                <label htmlFor="">weight</label>
                {canEdit ? (
                  <input
                    type="number"
                    name="weight"
                    value={set.weight}
                    onChange={(e) => handleSetChange(e, set)}
                    className="bg-neutral-200 rounded-md w-10 h-8 grid text-center text-sm"
                  />
                ) : (
                  <span className="bg-neutral-200 rounded-md w-10 h-8 grid place-items-center text-sm">
                    {set.weight}
                  </span>
                )}
                <span className="text-sm text-neutral-200">Kg</span>
              </div>
              <div className="h-10 w-10 flex-none ">
                {sets.length > 1 && (
                  <button
                    onClick={() => deleteSet(set)}
                    className="h-10 w-10 grid flex-none rounded-md place-items-center hover:bg-red-100"
                  >
                    <FaTimes className="text-red-400" />
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {canEdit && (
        <>
          <button
            onClick={() => addSet(exercise_id)}
            className="place-self-start px-4 py-2 mt-4 bg-neutral-200 rounded-md"
          >
            agregar serie
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-300 px-4 py-2 mt-4 ml-2 rounded-md text-red-900"
          >
            eliminar ejercicio
          </button>
        </>
      )}
    </div>
  );
}

export async function action({ request }) {
  let formData = Object.fromEntries(await request.formData());

  const { intent } = formData;

  console.log("action intent: " + intent);

  if (intent === "save-workout") {
    const { finalWorkout } = formData;
    const parsedWorkout = JSON.parse(finalWorkout);

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
  }

  if (intent === "edit-workout") {
    const { workout_id } = formData;

    await new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("edting...");
        console.log("The workout id is: " + workout_id);
        resolve();
      }, 3000);
    });
  }

  if (intent === "delete-workout") {
    const { workout_id } = formData;
    console.log("deleting...");
    try {
      const { error, data } = await supabase
        .from("workouts")
        .delete()
        .eq("id", workout_id)
        .select();

      if (error) throw error;

      return redirect("/");
    } catch (error) {
      console.log(error);
    }
  }

  return null;
}

export async function loader({ params }) {
  // console.log(params.id);
  try {
    const { error, data } = await supabase
      .from("workouts")
      .select("*")
      .eq("id", params.id);

    const { error: error2, data: data2 } = await supabase
      .from("workouts_exercises")
      .select("*")
      .eq("workout_id", params.id);

    // const { error, data } = await supabase
    // .from("workouts_exercises")
    // .select("")
    // .eq("id", params.id);

    if (data.length === 0) throw new Response("Not Found", { status: 404 });

    if (error || error2) throw error;

    return { data, data2 };
  } catch (error) {
    console.log(error);
  }
}

export default Workout;

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
