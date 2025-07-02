import React, { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/mousewheel';

import CidadesTable from './CidadesTable';
import dadosProdICC_PB from '../../../services/mockProd';

const CarroseButtons = () => {

  const [regionalSelecionada, setRegionalSelecionada] = useState(null);
  const [cidadesFiltradas, setCidadesFiltradas] = useState([]);

  const handleRegionalClick = (regional) => {
    setRegionalSelecionada(regional.nome_regional);
    setCidadesFiltradas(regional.cidades);
  };

  const dadosParaTabela = regionalSelecionada ? cidadesFiltradas : 
    dadosProdICC_PB.flatMap(regional => regional.cidades);

  return (
    <div className="w-full max-w-6xl mt-4">
      <p className="text-lg font-medium">Regionais</p>
      <div className="relative mt-1 pb-2 border-b border-gray-200">
        <Swiper
          modules={[Mousewheel, FreeMode]}
          spaceBetween={10}
          slidesPerView={'auto'}
          mousewheel={{
            forceToAxis: true,
            sensitivity: 1,
            releaseOnEdges: true,
          }}
          freeMode={{
            enabled: true,
            momentumRatio: 0.2,
            momentumBounceRatio: 0.1,
          }}
          resistanceRatio={0}
          className="!overflow-visible"
        >
          {/* Botão "Todas as Regionais" */}
          {/* <SwiperSlide className="!w-auto">
            <button
              className={`px-6 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-200 ${
                !regionalSelecionada 
                  ? 'bg-[#FFA94B] text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => {
                setRegionalSelecionada(null);
                setCidadesFiltradas([]);
              }}
            >
              Todas as Regionais
            </button>
          </SwiperSlide> */}

          {/* Botões das Regionais */}
          {dadosProdICC_PB.map((regional) => (
            <SwiperSlide key={regional.id} className="!w-auto">
              <button
                className={`px-6 py-2 rounded-sm font-medium text-sm whitespace-nowrap transition-all duration-200 ${
                  regionalSelecionada === regional.nome_regional
                    ? 'bg-[#FFA94B] text-[#000000]'
                    : 'bg-[#000000] text-[#FFA94B]'
                }`}
                onClick={() => handleRegionalClick(regional)}
              >
                {regional.nome_regional}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Tabela de Cidades */}
      <CidadesTable data={dadosParaTabela} />
    </div>
  );
};

export default CarroseButtons;