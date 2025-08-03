export const maskCPF = (value) => {
  // Remove tudo que não é dígito
  let cpf = value.replace(/\D/g, "");

  // Limita a 11 caracteres
  cpf = cpf.substring(0, 11);

  // Aplica a máscara
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  return cpf;
};

export const maskTelefone = (value) => {
  // Remove tudo que não é dígito
  let telefone = value.replace(/\D/g, "");

  // Limita a 11 caracteres (considerando DDD + 9 dígitos)
  telefone = telefone.substring(0, 11);

  // Aplica a máscara
  if (telefone.length > 2) {
    telefone = telefone.replace(/^(\d{2})(\d)/g, "($1) $2");
  }
  if (telefone.length > 9) {
    telefone = telefone.replace(/(\d)(\d{4})$/, "$1-$2");
  }

  return telefone;
};

export const formatarPesoBR = (value) => {
  // Remove tudo exceto dígitos e vírgula
  let valorLimpo = value.replace(/[^\d,]/g, "");

  // Garante apenas uma vírgula
  const partes = valorLimpo.split(",");
  if (partes.length > 2) {
    valorLimpo = partes[0] + "," + partes.slice(1).join("");
  }

  // Formata parte inteira com pontos
  if (partes[0]) {
    const parteInteira = partes[0]
      .replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    valorLimpo = parteInteira + (partes[1] ? `,${partes[1]}` : "");
  }

  return valorLimpo;
};

// src/utils/mascaras.js
export const formatarMoedaBR = (value) => {
  // Remove tudo exceto dígitos e vírgula
  let valorLimpo = value.replace(/[^\d,]/g, "");

  // Remove vírgulas extras (mantém apenas a última)
  const partes = valorLimpo.split(",");
  if (partes.length > 2) {
    valorLimpo = partes.slice(0, -1).join("") + "," + partes[partes.length - 1];
  }

  // Formata parte inteira com pontos
  if (partes[0]) {
    const parteInteira = partes[0]
      .replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // Limita parte decimal a 2 dígitos
    const parteDecimal = partes[1]
      ? partes[1].slice(0, 2).replace(/\D/g, "")
      : "";

    valorLimpo = parteInteira + (parteDecimal ? `,${parteDecimal}` : ",00");
  }

  // Adiciona R$ se houver valor
  return valorLimpo;
};

// src/utils/mascaras.js
export const floatParaFormatoBR = (valorFloat) => {
  if (valorFloat === null || valorFloat === undefined) return "";

  // Converte para string e separa parte inteira/decimal
  const partes = Number(valorFloat).toFixed(2).split(".");

  // Formata parte inteira com pontos
  const parteInteira = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Junta com vírgula e decimais
  return `${parteInteira},${partes[1]}`;
};

// Exemplo de uso:
// floatParaFormatoBR(1500.5) → "1.500,50"
// floatParaFormatoBR(1234567.89) → "1.234.567,89"
