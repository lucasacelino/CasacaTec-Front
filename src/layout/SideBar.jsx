// import React, { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { ChevronDown, ChevronRight } from "lucide-react";
// import ProdutorIcon from "./produtorIcon";

// // import produtorIcon from './assets/produtor.svg'

// const menuItems = [
//   {
//     id: "produtores",
//     title: "Produtores",
//     isExpandable: true,
//     defaultOpen: true,
//     // icon: <img src={produtorIcon} alt="Produtor" className="w-5 h-5 mr-3" />,
//     // icon: <img src={produtorIcon} alt="Produtor" className="" />,
//     // icon: <ProdutorIcon className="" />,
//     children: [
//       {
//         id: "cadastrar-produtor",
//         title: "Cadastrar Produtor",
//         path: "/produtores/cadastrarprodutor",
//       },
//       {
//         id: "acompanhar-producao",
//         title: "Acompanhar produtor(a)",
//         path: "/produtores/acompanhamento",
//       },
//     ],
//   },
//   {
//     id: "atividades-usina",
//     title: "Atividades da Usina",
//     isExpandable: true,
//     defaultOpen: true,
//     children: [
//       {
//         id: "atividades-cadastradas",
//         title: "Atividades de limpeza cadastradas",
//         path: "/usina/atividadescadastradas",
//       },
//     ],
//   },
//   {
//     id: "distribuição-sementes",
//     title: "Distribuições de sementes",
//     isExpandable: true,
//     defaultOpen: true,
//     children: [
//       {
//         id: "cadastrar-distribuicao",
//         title: "Cadastrar distribuição de sementes",
//         path: "/distribuicao/cadastrardistribuicao",
//       },
//     ],
//   },
//   {
//     id: "tecnicos",
//     title: "Técnicos",
//     isExpandable: true,
//     defaultOpen: true,
//     children: [
//       {
//         id: "cadastrar-técnicos",
//         title: "Cadastrar técnico",
//         path: "/tecnicos/cadastrartecnicos",
//       },
//     ],
//   },
// ];

// const SideBar = () => {
//   const navigate = useNavigate();
//   const [expandedSections, setExpandedSections] = useState(() => {
//     const initialState = {};
//     menuItems.forEach((item) => {
//       if (item.isExpandable) {
//         initialState[item.id] = item.defaultOpen || false;
//       }
//     });
//     return initialState;
//   });

//   // Estado para controlar o item ativo
//   const [activeItem, setActiveItem] = useState(null);

//   // Função para alternar o estado de expansão de uma seção
//   const toggleSection = (sectionId) => {
//     setExpandedSections((prev) => ({
//       ...prev,
//       [sectionId]: !prev[sectionId],
//     }));
//   };

//   // Função para lidar com clique em item do menu
//   const handleItemClick = (item) => {
//     setActiveItem(item.id);
//     navigate(item.path);
//   };

//   const renderMenuItem = (item) => (
//     <li key={item.id}>
//       <button
//         onClick={() => handleItemClick(item)}
//         className={`flex items-center text-left whitespace-normal p-2 pl-3 rounded-lg text-sm transition-colors duration-200 hover:bg-[#f76300] bg-opacity-80 ${
//           activeItem === item.id
//             ? "text-[#000000] font-medium bg-[#fcaf58]"
//             : "text-white font-medium hover:text-[#000000]"
//         }`}
//       >
//         {item.icon}
//         {item.title}
//       </button>
//     </li>
//   );

//   // Componente para renderizar seções expandíveis
//   const renderExpandableSection = (section) => {
//     const isExpanded = expandedSections[section.id];

