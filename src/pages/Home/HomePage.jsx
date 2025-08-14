import React, { useEffect, useState } from "react";

import DashboardInfoGeraisSafra from "../../components/paginainicial/dashboards/DashboardInfoGeraisSafra";
import CarroselButtonsRegionais from "../../components/paginainicial/table/CarroseButtons";
import axios from "axios";

const HomePage = () => {
  const anoAtual = new Date().getFullYear();

  const [dados, setDados] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState("PB");

  useEffect(() => {
    if (estadoSelecionado) {
      const carregarProdutores = async () => {
        const response = await axios.get(
          `http://localhost:3000/produtores?uf=${estadoSelecionado}`
        );
        setDados(response.data);
      };
      carregarProdutores();
    }
  }, [estadoSelecionado]);

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

      <div className="flex justify-start gap-2 mt-3 mb-1">
        <button
          className={`px-4 py-3 rounded-sm font-semibold text-lg ${
            estadoSelecionado === "PB"
              ? "bg-[#f76300] text-[#FFFFFF] border-b-3 border-[#000000]"
              : "bg-[#000000] text-[#FFFFFF]"
          }
          `}
          onClick={() => setEstadoSelecionado("PB")}
        >
          Paraíba
        </button>

        <button
          className={`px-4 py-3 rounded-sm font-semibold text-lg ${
            estadoSelecionado === "RN"
              ? "bg-[#F76300] text-[#FFFFFF] border-b-3 border-[#000000]"
              : "bg-[#000000] text-[#FFFFFF]"
          }
          `}
          onClick={() => setEstadoSelecionado("RN")}
        >
          Rio Grande do Norte
        </button>
      </div>

      <div className="border border-[#9caea9] px-3 py-3 rounded-sm">
        <p className="text-lg font-medium">Dados Safra - {estadoSelecionado}</p>

        {/* <div className="flex gap-3">
          <div className="flex items-center flex-col border border-[#fa5c00] px-4 py-1 rounded-sm">
            <span>Total produtores</span>
            <span className="text-lg font-bold">82</span>
          </div>

          <div className="flex items-center flex-col border border-[#fa5c00] px-4 py-1 rounded-sm">
            <span className="font-medium">Total produtores</span>
            <span className="text-lg font-bold">82</span>
          </div>

          <div className="flex items-center flex-col border border-[#fa5c00] px-4 py-1 rounded-sm">
            <span>Total produtores</span>
            <span className="text-xl font-bold">82</span>
          </div>

          <div className="flex items-center flex-col rounded-sm border border-[#fa5c00] bg-[#f6f4f1] px-4 py-1">
            <span>Total produtores</span>
            <span className="text-lg font-bold">82</span>
          </div>

        </div> */}

        <p className="text-lg font-medium mt-4">
          Regionais - {estadoSelecionado}
        </p>
        <CarroselButtonsRegionais UF={dados} />
      </div>
    </>
  );
};

export default HomePage;
