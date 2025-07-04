import React from "react";
import CardItem from "./CardItem";
import mockDashBoardCard from "../../../services/mockDashBoardCard";

const DashboardInfoGeraisSafra = () => {
  return (
    <div className="flex flex-row gap-4">
      {mockDashBoardCard.map((dados, index) => (
        <CardItem key={index.id} titulo={dados.titulo} valor={dados.valor} />
      ))}

    </div>
  );
};

export default DashboardInfoGeraisSafra;
