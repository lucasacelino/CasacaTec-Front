const DadosSafraCidadesTable = ({ data }) => {
  return (
    <div className="mt-2 rounded-lg border border-gray-500 overflow-hidden">
      <div className="overflow-x-auto" style={{ maxHeight: "400px" }}>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-[#000000] sticky top-0">
              <th className="text-[#FFA94B] py-2 px-4 border-b border-gray-200 text-left">
                Cidade
              </th>
              <th className="text-[#FFA94B] py-2 px-4 border-b border-gray-200 text-left">
                Inscritos
              </th>
              {/* <th className="text-[#FFA94B] py-2 px-4 border-b border-gray-200 text-left">
                Sacos distribuidos
              </th>
              <th className="text-[#FFA94B] py-2 px-4 border-b border-gray-200 text-left">
                Hectares
              </th> */}
            </tr>
          </thead>
          <tbody>
            {data.map((datas) => (
              <tr
                key={`${datas.id}-${datas.nome_cidade}`}
                className="hover:bg-gray-50"
              >
                <td className="py-2 px-4 border-b border-gray-400 font-medium">
                  {datas.nome_cidade}
                </td>
                <td className="py-2 px-4 border-b border-gray-400 font-medium">
                  {datas.inscritos}
                </td>
                {/* <td className="py-2 px-4 border-b border-gray-400 font-medium">
                  {datas.sacos}
                </td>
                <td className="py-2 px-4 border-b border-gray-400 font-medium">
                  {datas.hectares}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DadosSafraCidadesTable;
