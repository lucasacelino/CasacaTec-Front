// import React from 'react'
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const SideBar = () => {
  const [openProducers, setOpenProducers] = useState(true);
  const [openActivities, setOpenActivities] = useState(true);

  return (
    // <div>SideBar</div>
    // fixed inset-y-0 left-0 z-40 w-64 bg-[#000000] shadow-lg border-r border-gray-200

    // fixed top-16 left-0 bottom-0 z-40 w-64 bg-[#000000] shadow-lg border-r border-gray-200


    <aside className="fixed top-16 left-0 bottom-0 z-40 w-64 bg-[#000000] shadow-lg border-r border-gray-200">
      {/* Cabeçalho */}
      {/* <div className="flex items-center justify-center h-16 border-b border-gray-200 bg-blue-600">
        <h1 className="text-white font-bold text-xl">Cotton Manager</h1>
      </div> */}

      {/* Menu de Navegação */}
      <nav className="p-4 overflow-y-auto h-[calc(100vh-4rem)]">
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => setOpenProducers(!openProducers)}
              className="flex items-center justify-between w-full p-3 rounded-lg text-gray-700 hover:bg-[#FFFFFF]-100 transition-colors"
            >
              <div className="flex items-center">
                <span className="text-[#FFFFFF] font-medium">Produtores</span>
              </div>
              {openProducers ? (
                <ChevronDownIcon className="w-4 h-4 text-white" />
              ) : (
                <ChevronRightIcon className="w-4 h-4 text-white" />
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
                          ? "text-[#F9BF80] font-medium"
                          : "text-white"
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
                          ? "text-[#F9BF80] font-medium"
                          : "text-white"
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
                <span className="text-[#FFFFFF] font-medium">
                  Atividades da Usina
                </span>
              </div>
              {openActivities ? (
                <ChevronDownIcon className="w-4 h-4 text-white" />
              ) : (
                <ChevronRightIcon className="w-4 h-4 text-white" />
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
                          ? "bg-blue-100 text-[#F9BF80]-600 font-medium"
                          : "text-red-600 hover:bg-[#F9BF80]-100"
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
