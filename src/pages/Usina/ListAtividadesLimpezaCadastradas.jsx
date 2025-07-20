import React from "react";
import ListAtividadesCadastradas from "../../components/atividades_limpeza/ListAtividadesCadastradas";
import { useNavigate } from "react-router-dom";

const ListAtividadesLimpezaCadastradas = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* <p className="text-sm font-bold mb-2">Atividades da usina / Atividades de limpeza cadastradas</p> */}

      <div className="flex gap-1">
        <span className="text-sm font-medium underline py-1">Atividades da Usina</span>
        <span className="font-medium text-[#FF6B00]">&gt;</span>
        <span className="text-sm font-medium py-1 underline">Atividades de limpeza cadastradas</span>
      </div>

      <h1 className="mt-2 text-2xl font-bold border-b-2 border-[#FF6B00]">
        Atividades de limpeza cadastradas
      </h1>

      <div className="w-full flex justify-center">
        <button onClick={() => navigate("/usina/limpeza")} className="mt-4 bg-[#000000] px-3 py-3 text-[#FFFFFF] rounded-sm font-medium">Cadastrar nova atividade</button>
      </div>

      <ListAtividadesCadastradas />
    </>
  );
};

export default ListAtividadesLimpezaCadastradas;
