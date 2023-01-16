import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Workout from "./pages/Workout";
import Home, { loader as workoutsLoader } from "./pages/Home";
import { loader as workoutLoader } from "./pages/Workout";
import ErrorPage from "./pages/Error";
import { WorkoutsContext } from "./context/WorkoutsContext";
import { useContext } from "react";

function App() {
  const { workouts } = useContext(WorkoutsContext);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
        <Route index element={<Home />} loader={workoutsLoader} />
        <Route
          path="workouts/:id"
          element={<Workout />}
          loader={workoutLoader}
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
export default App;
