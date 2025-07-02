import React from 'react'
import CadastroProdutoresForm from '../components/produtores/CadastroProdutoresForm';

const CadastrarProdutor = () => {
  return (
    <>
      <p className="text-sm font-bold mb-2">Produtores / Cadastrar produtores</p>
      <h1 className="text-2xl font-bold">Cadastrar produtor</h1>
      <CadastroProdutoresForm />
    </>
    
  )
}

export default CadastrarProdutor;