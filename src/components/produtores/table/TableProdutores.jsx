const TableProdutores = ({ dados }) => {
  return (
    <div className="mt-2 rounded-lg border border-gray-500 overflow-hidden">
      <div className="overflow-x-auto" style={{ maxHeight: "400px" }}>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-[#000000] sticky top-0">
              <th className="text-[#FFA94B] py-2 px-4 border-b border-gray-200 text-left whitespace-nowrap">
                Nome completo
              </th>
              <th className="text-[#FFA94B] py-2 px-4 border-b border-gray-200 text-left">
                CPF
              </th>
              <th className="text-[#FFA94B] py-2 px-4 border-b border-gray-200 text-left">
                Sexo
              </th>
              <th className="text-[#FFA94B] py-2 px-4 border-b border-gray-200 text-left whitespace-nowrap">
                Data de nascimento
              </th>
              <th className="text-[#FFA94B] py-2 px-4 border-b border-gray-200 text-left">
                Telefone
              </th>
              <th className="text-[#FFA94B] py-2 px-4 border-b border-gray-200 text-left">
                Fidelização
              </th>
              <th className="text-[#FFA94B] py-2 px-4 border-b border-gray-200 text-left">
                Endereço
              </th>
              <th className="text-[#FFA94B] py-2 px-4 border-b border-gray-200 text-left">
                Estado
              </th>
              <th className="text-[#FFA94B] py-2 px-4 border-b border-gray-200 text-left">
                Cidade
              </th>
              <th className="text-[#FFA94B] py-2 px-4 border-b border-gray-200 text-left">
                Regional
              </th>
            </tr>
          </thead>
          <tbody>
            {dados.map((dado) => (
              <tr key={dado.id}>
                <td className="py-2 px-4 border-b border-gray-400 font-medium whitespace-nowrap">
                  {dado.nomeCompleto}
                </td>
                <td className="py-2 px-4 border-b border-gray-400 font-medium whitespace-nowrap">
                  {dado.cpf}
                </td>
                <td className="py-2 px-4 border-b border-gray-400 font-medium">
                  {dado.sexo}
                </td>
                <td className="py-2 px-4 border-b border-gray-400 font-medium">
                  {dado.dataNascimento}
                </td>
                <td className="py-2 px-4 border-b border-gray-400 font-medium whitespace-nowrap">
                  {dado.telefone}
                </td>
                <td className="py-2 px-4 font-medium border-b border-gray-400 max-w-xs break-words">
                  {dado.fidelizacao}
                </td>
                <td className="py-2 px-4 border-b border-gray-400 font-medium whitespace-nowrap">
                  {dado.endereco}
                </td>
                <td className="py-2 px-4 border-b border-gray-400 font-medium">
                  {dado.uf}
                </td>
                <td className="py-2 px-4 border-b border-gray-400 font-medium">
                  {dado.nomeMunicipio}
                </td>
                <td className="py-2 px-4 border-b border-gray-400 font-medium whitespace-nowrap">
                  {dado.nomeRegional}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableProdutores;
