import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import TableProdutores from "../../components/produtores/table/TableProdutores";

const AcompanharProducao = () => {
  
  const [dados, setDados] = useState([]);
  const [todosOsDados, setTodosOsDados] = useState([]); 
  const [cidadeSelecionada, setCidadeSelecionada] = useState("");
  const [estadoSelecionado, setEstadoSelecionado] = useState("PB");
  const [nomeProdutor, setNomeProdutor] = useState("");

  useEffect(() => {
    const carregarTodosOsProdutores = async () => {
      try {
        const response = await axios.get("http://localhost:8080/produtores");
        setTodosOsDados(response.data);
      } catch (error) {
        console.error("Erro ao carregar todos os produtores:", error);
      }
    };

    carregarTodosOsProdutores();
  }, []);

  // Carrega produtores do estado selecionado (para navegação por cidades)
  useEffect(() => {
    const carregarProdutoresEstado = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/produtores?estado=${estadoSelecionado}`
        );
        setDados(response.data);
      } catch (error) {
        console.error("Erro ao carregar produtores do estado:", error);
      }
    };

    if (estadoSelecionado) {
      carregarProdutoresEstado();
    }
  }, [estadoSelecionado]);

  // Dados filtrados (derivado do estado principal)
  const dadosFiltrados = useMemo(() => {
    let resultado;
    
    // Se há pesquisa por nome, usa todos os dados (busca global)
    if (nomeProdutor.trim()) {
      resultado = todosOsDados.filter(p =>
        p.nomeCompleto.toLowerCase().includes(nomeProdutor.toLowerCase().trim())
      );
    } else {
      // Se não há pesquisa por nome, usa dados do estado selecionado
      resultado = [...dados];
      
      if (cidadeSelecionada) {
        resultado = resultado.filter(p => 
          p.municipio === cidadeSelecionada
        );
      }
    }

    return resultado;
  }, [dados, todosOsDados, cidadeSelecionada, nomeProdutor]);

  // Manipulador unificado para atualizações e exclusões
  const handleProdutorAtualizado = (produtorAtualizadoOuId) => {
    if (typeof produtorAtualizadoOuId === 'object') {
      // Atualização - atualiza em ambos os arrays
      setDados(prev => 
        prev.map(p => p.idProdutor === produtorAtualizadoOuId.idProdutor ? produtorAtualizadoOuId : p)
      );
      setTodosOsDados(prev => 
        prev.map(p => p.idProdutor === produtorAtualizadoOuId.idProdutor ? produtorAtualizadoOuId : p)
      );
    } else {
      // Exclusão - remove de ambos os arrays
      setDados(prev => prev.filter(p => p.idProdutor !== produtorAtualizadoOuId));
      setTodosOsDados(prev => prev.filter(p => p.idProdutor !== produtorAtualizadoOuId));
    }
  };

  // Lista de cidades disponíveis (derivada dos dados)
  const cidadesDisponiveis = useMemo(() => (
    [...new Set(dados.map(p => p.municipio))].sort()
  ), [dados]);

  // Manipulador de pesquisa por Enter
  const handlePesquisaEnter = (e) => {
    if (e.key === "Enter") {
      // A filtragem já é tratada automaticamente pelo useMemo
      // Limpa a seleção de cidade quando pesquisar por nome
      if (nomeProdutor.trim()) {
        setCidadeSelecionada("");
      }
    }
  };

  // Limpar pesquisa
  const limparPesquisa = () => {
    setNomeProdutor("");
    setCidadeSelecionada("");
  };

  // Verificar se há pesquisa ativa
  const temPesquisaAtiva = nomeProdutor.trim() || cidadeSelecionada;

  // Verificar se não encontrou resultados
  const naoEncontrouResultados = temPesquisaAtiva && dadosFiltrados.length === 0;

  return (
    <>
      {/* Cabeçalho */}
      <div className="flex gap-1">
        <span className="text-sm font-medium underline py-1">Produtores</span>
        <span className="font-medium text-[#FF6B00]">&gt;</span>
        <span className="text-sm font-medium py-1 underline">
          Acompanhar produtores
        </span>
      </div>

      <h1 className="text-2xl font-bold border-b-2 border-[#FF6B00]">
        Acompanhar produtores
      </h1>

      <p className="text-lg font-medium text-center mt-1">
        Clique nos estados abaixo para visualizar os produtores(as)
      </p>

      {/* Seleção de Estado */}
      <div className="flex gap-2 justify-center mt-2">
        <button
          onClick={() => {
            setEstadoSelecionado("PB");
            setCidadeSelecionada("");
            setNomeProdutor("");
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
            setNomeProdutor("");
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

      {/* <button>Abrir mapa</button> */}

      {/* Seção de Filtros */}
      <div className="flex justify-between items-center mt-8">
        <p className="font-bold text-xl">
          {nomeProdutor.trim() ? "Resultado da Pesquisa" : `Cidades - ${estadoSelecionado}`}
        </p>

        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              value={nomeProdutor}
              onChange={(e) => setNomeProdutor(e.target.value)}
              onKeyDown={handlePesquisaEnter}
              placeholder="Pesquisar produtor..."
              className="w-full pl-4 pr-10 py-2 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-[#ff6600] focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#ff6600"
                  d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
                />
              </svg>
            </div>
          </div>
          
          {/* Botão para limpar filtros */}
          {temPesquisaAtiva && (
            <button
              onClick={limparPesquisa}
              className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              title="Limpar filtros"
            >
              Limpar
            </button>
          )}
        </div>
      </div>

      {/* Lista de Cidades - só mostra se não estiver pesquisando por nome */}
      {!nomeProdutor.trim() && (
        <div className="flex flex-wrap border px-2 py-2 mt-2 gap-2 rounded-sm">
          {cidadesDisponiveis.map((cidade, index) => (
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
      )}

      {/* Exibição dos resultados */}
      {naoEncontrouResultados ? (
        // Mensagem quando não encontra resultados
        <div className="flex flex-col items-center justify-center mt-8 p-8 bg-gray-50 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            className="mb-4 text-gray-400"
          >
            <path
              fill="currentColor"
              d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m1 15h-2v-2h2zm0-4h-2l-.5-6h3z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Nenhum produtor encontrado
          </h3>
          <p className="text-gray-600 text-center">
            {nomeProdutor.trim() ? (
              <>Não foi encontrado nenhum produtor com o nome "<strong>{nomeProdutor}</strong>" em nenhum estado.</>
            ) : cidadeSelecionada ? (
              <>Não há produtores na cidade de <strong>{cidadeSelecionada}</strong> no estado {estadoSelecionado === "PB" ? "da Paraíba" : "do Rio Grande do Norte"}.</>
            ) : (
              <>Nenhum resultado encontrado.</>
            )}
          </p>
          <button
            onClick={limparPesquisa}
            className="mt-4 px-4 py-2 bg-[#FF6B00] text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Limpar filtros
          </button>
        </div>
      ) : temPesquisaAtiva ? (
        // Mostra a tabela quando tem pesquisa e encontrou resultados
        <div className="mt-4">
          {nomeProdutor.trim() && (
            <div className="mb-2 text-sm text-gray-600">
              <p>Encontrados <strong>{dadosFiltrados.length}</strong> resultado(s) para "<strong>{nomeProdutor}</strong>" em todos os estados</p>
              {dadosFiltrados.length > 0 && (
                <p className="text-xs mt-1">
                  Estados: {[...new Set(dadosFiltrados.map(p => p.uf))].sort().join(", ")}
                </p>
              )}
            </div>
          )}
          <TableProdutores
            dados={dadosFiltrados}
            onProdutorAtualizado={handleProdutorAtualizado}
          />
        </div>
      ) : (
        // Mensagem padrão quando não há pesquisa ativa
        <p className="flex font-medium gap-1 mt-2 text-lg justify-center items-center mt-1">
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
          Selecione uma cidade ou pesquise por um produtor
        </p>
      )}
    </>
  );
};

export default AcompanharProducao;