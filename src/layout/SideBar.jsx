import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";

const menuItems = [
  {
    id: "produtores",
    title: "Produtores",
    isExpandable: true,
    defaultOpen: true,
    children: [
      {
        id: "cadastrar-produtor",
        title: "Cadastrar Produtor",
        path: "/produtores/cadastrarprodutor",
      },
      {
        id: "acompanhar-producao",
        title: "Acompanhar Produção",
        path: "/produtores/acompanhamento",
      },
    ],
  },
  {
    id: "atividades-usina",
    title: "Atividades da Usina",
    isExpandable: true,
    defaultOpen: true,
    children: [
      // {
      //   id: "cadastrar-limpeza",
      //   title: "Cadastrar atividade de limpeza",
      //   path: "/usina/limpeza",
      // },
      {
        id: "atividades-cadastradas",
        title: "Atividades de limpeza cadastradas",
        path: "/usina/atividadescadastradas",
      },
    ],
  },
  {
    id: "distribuição-sementes",
    title: "Distribuições de sementes",
    isExpandable: true,
    defaultOpen: true,
    children: [
      {
        id: "cadastrar-distribuicao",
        title: "Cadastrar distribuição de sementes",
        path: "/distribuicao/cadastrardistribuicao",
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
        className={`flex items-center w-full p-2 pl-3 rounded-lg text-sm transition-colors duration-200 hover:bg-[#f76300] bg-opacity-80 ${
          activeItem === item.id
            ? "text-[#000000] font-medium bg-[#fcaf58]"
            : "text-white hover:text-[#FFFFFF]"
        }`}
      >
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
          <div className="flex items-center">
            <span className="whitespace-nowrap text-white font-medium group-hover:text-[#8ecae6] transition-colors duration-200">
              {section.title}
            </span>
          </div>
          <div className="transition-transform duration-200">
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
