import { useState } from "react";
// import ModalEditInfoProdutor from "../Modal/ModalEditInfoProdutor";
import ModalExcluirProdutor from "../Modal/ModalExcluirProdutor";
import ProducaoModalPage from "../../producao/Modal/ProducaoModalPage";
import NotaFiscalProdutorModalPage from "../../notas_fiscais/Modal/NotaFiscalProdutorModalPage";
import ModalEditProdutor from "../Modal/ModalEditProdutor";

const TableDadosProdutores = ({ dados = [], onProdutorAtualizado }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeletOpen, setIsDeletOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isProducaoOpen, setProducaoOpen] = useState(false);
  const [produtorId, setProdutorId] = useState(null);

  return (
    <>
      <div className="mt-2 rounded-lg border border-gray-500 overflow-hidden">
        <div className="overflow-x-auto" style={{ maxHeight: "400px" }}>
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-[#f1f0ea] border-b-2 border-[#FF6B00] sticky top-0">
                <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left whitespace-nowrap">
                  Nome completo
                </th>
                <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left">
                  CPF
                </th>
                <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left">
                  Sexo
                </th>
                <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left whitespace-nowrap">
                  Data de nascimento
                </th>
                <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left">
                  Telefone
                </th>
                <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left">
                  Fidelização
                </th>
                <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left">
                  Endereço
                </th>
                <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left">
                  Estado
                </th>
                <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left">
                  Cidade
                </th>
                <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left">
                  Regional
                </th>
                <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left">
                  Produção
                </th>
                <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left">
                  Notas fiscais
                </th>
                <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {dados.map((dado) => (
                <tr key={dado.idProdutor}>
                  <td className="py-2 px-4 border-b border-gray-400 font-medium whitespace-nowrap">
                    {dado.nomeCompleto}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-400 font-medium whitespace-nowrap">
                    {dado.cpf}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-400 font-medium">
                    {dado.sexo}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-400 font-medium">
                    {dado.dataNascimento}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-400 font-medium whitespace-nowrap">
                    {dado.telefone}
                  </td>
                  <td className="py-2 px-4 font-medium border-b border-gray-400 max-w-xs break-words">
                    {dado.fidelizacao}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-400 font-medium whitespace-nowrap">
                    {dado.endereco}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-400 font-medium">
                    {dado.estado}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-400 font-medium">
                    {dado.municipio}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-400 font-medium whitespace-nowrap">
                    {dado.regional}
                  </td>

                  <td className="py-2 px-4 border-b border-gray-400 font-medium whitespace-nowrap">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => {
                          setProducaoOpen(true);
                          setProdutorId(dado.idProdutor);
                        }}
                        className="flex items-center border border-gray-400 p-2 rounded-sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 2048 2048"
                        >
                          <path
                            fill="#000000"
                            d="M1504 393q91 18 167 64t131 112t87 150t31 177q0 101-37 191t-103 160t-153 112t-189 48q-71 106-178 173t-236 81v387H896v-387q-128-14-235-81t-179-173q-101-5-189-47t-153-112t-102-160T0 896q0-93 31-176t86-150t132-113t167-64q29-88 83-160t125-124t157-80T960 0q93 0 178 28t157 81t126 124t83 160m-96 887q79 0 149-30t122-82t83-122t30-150q0-79-30-149t-82-122t-123-83t-149-30h-3q-1 0-3 1q-12-82-51-152t-98-123t-134-81t-159-29q-84 0-159 29t-134 81t-98 122t-51 153h-3q-1 0-3-1q-80 1-150 31t-122 81t-82 122t-30 150q0 80 30 149t82 122t122 83t150 30h45q24 51 59 93t79 75t94 54t107 29v-129q-56-12-103-41t-81-70t-53-94t-19-109h128q0 30 9 58t26 53t40 42t53 28V896h128v373q29-10 52-28t41-42t26-52t9-59h128q0 57-19 109t-53 93t-81 71t-103 41v129q55-8 106-29t95-53t79-75t59-94z"
                          />
                        </svg>
                        <p className="pl-1">Produção</p>
                      </button>
                    </div>
                  </td>

                  <td className="py-2 px-4 border-b border-gray-400 font-medium whitespace-nowrap">
                    <div className="flex items-center">
                      <button
                        onClick={() => {
                          setIsModal(true);
                          setProdutorId(dado.id);
                        }}
                        className="flex items-center border border-gray-400 p-2 rounded-sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M3 22V2l1.5 1.5L6 2l1.5 1.5L9 2l1.5 1.5L12 2l1.5 1.5L15 2l1.5 1.5L18 2l1.5 1.5L21 2v20l-1.5-1.5L18 22l-1.5-1.5L15 22l-1.5-1.5L12 22l-1.5-1.5L9 22l-1.5-1.5L6 22l-1.5-1.5zm3-5h12v-2H6zm0-4h12v-2H6zm0-4h12V7H6z"
                          />
                        </svg>
                        <p className="pl-1">Ver notas fiscais</p>
                      </button>
                    </div>
                  </td>

                  <td className="py-4 px-6 text-center border-b border-gray-400">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => {
                          setIsEditOpen(true);
                          setProdutorId(dado.idProdutor);
                        }}
                        className="flex items-center p-2 text-[#000000]border-black font-medium rounded-sm transition-colors duration-200 hover:text-blue-800 border border-gray-400"
                        title="Editar"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#000000"
                            d="M4.42 20.579a1 1 0 0 1-.737-.326a.988.988 0 0 1-.263-.764l.245-2.694L14.983 5.481l3.537 3.536L7.205 20.33l-2.694.245a.95.95 0 0 1-.091.004ZM19.226 8.31L15.69 4.774l2.121-2.121a1 1 0 0 1 1.415 0l2.121 2.121a1 1 0 0 1 0 1.415l-2.12 2.12l-.001.001Z"
                          />
                        </svg>
                        <p className="pl-1">Editar</p>
                      </button>

                      <button
                        onClick={() => {
                          setIsDeletOpen(true);
                          setProdutorId(dado.idProdutor);
                        }}
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

      <ModalEditProdutor
        produtorId={produtorId}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onProdutorAtualizado={onProdutorAtualizado}
      />

      <ModalExcluirProdutor
        produtorId={produtorId}
        isOpen={isDeletOpen}
        onClose={() => setIsDeletOpen(false)}
        onProdutorAtualizado={onProdutorAtualizado}
      />

      <NotaFiscalProdutorModalPage
        isOpen={isModal}
        onClose={() => setIsModal(false)}
        key={isModal ? "open" : "closed"}
        produtorId={produtorId}
      />

      <ProducaoModalPage
        produtorId={produtorId}
        isOpen={isProducaoOpen}
        key={isProducaoOpen ? "openProducao" :"closedProducao"}
        onClose={() => setProducaoOpen(false)}
      />

    </>
  );
};

export default TableDadosProdutores;
