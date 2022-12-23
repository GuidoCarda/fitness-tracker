import React from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <main className="bg-slate-100">
      <div className="max-w-5xl min-h-screen mx-auto pt-6 px-4 border-2">
        <Outlet />
      </div>
    </main>
  );
};

export default RootLayout;
