import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CadastrarProdutor from "./pages/Produtores/CadastrarProdutor";
import MainLayout from "./layout/MainLayout";
import AcompanharProducao from "./pages/Produtores/AcompanharProducao";
import LoginPage from "./pages/Login/LoginPage";
// import CadastrarAtvLimpezaForm from "./components/atividades_limpeza/CadastrarAtvLimpezaForm";
import CadastrarAtividadeLimpeza from "./pages/CadastrarAtividadeLimpeza";
import HomePage from "./pages/Home/HomePage";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <AppRoutes />
      <Toaster />
    </>
  );
};

export default App;
