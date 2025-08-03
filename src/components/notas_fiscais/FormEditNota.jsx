import axios from "axios";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  floatParaFormatoBR,
  formatarPesoBR,
} from "../produtores/utils/mascarasInputs";
import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";

const FormEditNota = ({ notaId, onClose, onSuccess }) => {
  const validationSchema = Yup.object({
    numeroNota: Yup.string()
      .required("Nome do condutor é obrigatório")
      .test(
        "no-trailing-spaces",
        "Nome não pode ter espaços no início ou fim",
        (value) => (value ? value.trim() === value : true)
      )
      .min(2, "O nome deve ter pelo menos 2 letras"),
    numeroRomaneio: Yup.string()
      .required("Telefone é obrigatório")
      .test(
        "no-trailing-spaces",
        "Nome não pode ter espaços no início ou fim",
        (value) => (value ? value.trim() === value : true)
      ),
    peso: Yup.string()
      .required("Peso é obrigatório")
      .matches(
        /^(\d{1,3}(?:\.\d{3})*(?:,\d{1,2})?|\d+)$/,
        "Formato inválido. Use: 1.234,56 ou 1234,56"
      )
      .test(
        "nao-negativo",
        "Não são permitidos valores negativos",
        (value) => !value?.includes("-")
      ),

    valor: Yup.string()
      .required("Peso é obrigatório")
      .matches(
        /^(\d{1,3}(?:\.\d{3})*(?:,\d{1,2})?|\d+)$/,
        "Formato inválido. Use: 1.234,56 ou 1234,56"
      )
      .test(
        "nao-negativo",
        "Não são permitidos valores negativos",
        (value) => !value?.includes("-")
      ),
    dataPagamento: Yup.string()
      .required("Data de agendamento é obrigatória")
      .test(
        "data-valida",
        "A data deve ser hoje ou no futuro, dentro do ano corrente",
        (value) => {
          if (!value) return false;

          // Parse da data no formato DD/MM/YYYY
          const [day, month, year] = value.split("/");
          if (!day || !month || !year) return false;

          const data = new Date(
            parseInt(year),
            parseInt(month) - 1,
            parseInt(day)
          );
          data.setHours(0, 0, 0, 0);

          const anoAtual = new Date().getFullYear();
          const dataAtual = new Date();
          dataAtual.setHours(0, 0, 0, 0);

          return data >= dataAtual && data.getFullYear() === anoAtual;
        }
      ),
  });

  const formatDateForInput = (brDate) => {
    if (!brDate || !brDate.includes("/")) return "";
    const [day, month, year] = brDate.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  const formatDateToBr = (isoDate) => {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split("-");
    return `${day}/${month}/${year}`;
  };

  const DateInputBr = ({ field, form, ...props }) => {
    const handleChange = (e) => {
      const isoDate = e.target.value;
      if (isoDate) {
        const brDate = formatDateToBr(isoDate);
        form.setFieldValue(field.name, brDate);
      } else {
        form.setFieldValue(field.name, "");
      }
    };

    return (
      <input
        type="date"
        {...props}
        value={formatDateForInput(field.value)}
        onChange={handleChange}
        className="w-full border border-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-[#FF6B00]"
      />
    );
  };

  const [initialValues, setInitialValues] = useState({
    numeroNota: "",
    numeroRomaneio: "",
    peso: "",
    valor: "",
    dataPagamento: "",
  });

  useEffect(() => {
    const carregarNotas = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/notas/${notaId}`
        );
        const data = response.data;

        setInitialValues({
          ...data,
          id: data.id || "",
          numeroNota: data.numeroNota || "",
          numeroRomaneio: data.numeroRomaneio || "",
          peso: floatParaFormatoBR(data.peso) || "",
          valor: floatParaFormatoBR(data.valor) || "",
          dataPagamento: data.dataPagamento || "",
        });

        console.log("dados carregados", data);
      } catch (error) {
        console.log(error);
      }
    };

    carregarNotas();
  }, [notaId]);

  const handleSubmitUpdate = async (values) => {
    // const [ano, mes, dia] = values.dataPagamento.split("-");
    // const dataPagamento = `${dia}/${mes}/${ano}`;

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
      dataPagamento: values.dataPagamento,
      // produtorId: produtorId,
    };

    try {
      const res = await axios.put(
        `http://localhost:3000/notas/${notaId}`,
        dados
      );
      onClose();
      onSuccess();
      console.log(res.data);
      toast.success("Nota fiscal atualizada");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={handleSubmitUpdate}
      >
        {({ setFieldValue }) => (
          <Form className="flex flex-col border border-[#000000] px-1.5 py-2 rounded-sm">
            {/* Linha 1: Número Nota Fiscal */}
            <div className="flex gap-1 mb-1">
              <label htmlFor="numeroNota" className="font-bold">
                nº nota:
              </label>
              <Field
                name="numeroNota"
                type="text"
                className="font-medium w-16 border-b border-black focus:outline-none focus:border-[#FF6B00]"
                maxLength="4"
              />
              <ErrorMessage
                name="numeroNota"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            {/* Linha 2: Número Romaneio */}
            <div className="flex gap-1 mb-1">
              <label htmlFor="numeroRomaneio" className="font-bold">
                nº romaneio:
              </label>
              <Field
                name="numeroRomaneio"
                type="text"
                className="font-medium flex-1 border-b border-black focus:outline-none focus:border-[#FF6B00]"
              />
              <ErrorMessage
                name="numeroRomaneio"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            {/* Linha 3: Peso */}
            <div className="flex gap-1 mb-1">
              <label htmlFor="peso" className="font-bold">
                Peso:
              </label>
              <Field
                name="peso"
                type="text"
                onChange={(e) => setFieldValue("peso", e.target.value)}
                onBlur={(e) => {
                  const valorFormatado = formatarPesoBR(e.target.value);
                  setFieldValue("peso", valorFormatado);
                }}
                onKeyPress={(e) => {
                  if (!/[0-9,.]|Backspace|Delete|Arrow/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                className="font-medium flex-1 border-b border-black focus:outline-none focus:border-[#FF6B00]"
              />
              <ErrorMessage
                name="peso"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            {/* Linha 4: Valor */}
            <div className="flex gap-1 mb-1">
              <label htmlFor="valor" className="font-bold">
                Valor:
              </label>
              <Field
                name="valor"
                type="text"
                onChange={(e) => setFieldValue("valor", e.target.value)}
                onBlur={(e) => {
                  const valorFormatado = formatarPesoBR(e.target.value);
                  setFieldValue("valor", valorFormatado);
                }}
                onKeyPress={(e) => {
                  if (!/[0-9,.]|Backspace|Delete|Arrow/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                className="font-medium flex-1 border-b border-black focus:outline-none focus:border-[#FF6B00]"
              />
              <ErrorMessage
                name="valor"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            {/* Linha 5: Data de Pagamento */}
            <div className="flex gap-1 mb-2">
              <label className="font-bold mt-2">Data de pagamento:</label>
              <div className="font-medium flex-1">
                <Field name="dataPagamento" component={DateInputBr} />
              </div>
              <ErrorMessage
                name="dataPagamento"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            {/* Botões */}
            <div className="w-full flex items-center justify-center mt-2 gap-2">
              <button
                onClick={onClose}
                type="button"
                className="flex items-center bg-[#000000] rounded-sm px-2 py-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#FFFFFF"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0m15.364-6.364L5.636 18.364"
                  />
                </svg>
                <span className="text-[#FFFFFF] ml-1">Cancelar</span>
              </button>

              <button
                type="submit"
                className="flex items-center bg-[#000000] rounded-sm px-2 py-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#FFFFFF"
                    d="M3 3v19l3-2l3 2l3-2l1.3.86c-.2-.58-.3-1.21-.3-1.86a6.005 6.005 0 0 1 8-5.66V3zm14 4v2H7V7zm-2 4v2H7v-2zm.5 8l2.75 3L23 17.23l-1.16-1.41l-3.59 3.59l-1.59-1.59z"
                  />
                </svg>
                <span className="text-[#FFFFFF] ml-1">Salvar</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormEditNota;
