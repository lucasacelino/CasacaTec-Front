import React, { useEffect, useState } from "react";
import axios from "axios";
import TableProdutores from "../../components/produtores/table/TableProdutores";

const AcompanharProducao = () => {
  const [dados, setDados] = useState([]);
  const [dadosProdutores, setDadosProdutores] = useState([]);
  const [cidadeSelecionada, setCidadeSelecionada] = useState("");
  const [estadoSelecionado, setEstadoSelecionado] = useState("PB");

  useEffect(() => {
    const carregarProdutoresEstado = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/produtores?uf=${estadoSelecionado}`
        );
        setDados(response.data);
      } catch (error) {
        console.error("Erro ao carregar produtores:", error);
      }
    };

    if (estadoSelecionado) {
      carregarProdutoresEstado();
    }
  }, [estadoSelecionado]);

  // 2. Filtra por cidade (se selecionada)
  useEffect(() => {
    const filtrarPorCidade = async () => {
      try {
        if (cidadeSelecionada) {
          const response = await axios.get(
            `http://localhost:3000/produtores?uf=${estadoSelecionado}&nomeMunicipio=${encodeURIComponent(
              cidadeSelecionada
            )}`
          );
          setDadosProdutores(response.data);
        } else {
          setDadosProdutores([]);
        }
      } catch (error) {
        console.error("Erro ao filtrar por cidade:", error);
      }
    };

    filtrarPorCidade();
  }, [cidadeSelecionada, estadoSelecionado]);

  const handleProdutorAtualizado = (produtorAtualizado) => {
    setDadosProdutores((prev) =>
      prev.map((p) => (p.id === produtorAtualizado.id ? produtorAtualizado : p))
    );
  };

  const filterCidadesEstado = [
    ...new Set(dados.map((item) => item.nomeMunicipio)),
  ];

  return (
    <>
      <div className="flex gap-1">
        <span className="text-sm font-medium underline py-1">Produtores</span>
        <span className="font-medium text-[#FF6B00]">&gt;</span>
        <span className="text-sm font-medium py-1 underline">
          Acompanhar produção
        </span>
      </div>

      <h1 className="text-2xl font-bold border-b-2 border-[#FF6B00]">
        Acompanhar produção
      </h1>

      <p className="text-lg font-medium text-center mt-1">Clique nos estados abaixo para visualizar os produtores(as)</p>

      <div className="flex gap-2 justify-center mt-2">
        <button
          onClick={() => {
            setEstadoSelecionado("PB");
            setCidadeSelecionada(""); // ← Reseta a cidade ao mudar de estado
          }}
          className={`px-2 py-3 rounded-sm font-medium ${
            estadoSelecionado === "PB"
              ? "bg-[#FF6B00] text-[#FFFFFF] border-b-3 border-[#000000]"
              : "bg-[#000000] text-[#FFFFFF]"
          }`}
        >
          Paraíba
        </button>

        <button
          onClick={() => {
            setEstadoSelecionado("RN");
            setCidadeSelecionada("");
          }}
          className={`px-2 py-3 rounded-sm font-medium ${
            estadoSelecionado === "RN"
              ? "bg-[#FF6B00] text-[#FFFFFF] border-b-3 border-[#000000]"
              : "bg-[#000000] text-[#FFFFFF]"
          }`}
        >
          Rio Grande do Norte
        </button>
      </div>

      <p className="text-lg font-medium mt-3">Cidades - {estadoSelecionado}</p>
      <div className="flex flex-wrap border px-2 py-2 gap-2 rounded-sm">
        {filterCidadesEstado.map((cidade, index) => (
          <button
            key={index}
            onClick={() => setCidadeSelecionada(cidade)}
            className={`px-2 py-2 rounded-sm font-medium ${
              cidadeSelecionada === cidade
                ? "bg-[#FF6B00] text-white border-b-3 border-[#000000]"
                : "bg-black text-white"
            }`}
          >
            {cidade}
          </button>
        ))}
      </div>

      {!cidadeSelecionada ? (
        <p className="flex font-medium gap-1 mt-2 text-lg justify-center items-center mt-1">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m1 15h-2v-2h2zm0-4h-2l-.5-6h3z"
            />
          </svg>
          SELECIONE UMA CIDADE
        </p>
      ) : (
        <TableProdutores dados={dadosProdutores} onProdutorAtualizado={handleProdutorAtualizado}/>
      )}
    </>
  );
};

export default AcompanharProducao;
