// import axios from "axios";
// import { useEffect, useState } from "react";
// import ModalDeleteTecnico from "../Modal/ModalDeleteTecnico";
// import ModalEditInfoTecnico from "../Modal/ModalEditInfoTecnico";
// import CidadesAtendidasModal from "../Modal/CidadesAtendidasModal";

// const TableTecnicos = () => {
//   const [isEditOpen, setIsEditOpen] = useState(false);
//   const [isDeletOpen, setIsDeletOpen] = useState(false);
//   const [isOpenViewCidades, setisOpenViewCidades] = useState(false);
//   const [tecnicoId, setTecnicoId] = useState(null);
//   const [dadosTecnicos, setDadosTecnicos] = useState([]);

//   const carregarDadosTecnicos = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/tecnicos");
//       setDadosTecnicos(response.data);
//     } catch (error) {
//       console.error("Erro ao carregar técnicos:", error);
//     }
//   };

//   useEffect(() => {
//     carregarDadosTecnicos();
//   }, []);

//   const handleEdicaoConcluida = () => {
//     carregarDadosTecnicos();
//   };

//   if (dadosTecnicos.length === 0) {
//     return (
//       <div className="flex items-center justify-center mt-2 gap-2">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="30"
//           height="30"
//           viewBox="-2 -2 24 24"
//         >
//           <path
//             fill="currentColor"
//             d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10s-4.477 10-10 10m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16m0-13a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0V6a1 1 0 0 1 1-1m0 10a1 1 0 1 1 0-2a1 1 0 0 1 0 2"
//           />
//         </svg>

