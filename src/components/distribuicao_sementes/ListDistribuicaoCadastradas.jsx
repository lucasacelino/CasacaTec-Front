import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ListDistribuicaoCadastradas = () => {
  const [filtroIsOpen, setFiltroIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [idDistribuicao, setIdDistribuicao] = useState(null);
  const [distribuicoesAgendadas, setDistribuicoesAgendadas] = useState([]);
  const [filters, setFilters] = useState({
    nomeCondutor: "",
    estado: "",
    cidade: "",
    status: "all",
  });

  useEffect(() => {
    const carregarAtividades = async () => {
      const response = await axios.get("http://localhost:3000/distr");
      setDistribuicoesAgendadas(response.data);
    };

    carregarAtividades();
  }, []);

  const handleExcluirAtividade = async () => {
    try {
      await axios.delete(`http://localhost:3000/distr/${idDistribuicao}`);
      // Atualiza a lista após exclusão
      setDistribuicoesAgendadas(
        distribuicoesAgendadas.filter(
          (atividade) => atividade.id !== idDistribuicao
        )
      );
      toast("Atividade de limpeza excluída com sucesso!", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#2c6e49",
          color: "#fff",
          padding: "26px"
        },
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 1000 1000"
          >
            <path
              fill="currentColor"
              d="M500 0q136 0 251 67t182 182t67 251t-67 251t-182 182t-251 67t-251-67T67 751T0 500t67-251T249 67T500 0M260 447l-54 53q71 71 129 133.5t81 89.5l22 26q8-13 22-35.5t56.5-85.5T600 509.5T695 390t99-104q-18-35-36-35q-10 6-32 22t-113.5 97.5T402 571z"
            />
          </svg>
        ),
      });

      setModalIsOpen(false);
    } catch (error) {
      console.error("Erro ao excluir atividade:", error);
      toast.error("erro ao excluir atividade limpeza");
    }
  };

  const applyFilters = () => {
    setFiltroIsOpen(false);
  };

  const resetFilters = () => {
    setFilters({
      nomeCondutor: "",
      estado: "",
      cidade: "",
      status: "all",
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (id) => {
    setDistribuicoesAgendadas(
      distribuicoesAgendadas.map((item) =>
        item.id === id ? { ...item, entregue: !item.entregue } : item
      )
    );
  };

  const filteredData = distribuicoesAgendadas.filter((item) => {
    return (
      item.nomeCondutor
        .toLowerCase()
        .includes(filters.nomeCondutor.toLowerCase()) &&
      item.estado.toLowerCase().includes(filters.estado.toLowerCase()) &&
      item.cidade.toLowerCase().includes(filters.cidade.toLowerCase()) &&
      (filters.status === "all" ||
        (filters.status === "entregue" && item.entregue) ||
        (filters.status === "pendente" && !item.entregue))
    );
  });

  if (distribuicoesAgendadas.length == 0) {
    return (
      <div className="mt-4 w-full flex flex-col items-center">
        {/* <LoadingAtividadesSpinner /> */}
        <p className="font-medium">Nenhuma atividade Cadastrada</p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-2 flex justify-center">
        <button
          onClick={() => setFiltroIsOpen(!filtroIsOpen)}
          className="flex items-center mb-1 bg-[#000000] px-2 py-2 text-[#FFFFFF] rounded-sm font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeDasharray="56"
              strokeDashoffset="56"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 4h14l-5 6.5v9.5l-4 -4v-5.5Z"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                dur="0.6s"
                values="56;0"
              />
            </path>
          </svg>
          Filtrar dados
        </button>
      </div>

      {filtroIsOpen && (
        <div className="transition duration-200 bg-gray-50 p-4 border border-gray-500 rounded-md mt-2 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Nome do Condutor
              </label>
              <input
                type="text"
                name="nomeCondutor"
                value={filters.nomeCondutor}
                onChange={handleFilterChange}
                className="w-full border border-black rounded-md px-3 py-2 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                placeholder="Filtrar por nome"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Estado
              </label>
              <input
                type="text"
                name="estado"
                value={filters.estado}
                onChange={handleFilterChange}
                className="w-full border border-black rounded-md px-3 py-2 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                placeholder="Filtrar por estado"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Cidade
              </label>
              <input
                type="text"
                name="cidade"
                value={filters.cidade}
                onChange={handleFilterChange}
                className="w-full border border-black rounded-md px-3 py-2 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                placeholder="Filtrar por cidade"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Status
              </label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full border border-black rounded-md px-3 py-2.5 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
              >
                <option value="all">Todos</option>
                <option value="entregue">Entregue</option>
                <option value="pendente">Pendente</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={resetFilters}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-white bg-gray-500"
            >
              Limpar Filtros
            </button>
            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-[#000000] text-white rounded-md text-sm font-medium"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      )}

      <div className="mt-2 rounded-lg border border-gray-500 overflow-hidden">
        <div className="overflow-x-auto" style={{ maxHeight: "400px" }}>
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-[#f1f0ea] border-b-2 border-[#FF6B00] sticky top-0">
                <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left whitespace-nowrap">
                  Nome do condutor
                </th>
                <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left whitespace-nowrap">
                  Telefone
                </th>
                <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left whitespace-nowrap">
                  Estado
                </th>
                <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left">
                  Cidade
                </th>
                <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left whitespace-nowrap">
                  Nome Técnico
                </th>
                <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left whitespace-nowrap">
                  Horário previsto
                </th>
                <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left whitespace-nowrap">
                  Quantidade de sacos
                </th>
                <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left whitespace-nowrap">
                  Data de entrega
                </th>
                <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left">
                  Observação
                </th>
                <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left">
                  Status
                </th>
                <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((dados) => (
                <tr key={dados.id}>
                  <td className="py-2 px-4 border-b border-gray-400 font-medium">
                    {dados.nomeCondutor}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-400 font-medium whitespace-nowrap">
                    {dados.telefoneCondutor}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-400 font-medium">
                    {dados.estado}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-400 font-medium">
                    {dados.cidade}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-400 font-medium">
                    {dados.nomeTecnico}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-400 font-medium">
                    {dados.horarioPrevisto}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-400 font-medium">
                    {dados.quantidadeSacos}
                  </td>
                  <td className="py-2 px-4 font-medium border-b border-gray-400 max-w-xs break-words">
                    {dados.dataEntrega}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-400 font-medium whitespace-nowrap">
                    {dados.observacao}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-400 font-medium">
                    <div className="flex flex-row gap-2">
                      <span
                        className={`rounded-sm px-2 py-2 ${
                          dados.entregue
                            ? "bg-[#74c69d] text-[#081c15]"
                            : "bg-[#f79d65] text-[#780000]"
                        }`}
                      >
                        {dados.entregue ? "Entregue" : "Pendente"}
                      </span>

                      <div className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={dados.entregue || false}
                          onChange={() => handleCheckboxChange(dados.id)}
                        />
                        <span className="whitespace-nowrap">
                          marcar como entregue
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6 text-center border-b border-gray-400">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        className="flex items-center p-2 text-[#000000]border-black font-medium rounded-sm transition-colors duration-200 hover:text-blue-800 border border-gray-400"
                        title="Editar"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#FF6B00"
                            d="M4.42 20.579a1 1 0 0 1-.737-.326a.988.988 0 0 1-.263-.764l.245-2.694L14.983 5.481l3.537 3.536L7.205 20.33l-2.694.245a.95.95 0 0 1-.091.004ZM19.226 8.31L15.69 4.774l2.121-2.121a1 1 0 0 1 1.415 0l2.121 2.121a1 1 0 0 1 0 1.415l-2.12 2.12l-.001.001Z"
                          />
                        </svg>
                        <p className="pl-1">Editar</p>
                      </button>
                      <button
                        onClick={() => {
                          setModalIsOpen(true);
                          setIdDistribuicao(dados.id);
                        }}
                        // onChange={() => onExcluir(dados.id)}
                        className="p-2 flex items-center font-medium text-[#000000] rounded-sm transition-colors duration-200 hover:text-red-800 border border-gray-400"
                        title="Excluir"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          className=""
                        >
                          <path
                            fill="#df2935"
                            d="M6.187 8h11.625l-.695 11.125A2 2 0 0 1 15.121 21H8.879a2 2 0 0 1-1.996-1.875zM19 5v2H5V5h3V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1zm-9 0h4V4h-4z"
                          />
                        </svg>
                        <p className="">Excluir</p>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog
        open={modalIsOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => setModalIsOpen(false)}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="fixed inset-0 bg-black/30 flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="border w-full max-w-md rounded-xl bg-[#fefae0] p-6 backdrop-blur-2xl duration-100 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-[#000000]"
              >
                Desejar excluir a atividade de limpeza?
              </DialogTitle>
              <div className="mt-4">
                <div className="flex gap-3">
                  <button className="px-4 py-2 rounded-sm bg-[#495057] text-[#FFFFFF]">
                    Não
                  </button>
                  <button
                    onClick={handleExcluirAtividade}
                    className="px-4 py-2 rounded-sm bg-[#000000] text-[#FFFFFF]"
                  >
                    Sim
                  </button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ListDistribuicaoCadastradas;
