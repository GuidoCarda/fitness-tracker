import { useState } from "react";

import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">
      <div className=" rounded-md bg-neutral-800 mx-auto flex flex-col gap-4 px-4 py-8">
        <div>
          <h2 className="text-2xl font-bold">Push ups</h2>

          <span>10</span>
          <button className="py-2 px-4 bg-emerald-700 rounded-md font-bold">
            add reps
          </button>
        </div>

        <div>
          <h2 className="text-2xl font-bold">Rows</h2>
          <span>12</span>
          <button className="py-2 px-4 bg-emerald-700 rounded-md font-bold">
            add reps
          </button>
        </div>

        <div>
          <h2 className="text-2xl font-bold">Rows</h2>
          <span>10</span>
          <button className="py-2 px-4 bg-emerald-700 rounded-md font-bold">
            add reps
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
