// import React from 'react'
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const SideBar = () => {
  const [openProducers, setOpenProducers] = useState(true);
  const [openActivities, setOpenActivities] = useState(true);

  return (
    // <div>SideBar</div>
    <aside className="fixed inset-y-0 left-0 z-40 w-64 bg-[#000000] shadow-lg border-r border-gray-200">
      {/* Cabeçalho */}
      <div className="flex items-center justify-center h-16 border-b border-gray-200 bg-blue-600">
        <h1 className="text-white font-bold text-xl">Cotton Manager</h1>
      </div>

      {/* Menu de Navegação */}
      <nav className="p-4 overflow-y-auto h-[calc(100vh-4rem)]">
        <ul className="space-y-1">
          {/* Seção de Produtores */}
          <li>
            <button
              onClick={() => setOpenProducers(!openProducers)}
              className="flex items-center justify-between w-full p-3 rounded-lg text-gray-700 hover:bg-[#FFFFFF]-100 transition-colors"
            >
              <div className="flex items-center">
                {/* <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg> */}
                <span className="text-[#FFFFFF] font-medium">Produtores</span>
              </div>
              {openProducers ? (
                <ChevronDownIcon className="w-4 h-4" />
              ) : (
                <ChevronRightIcon className="w-4 h-4" />
              )}
            </button>

            {openProducers && (
              <ul className="ml-8 mt-1 space-y-1">
                <li>
                  <NavLink
                    to="/produtores/cadastrar"
                    className={({ isActive }) =>
                      `flex items-center p-2 pl-3 rounded-lg text-sm transition-colors ${
                        isActive
                          ? "bg-blue-100 text-blue-600 font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`
                    }
                  >
                    Cadastrar Produtor
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/produtores/acompanhamento"
                    className={({ isActive }) =>
                      `flex items-center p-2 pl-3 rounded-lg text-sm transition-colors ${
                        isActive
                          ? "bg-blue-100 text-blue-600 font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`
                    }
                  >
                    Acompanhar Produção
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Seção de Atividades da Usina */}
          <li>
            <button
              onClick={() => setOpenActivities(!openActivities)}
              className="flex items-center justify-between w-full p-3 rounded-lg text-gray-700 hover:bg-[#FFFFFF]-100 transition-colors"
            >
              <div className="flex items-center">
                {/* <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg> */}
                <span className="text-[#FFFFFF] font-medium">Atividades da Usina</span>
              </div>
              {openActivities ? (
                <ChevronDownIcon className="w-4 h-4" />
              ) : (
                <ChevronRightIcon className="w-4 h-4" />
              )}
            </button>

            {openActivities && (
              <ul className="ml-8 mt-1 space-y-1">
                <li>
                  <NavLink
                    to="/usina/limpeza"
                    className={({ isActive }) =>
                      `flex items-center p-2 pl-3 rounded-lg text-sm transition-colors ${
                        isActive
                          ? "bg-blue-100 text-blue-600 font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`
                    }
                  >
                    Cadastrar Atividades de Limpeza
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