//         <span className="text-lg font-medium">Nenhum técnico cadastrado</span>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="mt-2 rounded-lg border border-gray-500 overflow-hidden">
//         <div className="overflow-x-auto" style={{ maxHeight: "400px" }}>
//           <table className="min-w-full bg-white">
//             <thead>
//               <tr className="bg-[#f1f0ea] border-b-2 border-[#FF6B00] sticky top-0">
//                 <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left">
//                   Nome completo
//                 </th>
//                 <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left">
//                   Email
//                 </th>
//                 <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left">
//                   Telefone
//                 </th>
//                 <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left">
//                   Cidades atendidadas
//                 </th>
//                 <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left">
//                   Ações
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {dadosTecnicos.map((dado) => (
//                 <tr key={dado.id}>
//                   <td className="py-2 px-4 border-b border-gray-400 font-medium">
//                     {dado.nomeCompleto}
//                   </td>
//                   <td className="py-2 px-4 border-b border-gray-400 font-medium">
//                     {dado.email}
//                   </td>
//                   <td className="py-2 px-4 border-b border-gray-400 font-medium">
//                     {dado.telefone}
//                   </td>
//                   <td className="py-2 px-6 text-center border-b border-gray-400">
//                     <button
//                       onClick={() => {
//                         setisOpenViewCidades(true);
//                         setTecnicoId(dado.id);
//                       }}
//                       className="border border border-gray-400 flex items-center rounded-sm p-2 gap-1 "
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="22"
//                         height="22"
//                         viewBox="0 0 24 24"
//                       >
//                         <g fill="currentColor">
//                           <path d="M4.793 4.293a1 1 0 0 1 1.414 0L9.414 7.5L8.068 8.846v.245a.75.75 0 0 1-1.5 0V7.482L5.5 6.414L4.432 7.482v1.609a.75.75 0 1 1-1.5 0v-.245L1.586 7.5zm10.275 5.053L15 9.414L13.586 8l3.707-3.707a1 1 0 0 1 1.414 0L22.414 8L21 9.414l-.068-.068v.563a.75.75 0 1 1-1.5 0V7.846L18 6.414l-1.432 1.432v2.063a.75.75 0 0 1-1.5 0zm-3.775-.053a1 1 0 0 1 1.414 0l6.207 6.207l-1.414 1.414l-.5-.5V19a1 1 0 1 1-2 0v-4.5q0-.042.003-.082L12 11.414l-3.003 3.004q.003.04.003.082V19a1 1 0 1 1-2 0v-2.586l-.5.5L5.086 15.5z" />
//                           <path d="M12 15a1.5 1.5 0 0 0-1.5 1.5V20h3v-3.5A1.5 1.5 0 0 0 12 15" />
//                         </g>
//                       </svg>
//                       <span>Visulizar cidades</span>
//                     </button>
//                   </td>
//                   <td className="py-2 px-6 text-center border-b border-gray-400">
//                     <div className="flex items-center justify-start space-x-2">
//                       <button
//                         onClick={() => {
//                           setIsEditOpen(true);
//                           setTecnicoId(dado.id);
//                         }}
//                         className="flex items-center p-2 text-[#000000]border-black font-medium rounded-sm transition-colors duration-200 hover:text-blue-800 border border-gray-400"
//                         title="Editar"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="20"
//                           height="20"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             fill="#000000"
//                             d="M4.42 20.579a1 1 0 0 1-.737-.326a.988.988 0 0 1-.263-.764l.245-2.694L14.983 5.481l3.537 3.536L7.205 20.33l-2.694.245a.95.95 0 0 1-.091.004ZM19.226 8.31L15.69 4.774l2.121-2.121a1 1 0 0 1 1.415 0l2.121 2.121a1 1 0 0 1 0 1.415l-2.12 2.12l-.001.001Z"
//                           />
//                         </svg>
//                         <p className="pl-1">Editar</p>
//                       </button>
//                       <button
//                         onClick={() => {
//                           setIsDeletOpen(true);
//                           setTecnicoId(dado.id);
//                         }}
//                         className="p-2 flex items-center font-medium text-[#000000] rounded-sm transition-colors duration-200 hover:text-red-800 border border-gray-400"
//                         title="Excluir"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="20"
//                           height="20"
//                           viewBox="0 0 24 24"
//                           className=""
//                         >
//                           <path
//                             fill="#df2935"
//                             d="M6.187 8h11.625l-.695 11.125A2 2 0 0 1 15.121 21H8.879a2 2 0 0 1-1.996-1.875zM19 5v2H5V5h3V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1zm-9 0h4V4h-4z"
//                           />
//                         </svg>
//                         <p className="">Excluir</p>
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <ModalEditInfoTecnico
//         tecnicoId={tecnicoId}
//         isOpen={isEditOpen}
//         onClose={() => setIsEditOpen(false)}
//         onSuccess={handleEdicaoConcluida}
//       />

//       <ModalDeleteTecnico
//         tecnicoId={tecnicoId}
//         isOpen={isDeletOpen}
//         onClose={() => setIsDeletOpen(false)}
//         onSuccess={handleEdicaoConcluida}
//       />

//       <CidadesAtendidasModal
//         tecnicoId={tecnicoId}
//         isOpen={isOpenViewCidades}
//         onClose={() => setisOpenViewCidades(false)}
//       />
//     </>
//   );
// };

// export default TableTecnicos;


import axios from "axios";
import { useEffect, useState } from "react";
import ModalDeleteTecnico from "../Modal/ModalDeleteTecnico";
import ModalEditInfoTecnico from "../Modal/ModalEditInfoTecnico";
import CidadesAtendidasModal from "../Modal/CidadesAtendidasModal";

const TableTecnicos = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeletOpen, setIsDeletOpen] = useState(false);
  const [isOpenViewCidades, setisOpenViewCidades] = useState(false);
  const [tecnicoId, setTecnicoId] = useState(null);
  const [dadosTecnicos, setDadosTecnicos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const carregarDadosTecnicos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/tecnicos");
      setDadosTecnicos(response.data);
    } catch (error) {
      console.error("Erro ao carregar técnicos:", error);
    }
  };

  useEffect(() => {
    carregarDadosTecnicos();
  }, []);

  const handleEdicaoConcluida = () => {
    carregarDadosTecnicos();
  };

  // Filtrar técnicos baseado no termo de pesquisa
  const tecnicosFiltrados = dadosTecnicos.filter((tecnico) =>
    tecnico.nomeTecnico.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (dadosTecnicos.length === 0) {
    return (
      <div className="flex items-center justify-center mt-2 gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="-2 -2 24 24"
        >
          <path
            fill="currentColor"
            d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10s-4.477 10-10 10m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16m0-13a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0V6a1 1 0 0 1 1-1m0 10a1 1 0 1 1 0-2a1 1 0 0 1 0 2"
          />
        </svg>
        <span className="text-lg font-medium">Nenhum técnico cadastrado</span>
      </div>
    );
  }

  return (
    <>
      {/* Campo de pesquisa */}
      <div className="mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="text-gray-400"
            >
              <path
                fill="#FF6B00"
                d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Pesquisar técnico por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-2 w-[300px] pl-10 pr-4 py-2 border border-vlack rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent outline-none transition-all duration-200"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                className="text-gray-400 hover:text-gray-600"
              >
                <path
                  fill="currentColor"
                  d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
                />
              </svg>
            </button>
          )}
        </div>
        {searchTerm && (
          <p className="text-sm text-gray-600 mt-2">
            {tecnicosFiltrados.length} resultado(s) encontrado(s) para "{searchTerm}"
          </p>
        )}
      </div>

      {/* Mensagem quando não há resultados na pesquisa */}
      {searchTerm && tecnicosFiltrados.length === 0 ? (
        <div className="flex items-center justify-center mt-8 gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            className="text-gray-400"
          >
            <path
              fill="currentColor"
              d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"
            />
          </svg>
          <span className="text-lg font-medium text-gray-500">
            Nenhum técnico encontrado para "{searchTerm}"
          </span>
        </div>
      ) : (
        <div className="mt-2 rounded-lg border border-gray-500 overflow-hidden">
          <div className="overflow-x-auto" style={{ maxHeight: "400px" }}>
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-[#f1f0ea] border-b-2 border-[#FF6B00] sticky top-0">
                  <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left">
                    Nome completo
                  </th>
                  <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left">
                    Email
                  </th>
                  <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left">
                    Telefone
                  </th>
                  {/* <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left">
                    Cidades atendidas
                  </th> */}
                  <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {tecnicosFiltrados.map((dado) => (
                  <tr key={dado.id}>
                    <td className="py-2 px-4 border-b border-gray-400 font-medium">
                      {dado.nomeTecnico}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-400 font-medium">
                      {dado.emailTecnico}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-400 font-medium">
                      {dado.telefoneTecnico}
                    </td>
                    {/* <td className="py-2 px-6 text-center border-b border-gray-400">
                      <button
                        onClick={() => {
                          setisOpenViewCidades(true);
                          setTecnicoId(dado.id);
                        }}
                        className="border border border-gray-400 flex items-center rounded-sm p-2 gap-1 "
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                        >
                          <g fill="currentColor">
                            <path d="M4.793 4.293a1 1 0 0 1 1.414 0L9.414 7.5L8.068 8.846v.245a.75.75 0 0 1-1.5 0V7.482L5.5 6.414L4.432 7.482v1.609a.75.75 0 1 1-1.5 0v-.245L1.586 7.5zm10.275 5.053L15 9.414L13.586 8l3.707-3.707a1 1 0 0 1 1.414 0L22.414 8L21 9.414l-.068-.068v.563a.75.75 0 1 1-1.5 0V7.846L18 6.414l-1.432 1.432v2.063a.75.75 0 0 1-1.5 0zm-3.775-.053a1 1 0 0 1 1.414 0l6.207 6.207l-1.414 1.414l-.5-.5V19a1 1 0 1 1-2 0v-4.5q0-.042.003-.082L12 11.414l-3.003 3.004q.003.04.003.082V19a1 1 0 1 1-2 0v-2.586l-.5.5L5.086 15.5z" />
                            <path d="M12 15a1.5 1.5 0 0 0-1.5 1.5V20h3v-3.5A1.5 1.5 0 0 0 12 15" />
                          </g>
                        </svg>
                        <span>Visualizar cidades</span>
                      </button>
                    </td> */}
                    <td className="py-2 px-4 text-center border-b border-gray-400">
                      <div className="flex gap-2 justify-start">
                        <button
                          onClick={() => {
                            setIsEditOpen(true);
                            setTecnicoId(dado.idTecnico);
                          }}
                          className="flex items-center p-2 text-[#000000]border-black font-medium rounded-sm transition-colors duration-200 hover:text-blue-800 border border-gray-400"
                          title="Editar"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#000000"
                              d="M4.42 20.579a1 1 0 0 1-.737-.326a.988.988 0 0 1-.263-.764l.245-2.694L14.983 5.481l3.537 3.536L7.205 20.33l-2.694.245a.95.95 0 0 1-.091.004ZM19.226 8.31L15.69 4.774l2.121-2.121a1 1 0 0 1 1.415 0l2.121 2.121a1 1 0 0 1 0 1.415l-2.12 2.12l-.001.001Z"
                            />
                          </svg>
                          <p className="pl-1">Editar</p>
                        </button>
                        <button
                          onClick={() => {
                            setIsDeletOpen(true);
                            setTecnicoId(dado.idTecnico);
                          }}
                          className="p-2 flex items-center font-medium text-[#000000] rounded-sm transition-colors duration-200 hover:text-red-800 border border-gray-400"
                          title="Excluir"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            className=""
                          >
                            <path
                              fill="#df2935"
                              d="M6.187 8h11.625l-.695 11.125A2 2 0 0 1 15.121 21H8.879a2 2 0 0 1-1.996-1.875zM19 5v2H5V5h3V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1zm-9 0h4V4h-4z"
                            />
                          </svg>
                          <p className="">Excluir</p>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ModalEditInfoTecnico
        id={tecnicoId}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSuccess={handleEdicaoConcluida}
      />

      <ModalDeleteTecnico
        id={tecnicoId}
        isOpen={isDeletOpen}
        onClose={() => setIsDeletOpen(false)}
        onSuccess={handleEdicaoConcluida}
      />

      <CidadesAtendidasModal
        tecnicoId={tecnicoId}
        isOpen={isOpenViewCidades}
        onClose={() => setisOpenViewCidades(false)}
      />
    </>
  );
};

export default TableTecnicos;