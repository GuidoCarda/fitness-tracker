import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-neutral-900 text-white grid place-content-center">
      <h1 className="text-4xl">Fitness Tracker</h1>
    </div>
  );
}

export default App;