//     return (
//       <li key={section.id}>
//         <button
//           onClick={() => toggleSection(section.id)}
//           className="flex items-center justify-between w-full p-3 rounded-lg text-gray-700 hover:bg-gray-800 transition-colors duration-200 group"
//           aria-expanded={isExpanded}
//           aria-controls={`section-${section.id}`}
//         >
//           <div className="flex items-center">
//             <span className="whitespace-nowrap text-white font-medium group-hover:text-[#8ecae6] transition-colors duration-200">
//               {section.title}
//             </span>
//           </div>
//           <div className="transition-transform duration-200">
//             {isExpanded ? (
//               <ChevronDown className="w-4 h-4 text-white group-hover:text-[#fcaf58]" />
//             ) : (
//               <ChevronRight className="w-4 h-4 text-white group-hover:text-[#fcaf58]" />
//             )}
//           </div>
//         </button>

//         <div
//           id={`section-${section.id}`}
//           className={`overflow-hidden transition-all duration-300 ease-in-out ${
//             isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//           }`}
//         >
//           <ul className="ml-8 mt-1 space-y-1 pb-1">
//             {section.children?.map(renderMenuItem)}
//           </ul>
//         </div>
//       </li>
//     );
//   };

//   const renderSimpleItem = (item) => (
//     <li key={item.id}>
//       <button
//         onClick={() => handleItemClick(item)}
//         className={`flex items-center w-full p-3 rounded-lg text-sm transition-colors duration-200 hover:bg-gray-800 ${
//           activeItem === item.id
//             ? "text-[#fcaf58] font-medium"
//             : "text-white hover:text-[#F9BF80]"
//         }`}
//       >
//         {item.title}
//       </button>
//     </li>
//   );

//   return (
//     <aside className="fixed top-16 left-0 bottom-0 z-40 w-64 bg-[#000000] shadow-lg border-r border-gray-200">
//       <nav className="p-2 overflow-y-auto h-[calc(100%-5rem)]">
//         <ul className="space-y-1">
//           {menuItems.map((item) =>
//             item.isExpandable
//               ? renderExpandableSection(item)
//               : renderSimpleItem(item)
//           )}
//         </ul>
//       </nav>
//     </aside>
//   );
// };

// export default SideBar;

// import React, { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { ChevronDown, ChevronRight } from "lucide-react";

// // Componentes de ícones SVG personalizados
// const ProdutorIcon = ({ className = "w-5 h-5" }) => (
//   <svg
//     className={className}
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
//       fill="currentColor"
//     />
//     <path
//       d="M18 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.33 0-4 .67-4 2v1h8v-1c0-1.33-2.67-2-4-2z"
//       fill="currentColor"
//       opacity="0.7"
//     />
//   </svg>
// );

// const UsinaIcon = ({ className = "w-5 h-5" }) => (
//   <svg
//     className={className}
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.46 9-11V7l-10-5z"
//       stroke="currentColor"
//       strokeWidth="2"
//       fill="none"
//     />
//     <path
//       d="M9 12l2 2 4-4"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <circle cx="8" cy="8" r="1" fill="currentColor" />
//     <circle cx="16" cy="8" r="1" fill="currentColor" />
//   </svg>
// );

// const SementeIcon = ({ className = "w-5 h-5" }) => (
//   <svg
//     className={className}
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M12 2c-4.97 0-9 4.03-9 9 0 4.17 2.84 7.67 6.69 8.69L12 22l2.31-2.31C18.16 18.67 21 15.17 21 11c0-4.97-4.03-9-9-9z"
//       fill="currentColor"
//       opacity="0.8"
//     />
//     <path
//       d="M12 4c-3.31 0-6 2.69-6 6 0 2.97 2.16 5.44 5 5.92V8c0-1.66 1.34-3 3-3s3 1.34 3 3v7.92c2.84-.48 5-2.95 5-5.92 0-3.31-2.69-6-6-6z"
//       fill="white"
//       opacity="0.3"
//     />
//     <circle cx="12" cy="11" r="2" fill="currentColor" />
//   </svg>
// );

