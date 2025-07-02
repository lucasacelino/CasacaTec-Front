import React from "react";
import CardItem from "./CardItem";
import mockDashBoardCard from "../../../services/mockDashBoardCard";

const DashboardInfoGeraisSafra = () => {
  return (
    <div className="flex flex-row gap-4">
      {mockDashBoardCard.map((dados, index) => (
        <CardItem key={index.id} titulo={dados.titulo} valor={dados.valor} />
      ))}

      {/* <div className="bg-red-500 px-2 py-2">A</div>
      <div className="bg-red-500 px-2 py-2">B</div>
      <div className="bg-red-500 px-2 py-2">C</div>
      <div className="bg-red-500 px-2 py-2">D</div> */}
    </div>
  );
};

export default DashboardInfoGeraisSafra;
