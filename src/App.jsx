import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Workout from "./pages/Workout";
import Home, {
  loader as workoutsLoader,
  createAction as createWorkout,
  deleteAction as deleteWorkouts,
} from "./pages/Home";
import {
  loader as workoutLoader,
  action as workoutActions,
} from "./pages/Workout";
import ErrorPage from "./pages/Error";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
        <Route
          path="/"
          element={<Home />}
          loader={workoutsLoader}
          action={createWorkout}
        />
        <Route
          path="workouts/:id"
          element={<Workout />}
          loader={workoutLoader}
          action={workoutActions}
        />
        <Route path="workouts/delete" action={deleteWorkouts} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
export default App;
