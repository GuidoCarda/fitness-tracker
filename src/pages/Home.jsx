import React, { useState, useContext } from "react";

//Routing
import {
  Form,
  Link,
  redirect,
  useFetcher,
  useLoaderData,
  useSubmit,
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
  let submit = useSubmit();

  // const deleteWorkoutTest = () => {
  //   console.log(data);
  //   submit(data, {
  //     method: "delete",
  //     action: `/workouts/${data.id}/delete`,
  //   });
  // };

  return (
    <div>
      <div className="flex items-center justify-between font">
        <h1 className=" text-2xl md:text-4xl font-bold ">Entrenamientos</h1>

        <button
          className="bg-emerald-600 text-white text-sm md:text-base  px-2  md:px-4 md:py-2 rounded-lg"
          onClick={() => setNewWorkout(!newWorkout)}
        >
          Nuevo Entrenamiento
        </button>
      </div>

      {newWorkout && (
        <WorkoutInput
          createWorkout={createWorkout}
          handleToggle={toggleNewWorkout}
        />
      )}

      <section>
        <div className="flex mt-10">
          {loaderData.length !== 0 ? (
            <fetcher.Form
              className="ml-auto"
              method="delete"
              action={`/workouts/delete`}
            >
              <button className=" bg-red-300/70 border-2 border-red-300 text-red-800 px-4 py-1 rounded-lg font-bold">
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
                className="border-2 border-neutral-400 h-24  rounded-lg flex items-center justify-between"
              >
                <Link
                  className=" h-full w-full p-4 flex items-center"
                  to={`/workouts/${workout?.id}`}
                >
                  {workout.name}
                </Link>

                {/* <fetcher.Form
                  method="delete"
                  action={`/workouts/delete`}
                >
                  <button
                    type="submit"
                    className="h-10 w-10 bg-neutral-500 rounded-md grid place-content-center"
                  >
                    x
                  </button>
                </fetcher.Form> */}
              </li>
            ))
          ) : (
            <li>Aun no hay entrenamientos disponibles</li>
          )}
        </ul>
      </section>
    </div>
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

    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function createAction({ request }) {
  let formValue = Object.fromEntries(await request.formData());

  try {
    const { error, data } = await supabase
      .from("workouts")
      .insert({
        name: formValue["workout-name"],
      })
      .select("*");

    if (error) throw error;

    const [workout] = data;

    return redirect(`/workouts/${workout.id}`);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteAction({ params }) {
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

  return (
    <>
      <Form
        method="post"
        action="/"
        className="bg-neutral-100 px-6 py-8 flex flex-col mt-6 rounded-md"
      >
        <h2 className="text-2xl font-semibold mb-4">Nuevo Entrenamiento</h2>

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
          />
        </div>

        <button
          disabled={name.length === 0}
          className="mt-4 ml-auto bg-emerald-600 text-white px-4 py-2 rounded-lg disabled:bg-neutral-500 disabled:text-neutral-300"
        >
          Crear
        </button>
      </Form>
    </>
  );
}
