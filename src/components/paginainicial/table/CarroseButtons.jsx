import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";

import DadosSafraCidadesTable from "./DadosSafraCidadesTable";

const CarroselButtonsRegionais = ({ UF }) => {
  const [regionalSelecionada, setRegionalSelecionada] = useState(null);
  const [cidadesFiltradas, setCidadesFiltradas] = useState([]);

  const totalCidades = UF.flatMap((regional) => regional.cidades).length;

  const handleRegionalClick = (regional) => {
    setRegionalSelecionada(regional.nome_regional);
    setCidadesFiltradas(regional.cidades);
  };

  const dadosParaTabela = regionalSelecionada
    ? cidadesFiltradas
    : UF.flatMap((regional) => regional.cidades);

  return (
    <div className="w-full max-w-6xl mt-1">
      <div className="relative mt-1 pb-2 border-b border-gray-200">
        {/* Container principal do Swiper */}
        <div className="relative group">
          <Swiper
            modules={[Navigation, Mousewheel, FreeMode]}
            spaceBetween={10}
            slidesPerView={"auto"}
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
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            className="!overflow-hidden"
          >
            {/* Seus botões permanecem aqui */}
            <SwiperSlide className="!w-auto">
              <button
                className={`px-6 py-2 rounded-sm font-medium text-sm whitespace-nowrap ${
                  !regionalSelecionada
                    ? "bg-[#FFA94B] text-black"
                    : "bg-[#000000] text-[#FFA94B]"
                }`}
                onClick={() => {
                  setRegionalSelecionada(null);
                  setCidadesFiltradas([]);
                }}
              >
                Total cidades - {totalCidades}
              </button>
            </SwiperSlide>

            {UF.map((regional) => (
              <SwiperSlide key={regional.id} className="!w-auto">
                <button
                  className={`px-6 py-2 rounded-sm font-medium text-sm whitespace-nowrap transition-all duration-200 ${
                    regionalSelecionada === regional.nome_regional
                      ? "bg-[#FFA94B] text-[#000000]"
                      : "bg-[#000000] text-[#FFA94B]"
                  }`}
                  onClick={() => {
                    handleRegionalClick(regional);
                  }}
                >
                  {regional.nome_regional} - {regional.cidades.length}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="relative h-8 mt-2 group">
          <div className="swiper-button-prev absolute left-0 top-0 z-10 w-8 h-8 bg-black bg-opacity-70 text-[#FFA94B] rounded-full flex items-center justify-center transition-opacity duration-200 cursor-pointer">
            &lt;
          </div>
          <div className="swiper-button-next absolute right-0 top-0 z-10 w-8 h-8 bg-black bg-opacity-70 text-[#FFA94B] rounded-full flex items-center justify-center transition-opacity duration-200 cursor-pointer">
            &gt;
          </div>
        </div>
      </div>

      <DadosSafraCidadesTable data={dadosParaTabela} />
    </div>
  );
};

export default CarroselButtonsRegionais;
