import React from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <main className="bg-[#F0F0F9]">
      <div className="min-h-screen">
        <Outlet />
      </div>
    </main>
  );
};

export default RootLayout;
