import React, { useEffect, useState } from "react";
import CardItem from "./CardItem";
import produtor from "../../../assets/SVGs/produtor.svg";
import fazenda from "../../../assets/SVGs/fazenda.svg";
import semente from "../../../assets/SVGs/semente.svg";
import algodao from "../../../assets/SVGs/algodao.svg";

import axios from "axios";

const DashboardInfoGeraisSafra = () => {
  // const [qtdProdutores, setQtdProdutores] = useState(0);
  // const [qtdMunicipios, setQtdMunicipios] = useState(0);

  // useEffect(() => {
  //   const fetchProdutores = async () => {
  //     const response = await axios.get("http://localhost:3000/produtores");
  //     const municipios = [...new Set(response.data.map(item => item.municipio.nomeMunicipio))];
  //     const totalProdutores = response.data.length;

  //     setQtdProdutores(totalProdutores);
  //     setQtdMunicipios(municipios.length)
  //   };
  //   fetchProdutores();
  // }, []);

  const dadosCards = [
    {
      titulo: "Total produtores",
      valor: 12,
      icon: produtor
    },
    {
      titulo: "Total Municípios",
      valor: 12,
      icon: fazenda
    },
    {
      titulo: "Sacos Distribuídas",
      valor: 12,
      icon: semente
    },
    {
      titulo: "Sacos Distribuídas",
      valor: 12,
      icon: algodao
    },
  ];

  return (
    <div className="flex flex-row gap-4">
      {dadosCards.map((dados, index) => (
        <CardItem key={index} titulo={dados.titulo} valor={dados.valor} icon={dados.icon}/>
      ))}
    </div>
  );
};

export default DashboardInfoGeraisSafra;