// const TecnicoIcon = ({ className = "w-5 h-5" }) => (
//   <svg
//     className={className}
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"
//       fill="currentColor"
//     />
//     <rect x="6" y="10" width="12" height="1" fill="white" opacity="0.7" />
//     <rect x="6" y="13" width="8" height="1" fill="white" opacity="0.7" />
//     <rect x="6" y="16" width="10" height="1" fill="white" opacity="0.7" />
//   </svg>
// );

// // Ícones para itens de submenu
// const CadastrarIcon = ({ className = "w-4 h-4" }) => (
//   <svg
//     className={className}
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
//       fill="currentColor"
//     />
//   </svg>
// );

// const AcompanharIcon = ({ className = "w-4 h-4" }) => (
//   <svg
//     className={className}
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
//       fill="currentColor"
//     />
//   </svg>
// );

// const AtividadeIcon = ({ className = "w-4 h-4" }) => (
//   <svg
//     className={className}
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"
//       fill="currentColor"
//     />
//   </svg>
// );

// const DistribuicaoIcon = ({ className = "w-4 h-4" }) => (
//   <svg
//     className={className}
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M19 7h-3V6c0-1.1-.9-2-2-2H10c-1.1 0-2 .9-2 2v1H5c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 6h4v1h-4V6zm9 12H5V9h14v9z"
//       fill="currentColor"
//     />
//     <circle cx="9" cy="13" r="1" fill="currentColor" />
//     <circle cx="12" cy="13" r="1" fill="currentColor" />
//     <circle cx="15" cy="13" r="1" fill="currentColor" />
//   </svg>
// );

// const menuItems = [
//   {
//     id: "produtores",
//     title: "Produtores",
//     isExpandable: true,
//     defaultOpen: true,
//     icon: <ProdutorIcon className="w-5 h-5 mr-3" />,
//     children: [
//       {
//         id: "cadastrar-produtor",
//         title: "Cadastrar Produtor",
//         path: "/produtores/cadastrarprodutor",
//         icon: <CadastrarIcon className="w-4 h-4 mr-2" />,
//       },
//       {
//         id: "acompanhar-producao",
//         title: "Acompanhar produtor(a)",
//         path: "/produtores/acompanhamento",
//         icon: <AcompanharIcon className="w-4 h-4 mr-2" />,
//       },
//     ],
//   },
//   {
//     id: "atividades-usina",
//     title: "Atividades da Usina",
//     isExpandable: true,
//     defaultOpen: true,
//     icon: <UsinaIcon className="w-5 h-5 mr-3" />,
//     children: [
//       {
//         id: "atividades-cadastradas",
//         title: "Atividades de limpeza cadastradas",
//         path: "/usina/atividadescadastradas",
//         icon: <AtividadeIcon className="w-4 h-4 mr-2" />,
//       },
//     ],
//   },
//   {
//     id: "distribuição-sementes",
//     title: "Distribuições de sementes",
//     isExpandable: true,
//     defaultOpen: true,
//     icon: <SementeIcon className="w-5 h-5 mr-3" />,
//     children: [
//       {
//         id: "cadastrar-distribuicao",
//         title: "Cadastrar distribuição de sementes",
//         path: "/distribuicao/cadastrardistribuicao",
//         icon: <DistribuicaoIcon className="w-4 h-4 mr-2" />,
//       },
//     ],
//   },
//   {
//     id: "tecnicos",
//     title: "Técnicos",
//     isExpandable: true,
//     defaultOpen: true,
//     icon: <TecnicoIcon className="w-5 h-5 mr-3" />,
//     children: [
//       {
//         id: "cadastrar-técnicos",
//         title: "Cadastrar técnico",
//         path: "/tecnicos/cadastrartecnicos",
//         icon: <CadastrarIcon className="w-4 h-4 mr-2" />,
//       },
//     ],
//   },
// ];

// const SideBar = () => {
//   const navigate = useNavigate();
//   const [expandedSections, setExpandedSections] = useState(() => {
//     const initialState = {};
//     menuItems.forEach((item) => {
//       if (item.isExpandable) {
//         initialState[item.id] = item.defaultOpen || false;
//       }
//     });
//     return initialState;
//   });

