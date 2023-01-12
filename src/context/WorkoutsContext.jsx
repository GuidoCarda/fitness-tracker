import { createContext, useState } from "react";

export const WorkoutsContext = createContext();

export const WorkoutsProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);

  const randomId = () => {
    return Math.floor(Math.random() * 10000000);
  };

  const addWorkout = (newWorkout) => {
    const workout = {
      id: randomId(),
      name: newWorkout,
    };

    console.log(workout.id);
    setWorkouts([...workouts, workout]);
  };

  const deleteWorkout = (id) => {
    console.log(workouts.filter((workout) => workout.id !== id));
    setWorkouts(workouts.filter((workout) => workout.id !== id));
  };

  return (
    <WorkoutsContext.Provider value={{ workouts, addWorkout, deleteWorkout }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
