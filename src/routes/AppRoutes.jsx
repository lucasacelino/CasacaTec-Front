import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "../pages/Login/LoginPage";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/Home/HomePage";
import CadastrarProdutor from "../pages/Produtores/CadastrarProdutor";
import AcompanharProducao from "../pages/Produtores/AcompanharProducao";
import CadastrarAtividadeLimpeza from "../pages/CadastrarAtividadeLimpeza";


const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />

            <Route path="/produtores">
              <Route path="cadastrar" element={<CadastrarProdutor />} />
              <Route path="acompanhamento" element={<AcompanharProducao />} />
            </Route>

            <Route path="/usina">
              <Route path="limpeza" element={<CadastrarAtividadeLimpeza />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
