import React from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <main className="bg-white">
      <div className="max-w-5xl min-h-screen  mx-auto py-20 px-4">
        <Outlet />
      </div>
    </main>
  );
};

export default RootLayout;
