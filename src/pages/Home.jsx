import React, { useState } from "react";

const Home = () => {
  const [newWorkout, setNewWorkout] = useState(false);
  const [workouts, setWorkouts] = useState([]);

  console.log(workouts);

  const toggleNewWorkout = () => {
    setNewWorkout(!newWorkout);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold ">Entrenamientos</h1>
        <button
          className="bg-cyan-700 text-white px-4 py-1 rounded-lg"
          onClick={() => setNewWorkout(!newWorkout)}
        >
          Nuevo Entrenamiento
        </button>
      </div>

      {newWorkout && (
        <WorkoutInput
          setWorkouts={setWorkouts}
          workouts={workouts}
          handleToggle={toggleNewWorkout}
        />
      )}

      <ul className="flex flex-col gap-4 mt-10">
        {workouts.length !== 0 ? (
          workouts.map((workout, idx) => (
            <li
              key={idx}
              className="border-2 border-neutral-400 h-24 p-4 rounded-lg"
            >
              {workout.name}
            </li>
          ))
        ) : (
          <li>Aun no hay entrenamientos disponibles</li>
        )}
      </ul>
    </div>
  );
};

export default Home;

function WorkoutInput({ setWorkouts, workouts, handleToggle }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    setWorkouts([...workouts, { name }]);
    handleToggle();

    setName("");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="border-2 px-6 py-8 flex flex-col mt-6 rounded-md bg-white"
      >
        <h2 className="text-2xl font-semibold mb-4">Nuevo Entrenamiento</h2>

        <div className="flex flex-col">
          <label htmlFor="" className="mb-1">
            Nombre
          </label>
          <input
            className="border-2 border-neutral-600 rounded-md h-10 p-2"
            type="text"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </div>

        <button className="mt-4 ml-auto bg-cyan-700 text-white px-4 py-1 rounded-lg">
          Crear
        </button>
      </form>
    </>
  );
}
