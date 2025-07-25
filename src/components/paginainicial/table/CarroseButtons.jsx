import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";

import DadosSafraCidadesTable from "./DadosSafraCidadesTable";

const CarroselButtonsRegionais = ({ UF }) => {
  const [cidadesFiltradasRegionais, setCidadesFiltradas] = useState([]);
  const [regionalSelecionada, setRegionalSelecionada] = useState(null);

  const filterCidades = (regional) => {
    setRegionalSelecionada(regional);
    const cidades = UF.filter((item) => item.nomeRegional === regional);

    const contagemMunicipios = cidades.reduce((acc, cidade) => {
      const nomeMunicipio = cidade.nomeMunicipio;
      acc[nomeMunicipio] = (acc[nomeMunicipio] || 0) + 1;
      return acc;
    }, {});

    const municipiosFiltrados = Object.entries(contagemMunicipios).map(([municipio, qtd]) => ({
      nomeMunicipio: municipio,
      inscritos: qtd,
    }));

    setCidadesFiltradas(municipiosFiltrados);
  };

  const filterRegionaisEstado = [
    ...new Set(UF.map((item) => item.nomeRegional)),
  ];

   useEffect(() => {
    if (filterRegionaisEstado.length > 0) {
      filterCidades(filterRegionaisEstado[0]);
    }
  }, [UF]); 

  return (
    <div className="w-full max-w-6xl mt-1">
      <div className="relative mt-1 pb-2 border-b border-gray-200">
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
            {filterRegionaisEstado.map((nomeRegional) => (
              <SwiperSlide key={nomeRegional} className="!w-auto">
                <button
                  className={`px-6 py-2 rounded-sm font-medium text-sm whitespace-nowrap ${
                    nomeRegional === regionalSelecionada
                      ? "bg-[#f76300] text-[#FFFFFF]"
                      : "bg-[#000000] text-[#FFFFFF]"
                  }
                  `}
                  onClick={() => filterCidades(nomeRegional)}
                >
                  {nomeRegional}
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

      <DadosSafraCidadesTable data={cidadesFiltradasRegionais} />
    </div>
  );
};

export default CarroselButtonsRegionais;
