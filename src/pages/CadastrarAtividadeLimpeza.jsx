import React from "react";
import CadastrarAtvLimpezaForm from "../components/atividades_limpeza/CadastrarAtvLimpezaForm";

const CadastrarAtividadeLimpeza = () => {
  return (
    <>
      <div className="flex gap-1">
        <span className="text-sm font-medium underline py-1">
          Atividades da Usina
        </span>
        <span className="font-medium text-[#FF6B00]">&gt;</span>
        <span className="text-sm font-medium py-1 underline">
          Cadastrar atividade de limpeza
        </span>
      </div>

      <h1 className="text-2xl font-bold">Cadastrar atividade de limpeza</h1>
      <CadastrarAtvLimpezaForm />
    </>
  );
};

export default CadastrarAtividadeLimpeza;
