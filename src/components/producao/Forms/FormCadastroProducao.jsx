import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { formatarPesoBR } from "../../produtores/utils/mascarasInputs";
import toast from "react-hot-toast";
import axios from "axios";

const FormCadastroProducao = ({ produtorId, onClose, onSuccess }) => {
  const validationSchema = Yup.object({
    arranjoProdutivo: Yup.string()
      .required("Arranjo produtivo é obrigatório")
      .test(
        "no-trailing-spaces",
        "Nome completo não pode ter espaços no início ou fim",
        (value) => {
          return value ? value.trim() === value : true;
        }
      )
      .min(2, "O nome deve ter pelo menos 2 letras"),
    culturaConsorcio: Yup.string()
      .required("A cultura do consórcio é obrigatória")
      // .matches(/^[A-Za-zÀ-ú\s]+$/, "O nome deve conter apenas letras")
      .matches(/^[a-zA-Zà-úÀ-Ú\s,]+$/, 'Use apenas letras e vírgulas')
      .test(
        "no-trailing-spaces",
        "A cultura do consórcio não pode ter espaços no início ou fim",
        (value) => {
          return value ? value.trim() === value : true;
        }
      )
      .min(2, "O nome deve ter pelo menos 2 letras"),
    areaPlantio: Yup.string()
      .required("Peso é obrigatório")
      .test(
        "formato-valido",
        "Formato inválido. Use: 1.234,56 ou 1234,56",
        (value) => {
          if (!value) return false;

          const valorLimpo = value.replace(/\./g, "").replace(",", ".");

          const numero = parseFloat(valorLimpo);
          if (isNaN(numero)) return false;

          if (numero < 0) return false;

          return true;
        }
      ),
    dataPlantio: Yup.date()
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
    arranjoProdutivo: "",
    culturaConsorcio: "",
    areaPlantio: "",
    dataPlantio: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    const [ano, mes, dia] = values.dataPlantio.split("-");
    const dataPlantio = `${dia}/${mes}/${ano}`;

    const areaPlantio = parseFloat(
      values.areaPlantio.replace(/\./g, "").replace(",", ".")
    );

    if (areaPlantio < 0) {
      toast.error("Valor não pode ser negativo");
      return;
    }

    const dados = {
      arranjoProdutivo: values.arranjoProdutivo,
      culturaConsorcio: values.culturaConsorcio,
      areaPlantio: areaPlantio,
      dataPlantio: dataPlantio,
      produtorId: produtorId,
    };

    try {
      const res = await axios.post("http://localhost:3000/producao", dados);
      console.log(res.data);
      resetForm();
      onSuccess();
      onClose();
      toast.success("Produção cadastrada!");
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
                htmlFor="arranjoProdutivo"
                className="block text-sm font-medium text-black"
              >
                Arranjo produtivo
              </label>
              <Field
                name="arranjoProdutivo"
                as="select"
                className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
              >
                <option value="">Selecione um tipo de arranjo produtivo</option>
                <option value="consório">consórcio</option>
                <option value="solteiro">solteiro</option>
              </Field>
              <ErrorMessage
                name="arranjoProdutivo"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="culturaConsorcio"
                className="block text-sm font-medium text-black"
              >
                Cultura consórcio
              </label>
              <Field
                name="culturaConsorcio"
                type="text"
                className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
              />
              <ErrorMessage
                name="culturaConsorcio"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="areaPlantio"
                className="block text-sm font-medium text-black"
              >
                Área plantada*
              </label>
              <Field
                name="areaPlantio"
                type="text"
                onChange={(e) => {
                  setFieldValue("areaPlantio", e.target.value);
                }}
                onBlur={(e) => {
                  const valorFormatado = formatarPesoBR(e.target.value);
                  setFieldValue("areaPlantio", valorFormatado);
                }}
                onKeyPress={(e) => {
                  if (!/[0-9,.]|Backspace|Delete|Arrow/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
              />
              <ErrorMessage
                name="areaPlantio"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="dataPlantio"
                className="block text-sm font-medium text-black"
              >
                Data do plantio
              </label>
              <Field
                name="dataPlantio"
                type="date"
                className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                maxLength="4"
              />
              <ErrorMessage
                name="dataPlantio"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            <div className="col-span-2 flex justify-center gap-2 pt-2">
              <button
                onClick={onClose}
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
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormCadastroProducao;
