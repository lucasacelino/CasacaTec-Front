import React, { useEffect, useState } from "react";
import CardItem from "./CardItem";
import produtor from "../../../assets/SVGs/produtor.svg";
import fazenda from "../../../assets/SVGs/fazenda.svg";
import semente from "../../../assets/SVGs/semente.svg";
import algodao from "../../../assets/SVGs/algodao.svg";
// import colheita from "../../../assets/SVGs/colheita.svg";

import axios from "axios";

const DashboardInfoGeraisSafra = () => {

  const [dadosDashBoard, setDadosDashBoard] = useState({
    totalProdutores: 0,
    totalMunicipios: 0,
    totalSacos: 0,
    hectaresPlantados: 0,
  });

  const fetchDashBoardData = async () => {
    try {
      const [produtoresResponse, totalSacosResponse, hectaresResponse] = await Promise.all([
        axios.get("http://localhost:8080/produtores"),
        axios.get("http://localhost:8080/distriSementes/totalSacosDistribuidos"),
        axios.get("http://localhost:8080/producoes/totalAreaPlantada")
      ]);

      const totalProdutores = produtoresResponse.data.length;

      const municipios = [
        ...new Set(produtoresResponse.data.map((item) => item.municipio)),
      ];
      const totalMunicipios = municipios.length;

      console.log("Resposta hectares:", hectaresResponse.data);

      setDadosDashBoard({
        totalProdutores: totalProdutores,
        totalMunicipios: totalMunicipios,
        totalSacos: totalSacosResponse.data || 0,
        hectaresPlantados: hectaresResponse.data || 0 
      });
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    fetchDashBoardData();
  }, []);

  const dadosCards = [
    {
      titulo: "Total produtores",
      // valor: qtdProdutores,
      valor: dadosDashBoard.totalProdutores,
      icon: produtor,
    },
    {
      titulo: "Total Municípios",
      // valor: qtdProdutores,
      valor: dadosDashBoard.totalMunicipios,
      icon: fazenda,
    },
    {
      titulo: "Sacos Distribuídos",
      valor: dadosDashBoard.totalSacos,
      icon: semente,
    },
    {
      titulo: "Hectares plantados",
      valor: dadosDashBoard.hectaresPlantados,
      icon: algodao,
    },

  ];

  return (
    <div className="flex flex-row gap-2">
      {dadosCards.map((dados, index) => (
        <CardItem
          key={index}
          titulo={dados.titulo}
          valor={dados.valor}
          icon={dados.icon}
        />
      ))}
    </div>
  );
};

export default DashboardInfoGeraisSafra;
