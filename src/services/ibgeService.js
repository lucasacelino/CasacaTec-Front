export const fetchStates = async () => {
  const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
  const states = await response.json();
  
  // Filtra apenas PB (Paraíba) e RN (Rio Grande do Norte)
  const filteredStates = states.filter(state => 
    state.sigla === 'PB' || state.sigla === 'RN'
  );

  return filteredStates.sort((a, b) => a.nome.localeCompare(b.nome));
};

export const fetchCitiesByState = async (siglaUF) => {
  if (!siglaUF) return [];
  const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${siglaUF}/municipios`);
  const cities = await response.json();
  return cities.sort((a, b) => a.nome.localeCompare(b.nome)); // Ordena por nome
};
