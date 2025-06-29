import React from "react";

const HomePage = () => {

  const anoAtual = new Date().getFullYear();

  return (
    <>
      <h1 className="text-2xl font-bold">Dados safra {anoAtual}</h1>
    </>
  );
};

export default HomePage;
