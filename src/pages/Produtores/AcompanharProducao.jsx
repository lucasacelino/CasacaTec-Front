import React from "react";
import SearchBarProdutores from "../../components/produtores/SearchBarProdutores";

const AcompanharProducao = () => {
  return (
    <>
      <div className="flex gap-1">
        <span className="text-sm font-medium underline py-1">Produtores</span>
        <span className="font-medium text-[#FF6B00]">&gt;</span>
        <span className="text-sm font-medium py-1 underline">
          Acompanhar produção
        </span>
      </div>

      <h1 className="text-2xl font-bold border-b-2 border-[#FF6B00]">
        Acompanhar produção
      </h1>
      <SearchBarProdutores />
    </>
  );
};

export default AcompanharProducao;
