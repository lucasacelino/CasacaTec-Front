import SideBar from "./layout/SideBar";
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CadastrarProdutor from "./pages/CadastrarProdutor";
import MainLayout from "./layout/MainLayout";
import AcompanharProducao from "./pages/AcompanharProducao";
import LoginPage from "./pages/LoginPage";
// import CadastrarAtvLimpezaForm from "./components/atividades_limpeza/CadastrarAtvLimpezaForm";
import CadastrarAtividadeLimpeza from "./pages/CadastrarAtividadeLimpeza";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
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

}

export default App;
