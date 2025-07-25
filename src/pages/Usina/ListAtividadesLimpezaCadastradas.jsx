import React, { useState } from "react";
import ListAtividadesCadastradas from "../../components/atividades_limpeza/ListAtividadesCadastradas";
import CadAtv from "../../components/atividades_limpeza/Modal/CadAtv";

const ListAtividadesLimpezaCadastradas = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldReload, setShouldReload] = useState(false);

  const handleSaveAtividade = () => {
    setShouldReload((prev) => !prev);
  };

  return (
    <>
      <div className="flex gap-1">
        <span className="text-sm font-medium underline py-1">
          Atividades da Usina
        </span>
        <span className="font-medium text-[#FF6B00]">&gt;</span>
        <span className="text-sm font-medium py-1 underline">
          Atividades de limpeza cadastradas
        </span>
      </div>

      <div className="flex justify-between border-b-2 border-[#FF6B00]">
        <h2 className="mt-3 text-2xl font-bold">
          Atividades de limpeza cadastrada
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mb-1 bg-[#000000] px-2 py-2 text-[#FFFFFF] rounded-sm font-medium flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" />
          </svg>
          Cadastrar nova atividade
        </button>
      </div>

      <ListAtividadesCadastradas key={shouldReload} />

      <CadAtv
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAtividade}
      />
    </>
  );
};

export default ListAtividadesLimpezaCadastradas;
