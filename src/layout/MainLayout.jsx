import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import HeaderLogin from "../components/login/HeaderLogin";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderLogin />

      <div className="flex flex-1">
        <SideBar />
        <main className="flex-1 overflow-y-auto bg-[#FFFFFF] ml-64">
          <div className="flex-1 p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
