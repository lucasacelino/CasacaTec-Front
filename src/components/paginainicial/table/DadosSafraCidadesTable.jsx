const DadosSafraCidadesTable = ({ data }) => {
  return (
    <div className="mt-2 rounded-lg border border-gray-500 overflow-hidden">
      <div className="overflow-x-auto" style={{ maxHeight: "400px" }}>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-[#f1f0ea] border-b-2 border-[#FF6B00] sticky top-0">
              <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left">
                Cidade
              </th>
              <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left">
                Inscritos
              </th>
              {/* <th className="text-[#000000] py-2 px-4 border-b border-gray-200 text-left">
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
                <td className="underline py-2 px-4 border-b border-gray-400 font-medium">
                  <div>
                    {/* {datas.nomeMunicipio} */}
                    <button className="flex items-center">
                      <p>{datas.nomeMunicipio}</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#FF6B00"
                          d="M6.4 18L5 16.6L14.6 7H6V5h12v12h-2V8.4z"
                        />
                      </svg>
                    </button>
                    {/* {datas.nomeMunicipio} */}
                  </div>

                  {/* {datas.nomeMunicipio} */}
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
