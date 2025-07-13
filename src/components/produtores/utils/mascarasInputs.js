export const maskCPF = (value) => {
  // Remove tudo que não é dígito
  let cpf = value.replace(/\D/g, '');
  
  // Limita a 11 caracteres
  cpf = cpf.substring(0, 11);
  
  // Aplica a máscara
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  
  return cpf;
};

export const maskTelefone = (value) => {
  // Remove tudo que não é dígito
  let telefone = value.replace(/\D/g, '');
  
  // Limita a 11 caracteres (considerando DDD + 9 dígitos)
  telefone = telefone.substring(0, 11);
  
  // Aplica a máscara
  if (telefone.length > 2) {
    telefone = telefone.replace(/^(\d{2})(\d)/g, '($1) $2');
  }
  if (telefone.length > 9) {
    telefone = telefone.replace(/(\d)(\d{4})$/, '$1-$2');
  }
  
  return telefone;
};
