// import React, { useEffect, useState } from "react";

import DashboardInfoGeraisSafra from "../../components/paginainicial/dashboards/DashboardInfoGeraisSafra";
import CarroselButtonsRegionais from "../../components/paginainicial/table/CarroseButtons";
// import axios from "axios";

const HomePage = () => {
  
  const anoAtual = new Date().getFullYear();

  // const [dados, setDados] = useState([]);
  // const [estadoSelecionado, setEstadoSelecionado] = useState("PB");

  // useEffect(() => {
  //   if (estadoSelecionado) {
  //     const carregarProdutores = async () => {
  //       const response = await axios.get(
  //         `http://localhost:8080/produtores?estado=${estadoSelecionado}`
  //       );
  //       setDados(response.data);
  //     };
  //     carregarProdutores();
  //   }
  // }, [estadoSelecionado]);

  return (
    <>
      <h2></h2>
      <h1 className="text-2xl font-bold">Dados Gerais - safra {anoAtual}</h1>
      <DashboardInfoGeraisSafra />

    </>
  );
};

export default HomePage;
