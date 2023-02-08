const signUp = async () => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: "test@email.com",
      password: "example-password",
    });

    if (error) throw error;

    return data;
  } catch (error) {
    console.log(error);
  }
};

const logIn = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "test@email.com",
      password: "example-password",
    });

    if (error) throw error;

    return data;
  } catch (error) {
    console.log(error);
  }
};

const logOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
  } catch (error) {
    console.log(error);
  }
};

export default { signUp, logIn, logOut };
