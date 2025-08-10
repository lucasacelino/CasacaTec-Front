import { Dialog, DialogPanel } from "@headlessui/react";
import axios from "axios";
import { useEffect, useState } from "react";
// import React, { useEffect, useState } from "react";
// import FormCadastroProducao from "../Forms/FormCadastroProducao";
// import CardInfoProducao from "./CardInfoProducao";
// import axios from "axios";

const CidadesAtendidasModal = ({ tecnicoId, isOpen, onClose }) => {
  const [dadosTecnico, setDadosTecnico] = useState([]);

  useEffect(() => {
    const carregarDadoTecnico = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/tecnicos/${tecnicoId}`
        );
        setDadosTecnico(response.data.nomeCompleto);
      } catch (error) {
        console.error(error);
      }
    };

    carregarDadoTecnico();
  }, [tecnicoId]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="rounded-xl w-full max-w-[60vw] max-h-[90vh] flex flex-col bg-white border border-gray-200 shadow-lg">
          <div className="py-2 px-2 text-xl font-bold sticky top-0 border-b-2 border-[#ff6600]">
            <span className="">Técnico(a): {dadosTecnico}</span>
          </div>

          <div className="flex-1 overflow-y-auto px-2 py-2">
            <p>Cidades atendidas</p>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CidadesAtendidasModal;
