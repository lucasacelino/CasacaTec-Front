import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "../pages/Login/LoginPage";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/Home/HomePage";
import CadastrarProdutor from "../pages/Produtores/CadastrarProdutor";
import AcompanharProducao from "../pages/Produtores/AcompanharProducao";
import CadastrarAtividadeLimpeza from "../pages/CadastrarAtividadeLimpeza";
// import ListAtividadesCadastradas from "../components/atividades_limpeza/ListAtividadesCadastradas";
import ListAtividadesLimpezaCadastradas from "../pages/Usina/ListAtividadesLimpezaCadastradas";


const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />

            <Route path="/produtores">
              <Route path="cadastrarprodutor" element={<CadastrarProdutor />} />
              <Route path="acompanhamento" element={<AcompanharProducao />} />
            </Route>

            <Route path="/usina">
              <Route path="limpeza" element={<CadastrarAtividadeLimpeza />} />
              <Route path="atividadescadastradas" element={<ListAtividadesLimpezaCadastradas />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
