import React from 'react'
import CadastroProdutoresForm from '../../components/produtores/form/CadastroProdutoresForm';

const CadastrarProdutor = () => {
  return (
    <>
      <div className="flex gap-1">
        <span className="text-sm font-medium underline py-1">Produtores</span>
        <span className="font-medium text-[#FF6B00]">&gt;</span>
        <span className="text-sm font-medium py-1 underline">Cadastrar produtor</span>
      </div>
      <h1 className="text-2xl font-bold">Cadastrar produtor</h1>
      <CadastroProdutoresForm />
    </>
    
  )
}

export default CadastrarProdutor;