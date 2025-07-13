import React, { useEffect, useState } from "react";

import DashboardInfoGeraisSafra from "../../components/paginainicial/dashboards/DashboardInfoGeraisSafra";
import CarroselButtonsRegionais from "../../components/paginainicial/table/CarroseButtons";

import dadosProdICC_PB from "../../services/mockProd";
import dadosProdICC_RN from "../../services/mockProd2";


const HomePage = () => {
  const anoAtual = new Date().getFullYear();

  // const [ativar, setAtivar] = useState(false);
  const [selecionaUF, setSelecionarUF] = useState("PB");
  const [ufSelecionada, setUFselecionada] = useState([]);

  useEffect(() => {
    if (selecionaUF === "PB") {
      setUFselecionada(dadosProdICC_PB);
    } else {
      setUFselecionada(dadosProdICC_RN);
    }
  }, [selecionaUF]);


  return (
    <>
      <h2></h2>
      <h1 className="text-2xl font-bold">Dados Gerais - safra {anoAtual}</h1>
      <DashboardInfoGeraisSafra />

      <h2 className="font-medium text-lg mt-2">
        Os dados acima reúnem informações da safra de 2025 da Paraíba e Rio
        Grande do Norte
      </h2>

      <h1 className="font-bold text-xl text-center mt-4">
        Clique para ver informações específicas da safra de cada estado
      </h1>

      <div className="flex justify-center gap-4 mt-2">
        <button
          className={
            `px-4 py-3 rounded-sm font-semibold text-lg ${selecionaUF === "PB" ? "bg-[#FFA94B] text-[#000000]" : "bg-[#000000] text-[#FFA04B]"}
          `}
          onClick={() => setSelecionarUF("PB")}
        >
          Paraíba
        </button>

        <button
          className={
             `px-4 py-3 rounded-sm font-semibold text-lg ${selecionaUF === "RN" ? "bg-[#FFA94B] text-[#000000]" : "bg-[#000000] text-[#FFA04B]"}
          `
          }
          onClick={() => setSelecionarUF("RN")}
        >
          Rio Grande do Norte
        </button>

      </div>

      <p className="text-lg font-medium">Regionais - {selecionaUF}</p>
      <CarroselButtonsRegionais UF={ufSelecionada} />
      {/* {ufSelecionada.length > 0 && (
        <CarroselButtonsRegionais UF={ufSelecionada} />
      )} */}
    </>
  );
};

export default HomePage;
