import { differenceInYears } from "date-fns";

const anoFidelizacao = new Date('2004').getFullYear();
const anoNascimento = new Date('2001').getFullYear();

const diferenaAnos = differenceInYears(anoNascimento, anoFidelizacao);
console.log(diferenaAnos);
