// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { floatParaFormatoBR } from "../../produtores/utils/mascarasInputs";
// import NotaFiscalDetails from "./NotaFiscalDetails";

// const CardInfoNota = ({ produtorId }) => {
//   const [dadosNota, setDta] = useState([]);

//   const fetchDados = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:3000/notas?produtorId=${produtorId}`
//       );

//       setDta(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchDados();
//   }, [produtorId]);

//   const handleUpdate = () => {
//     fetchDados();
//   };

//   if (dadosNota.length === 0) {
//     return (
//       <div className="mt-6 mb-3 flex flex-row items-center justify-center gap-1">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="27"
//           height="27"
//           viewBox="0 0 48 48"
//         >
//           <path
//             fill="currentColor"
//             fillRule="evenodd"
//             d="M24 1.492c3.387 0 6.225.043 8.6.11a85 85 0 0 0-.1 4.462c0 1.96.044 3.43.103 4.525c.127 2.372 1.732 4.367 4.25 4.661c1.216.142 2.868.25 5.086.25c1.852 0 3.31-.075 4.448-.183c.07 2.39.113 5.253.113 8.675c0 11.925-.527 18.609-.841 21.535c-.218 2.023-2.546 2.82-4.01 1.6l-3.907-3.256l-2.599 2.599a2.5 2.5 0 0 1-3.33.184l-3.502-2.802l-2.543 2.543a2.5 2.5 0 0 1-3.536 0l-2.543-2.543l-3.503 2.802a2.5 2.5 0 0 1-3.33-.184l-2.598-2.599l-3.908 3.257c-1.464 1.22-3.791.422-4.009-1.601c-.314-2.926-.841-9.61-.841-21.535c0-9.172.312-14.328.602-17.147c.267-2.585 2.166-4.484 4.75-4.75c2.82-.291 7.976-.603 17.148-.603m-7.188 27.855c-.9.96-1.139 2.314-.27 3.303a12 12 0 0 0 1.082 1.082c.988.868 2.343.63 3.302-.271a191 191 0 0 0 3.21-3.098a193 193 0 0 0 3.211 3.098c.96.9 2.314 1.14 3.303.271a12 12 0 0 0 1.082-1.082c.868-.989.63-2.343-.271-3.303c-.695-.74-1.694-1.783-3.098-3.21a193 193 0 0 0 3.098-3.21c.9-.96 1.14-2.315.271-3.303a12 12 0 0 0-1.082-1.083c-.989-.868-2.343-.63-3.303.271c-.74.695-1.783 1.694-3.21 3.098a193 193 0 0 0-3.21-3.098c-.96-.9-2.315-1.139-3.303-.27a12 12 0 0 0-1.083 1.082c-.868.988-.63 2.343.271 3.302c.695.74 1.694 1.784 3.098 3.21a193 193 0 0 0-3.098 3.211"
//             clipRule="evenodd"
//           />
//           <path
//             fill="#000000"
//             d="M41.86 6.131c2.953 2.953 3.958 5.036 4.293 6.195c-1.036.1-2.413.174-4.214.174c-2.123 0-3.657-.103-4.737-.23c-.912-.106-1.546-.767-1.604-1.842a82 82 0 0 1-.098-4.364c0-1.834.04-3.21.091-4.228c1.186.336 3.314 1.34 6.27 4.295"
//           />
//         </svg>
//         <p className="text-lg font-bold">Nenhuma nota fiscal cadastrada</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="flex flex-row mt-10 font-medium text-lg border-b-2 border-[#ff5e00]">
//         <div className="">
//           <span>Notas cadastradas -</span>
//           <span className="ml-1 text-[#FFFFFF] bg-[#000000] px-2 py-1 rounded-sm">
//             {dadosNota.length}
//           </span>
//           <span className="ml-2 border-r-2 border-[##38444d]"></span>
//         </div>

//         <div className="flex ml-2">
//           <span>filtrar notas: </span>
//           <div className="">
//             <input
//               className="mb-1 ml-1 text-base border px-1 w-[190px] h-[30px] rounded-sm border-[#000000]"
//               type="text"
//               placeholder="Digite o número da nota"
//             />

