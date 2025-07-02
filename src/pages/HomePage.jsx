import React from "react";
import DashboardInfoGeraisSafra from "../components/paginainicial/dashboards/DashboardInfoGeraisSafra";
// import CidadesTable from "../components/paginainicial/table/CidadesTable";
import CarroseButtons from "../components/paginainicial/table/CarroseButtons";

const HomePage = () => {


  const anoAtual = new Date().getFullYear();

  return (
    <>
      <h2></h2>
      <h1 className="text-2xl font-bold">Dados Gerais - safra {anoAtual}</h1>
      <DashboardInfoGeraisSafra />

      <h2 className="font-medium text-lg mt-2">Os dados acima reúnem informações da safra de 2025 da Paraíba e Rio Grande do Norte</h2>

      <h1 className="font-bold text-xl text-center mt-4">Clique para ver informações específicas da safra de cada estado</h1>

      <div className="flex justify-center gap-4 mt-2">
        <button className="bg-[#FFA94B] text-[#000000] px-4 py-3 rounded-sm font-semibold text-lg">
          Paraíba
        </button>

        <button className="bg-[#FFA94B] text-[#000000] px-4 py-3 rounded-sm font-medium text-lg">
          Rio Grande do Norte
        </button>
      </div>

      <CarroseButtons />

    </>
  );
};

export default HomePage;
