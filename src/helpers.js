// Populate supabase table with exercises from a JSON file
export const pushExercises = async () => {
  try {
    exercises.forEach(async (value) => {
      const { error, data } = await supabase
        .from("exercises")
        .insert({
          name: value.name,
          body_part: value.body_part,
        })
        .select("*");

      if (error) throw error;
      console.log(data);
    });
  } catch (error) {
    console.log(error);
  }
};
