import { useState } from "react";

import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <div className=" rounded-md flex flex-col gap-4 px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Rutina</h1>

        <div className="rounded-md p-4 bg-neutral-800">
          <div>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold">Push ups</h2>

              <button className="ml-auto py-2 px-4 bg-emerald-700 rounded-md font-bold">
                add series
              </button>
            </div>

            <ul className="flex flex-col gap-4">
              {Array(4)
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
        </div>
      </div>
    </div>
  );
}

export default App;
