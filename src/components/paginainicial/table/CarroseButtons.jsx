import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";

// import CidadesTable from "./DadosSafraCidadesTable";
import DadosSafraCidadesTable from "./DadosSafraCidadesTable";

const CarroselButtonsRegionais = ({ UF }) => {
  const [regionalSelecionada, setRegionalSelecionada] = useState(null);
  const [cidadesFiltradas, setCidadesFiltradas] = useState([]);

  const handleRegionalClick = (regional) => {
    setRegionalSelecionada(regional.nome_regional);
    setCidadesFiltradas(regional.cidades);
  };

  const dadosParaTabela = regionalSelecionada
    ? cidadesFiltradas
    : UF.flatMap((regional) => regional.cidades);

  return (
    <div className="w-full max-w-6xl mt-4">
      <p className="text-lg font-medium">Regionais</p>
      <div className="relative mt-1 pb-2 border-b border-gray-200">
        <Swiper
          modules={[Mousewheel, FreeMode]}
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
          className="!overflow-visible"
        >
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
                  // setCidadesFiltradas(cidadesFiltradas[0]);
                }}

                // handleRegionalClick(regional)}
              >
                {regional.nome_regional}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <DadosSafraCidadesTable data={dadosParaTabela} />
    </div>
  );
};

export default CarroselButtonsRegionais;
