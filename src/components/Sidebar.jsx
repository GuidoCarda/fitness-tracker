import React from "react";
import { Link, NavLink } from "react-router-dom";

const sideBarLinks = ["home", "entrenamientos", "perfil", "settings"];

const Sidebar = () => {
  return (
    <aside className="bg-white min-h-full p-4 w-64 ">
      <span className="block font-bold text-2xl my-10">
        Fitness Tracker
      </span>
      <ul className="flex flex-col gap-2">
        {sideBarLinks.map((link) => (
          <li>
            <NavLink
              to={`/workouts/dashboard/${link}`}
              className={({ isActive }) =>
                `${
                  isActive ? "bg-[#18B984] text-white" : ""
                } flex w-full h-12 rounded-md items-center px-4 focus:outline-[#18B984]/70 `
              }
            >
              {link}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
