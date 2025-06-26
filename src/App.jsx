import SideBar from "./layout/SideBar";
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import MainLayout from './components/MainLayout';
import CadastrarProdutor from "./pages/CadastrarProdutor";
import MainLayout from "./layout/MainLayout";
import AcompanharProducao from "./pages/AcompanharProducao";
// import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/produtores">
              <Route path="cadastrar" element={<CadastrarProdutor />} />
              <Route path="acompanhamento" element={<AcompanharProducao />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
