import { useState } from "react";

const SearchBarProdutores = () => {
  const [nomeProdutor, setNomeProdutor] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const [erros, setErros] = useState({
    nomeProdutor: "",
    estado: "",
    cidade: "",
  });

  const [camposTocados, setCamposTocados] = useState({
    nomeProdutor: false,
    estado: false,
    cidade: false,
  });

  const validarNomeProdutor = (valor) => {
    if (!valor || valor.trim() === "") {
      return "O nome do produtor não pode estar vazio";
    }
    if (valor.length < 2) {
      return "O nome deve ter pelo menos 2 caracteres";
    }
    return "";
  };

  // Função para validar estado
  const validarEstado = (valor) => {
    if (!valor || valor === "") {
      return "Por favor, selecione um estado";
    }
    return "";
  };

  // Função para validar cidade
  const validarCidade = (valor) => {
    if (!valor || valor === "") {
      return "Por favor, selecione uma cidade";
    }
    return "";
  };

  const handleNomeChange = (e) => {
    const valor = e.target.value;
    setNomeProdutor(valor);

    // Validação em tempo real apenas se o campo foi tocado
    if (camposTocados.nomeProdutor) {
      const erro = validarNomeProdutor(valor);
      setErros((prev) => ({ ...prev, nomeProdutor: erro }));
    }
  };

  const handleEstadoChange = (e) => {
    const valor = e.target.value;
    setEstado(valor);

    // Validação em tempo real apenas se o campo foi tocado
    if (camposTocados.estado) {
      const erro = validarEstado(valor);
      setErros((prev) => ({ ...prev, estado: erro }));
    }

    // Limpar cidade quando estado muda
    setCidade("");
    if (camposTocados.cidade) {
      setErros((prev) => ({ ...prev, cidade: validarCidade("") }));
    }
  };

  const handleCidadeChange = (e) => {
    const valor = e.target.value;
    setCidade(valor);

    // Validação em tempo real apenas se o campo foi tocado
    if (camposTocados.cidade) {
      const erro = validarCidade(valor);
      setErros((prev) => ({ ...prev, cidade: erro }));
    }
  };

  const handleNomeBlur = () => {
    setCamposTocados((prev) => ({ ...prev, nomeProdutor: true }));
    const erro = validarNomeProdutor(nomeProdutor);
    setErros((prev) => ({ ...prev, nomeProdutor: erro }));
  };

  const handleEstadoBlur = () => {
    setCamposTocados((prev) => ({ ...prev, estado: true }));
    const erro = validarEstado(estado);
    setErros((prev) => ({ ...prev, estado: erro }));
  };

  const handleCidadeBlur = () => {
    setCamposTocados((prev) => ({ ...prev, cidade: true }));
    const erro = validarCidade(cidade);
    setErros((prev) => ({ ...prev, cidade: erro }));
  };

  const handleSearch = () => {
    // Marcar todos os campos como tocados
    setCamposTocados({
      nomeProdutor: true,
      estado: true,
      cidade: true,
    });

    // Validar todos os campos
    const erroNome = validarNomeProdutor(nomeProdutor);
    const erroEstado = validarEstado(estado);
    const erroCidade = validarCidade(cidade);

    setErros({
      nomeProdutor: erroNome,
      estado: erroEstado,
      cidade: erroCidade,
    });

    // Se não há erros, mostrar resultado
    if (!erroNome && !erroEstado && !erroCidade) {
      setMostrarResultado(true);
    } else {
      setMostrarResultado(false);
    }
  };

  const renderResultado = () => {
    if (mostrarResultado) {
      return (
        <div className="w-full flex flex-col justify-center items-center mt-4 p-4 bg-green-100 border border-green-300 rounded">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Resultado da Pesquisa:
          </h3>
          <p>
            <strong>Nome:</strong> {nomeProdutor}
          </p>
          <p>
            <strong>Estado:</strong> {estado}
          </p>
          <p>
            <strong>Cidade:</strong> {cidade}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-wrap pt-3 justify-center gap-x-4">
      <div>
        <label className="block text-black font-semibold">
          Nome do produtor(a)*
        </label>
        <input
          type="text"
          value={nomeProdutor}
          onChange={handleNomeChange}
          onBlur={handleNomeBlur}
          className={`w-full border rounded-md pl-2 py-2 ${
            erros.nomeProdutor ? "border-red-500 bg-red-50" : "border-black-300"
          }`}
          // className="border border-black-500 rounded-md pl-1 py-2"
        />
        {erros.nomeProdutor && (
          <p className="text-red-500 text-sm mt-1">{erros.nomeProdutor}</p>
        )}
      </div>

      <div>
        <label htmlFor="estado" className="block text-black font-semibold">
          Estado*
        </label>
        <select
          value={estado}
          onChange={handleEstadoChange}
          onBlur={handleEstadoBlur}
          id="estado"
          // className="border border-black-500 rounded-md pl-2 py-2.5"
          className={`w-full border rounded-md pl-2 py-2.5 ${
            erros.estado ? "border-red-500 bg-red-50" : "border-black-300"
          }`}
        >
          <option value="">Selecione um estado</option>
          <option value="Paraíba">Paraíba</option>
        </select>
        {erros.estado && (
          <p className="text-red-500 text-sm mt-1">{erros.estado}</p>
        )}
      </div>

      <div>
        <label htmlFor="cidade" className="block text-black font-semibold">
          Cidade*
        </label>
        <select
          value={cidade}
          onChange={handleCidadeChange}
          onBlur={handleCidadeBlur}
          id="cidade"
          // className="border border-black-500 rounded-md pl-2 py-2.5"
          className={`w-full border rounded-md pl-2 py-2.5 ${
            erros.cidade ? "border-red-500 bg-red-50" : "border-black-300"
          } ${!estado ? "bg-gray-100 cursor-not-allowed" : ""}`}
        >
          <option value="">Selecione uma cidade</option>
          <option value="Guarabira">Guarabira</option>
          <option value="João Pessoa">João Pessoa</option>
        </select>
        {erros.cidade && (
          <p className="text-red-500 text-sm mt-1">{erros.cidade}</p>
        )}
      </div>

      <div className="w-full flex justify-center mt-2">
        <button
          onClick={handleSearch}
          className="block bg-[#000000] text-[#FFFFFF] px-4 py-3 rounded-sm font-medium"
        >
          Pesquisar
        </button>
      </div>

      {renderResultado()}
    </div>
  );
};

export default SearchBarProdutores;
