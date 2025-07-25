import React, { useState } from "react";
import ListDistribuicaoCadastradas from "../../components/distribuicao_sementes/ListDistribuicaoCadastradas";
import CadastroCondutorModal from "../../components/distribuicao_sementes/Modal/CadastroDistribuicaoSementesModal";

const ListDistribuicao = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleAny = () => {
    console.log("teste");
  };

  return (
    <>
      <div className="flex gap-1">
        <span className="text-sm font-medium underline py-1">
          Distribuição de sementes
        </span>
        <span className="font-medium text-[#FF6B00]">&gt;</span>
        <span className="text-sm font-medium py-1 underline">
          Distruição de sementes cadastradas
        </span>
      </div>

      <div className="flex justify-between border-b-2 border-[#FF6B00]">
        <h2 className="mt-3 text-2xl font-bold">
          Agendar distribuição de semente
        </h2>

        <div className="flex gap-1">
          <button
            onClick={() => setModalIsOpen(true)}
            className="flex items-center gap-1 mb-1 bg-[#000000] px-2 py-2 text-[#FFFFFF] rounded-sm font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M8 13.885q-.31 0-.54-.23t-.23-.54t.23-.539t.54-.23t.54.23t.23.54t-.23.539t-.54.23m4 0q-.31 0-.54-.23t-.23-.54t.23-.539t.54-.23t.54.23t.23.54t-.23.539t-.54.23m4 0q-.31 0-.54-.23t-.23-.54t.23-.539t.54-.23t.54.23t.23.54t-.23.539t-.54.23M5.616 21q-.691 0-1.153-.462T4 19.385V6.615q0-.69.463-1.152T5.616 5h1.769V2.77h1.077V5h7.154V2.77h1V5h1.769q.69 0 1.153.463T20 6.616v12.769q0 .69-.462 1.153T18.384 21zm0-1h12.769q.23 0 .423-.192t.192-.424v-8.768H5v8.769q0 .23.192.423t.423.192"
              />
            </svg>
            <span>Agendar distribuição</span>
          </button>
        </div>
      </div>

      <ListDistribuicaoCadastradas />
      <CadastroCondutorModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        onSave={handleAny}
      />
    </>
  );
};

export default ListDistribuicao;
