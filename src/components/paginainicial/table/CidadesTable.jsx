const CidadesTable = ({ data }) => {
  return (
    <>
      <div className="overflow-x-auto mt-2 rounded-lg border border-gray-500">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-[#000000]">
              <th className="text-[#FFA94B] py-2 px-4 border-b border-gray-200 text-left">
                Cidade
              </th>
              <th className="text-[#FFA94B] py-2 px-4 border-b border-gray-200 text-left">
                Inscritos
              </th>
              <th className="text-[#FFA94B] py-2 px-4 border-b border-gray-200 text-left">
                Sacos distribuidos
              </th>
              <th className="text-[#FFA94B] py-2 px-4 border-b border-gray-200 text-left">
                Hectares
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((datas) => (
              <tr key={`${datas.id}-${datas.nome_cidade}`} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b border-gray-400">{datas.nome_cidade}</td>
                <td className="py-2 px-4 border-b border-gray-400">{datas.inscritos}</td>
                <td className="py-2 px-4 border-b border-gray-400">{datas.sacos}</td>
                <td className="py-2 px-4 border-b border-gray-400">{datas.hectares}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CidadesTable;
