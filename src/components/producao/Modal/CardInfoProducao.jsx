import { useState } from "react";
import ModalExcluirProducao from "./ModalExcluirProducao";
import FormEditProducao from "../Forms/FormEditProducao";

const CardInfoProducao = ({ dadosProducao = [], onAtualizarDados }) => {
  const [producaoId, setIdProducao] = useState(null);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenFormlEdit, setOpenFormEdit] = useState(false);

  console.log(dadosProducao);
  const anoAtual = new Date().getFullYear();

  return (
    <>
      {isOpenFormlEdit ? (
        <FormEditProducao
          producaoId={producaoId}
          onClose={() => setOpenFormEdit(false)}
          onSuccess={onAtualizarDados}
        />
      ) : (
        <div>
          <p className="font-bold text-lg">Dados produção - {anoAtual}</p>
          {dadosProducao.map((dado) => (
            <div
              key={dado.idProducao}
              className="mb-2 border border-[#343a40] rounded-sm"
            >
              <div className="flex flex-wrap gap-4 px-3 py-2">
                <div className="flex gap-1 border-b border-[#ff6500]">
                  <span className="font-bold">Arranjo Produtivo:</span>
                  <span className="font-medium">{dado.arranjoProdutivo}</span>
                </div>

                <div className="flex gap-1 border-b border-[#ff6500]">
                  <span className="font-bold">Cultura consórcio: </span>
                  <span className="font-medium">{dado.culturaConsorcio}</span>
                </div>

                <div className="flex gap-1 border-b border-[#ff6500]">
                  <span className="font-bold">Área plantada: </span>
                  <span className="font-medium">{dado.areaPlantio} ha</span>
                </div>

                <div className="flex gap-1 border-b border-[#ff6500]">
                  <span className="font-bold">Data plantio: </span>
                  <span className="font-medium">{dado.dataPlantio}</span>
                </div>

                <div className="flex gap-1 border-b border-[#ff6500]">
                  <span className="font-bold">Técnico:</span>
                  <span className="font-medium">{dado.tecnico.nomeTec}</span>
                </div>

                <div className="w-full flex items-center justify-center gap-2">
                  <button
                    onClick={() => {
                      setIdProducao(dado.idProducao);
                      setOpenFormEdit(true);
                    }}
                    className="bg-[#000000] text-white font-medium rounded-sm px-2 py-2 flex items-center gap-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 384 384"
                    >
                      <path
                        fill="currentColor"
                        d="M0 304L236 68l80 80L80 384H0zM378 86l-39 39l-80-80l39-39q6-6 15-6t15 6l50 50q6 6 6 15t-6 15"
                      />
                    </svg>
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      setIdProducao(dado.idProducao);
                      setIsOpenModalDelete(true);
                    }}
                    className="bg-[#000000] text-white font-medium rounded-sm px-2 py-2 flex items-center gap-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M6.187 8h11.625l-.695 11.125A2 2 0 0 1 15.121 21H8.879a2 2 0 0 1-1.996-1.875zM19 5v2H5V5h3V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1zm-9 0h4V4h-4z"
                      />
                    </svg>
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ModalExcluirProducao
        producaoId={producaoId}
        isOpen={isOpenModalDelete}
        onClose={() => setIsOpenModalDelete(false)}
        // onSuccesRemove={handleExcluirProducao}
        onSuccesRemove={onAtualizarDados}
      />
    </>
  );
};

export default CardInfoProducao;
