import { createContext, useState } from "react";

export const WorkoutsContext = createContext();

export const WorkoutsProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);

  console.log(workouts);

  const randomId = () => {
    return Math.floor(Math.random() * 10000000);
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
      nombre: exercise,
      sets: [],
    };

    const editedWorkout = workouts.map((w) => {
      return w.id === workoutId
        ? { ...w, exercises: [...w.exercises, newExercise] }
        : w;
    });

    setWorkouts(editedWorkout);
    console.log(editedWorkout);
  };

  const deleteWorkout = (id) => {
    setWorkouts(workouts.filter((workout) => workout.id !== id));
  };

  return (
    <WorkoutsContext.Provider
      value={{ workouts, addWorkout, deleteWorkout, addExercise }}
    >
      {children}
    </WorkoutsContext.Provider>
  );
};
