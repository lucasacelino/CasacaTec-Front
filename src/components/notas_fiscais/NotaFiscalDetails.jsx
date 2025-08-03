import React, { useState } from "react";
import ModalExcluirNotaFiscal from "./ModaDeleteNotaFiscal";
import FormEditNota from "./FormEditNota";

const NotaFiscalDetails = ({
  notaId,
  numeroNota,
  numeroRomaneio,
  peso,
  valor,
  dataPagamento,
  onUpdate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIseditOpen] = useState(false);

  return (
    <>
      {isEditOpen ? (
        <FormEditNota
          notaId={notaId}
          onClose={() => setIseditOpen(false)}
          onSuccess={onUpdate}
        />
      ) : (
        <div className="flex flex-col border border-[#000000] px-1.5 py-2 rounded-sm">
          <div className="flex gap-1">
            <span className="font-bold">nº nota:</span>
            <span className="font-medium">{numeroNota}</span>
          </div>

          <div className="flex gap-1">
            <span className="font-bold">nº romaneio:</span>
            <span className="font-medium">{numeroRomaneio}</span>
          </div>

          <div className="flex gap-1">
            <span className="font-bold">Peso:</span>
            <span className="font-medium">{peso}</span>
          </div>

          <div className="flex gap-1">
            <span className="font-bold">Valor:</span>
            <span className="font-medium">{valor}</span>
          </div>

          <div className="flex gap-1">
            <span className="font-bold">Data de pagamento:</span>
            <span className="font-medium">{dataPagamento}</span>
          </div>

          <div className="w-full flex items-center justify-center flex mt-2 gap-2">
            <button
              onClick={() => setIseditOpen(true)}
              className="flex items-center bg-[#000000] rounded-sm px-2 py-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#FFFFFF"
                  d="m3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5v-.87L13.13 17H6v-2h9.13l2-2H6v-2h12v1.13l3-3V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2L7.5 3.5L6 2L4.5 3.5L3 2zM6 9V7h12v2zm7 13v-2.04l6.13-6.13l2.04 2.04L15.04 22zm8-9.97a.5.5 0 0 1 .53.12l1.32 1.32c.2.2.2.53 0 .72l-.98.98l-2.04-2.04l.98-.98l.02-.02c.05-.04.11-.08.17-.1"
                />
              </svg>
              <span className="text-[#FFFFFF]">Editar</span>
            </button>

            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center bg-[#000000] rounded-sm px-2 py-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#FFFFFF"
                  d="M21.12 15.46L19 17.59l-2.12-2.12l-1.41 1.41L17.59 19l-2.12 2.12l1.41 1.42L19 20.41l2.12 2.13l1.42-1.42L20.41 19l2.13-2.12zM19.5 3.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2L7.5 3.5L6 2L4.5 3.5L3 2v20l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.26-1.26c-.17-.56-.26-1.15-.26-1.74c0-.68.12-1.36.34-2H6v-2h8.53A6 6 0 0 1 21 13.34V2zM18 13H6v-2h12zm0-4H6V7h12z"
                />
              </svg>
              <span className="text-[#FFFFFF]">Excluir</span>
            </button>
          </div>
        </div>
      )}

      <ModalExcluirNotaFiscal
        notaId={notaId}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={onUpdate}
      />
    </>
  );
};

export default NotaFiscalDetails;
