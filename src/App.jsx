import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
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
  action as authAction,
} from "./pages/ProtectedRoutes";
import Dashboard, {
  Profile,
  Settings,
  loader as profileLoader,
} from "./pages/Dashboard";
import LogIn, { action as loginAction } from "./pages/LogIn";

import { motion, AnimatePresence } from "framer-motion";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<RootLayout />}
        errorElement={<ErrorPage />}
      >
        <Route index element={<LandingPage />} />
        <Route
          path="login"
          element={<LogIn />}
          action={loginAction}
        />
        <Route
          path={"workouts"}
          element={<ProtectedRoutes />}
          loader={authLoader}
        >
          <Route
            index
            element={<Home />}
            loader={workoutsLoader}
            action={createWorkout}
          />
          <Route
            path=":id"
            element={<Workout />}
            loader={workoutLoader}
            action={workoutActions}
          />
          <Route path="delete" action={deleteWorkouts} />
          <Route path="dashboard">
            <Route path="entrenamientos" element={<Dashboard />} />
            <Route
              path="home"
              element={<Profile />}
              loader={profileLoader}
            />
            <Route path="perfil" element={<Profile />} />
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

function LandingPage() {
  return (
    <motion.div
      className=""
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-slate-200  text-center bg-[url('assets/hero.png')] bg-[center_top_-6rem] bg-no-repeat overflow-hidden rounded-2xl ">
        <div className="py-40 bg-black/50  text-white backdrop-blur-sm">
          <h1 className="text-3xl font-bold">Fitness tracker</h1>
          <p>
            Esta es una app destinada a trackear tus entrenamientos
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Link
              to="workouts"
              className="block w-max bg-black/20 backdrop-blur-xs text-white py-2 px-6 rounded-md"
            >
              Iniciar sesion
            </Link>
            <Link
              to="workouts"
              className="block w-max bg-emerald-500 text-black py-2 px-6 rounded-md"
            >
              Crear Cuenta
            </Link>
          </div>
        </div>
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
    </motion.div>
  );
}
