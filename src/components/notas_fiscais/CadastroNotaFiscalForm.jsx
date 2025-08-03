import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { formatarPesoBR } from "../produtores/utils/mascarasInputs";

const CadastroNotaFiscalForm = ({ produtorId, onClose, onSuccess }) => {
  const validationSchema = Yup.object({
    numeroNota: Yup.string()
      .required("Número da nota é obrigatório")
      .matches(/^[0-9]+$/, "Apenas números são permitidos")
      .test(
        "no-trailing-spaces",
        "Não pode ter espaços no início ou fim",
        (value) => (value ? value.trim() === value : true)
      ),

    numeroRomaneio: Yup.string()
      .required("O número do romaneio é obrigatório")
      .matches(/^[0-9]+$/, "Apenas números são permitidos")
      .test(
        "no-trailing-spaces",
        "Não pode ter espaços no início ou fim",
        (value) => (value ? value.trim() === value : true)
      ),
      
    peso: Yup.string()
      .required("Peso é obrigatório")
      .test(
        "formato-valido",
        "Formato inválido. Use: 1.234,56 ou 1234,56",
        (value) => {
          if (!value) return false;

          // Permite digitação durante a edição (números com ou sem formatação)
          const valorLimpo = value.replace(/\./g, "").replace(",", ".");

          // Verifica se é um número válido
          const numero = parseFloat(valorLimpo);
          if (isNaN(numero)) return false;

          // Verifica se é positivo
          if (numero < 0) return false;

          return true;
        }
      ),

    valor: Yup.string()
      .required("Valor é obrigatório")
      .test(
        "formato-valido",
        "Formato inválido. Use: 1.234,56 ou 1234,56",
        (value) => {
          if (!value) return false;

          // Permite digitação durante a edição
          const valorLimpo = value.replace(/\./g, "").replace(",", ".");

          // Verifica se é um número válido
          const numero = parseFloat(valorLimpo);
          if (isNaN(numero)) return false;

          // Verifica se é positivo
          if (numero < 0) return false;

          return true;
        }
      ),
    dataPagamento: Yup.date()
      .required("Data de agendamento é obrigatória")
      .test("ano-valido", "Ano inválido", (value) => {
        const anoString = value.getFullYear().toString();
        return anoString.length === 4;
      })
      .test(
        "data-valida",
        "A data deve ser hoje ou no futuro, dentro do ano corrente",
        (value) => {
          if (!value) return false;

          const data = value;
          data.setHours(0, 0, 0, 0);

          const anoAtual = new Date().getFullYear();

          const dataAtual = new Date();
          dataAtual.setHours(0, 0, 0, 0);

          return data >= dataAtual && data.getFullYear() === anoAtual;
        }
      ),
  });

  const initialValues = {
    numeroNota: "",
    numeroRomaneio: "",
    peso: "",
    valor: "",
    dataPagamento: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    const [ano, mes, dia] = values.dataPagamento.split("-");
    const dataPagamento = `${dia}/${mes}/${ano}`;

    const pesoNumerico = parseFloat(
      values.peso.replace(/\./g, "").replace(",", ".")
    );

    if (pesoNumerico < 0) {
      toast.error("Valor não pode ser negativo");
      return;
    }

    const valorNumerico = parseFloat(
      values.valor.replace(/\./g, "").replace(",", ".")
    );

    const dados = {
      numeroNota: values.numeroNota,
      numeroRomaneio: values.numeroRomaneio,
      peso: pesoNumerico,
      valor: valorNumerico,
      dataPagamento: dataPagamento,
      produtorId: produtorId,
    };

    try {
      const res = await axios.post("http://localhost:3000/notas", dados);
      console.log(res.data);
      resetForm();
      onSuccess();
      onClose();
      toast.success("nota fiscal cadastrada");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="numeroNota"
                className="block text-sm font-medium text-black"
              >
                Número nota fiscal
              </label>
              <Field
                name="numeroNota"
                type="text"
                className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                maxLength="4"
              />
              <ErrorMessage
                name="numeroNota"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="numeroRomaneio"
                className="block text-sm font-medium text-black"
              >
                Número romaneio*
              </label>
              <Field
                name="numeroRomaneio"
                type="text"
                className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
              />
              <ErrorMessage
                name="numeroRomaneio"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="col-span-2 grid grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="peso"
                  className="block text-sm font-medium text-black"
                >
                  Peso
                </label>
                <Field
                  name="peso"
                  type="text"
                  onChange={(e) => {
                    setFieldValue("peso", e.target.value);
                  }}
                  onBlur={(e) => {
                    const valorFormatado = formatarPesoBR(e.target.value);
                    setFieldValue("peso", valorFormatado);
                  }}
                  onKeyPress={(e) => {
                    if (!/[0-9,.]|Backspace|Delete|Arrow/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                />
                <ErrorMessage
                  name="peso"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="valor"
                  className="block text-sm font-medium text-black"
                >
                  Valor*
                </label>
                <Field
                  name="valor"
                  type="text"
                  onChange={(e) => {
                    setFieldValue("valor", e.target.value);
                  }}
                  onBlur={(e) => {
                    const valorFormatado = formatarPesoBR(e.target.value);
                    setFieldValue("valor", valorFormatado);
                  }}
                  onKeyPress={(e) => {
                    if (!/[0-9,.]|Backspace|Delete|Arrow/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  min="1"
                  className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                />
                <ErrorMessage
                  name="valor"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="dataPagamento"
                  className="block text-sm font-medium text-black"
                >
                  Data de pagamento*
                </label>
                <Field
                  name="dataPagamento"
                  type="date"
                  min="1"
                  className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                />
                <ErrorMessage
                  name="dataPagamento"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="col-span-2 flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-[#FFFFFF] bg-[#595959]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#000000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B00] disabled:opacity-50"
                >
                  Cadastrar
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CadastroNotaFiscalForm;
