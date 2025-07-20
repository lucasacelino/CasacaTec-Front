import axios from "axios";
import { useEffect, useState } from "react";
import TableProdutores from "./table/TableProdutores";
import toast from "react-hot-toast";
import { fetchCitiesByState, fetchStates } from "../../services/ibgeService";

const SearchBarProdutores = () => {
  const [nome, setNome] = useState("");
  const [dadosProdutor, setDadosProdutor] = useState([]);
  const [estado, setEstado] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState("");
  const [cidadeSelecionada, setCidadeSelecionada] = useState("");
  const [errorCamposVazios, setErrorCamposVazios] = useState("");
  const [erroEstado, setErrEstado] = useState("");
  const [isResult, setIsResult] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const carregarDadosEstados = async () => {
      const response = await fetchStates();
      setEstado(response);
    };

    carregarDadosEstados();
  }, []);

  useEffect(() => {
    if (estadoSelecionado) {
      const fetchCidades = async () => {
        const response = await fetchCitiesByState(estadoSelecionado);
        setCidades(response);
      };
      fetchCidades();
    }
  }, [estadoSelecionado]);

  const handleSelectEstado = (e) => {
    setEstadoSelecionado(e.target.value);
    setCidades([]);
  };

  const handleSelectCidade = (e) => {
    setCidadeSelecionada(e.target.value);
  };

  const handleSearchProdutor = async () => {
    try {
      const params = {};
      if (nome) params.nomeCompleto = nome;
      // if (estadoSelecionado) params.uf = estadoSelecionado;
      // if (cidadeSelecionada) params.nomeMunicipio = cidadeSelecionada;
      if(estadoSelecionado && cidadeSelecionada) {
        params.uf = estadoSelecionado;
        params.nomeMunicipio = cidadeSelecionada;
      }
      if(estadoSelecionado && !cidadeSelecionada) {
        setErrEstado("Selecione uma cidade");
        return;
      }

      if (Object.keys(params).length === 0) {
        setErrorCamposVazios("Preencha pelo menos um campo de busca.");
        return;
      }

      const response = await axios.get("http://localhost:3000/produtores", {
        params,
      });

      if (response.data.length === 0) {
        setMsg("Nenhum produtor encontrado");
        setDadosProdutor([]);
        setIsResult(false);
        return;
      }

      console.log(response.data);
      toast.success("O produtor existe");
      setDadosProdutor(response.data);
      setIsResult(true);
    } catch (erro) {
      console.error(erro);
    }
  };

  const renderResultDados = () => {
    if (isResult) {
      return (
        <div className="w-full max-w-full overflow-x-auto">
          <p>
            Resultado: {nome} {estadoSelecionado} {cidadeSelecionada}{" "}
          </p>
          <TableProdutores dados={dadosProdutor} />
        </div>
      );
    }

    return <p>{msg}</p>;
  };

  return (
    <div className="flex flex-wrap pt-3 justify-center gap-x-4">
      <div>
        <label className="block text-black font-semibold">
          Nome do produtor(a)*
        </label>
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="22"
            viewBox="0 0 24 24"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FF6B00] pointer-events-none"
          >
            <path
              fill="currentColor"
              d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
            />
          </svg>
          <input
            type="text"
            onChange={(e) => setNome(e.target.value)}
            className={"w-full border rounded-md pl-10 py-2 border-black-300"}
            placeholder="Buscar..."
          />
        </div>
      </div>

      <div>
        <label className="block text-black font-semibold">Estado</label>
        <select
          name="estado"
          id="estado"
          value={estadoSelecionado}
          onChange={handleSelectEstado}
          className="w-full border rounded-md pl-2 py-2.5 border-black-300"
        >
          <option value="">Selecione um estado</option>
          {estado.map((dado) => (
            <option key={dado.sigla} value={dado.sigla}>
              {dado.nome} - {dado.sigla}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-black font-semibold">Cidade</label>
        <select
          name="cidade"
          id="cidade"
          value={cidadeSelecionada}
          onChange={handleSelectCidade}
          className="w-full border rounded-md pl-2 py-2.5 border-black-300"
        >
          <option value="">Selecione uma cidade</option>
          {cidades.map((cidade) => (
            <option key={cidade.nome} value={cidade.nome}>
              {cidade.nome}
            </option>
          ))}
        </select>

        {erroEstado && (<p className="text-[#d00000]">{erroEstado}</p>)}
      </div>

      <p className="w-full text-center text-[#d00000]">{errorCamposVazios}</p>
      <div className="w-full flex justify-center mt-2">
        <button
          onClick={handleSearchProdutor}
          className="block bg-[#000000] text-[#FFFFFF] px-4 py-3 rounded-sm font-medium"
        >
          Pesquisar
        </button>
      </div>
      {renderResultDados()}
    </div>
  );
};

export default SearchBarProdutores;

{
  /* <div className="w-full flex justify-center mt-2">
          <button
            onClick={handleSearchProdutor}
            className="block bg-[#000000] text-[#FFFFFF] px-4 py-3 rounded-sm font-medium"
          >
            Pesquisar
          </button>
        </div> */
}
{
  /* {renderResultDados()} */
}
