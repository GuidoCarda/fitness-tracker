import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useContext } from "react";

//Routing
import {
  Form,
  Link,
  redirect,
  useFetcher,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { WorkoutsContext } from "../context/WorkoutsContext";
import { supabase } from "../supabaseClient";

const Home = () => {
  const [newWorkout, setNewWorkout] = useState(false);

  const toggleNewWorkout = () => {
    setNewWorkout(!newWorkout);
  };

  const { workouts, createWorkout, deleteWorkout, getWorkouts } =
    useContext(WorkoutsContext);

  const loaderData = useLoaderData();
  const fetcher = useFetcher();
  const navigation = useNavigation();

  // console.log("Navigation state -> " + navigation.state);
  // console.log("Fetcher state -> " + fetcher.state);

  return (
    <motion.div
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      className={""}
    >
      <div className="flex items-center justify-between font">
        <h1 className=" text-2xl md:text-4xl font-bold ">
          Entrenamientos
        </h1>

        <button
          className="bg-emerald-600 text-white text-sm sm:text-base px-2 py-1 sm:px-4 sm:py-2 rounded-lg"
          onClick={() => setNewWorkout(!newWorkout)}
        >
          Nuevo Entrenamiento
        </button>
      </div>

      <AnimatePresence>
        {newWorkout && (
          <WorkoutInput
            createWorkout={createWorkout}
            handleToggle={toggleNewWorkout}
          />
        )}
      </AnimatePresence>

      <motion.section layout>
        <div className="flex mt-10">
          {loaderData.length !== 0 ? (
            <fetcher.Form
              className="ml-auto"
              method="delete"
              action={`/workouts/delete`}
            >
              <button
                disabled={navigation.state === "submitting"}
                className=" bg-red-300/70 border-2 text-sm sm:text-base border-red-300 text-red-800 px-2 py-1 sm:px-4 sm:py-2  rounded-lg font-bold disabled:bg-neutral-200 disabled:border-neutral-300 disabled:text-neutral-300"
              >
                Eliminar todos
              </button>
            </fetcher.Form>
          ) : null}
        </div>

        <ul className="flex flex-col gap-4 mt-4">
          {loaderData.length !== 0 ? (
            loaderData.map((workout, idx) => (
              <li
                key={idx}
                className="bg-white h-24  rounded-lg flex items-center justify-between hover:shadow-md hover:shadow-[#E2E2F3]"
              >
                <Link
                  className=" h-full w-full p-4 flex justify-center flex-col "
                  to={`${workout?.id}`}
                >
                  {workout.name}
                  <span className="text-sm text-[#8E939F]">
                    12/02/23
                  </span>
                </Link>
              </li>
            ))
          ) : (
            <li>Aun no hay entrenamientos disponibles</li>
          )}
        </ul>
      </motion.section>
    </motion.div>
  );
};

export default Home;

export async function loader() {
  try {
    const { error, data } = await supabase
      .from("workouts")
      .select()
      .order("created_at", { ascending: false });

    if (error) throw error;

    // console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function createAction({ request }) {
  console.log("Accion con Form/Navigation");

  let formValue = Object.fromEntries(await request.formData());

  try {
    const { error, data } = await supabase
      .from("workouts")
      .insert({
        name: formValue["workout-name"],
      })
      .select("*");

    if (error) throw error;

    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });

    const [workout] = data;

    return redirect(`/workouts/${workout.id}`);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteAction({ params }) {
  console.log("Accion con fetcher.Form/fetcher");

  try {
    const { error, data } = await supabase
      .from("workouts")
      .delete()
      .neq("id", 0);

    if (error) throw error;

    return data;
  } catch (error) {
    console.log(error);
  }
}

function WorkoutInput() {
  const [name, setName] = useState("");
  const navigation = useNavigation();

  const busy =
    navigation.state === "submitting" ||
    navigation.state === "loading";

  return (
    <motion.div
      key="new"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      // transition={{ duration: 1 }}
    >
      <Form
        method="post"
        action="/workouts"
        className="bg-white px-6 py-8 flex flex-col mt-6 rounded-md"
      >
        <h2 className="text-2xl font-semibold mb-4">
          Nuevo Entrenamiento
        </h2>

        <div className="flex flex-col">
          <label htmlFor="" className="mb-1">
            Nombre
          </label>
          <input
            className="border-2 border-neutral-300 out  rounded-md h-10 p-2"
            type="text"
            value={name}
            name="workout-name"
            onChange={(e) => setName(e.currentTarget.value)}
            readOnly={busy}
            disabled={busy}
          />
        </div>

        <button
          disabled={name.length === 0 || busy}
          className="mt-4 ml-auto bg-emerald-600 text-white px-4 py-2 rounded-lg disabled:bg-neutral-500 disabled:text-neutral-300"
        >
          {busy ? "Creando" : "Crear"}
        </button>
      </Form>
    </motion.div>
  );
}
