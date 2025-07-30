import React, { useState } from "react";
import CadastroTecnicoModal from "../../components/tecnicos/Modal/CadastrarTecnicoModal";
import TableTecnicos from "../../components/tecnicos/Table/TableTecnicos";

const ListTecnicosCadastados = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldReload, setShouldReload] = useState(false);

  const handleSaveAtividade = () => {
    setShouldReload((prev) => !prev);
  };

  return (
    <>
      <div className="flex gap-1">
        <span className="text-sm font-medium underline py-1">Técnicos</span>
        <span className="font-medium text-[#FF6B00]">&gt;</span>
        <span className="text-sm font-medium py-1 underline">
          Cadastrar técnico
        </span>
      </div>

      <div className="flex justify-between border-b-2 border-[#FF6B00]">
        <h2 className="mt-3 text-2xl font-bold">Cadastrar técnico</h2>
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
          Cadastrar novo técnico
        </button>
      </div>

      <TableTecnicos key={shouldReload} />
      
      <CadastroTecnicoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAtividade}
      />
    </>
  );
};

export default ListTecnicosCadastados;
