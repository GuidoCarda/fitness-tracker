import React, { useState, useTransition } from "react";
import { useEffect } from "react";

//UI Animations
import { motion } from "framer-motion";

//Routing
import {
  Link,
  redirect,
  useFetcher,
  useLoaderData,
} from "react-router-dom";

//Components
import SearchExerciseInput from "../components/SearchExerciseInput";

//Supabase client
import { supabase } from "../supabaseClient";

//React-icons
import { FaRegTrashAlt } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import WorkoutListExercise from "../components/WorkoutListExercise";
import { exercises } from "../exercices";

const dummyData = [
  {
    exercise_id: 1,
    set_id: 0,
    reps: 0,
    weight: 0,
  },
  {
    exercise_id: 1,
    set_id: 1,
    reps: 0,
    weight: 0,
  },
  {
    exercise_id: 1,
    set_id: 2,
    reps: 0,
    weight: 0,
  },
  {
    exercise_id: 1,
    set_id: 3,
    reps: 0,
    weight: 0,
  },
  {
    exercise_id: 1,
    set_id: 4,
    reps: 0,
    weight: 0,
  },
  {
    exercise_id: 1,
    set_id: 5,
    reps: 0,
    weight: 0,
  },
  {
    exercise_id: 1,
    set_id: 6,
    reps: 0,
    weight: 0,
  },
  {
    exercise_id: 1,
    set_id: 7,
    reps: 0,
    weight: 0,
  },
  {
    exercise_id: 1,
    set_id: 8,
    reps: 0,
    weight: 0,
  },
  {
    exercise_id: 1,
    set_id: 9,
    reps: 0,
    weight: 0,
  },
  {
    exercise_id: 1,
    set_id: 10,
    reps: 0,
    weight: 0,
  },
  {
    exercise_id: 1,
    set_id: 11,
    reps: 0,
    weight: 0,
  },
  {
    exercise_id: 1,
    set_id: 12,
    reps: 0,
    weight: 0,
  },
  {
    exercise_id: 1,
    set_id: 13,
    reps: 0,
    weight: 0,
  },
  {
    exercise_id: 1,
    set_id: 14,
    reps: 0,
    weight: 0,
  },
  {
    exercise_id: 1,
    set_id: 15,
    reps: 0,
    weight: 0,
  },
];

const Workout = () => {
  const workoutData = useLoaderData();

  const { data, data2 } = workoutData;

  const [loaderData] = data;

  // interact with loaders and actions without causing navigation
  const fetcher = useFetcher();

  console.log(fetcher.state);

  const isSaving =
    fetcher.state === "submitting" || fetcher.state === "loading";

  console.log("isSaving: " + isSaving);

  const [workout, setWorkout] = useState([
    {
      id: 1,
      name: "push ups",
      body_part: "chest",
    },
  ]);
  const [sets, setSets] = useState(dummyData);
  const [isOpen, setIsOpen] = useState(false);

  console.log(sets);
  console.log(workout);

  useEffect(() => {
    if (data2.length === 0) return;
    //remove exerciseIds duplicates
    const [...exercisesIds] = new Set(
      data2.map((item) => item.exercise_id)
    );

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

    if (alreadyInWorkout)
      return alert("El ejercicio ya esta en la rutina");

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
    const {
      exercise_id: setToDelete_exercise_id,
      set_id: setToDelete_id,
    } = setToDelete;

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

    setSets(
      [...setsCopy].sort((a, b) => a.exercise_id - b.exercise_id)
    );
  };

  const handleSetChange = (e, set) => {
    const { value, name: fieldName } = e.currentTarget;

    const { exercise_id, set_id } = set;

    setSets(
      sets.map((set) => {
        if (
          set.exercise_id === exercise_id &&
          set.set_id === set_id
        ) {
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold">Entrenamiento</h1>

          <span className="text-sm text-[#8E93A0] ">
            Creado el 12/02/23
          </span>
        </div>

        <div className="flex gap-2 ml-auto">
          {data2.length === 0 && workout.length !== 0 && (
            <>
              <fetcher.Form>
                <button
                  type="button"
                  name="intent"
                  onClick={handleWorkoutSave}
                  value="save-workout"
                  disabled={isSaving}
                  className="bg-[#18B984] text-white px-4 py-2 rounded-lg disabled:bg-emerald-400"
                >
                  {isSaving ? "Guardando" : "Guardar Entrenamiento"}
                </button>
              </fetcher.Form>
            </>
          )}

          {data2.length !== 0 && (
            <fetcher.Form
              method="post"
              action={`/workouts/${loaderData.id}`}
            >
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

        {data2.length === 0 && !isSaving ? (
          <button
            className="bg-[#18B984] text-white ml-2 px-4 py-2 rounded-lg"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            Agregar ejercicio
          </button>
        ) : null}
      </div>

      <section className="mt-10 ">
        {isOpen && (
          <SearchExerciseInput
            addExercise={addExercise}
            setIsOpen={setIsOpen}
          />
        )}

        <ul className="flex flex-col gap-8 mt-6">
          {workout.length !== 0 ? (
            workout.map((ex) => (
              <li key={ex.id}>
                <WorkoutListExercise
                  exerciseName={ex.name}
                  addSet={addSet}
                  handleSetChange={handleSetChange}
                  deleteExercise={deleteExercise}
                  deleteSet={deleteSet}
                  sets={sets.filter(
                    (setEx) => setEx.exercise_id === ex.id
                  )}
                  canEdit={data2.length === 0 && !isSaving}
                />
              </li>
            ))
          ) : (
            <li> Aun no hay ningun ejercicio! </li>
          )}
        </ul>
      </section>
    </motion.div>
  );
};

export async function action({ request }) {
  let formData = Object.fromEntries(await request.formData());

  const { intent } = formData;

  console.log("action intent: " + intent);

  if (intent === "save-workout") {
    const { finalWorkout } = formData;
    const parsedWorkout = JSON.parse(finalWorkout);

    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });

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

      return redirect("/workouts");
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

    if (data.length === 0)
      throw new Response("Not Found", { status: 404 });

    if (error || error2) throw error;

    return { data, data2 };
  } catch (error) {
    console.log(error);
  }
}

export default Workout;
