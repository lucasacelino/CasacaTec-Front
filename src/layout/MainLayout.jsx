import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import HeaderLogin from "../components/login/HeaderLogin";

const MainLayout = () => {
  return (
    // flex flex-1 overflow-hidden pt-16

    // flex-1 overflow-y-auto bg-gray-50

    <div className="flex flex-col min-h-screen">
      {/* Header com z-index mais alto e posição sticky */}
      <HeaderLogin />

      {/* Container principal */}
      <div className="flex flex-1">
        {" "}
        {/* Adicionado pt-16 para compensar o header */}
        {/* Sidebar ajustado */}
        <SideBar />
        {/* Conteúdo principal */}
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