//   // Estado para controlar o item ativo
//   const [activeItem, setActiveItem] = useState(null);

//   // Função para alternar o estado de expansão de uma seção
//   const toggleSection = (sectionId) => {
//     setExpandedSections((prev) => ({
//       ...prev,
//       [sectionId]: !prev[sectionId],
//     }));
//   };

//   // Função para lidar com clique em item do menu
//   const handleItemClick = (item) => {
//     setActiveItem(item.id);
//     navigate(item.path);
//   };

//   const renderMenuItem = (item) => (
//     <li key={item.id}>
//       <button
//         onClick={() => handleItemClick(item)}
//         className={`flex items-center text-left whitespace-normal p-2 pl-3 rounded-lg text-sm transition-colors duration-200 hover:bg-[#f76300] bg-opacity-80 ${
//           activeItem === item.id
//             ? "text-[#000000] font-medium bg-[#fcaf58]"
//             : "text-white font-medium hover:text-[#000000]"
//         }`}
//       >
//         {item.icon}
//         {item.title}
//       </button>
//     </li>
//   );

//   // Componente para renderizar seções expandíveis
//   const renderExpandableSection = (section) => {
//     const isExpanded = expandedSections[section.id];

//     return (
//       <li key={section.id}>
//         <button
//           onClick={() => toggleSection(section.id)}
//           className="flex items-center justify-between w-full p-3 rounded-lg text-gray-700 hover:bg-gray-800 transition-colors duration-200 group"
//           aria-expanded={isExpanded}
//           aria-controls={`section-${section.id}`}
//         >
//           <div className="flex items-center">
//             {section.icon}
//             <span className="whitespace-nowrap text-white font-medium group-hover:text-[#8ecae6] transition-colors duration-200">
//               {section.title}
//             </span>
//           </div>
//           <div className="transition-transform duration-200">
//             {isExpanded ? (
//               <ChevronDown className="w-4 h-4 text-white group-hover:text-[#fcaf58]" />
//             ) : (
//               <ChevronRight className="w-4 h-4 text-white group-hover:text-[#fcaf58]" />
//             )}
//           </div>
//         </button>

//         <div
//           id={`section-${section.id}`}
//           className={`overflow-hidden transition-all duration-300 ease-in-out ${
//             isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//           }`}
//         >
//           <ul className="ml-8 mt-1 space-y-1 pb-1">
//             {section.children?.map(renderMenuItem)}
//           </ul>
//         </div>
//       </li>
//     );
//   };

//   const renderSimpleItem = (item) => (
//     <li key={item.id}>
//       <button
//         onClick={() => handleItemClick(item)}
//         className={`flex items-center w-full p-3 rounded-lg text-sm transition-colors duration-200 hover:bg-gray-800 ${
//           activeItem === item.id
//             ? "text-[#fcaf58] font-medium"
//             : "text-white hover:text-[#F9BF80]"
//         }`}
//       >
//         {item.icon}
//         {item.title}
//       </button>
//     </li>
//   );

//   return (
//     <aside className="px-2 fixed top-16 left-0 bottom-0 z-40 w-64 bg-[#000000] shadow-lg border-r border-gray-200">
//       <nav className="p-2 overflow-y-auto h-[calc(100%-5rem)]">
//         <ul className="space-y-1">
//           {menuItems.map((item) =>
//             item.isExpandable
//               ? renderExpandableSection(item)
//               : renderSimpleItem(item)
//           )}
//         </ul>
//       </nav>
//     </aside>
//   );
// };

// export default SideBar;

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";

