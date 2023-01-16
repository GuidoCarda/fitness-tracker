import { createContext, useState } from "react";
import { supabase } from "../supabaseClient";

export const WorkoutsContext = createContext();

export const WorkoutsProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);

  console.log(workouts);

  const randomId = () => {
    return Math.floor(Math.random() * 10000000);
  };

  const createWorkout = async (workoutName) => {
    try {
      const { error, data } = await supabase
        .from("workouts")
        .insert({
          name: workoutName,
        })
        .select("*");

      if (error) throw error;

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getWorkouts = (data) => {
    setWorkouts([...data]);
  };

  const addWorkout = (newWorkout) => {
    const workout = {
      id: randomId(),
      name: newWorkout,
      date: new Date(),
      exercises: [],
    };
    setWorkouts([...workouts, workout]);
  };

  const addExercise = (workoutId, exercise) => {
    //Check if an exercise already exists in the workout

    const newExercise = {
      id: 1,
      nombre: exercise,
      body_part: "test",
    };

    const editedWorkout = workouts.map((w) => {
      return w.id === workoutId
        ? { ...w, exercises: [...w.exercises, newExercise] }
        : w;
    });

    setWorkouts(editedWorkout);
    console.log(editedWorkout);
  };

  // const deleteWorkout = (id) => {
  //   setWorkouts(workouts.filter((workout) => workout.id !== id));
  // };

  const deleteWorkout = async (id) => {
    console.log(id);
    const res = await supabase.from("workouts").delete().eq("id", id);
    console.log(res);
  };

  return (
    <WorkoutsContext.Provider
      value={{
        workouts,
        addWorkout,
        deleteWorkout,
        addExercise,
        createWorkout,
        getWorkouts,
      }}
    >
      {children}
    </WorkoutsContext.Provider>
  );
};
