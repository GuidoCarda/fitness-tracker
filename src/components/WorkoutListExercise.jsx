import { FaTimes } from "react-icons/fa";

function WorkoutListExercise({
  exerciseName,
  addSet,
  handleSetChange,
  deleteExercise,
  deleteSet,
  sets,
  canEdit,
}) {
  const exercise_id = sets.at(0).exercise_id;

  const handleDelete = () => deleteExercise(exercise_id);

  return (
    <div>
      <h2 className="text-2xl capitalize mb-4 font-semibold">
        {exerciseName}
      </h2>
      <div className="bg-white p-4 rounded-md divide-y-2 divide-neutral-100">
        {sets.map((set, idx) => {
          return (
            <div className="flex flex-col p-2" key={set.set_id}>
              <div className="flex w-ful">
                <span className="w-10 h-10 flex-none grid place-content-center">
                  {set.set_id + 1}
                </span>

                <div className="flex gap-2 items-center w-full justify-center">
                  {canEdit ? (
                    <input
                      type="number"
                      name="reps"
                      value={set.reps}
                      onChange={(e) => handleSetChange(e, set)}
                      className="bg-neutral-200 rounded-md w-10 h-8 grid text-center text-sm"
                    />
                  ) : (
                    <span className="bg-neutral-200 rounded-md w-10 h-8 grid place-items-center text-sm">
                      {set.reps}
                    </span>
                  )}
                  <label
                    htmlFor="reps"
                    className="uppercase tracking-wide text-[#8E939F]"
                  >
                    reps
                  </label>
                </div>

                <div className="flex gap-2 items-center w-full justify-center">
                  <label htmlFor="">weight</label>
                  {canEdit ? (
                    <input
                      type="number"
                      name="weight"
                      value={set.weight}
                      onChange={(e) => handleSetChange(e, set)}
                      className="bg-neutral-200 rounded-md w-10 h-8 grid text-center text-sm"
                    />
                  ) : (
                    <span className="bg-neutral-200 rounded-md w-10 h-8 grid place-items-center text-sm">
                      {set.weight}
                    </span>
                  )}
                  <span className="text-sm text-[#8E939F]">Kg</span>
                </div>
                <div className="h-10 w-10 flex-none ">
                  {sets.length > 1 && canEdit && (
                    <button
                      onClick={() => deleteSet(set)}
                      className="h-10 w-10 grid flex-none rounded-md place-items-center hover:bg-red-100"
                    >
                      <FaTimes className="text-red-400" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {canEdit && (
          <>
            <button
              onClick={() => addSet(exercise_id)}
              className="place-self-start px-4 py-2 mt-4 bg-neutral-200 rounded-md"
            >
              agregar serie
            </button>

            <button
              onClick={handleDelete}
              className="bg-red-300 px-4 py-2 mt-4 ml-2 rounded-md text-red-900"
            >
              eliminar ejercicio
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default WorkoutListExercise;
