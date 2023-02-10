import React from "react";

//Ui animations
import { motion } from "framer-motion";
import { supabase } from "../supabaseClient";

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      Dashboard
    </motion.div>
  );
};

export default Dashboard;

export const Profile = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      Profile
    </motion.div>
  );
};

export const Settings = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      Settings
    </motion.div>
  );
};

export async function loader() {
  try {
    const response = await supabase.auth.getUser();
    console.log("profile loader");
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}
