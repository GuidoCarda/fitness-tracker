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
import ProtectedRoutes, {
  loader as authLoader,
} from "./pages/ProtectedRoutes";
import Dashboard, { Profile, Settings } from "./pages/Dashboard";
import LogIn, { action as loginAction } from "./pages/LogIn";

import { AnimatePresence } from "framer-motion";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<RootLayout />}
        errorElement={<ErrorPage />}
      >
        <Route index path="/" element={<TestPage />} />
        <Route
          path="login"
          element={<LogIn />}
          action={loginAction}
        />
        <Route
          path={"/"}
          // loader={authLoader}
          element={<ProtectedRoutes />}
        >
          <Route
            index
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

          <Route path="dashboard">
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Route>
    )
  );

  return (
    <>
      <AnimatePresence mode="wait">
        <RouterProvider router={router} />
      </AnimatePresence>
    </>
  );
}
export default App;

function TestPage() {
  return (
    <div className="">
      <div className="py-32  bg-slate-200 rounded-lg text-center">
        <h1 className="text-3xl font-bold">Fitness tracker</h1>
        <p>Esta es una app destinada a trackear tus entrenamientos</p>
        <button className="mt-6 bg-slate-600 text-white py-2 px-6 rounded-md">
          Iniciar sesion
        </button>
      </div>

      <section className="py-20 text-center">
        <h2 className="text-2xl mb-4 ">Sobre esta app</h2>
        <p className="max-w-lg mb-2 mx-auto">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Omnis ex, in doloremque accusantium deserunt commodi vero,
          dolore dignissimos odit repellendus ad. Id omnis porro fugit
        </p>
        <p className="max-w-lg mx-auto">
          ad cupiditate assumenda, dignissimos quas necessitatibus
          tempora repellat iusto, amet saepe totam architecto ipsam
          cum eos! Temporibus magni corporis voluptas beatae maxime
          iusto, optio sit.
        </p>
      </section>

      <section className="py-20 text-center">
        <h2 className="text-2xl mb-4 ">Features</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className=" bg-slate-200 rounded-lg"></div>
          <div className=" bg-slate-200 rounded-lg"></div>
          <div className=" bg-slate-200 rounded-lg"></div>
        </div>
        <p className="max-w-lg mb-2 mx-auto">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Omnis ex, in doloremque accusantium deserunt commodi vero,
          dolore dignissimos odit repellendus ad. Id omnis porro fugit
        </p>
        <p className="max-w-lg mx-auto">
          ad cupiditate assumenda, dignissimos quas necessitatibus
          tempora repellat iusto, amet saepe totam architecto ipsam
          cum eos! Temporibus magni corporis voluptas beatae maxime
          iusto, optio sit.
        </p>
      </section>
    </div>
  );
}
