import { useState } from "react";

import "./App.css";
import exercisesList from "./exercices";

function App() {
  const [series, setSeries] = useState([]);
  const [exercises, setExercises] = useState([]);

  console.log(exercises);

  const handleAddSerie = () => {
    setSeries([
      ...series,
      {
        serie: series.length + 1,
        reps: Math.floor(Math.random() * (16 - 8 + 1) + 8),
      },
    ]);
  };

  const handleAddExercise = () => {
    setExercises([
      ...exercises,
      {
        id: Math.floor(Math.random() * (100 - 0 + 1) + 0),
        name: "ejemplo",
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white pb-20">
      <div className=" rounded-md flex flex-col gap-4 px-4 py-8  max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Rutina</h1>

        {/* <div className="rounded-md p-4 bg-neutral-800">
          <div>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold">Push ups</h2>

              <button
                onClick={handleAddSerie}
                className="ml-auto py-2 px-4 bg-emerald-700 rounded-md font-bold"
              >
                add series
              </button>
            </div>

            <ul className="flex flex-col gap-4">
              {series.map((item) => (
                <li
                  key={item.serie}
                  className="flex items-center justify gap-10 py-6 px-4 border-2 rounded-md border-white/25"
                >
                  <div className="flex items-center">
                    <p className="text-neutral-200 mr-2">serie</p>
                    <span className="text-2xl font-bold">{item.serie}</span>
                  </div>

                  <div className="flex items-center">
                    <p className="text-2xl font-bold">{item.reps}</p>
                    <span className="ml-2">reps</span>
                  </div>

                  <button className="ml-auto text-neutral-400 hover:bg-neutral-700 py-2 px-4 rounded-md">
                    editar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-md p-4 bg-neutral-800">
          <div>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold">Rows</h2>

              <button className="ml-auto py-2 px-4 bg-emerald-700 rounded-md font-bold">
                add series
              </button>
            </div>

            <ul className="flex flex-col gap-2">
              {Array(3)
                .fill("")
                .map((item) => (
                  <li className="flex items-center justify gap-10 py-6 px-4 border-2 rounded-md border-white/25">
                    <div className="flex items-center">
                      <p className="text-neutral-200 mr-2">serie</p>
                      <span className="text-2xl font-bold">1</span>
                    </div>

                    <div className="flex items-center">
                      <p className="text-2xl font-bold">20</p>
                      <span className="ml-2">reps</span>
                    </div>

                    <button className="ml-auto text-neutral-400 hover:bg-neutral-700 py-2 px-4 rounded-md">
                      editar
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div> */}

        <div className="flex flex-col gap-6">
          {exercises.map((exercise) => (
            <div className="rounded-md p-4 bg-neutral-800">
              <div>
                <div className="flex items-center mb-4">
                  <h2 className="text-2xl font-bold">Push ups</h2>

                  <button
                    onClick={() => handleAddSerie(exercise.id)}
                    className="ml-auto py-2 px-4 bg-emerald-700 rounded-md font-bold"
                  >
                    add series
                  </button>
                </div>

                <ul className="flex flex-col gap-4">
                  {series.lenght === 0 ? (
                    <h2 className="text-xl font-bold text-neutral-400">
                      Aun no hay series cargadas
                    </h2>
                  ) : (
                    series.map((item) => (
                      <li
                        key={item.serie}
                        className="flex items-center justify gap-10 py-6 px-4 border-2 rounded-md border-white/25"
                      >
                        <div className="flex items-center">
                          <p className="text-neutral-200 mr-2">serie</p>
                          <span className="text-2xl font-bold">
                            {item.serie}
                          </span>
                        </div>

                        <div className="flex items-center">
                          <p className="text-2xl font-bold">{item.reps}</p>
                          <span className="ml-2">reps</span>
                        </div>

                        <button className="ml-auto text-neutral-400 hover:bg-neutral-700 py-2 px-4 rounded-md">
                          editar
                        </button>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {exercisesList.map(({ name, type, bodyparts }) => (
            <div className="flex flex-col gap-4  border-2 border-neutral-700 rounded-md px-4 py-4">
              {" "}
              <div className="flex items-center justify-between">
                <span className="capitalize text-2xl font-bold">{name}</span>
                <span className="uppercase tracking-widest text-neutral-400">
                  {type}
                </span>
              </div>
              <ul className="flex gap-2">
                {bodyparts.map((bp) => (
                  <li className="px-4 py-1 bg-black/70 hover:bg-emerald-500/20 border-2 border-white/10 font-bold rounded-md">
                    {bp}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleAddExercise}
        className="fixed z-10 bottom-4 right-4 bg-emerald-600 font-bold px-6 py-4 rounded-md"
      >
        add exercise
      </button>
    </div>
  );
}

export default App;
