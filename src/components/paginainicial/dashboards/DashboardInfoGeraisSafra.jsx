import React, { useEffect, useState } from "react";
import CardItem from "./CardItem";
import produtor from "../../../assets/SVGs/produtor.svg";
import fazenda from "../../../assets/SVGs/fazenda.svg";
import semente from "../../../assets/SVGs/semente.svg";
import algodao from "../../../assets/SVGs/algodao.svg";
// import colheita from "../../../assets/SVGs/colheita.svg";

import axios from "axios";

const DashboardInfoGeraisSafra = () => {
  // const [qtdProdutores, setQtdProdutores] = useState(0);
  // const [qtdMunicipios, setQtdMunicipios] = useState(0);

  // useEffect(() => {
  //   const fetchProdutores = async () => {
  //     const response = await axios.get("http://localhost:8080/produtores");
  //     const totalProdutores = response.data.length;
  //     setQtdProdutores(totalProdutores);

  //     const municipios = [
  //       ...new Set(response.data.map((item) => item.municipio)),
  //     ];
  //     setQtdMunicipios(municipios.length);
  //   };
  //   fetchProdutores();
  // }, []);

  // const [dadosDashBoard, setDadosDashBoard] = useState({
  //   totalProdutores: 0,
  //   totalMunicipios: 0,
  //   // sacosDistribuidos: 0,
  //   hectaresPlantados: 0,
  // });

  // const fetchDashBoardData = async () => {
  //   try {
  //     const [produtoresResponse, hectaresResponse] =
  //       await Promise.all([
  //         axios.get("http://localhost:8080/produtores"),
  //         // axios.get("http://localhost:8080/distriSementes"),
  //         axios.get("http://localhost:8080/producoes/totalAreaPlantada"),
  //       ]);

  //     const totalProdutores = produtoresResponse.data.length;

  //     const municipios = [
  //       ...new Set(produtoresResponse.data.map((item) => item.municipio)),
  //     ];
  //     setQtdMunicipios(municipios.length);

  //     setDadosDashBoard({
  //       totalProdutores: totalProdutores,
  //       totalMunicipios: qtdMunicipios,
  //       hectaresPlantados: hectaresResponse

  //     })

  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchDashBoardData();
  // }, [])

  const [dadosDashBoard, setDadosDashBoard] = useState({
    totalProdutores: 0,
    totalMunicipios: 0,
    hectaresPlantados: 0,
  });

  const fetchDashBoardData = async () => {
    try {
      const [produtoresResponse, hectaresResponse] = await Promise.all([
        axios.get("http://localhost:8080/produtores"),
        axios.get("http://localhost:8080/producoes/totalAreaPlantada"),
      ]);

      const totalProdutores = produtoresResponse.data.length;

      // Calcula municípios diretamente
      const municipios = [
        ...new Set(produtoresResponse.data.map((item) => item.municipio)),
      ];
      const totalMunicipios = municipios.length;

      // Verifica a estrutura da resposta de hectares
      console.log("Resposta hectares:", hectaresResponse.data);

      setDadosDashBoard({
        totalProdutores: totalProdutores,
        totalMunicipios: totalMunicipios,
        hectaresPlantados: hectaresResponse.data || 0, // ajuste conforme a estrutura real
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
      valor: 0,
      icon: semente,
    },
    {
      titulo: "Hectares plantados",
      // valor: 0,
      valor: dadosDashBoard.hectaresPlantados,
      icon: algodao,
    },

    // {
    //   titulo: "Colheitas Entregues",
    //   valor: 0,
    //   icon: colheita,
    // },
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
