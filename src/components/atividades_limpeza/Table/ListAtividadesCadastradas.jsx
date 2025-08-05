import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ModalEditAtividadeLimpeza from "../Modal/ModalEditInfoAtividade";

const ListAtividadesCadastradas = () => {
  const [dadosAtvLimpeza, setDadosAtvLimpeza] = useState([]);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [idAtividade, setIdAtividade] = useState(null);

  const carregarAtvsLimpezas = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/atvs_limpeza`);
      setDadosAtvLimpeza(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    carregarAtvsLimpezas();
  }, []);

  const handleAtividade = (atividadeAtualizada) => {
    setDadosAtvLimpeza(
      dadosAtvLimpeza.map((atividade) =>
        atividade.id === atividadeAtualizada.id
          ? atividadeAtualizada
          : atividade
      )
    );

    carregarAtvsLimpezas();
  };

  const handleExcluirAtividade = async () => {
    try {
      await axios.delete(`http://localhost:3000/atvs_limpeza/${idAtividade}`);
      setDadosAtvLimpeza(
        dadosAtvLimpeza.filter((atividade) => atividade.id !== idAtividade)
      );
      toast.success("Atividade de limpeza excluída com sucesso");
      setIsDeleteOpen(false);
    } catch (error) {
      console.error("Erro ao excluir atividade:", error);
      toast.error("erro ao excluir atividade limpeza");
    }
  };

  if (dadosAtvLimpeza.length == 0) {
    return (
      <div className="mt-4 w-full flex flex-col items-center">
        <p className="font-medium">Nenhuma atividade cadastrada</p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-3 rounded-lg border border-gray-500 overflow-hidden">
        <div className="overflow-x-auto" style={{ maxHeight: "400px" }}>
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-[#f1f0ea] border-b-2 border-[#FF6B00] sticky top-0">
                <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left whitespace-nowrap">
                  Local de limpeza
                </th>
                <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left whitespace-nowrap">
                  Material de limpeza
                </th>
                <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left">
                  Responsável
                </th>
                <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left">
                  Fiscal
                </th>
                <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left whitespace-nowrap">
                  Data de limpeza
                </th>
                <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left">
                  Observação
                </th>
                <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {dadosAtvLimpeza.map((dados) => (
                <tr key={dados.id}>
                  <td className="py-2 px-4 border-b border-gray-400 font-medium">
                    {dados.localLimpeza}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-400 font-medium">
                    {dados.materialLimpeza}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-400 font-medium whitespace-nowrap">
                    {dados.responsavelLimpeza}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-400 font-medium whitespace-nowrap">
                    {dados.fiscalLimpeza}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-400 font-medium">
                    {dados.dataLimpeza}
                  </td>
                  <td className="py-2 px-4 font-medium border-b border-gray-400 max-w-xs break-words">
                    {dados.observacao}
                  </td>
                  <td className="py-2 px-4 text-center border-b border-gray-400">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => {
                          setIsEditOpen(true);
                          setIdAtividade(dados.id);
                        }}
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
                        className="p-2 flex items-center font-medium text-[#000000] rounded-sm transition-colors duration-200 hover:text-red-800 border border-gray-400"
                        title="Excluir"
                        onClick={() => {
                          setIsDeleteOpen(true);
                          setIdAtividade(dados.id);
                        }}
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
        open={isDeleteOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => setIsDeleteOpen(false)}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="fixed inset-0 bg-black/30 flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="border w-full max-w-md rounded-xl bg-[#fefae0] p-6 backdrop-blur-2xl duration-100 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-lg font-medium text-[#000000]"
              >
                Desejar excluir a atividade de limpeza?
              </DialogTitle>
              <div className="mt-4">
                <div className="flex gap-2">
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

      <ModalEditAtividadeLimpeza
        atividadeId={idAtividade}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSuccess={handleAtividade}
      />
    </>
  );
};

export default ListAtividadesCadastradas;