// Componentes de ícones SVG personalizados
const ProdutorIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 32 32"
  >
    <g fill="#FFFFFF">
      <path d="M18.502 8.838a.27.27 0 0 1-.166-.057a2.25 2.25 0 0 0-1.5-.355a.274.274 0 1 1-.065-.544a2.72 2.72 0 0 1 1.9.467a.274.274 0 0 1-.169.489m-6.999.001a.274.274 0 0 1-.168-.49a2.73 2.73 0 0 1 1.9-.467a.275.275 0 0 1 .21.402a.27.27 0 0 1-.27.138a2.24 2.24 0 0 0-1.5.354a.27.27 0 0 1-.172.063m1.057.351c-.67 0-1.23.46-1.38 1.08c-.05.18.08.35.27.35h.44a.913.913 0 0 1 .88-1.15a.913.913 0 0 1 .88 1.15h.07c.15 0 .26-.13.23-.28c-.12-.65-.7-1.15-1.39-1.15m4.88 0c.67 0 1.23.46 1.38 1.08c.04.18-.09.35-.27.35h-.44q.03-.12.03-.24c0-.5-.41-.91-.91-.91c-.51 0-.91.41-.91.91q0 .12.03.24h-.07a.23.23 0 0 1-.23-.28c.12-.65.69-1.15 1.39-1.15" />
      <path d="M12.77 9.86c.29 0 .52.23.52.52c0 .08-.03.17-.06.24h-.92a.52.52 0 0 1 .011-.505a.16.16 0 1 0 .239-.212a.5.5 0 0 1 .21-.043m4.46 0a.5.5 0 0 0-.183.032a.16.16 0 1 1-.245.19a.52.52 0 0 0-.032.538h.92q.06-.105.06-.24c0-.29-.23-.52-.52-.52m-2.55.44l-.53 1.71c-.11.35.15.7.52.7h.78c.37 0 .63-.35.52-.7l-.52-1.71a.403.403 0 0 0-.77 0m-1.16 3.02c.43.23.94.36 1.48.36s1.05-.13 1.48-.36c.14-.07.3.09.21.23c-.36.55-.98.92-1.69.92s-1.33-.37-1.69-.92c-.09-.14.06-.31.21-.23" />
      <path d="M11.605 1.798a7.55 7.55 0 0 1 9.41 2.216a5.5 5.5 0 0 1 4.935 6.053a1.52 1.52 0 0 1 1.028 1.44a1.52 1.52 0 0 1 1.4-1.517h.102a1.514 1.514 0 0 1 1.5 1.5v7.08a2.413 2.413 0 0 1-2.41 2.41h-.34v.78q0 .184-.054.358a2 2 0 0 1 1.804 1.993v4.937A1.913 1.913 0 0 1 27.11 31h-3.3a1.7 1.7 0 0 1-.319-.03H4a1 1 0 0 1-1-1v-3.5a11.97 11.97 0 0 1 6.347-10.577a5.4 5.4 0 0 1-.352-.836a1 1 0 0 1-.093-.1A5.5 5.5 0 0 1 8.941 4.02a7.56 7.56 0 0 1 2.663-2.222m14.142 9.277a.5.5 0 0 0-.237-.085h-.035a.5.5 0 0 0-.495.5v4.47a1.02 1.02 0 0 1-.95 1.03h-.053a1 1 0 0 1-1-1v-1.755h-.007V11.51c0-.27-.2-.5-.47-.52h-.028a.5.5 0 0 0-.495.5v6.504l.043.036v.887a1.41 1.41 0 0 0 .827.956q.257.106.535.107h1.345v1.78a.22.22 0 0 0 .22.22h1.064a.22.22 0 0 0 .22-.22v-1.78h1.34a1.407 1.407 0 0 0 1.41-1.41v-7.081a.51.51 0 0 0-.5-.5l.007.001h-.035a.514.514 0 0 0-.47.52v4.45a1.02 1.02 0 0 1-.95 1.03h-.053a1 1 0 0 1-1-1v-4.48a.51.51 0 0 0-.232-.438zm-2.411 9.905a2.4 2.4 0 0 1-1.316-.42v8.405h.548q.04-.185.131-.347a1.24 1.24 0 0 1-.002-1.245a1.24 1.24 0 0 1 .006-1.251a1.24 1.24 0 0 1-.163-.657c.018-.648.538-1.137 1.142-1.199a.5.5 0 0 1 .128-.016h.17v-1.738a1.2 1.2 0 0 1-.26-.751v-.15a10 10 0 0 0-.384-.631m.574 4.27a.5.5 0 0 1-.1.01c-.162 0-.267.126-.27.232v.006a.27.27 0 0 0 .117.222a.5.5 0 0 1-.015.83a.25.25 0 0 0-.112.2c0 .09.043.157.103.195a.5.5 0 0 1 .01.844a.25.25 0 0 0-.113.201c0 .09.043.157.103.195a.5.5 0 0 1 .082.786q.068.008.133.024h3.132V25.25zM24.98 23v1.25h1V23zm-5.99 5.965V26.3a.517.517 0 0 0-.51-.5h-6.94c-.28 0-.5.22-.5.5v2.665zm-10.99 0v-9.63a9.98 9.98 0 0 0-2.995 7.13v2.5zm2.06-11.181v4.786c0 .23.18.41.41.41h9.07c.23 0 .41-.18.41-.41V17.8a10 10 0 0 0-.96-.482v3.752c0 .46-.51.72-.88.46l-1.971-1.384l-.55.49a.913.913 0 0 1-1.208 0l-.004-.003l-.541-.483l-1.966 1.38a.56.56 0 0 1-.88-.45v-3.761q-.48.208-.93.465m9.248-3.759q.077-.255.114-.525l.116-1.72l.432-.033a1.17 1.17 0 0 0 .156-2.311l-.434-.093l.049-.534A1.49 1.49 0 0 0 19.17 7.6h-1.637a2.3 2.3 0 0 1-1.134-.3H11.81c-.848 0-1.506.72-1.432 1.556l.001.012l.001.023l.03.47l-.467.058a1.17 1.17 0 0 0 .147 2.331h.004l.47-.002l.114 1.753A3.45 3.45 0 0 0 14.1 16.48H16a3.46 3.46 0 0 0 3.253-2.29l.001-.002a1 1 0 0 1 .054-.163M14.99 18.16c.598 0 1.088-.289 1.35-.693a5 5 0 0 1-.34.013h-1.9q-.24 0-.475-.025c.258.41.752.705 1.365.705m0 1q-.46-.002-.877-.143q.13.155.281.29l.591.528l.591-.527q.15-.135.278-.288c-.273.09-.564.14-.864.14" />
    </g>
  </svg>
);

const UsinaIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
  >
    <path fill="#FFFFFF" d="M4 21V9l8-6l8 6v12h-6v-7h-4v7z" />
  </svg>
);

const SementeIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
  >
    <path
      fill="#FFFFFF"
      d="M20.7 3.3S19.3 3 17.2 3c-5.5 0-15.6 2.1-14 17.8c1.1.1 2.2.2 3.2.2C24.3 21 20.7 3.3 20.7 3.3M7 17S7 7 17 7c0 0-6 2-10 10"
    />
  </svg>
);

const TecnicoIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
  >
    <path
      fill="#FFFFFF"
      fillRule="evenodd"
      d="M4.535 3A3.5 3.5 0 0 1 7.25.08v1.67a.75.75 0 1 0 1.5 0V.08A3.5 3.5 0 0 1 11.464 3h.286a.75.75 0 0 1 0 1.5h-.25a3.5 3.5 0 0 1-7 0h-.25a.75.75 0 0 1 0-1.5zM8 6.5a2 2 0 0 1-2-2h4a2 2 0 0 1-2 2m-5.5 6c0-.204.22-.809 1.32-1.459a6 6 0 0 1 .223-.125L5.01 13.5H3.5a1 1 0 0 1-1-1m4.114 1l-1.179-3.142A9.2 9.2 0 0 1 8 10c.93 0 1.8.135 2.565.357L9.387 13.5zm4.375 0H12.5a1 1 0 0 0 1-1c0-.204-.22-.809-1.32-1.459a6 6 0 0 0-.223-.125zM8 8.5c-3.85 0-7 2-7 4A2.5 2.5 0 0 0 3.5 15h9a2.5 2.5 0 0 0 2.5-2.5c0-2-3.15-4-7-4"
      clipRule="evenodd"
    />
  </svg>
);

