import { Dialog, DialogPanel } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import FormCadastroProducao from "../Forms/FormCadastroProducao";
import CardInfoProducao from "./CardInfoProducao";
import axios from "axios";

const ProducaoModalPage = ({ produtorId, isOpen, onClose }) => {
  const [isOpenCadProducao, setOpenCadProducao] = useState(false);
  const [dadosProducao, setDadosProducao] = useState([]);
  // const [dadosProdutor, setDadosProdutor] = useState("");

  const anoAtual = new Date().getFullYear();

  const recarregarDados = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/producao?produtorId=${produtorId}`
      );
      setDadosProducao(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    recarregarDados();
  }, [produtorId]);


  const handleProducaoCadastrada = () => {
    recarregarDados();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="rounded-xl w-full max-w-[60vw] max-h-[90vh] flex flex-col bg-white border border-gray-200 shadow-lg">
          <h1 className="p-4 text-xl font-bold sticky top-0 border-b-2 border-[#ff6600]">
            Produção
          </h1>

          <div className="flex-1 overflow-y-auto px-2 py-2">
            {dadosProducao.length === 0 ? (
              <>
                <p className="text-center py-4">
                  A produção de {anoAtual} ainda não foi criada
                </p>
                <div className="w-full flex items-center justify-center">
                  <button
                    onClick={() => setOpenCadProducao(true)}
                    className="bg-[#000000] font-medium text-[#FFFFFF] px-2 py-2 rounded-sm"
                  >
                    Cadastrar produção
                  </button>
                </div>

                {isOpenCadProducao && (
                  <div className="border border-[#99b0aa] my-2 rounded-sm px-2 py-2">
                    <div className="flex justify-end">
                      <button
                        onClick={() => setOpenCadProducao(false)}
                        className="ml-auto"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="-2 -2 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="m11.414 10l2.829-2.828a1 1 0 1 0-1.415-1.415L10 8.586L7.172 5.757a1 1 0 0 0-1.415 1.415L8.586 10l-2.829 2.828a1 1 0 0 0 1.415 1.415L10 11.414l2.828 2.829a1 1 0 0 0 1.415-1.415zM10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10s-4.477 10-10 10"
                          />
                        </svg>
                      </button>
                    </div>
                    <FormCadastroProducao
                      produtorId={produtorId}
                      onClose={() => setOpenCadProducao(false)}
                      onSuccess={handleProducaoCadastrada}
                    />
                  </div>
                )}
              </>
            ) : (
              <CardInfoProducao
                dadosProducao={dadosProducao}
                onAtualizarDados={handleProducaoCadastrada}
              />
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ProducaoModalPage;