//             <input
//               className="mb-1 ml-1 text-base border px-1 w-[190px] h-[30px] rounded-sm border-[#000000]"
//               type="text"
//               placeholder="Digite o ano"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-wrap py-2 gap-2">
//         {dadosNota.map((dado, index) => (
//           <NotaFiscalDetails
//             key={index}
//             notaId={dado.id}
//             numeroNota={dado.numeroNota}
//             numeroRomaneio={dado.numeroRomaneio}
//             peso={floatParaFormatoBR(dado.peso)}
//             valor={floatParaFormatoBR(dado.valor)}
//             dataPagamento={dado.dataPagamento}
//             onUpdate={handleUpdate}
//           />
//         ))}
//       </div>
//     </>
//   );
// };

// export default CardInfoNota;


import axios from "axios";
import React, { useEffect, useState } from "react";
import { floatParaFormatoBR } from "../../produtores/utils/mascarasInputs";
import NotaFiscalDetails from "./NotaFiscalDetails";

const CardInfoNota = ({ produtorId }) => {
  const [dadosNota, setDta] = useState([]);
  const [filtroNumeroNota, setFiltroNumeroNota] = useState("");
  const [filtroAno, setFiltroAno] = useState("");
  const [dadosFiltrados, setDadosFiltrados] = useState([]);

  const fetchDados = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/notas?produtorId=${produtorId}`
      );

      setDta(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDados();
  }, [produtorId]);

  // Efeito para aplicar os filtros sempre que os dados ou filtros mudarem
  useEffect(() => {
    let dadosParaFiltrar = [...dadosNota];

    // Filtro por número da nota
    if (filtroNumeroNota.trim() !== "") {
      dadosParaFiltrar = dadosParaFiltrar.filter(nota =>
        nota.numeroNota.toString().toLowerCase().includes(filtroNumeroNota.toLowerCase())
      );
    }

    // Filtro por ano (assumindo que existe uma propriedade de data na nota)
    if (filtroAno.trim() !== "") {
      dadosParaFiltrar = dadosParaFiltrar.filter(nota => {
        // Se houver uma propriedade dataEmissao ou similar
        if (nota.dataEmissao) {
          const anoNota = new Date(nota.dataEmissao).getFullYear().toString();
          return anoNota.includes(filtroAno);
        }
        // Caso contrário, usar dataPagamento
        if (nota.dataPagamento) {
          const anoNota = new Date(nota.dataPagamento).getFullYear().toString();
          return anoNota.includes(filtroAno);
        }
        return false;
      });
    }

    setDadosFiltrados(dadosParaFiltrar);
  }, [dadosNota, filtroNumeroNota, filtroAno]);

  const handleUpdate = () => {
    fetchDados();
  };

  const limparFiltros = () => {
    setFiltroNumeroNota("");
    setFiltroAno("");
  };

  // Usar dados filtrados para exibição
  const notasParaExibir = dadosFiltrados;

  if (dadosNota.length === 0) {
    return (
      <div className="mt-6 mb-3 flex flex-row items-center justify-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="27"
          viewBox="0 0 48 48"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M24 1.492c3.387 0 6.225.043 8.6.11a85 85 0 0 0-.1 4.462c0 1.96.044 3.43.103 4.525c.127 2.372 1.732 4.367 4.25 4.661c1.216.142 2.868.25 5.086.25c1.852 0 3.31-.075 4.448-.183c.07 2.39.113 5.253.113 8.675c0 11.925-.527 18.609-.841 21.535c-.218 2.023-2.546 2.82-4.01 1.6l-3.907-3.256l-2.599 2.599a2.5 2.5 0 0 1-3.33.184l-3.502-2.802l-2.543 2.543a2.5 2.5 0 0 1-3.536 0l-2.543-2.543l-3.503 2.802a2.5 2.5 0 0 1-3.33-.184l-2.598-2.599l-3.908 3.257c-1.464 1.22-3.791.422-4.009-1.601c-.314-2.926-.841-9.61-.841-21.535c0-9.172.312-14.328.602-17.147c.267-2.585 2.166-4.484 4.75-4.75c2.82-.291 7.976-.603 17.148-.603m-7.188 27.855c-.9.96-1.139 2.314-.27 3.303a12 12 0 0 0 1.082 1.082c.988.868 2.343.63 3.302-.271a191 191 0 0 0 3.21-3.098a193 193 0 0 0 3.211 3.098c.96.9 2.314 1.14 3.303.271a12 12 0 0 0 1.082-1.082c.868-.989.63-2.343-.271-3.303c-.695-.74-1.694-1.783-3.098-3.21a193 193 0 0 0 3.098-3.21c.9-.96 1.14-2.315.271-3.303a12 12 0 0 0-1.082-1.083c-.989-.868-2.343-.63-3.303.271c-.74.695-1.783 1.694-3.21 3.098a193 193 0 0 0-3.21-3.098c-.96-.9-2.315-1.139-3.303-.27a12 12 0 0 0-1.083 1.082c-.868.988-.63 2.343.271 3.302c.695.74 1.694 1.784 3.098 3.21a193 193 0 0 0-3.098 3.211"
            clipRule="evenodd"
          />
          <path
            fill="#000000"
            d="M41.86 6.131c2.953 2.953 3.958 5.036 4.293 6.195c-1.036.1-2.413.174-4.214.174c-2.123 0-3.657-.103-4.737-.23c-.912-.106-1.546-.767-1.604-1.842a82 82 0 0 1-.098-4.364c0-1.834.04-3.21.091-4.228c1.186.336 3.314 1.34 6.27 4.295"
          />
        </svg>
        <p className="text-lg font-bold">Nenhuma nota fiscal cadastrada</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-row mt-10 font-medium text-lg border-b-2 border-[#ff5e00]">
        <div className="">
          <span>Notas cadastradas -</span>
          <span className="ml-1 text-[#FFFFFF] bg-[#000000] px-2 py-1 rounded-sm">
            {dadosNota.length}
          </span>
          {notasParaExibir.length !== dadosNota.length && (
            <span className="ml-1 text-sm text-gray-600">
              ({notasParaExibir.length} filtradas)
            </span>
          )}
          <span className="ml-2 border-r-2 border-[##38444d]"></span>
        </div>

        <div className="flex ml-2">
          <span>filtrar notas: </span>
          <div className="">
            <input
              className="mb-1 ml-1 text-base border px-1 w-[190px] h-[30px] rounded-sm border-[#000000]"
              type="text"
              placeholder="Digite o número da nota"
              value={filtroNumeroNota}
              onChange={(e) => setFiltroNumeroNota(e.target.value)}
            />

            <input
              className="mb-1 ml-1 text-base border px-1 w-[190px] h-[30px] rounded-sm border-[#000000]"
              type="text"
              placeholder="Digite o ano"
              value={filtroAno}
              onChange={(e) => setFiltroAno(e.target.value)}
            />

            {(filtroNumeroNota.trim() !== "" || filtroAno.trim() !== "") && (
              <button
                onClick={limparFiltros}
                className="ml-2 px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded-sm transition-colors"
                title="Limpar filtros"
              >
                Limpar
              </button>
            )}
          </div>
        </div>
      </div>

      {notasParaExibir.length === 0 && dadosNota.length > 0 && (
        <div className="mt-6 mb-3 flex flex-row items-center justify-center gap-1">
          <p className="text-lg font-bold text-gray-600">
            Nenhuma nota encontrada com os filtros aplicados
          </p>
        </div>
      )}

      <div className="flex flex-wrap py-2 gap-2">
        {notasParaExibir.map((dado, index) => (
          <NotaFiscalDetails
            key={dado.id} // Melhor usar o id único em vez do index
            notaId={dado.id}
            numeroNota={dado.numeroNota}
            numeroRomaneio={dado.numeroRomaneio}
            peso={floatParaFormatoBR(dado.peso)}
            valor={floatParaFormatoBR(dado.valor)}
            dataPagamento={dado.dataPagamento}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </>
  );
};

export default CardInfoNota;