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
    };
    setWorkouts([...workouts, workout]);
  };

  const addExercise = (workoutId, exercise) => {
    // const workout = workouts.find(w=>w.id === workoutId);
    // workout[exercise] = {}

    const editedWorkout = workouts.map((w) => {
      return w.id === workoutId ? { ...w, exercise } : w;
    });
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