// Ícones para itens de submenu
const CadastrarIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor" />
  </svg>
);

const AcompanharIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 2048 2048"
  >
    <path
      fill="#FFFFFF"
      d="m2042 1600l-365 365l-90-90l211-211h-646v-128h646l-211-211l90-90zm-691-198q-39-86-99-155t-137-119t-164-77t-183-27q-88 0-170 23t-153 64t-129 100t-100 130t-65 153t-23 170H0q0-117 35-229t101-207t157-169t203-113q-56-36-100-83t-76-103t-47-118t-17-130q0-106 40-199t109-163T568 40T768 0t199 40t163 109t110 163t40 200q0 137-63 248t-177 186q72 27 136 67t118 92t98 114t76 131zM384 512q0 80 30 149t82 122t122 83t150 30q79 0 149-30t122-82t83-122t30-150q0-79-30-149t-82-122t-123-83t-149-30q-80 0-149 30t-122 82t-83 123t-30 149"
    />
  </svg>
);

const AtividadeIcon = ({ className = "ml-1" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
  >
    <path
      fill="#FFFFFF"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m13 11l9-9m-7.4 10.6c.8.8.9 2.1.2 3L10 22l-8-8l6.4-4.8c.9-.7 2.2-.6 3 .2Zm-7.8-2.2l6.8 6.8M5 17l1.4-1.4"
    />
  </svg>
);

const DistribuicaoIcon = ({ className = "ml-1" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    viewBox="0 0 24 24"
  >
    <path
      fill="#FFFFFF"
      d="M17 17h-3v2h3v3h2v-3h3v-2h-3v-3h-2zm-5 1c0-3.31 2.69-6 6-6c.77 0 1.5.15 2.17.41c1.46-4.51.53-9.11.53-9.11S19.3 3 17.2 3c-5.5 0-15.6 2.1-14 17.8c1.1.1 2.2.2 3.2.2c2.36 0 4.34-.31 6.01-.85c-.26-.65-.41-1.39-.41-2.15m-5-1S7 7 17 7c0 0-6 2-10 10"
    />
  </svg>
);

const menuItems = [
  {
    id: "produtores",
    title: "Produtores",
    isExpandable: true,
    defaultOpen: true,
    icon: <ProdutorIcon className="w-5 h-5 mr-3" />,
    children: [
      {
        id: "cadastrar-produtor",
        title: "Cadastrar Produtor",
        path: "/produtores/cadastrarprodutor",
        icon: <CadastrarIcon className="w-4 h-4 mr-2" />,
      },
      {
        id: "acompanhar-producao",
        title: "Acompanhar produtor(a)",
        path: "/produtores/acompanhamento",
        icon: <AcompanharIcon className="w-4 h-4 mr-2" />,
      },
    ],
  },
  {
    id: "atividades-usina",
    title: "Atividades da Usina",
    isExpandable: true,
    defaultOpen: true,
    icon: <UsinaIcon className="w-5 h-5 mr-3" />,
    children: [
      {
        id: "atividades-cadastradas",
        title: "Atividades de limpeza cadastradas",
        path: "/usina/atividadescadastradas",
        icon: <AtividadeIcon className="w-4 h-4 mr-2" />,
      },
    ],
  },
  {
    id: "distribuição-sementes",
    title: "Sementes",
    isExpandable: true,
    defaultOpen: true,
    icon: <SementeIcon className="w-5 h-5 mr-3" />,
    children: [
      {
        id: "cadastrar-distribuicao",
        title: "Cadastrar distribuição de sementes",
        path: "/distribuicao/cadastrardistribuicao",
        icon: <DistribuicaoIcon className="w-4 h-4 mr-2" />,
      },
    ],
  },
  {
    id: "tecnicos",
    title: "Técnicos",
    isExpandable: true,
    defaultOpen: true,
    icon: <TecnicoIcon className="w-5 h-5 mr-3" />,
    children: [
      {
        id: "cadastrar-técnicos",
        title: "Cadastrar técnico",
        path: "/tecnicos/cadastrartecnicos",
        icon: <CadastrarIcon className="w-4 h-4 mr-2" />,
      },
    ],
  },
];

const SideBar = () => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState(() => {
    const initialState = {};
    menuItems.forEach((item) => {
      if (item.isExpandable) {
        initialState[item.id] = item.defaultOpen || false;
      }
    });
    return initialState;
  });

  // Estado para controlar o item ativo
  const [activeItem, setActiveItem] = useState(null);

  // Função para alternar o estado de expansão de uma seção
  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // Função para lidar com clique em item do menu
  const handleItemClick = (item) => {
    setActiveItem(item.id);
    navigate(item.path);
  };

  const renderMenuItem = (item) => (
    <li key={item.id}>
      <button
        onClick={() => handleItemClick(item)}
        className={`flex items-center text-left whitespace-normal p-2 pl-3 rounded-lg text-sm transition-colors duration-200 hover:bg-[#f76300] bg-opacity-80 ${
          activeItem === item.id
            ? "text-[#000000] font-medium bg-[#fcaf58]"
            : "text-white font-medium hover:text-[#000000]"
        }`}
      >
        {item.icon}
        {item.title}
      </button>
    </li>
  );

  // Componente para renderizar seções expandíveis
  const renderExpandableSection = (section) => {
    const isExpanded = expandedSections[section.id];

    return (
      <li key={section.id}>
        <button
          onClick={() => toggleSection(section.id)}
          className="flex items-center justify-between w-full p-3 rounded-lg text-gray-700 hover:bg-gray-800 transition-colors duration-200 group"
          aria-expanded={isExpanded}
          aria-controls={`section-${section.id}`}
        >
          <div className="flex items-center flex-1 min-w-0">
            {section.icon}
            <span className="text-white font-medium group-hover:text-[#8ecae6] transition-colors duration-200 truncate">
              {section.title}
            </span>
          </div>
          <div className="flex-shrink-0 ml-2 transition-transform duration-200">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-white group-hover:text-[#fcaf58]" />
            ) : (
              <ChevronRight className="w-4 h-4 text-white group-hover:text-[#fcaf58]" />
            )}
          </div>
        </button>

        <div
          id={`section-${section.id}`}
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="ml-8 mt-1 space-y-1 pb-1">
            {section.children?.map(renderMenuItem)}
          </ul>
        </div>
      </li>
    );
  };

  const renderSimpleItem = (item) => (
    <li key={item.id}>
      <button
        onClick={() => handleItemClick(item)}
        className={`flex items-center w-full p-3 rounded-lg text-sm transition-colors duration-200 hover:bg-gray-800 ${
          activeItem === item.id
            ? "text-[#fcaf58] font-medium"
            : "text-white hover:text-[#F9BF80]"
        }`}
      >
        {item.icon}
        {item.title}
      </button>
    </li>
  );

  return (
    <aside className="fixed top-16 left-0 bottom-0 z-40 w-64 bg-[#000000] shadow-lg border-r border-gray-200">
      <nav className="p-2 overflow-y-auto h-[calc(100%-5rem)]">
        <ul className="space-y-1">
          {menuItems.map((item) =>
            item.isExpandable
              ? renderExpandableSection(item)
              : renderSimpleItem(item)
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
