import axios from "axios";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  floatParaFormatoBR,
  formatarPesoBR,
} from "../../produtores/utils/mascarasInputs";
import toast from "react-hot-toast";
import { ErrorMessage, Field, Form, Formik } from "formik";

const FormEditProducao = ({ producaoId, onClose, onSuccess }) => {

  const [produtorId, setProdutorId] = useState(null);

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
    dataPlantio: Yup.string()
      .required("Data de plantio é obrigatória")
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

  const [initialValues, setInitialValues] = useState({
    arranjoProdutivo: "",
    culturaConsorcio: "",
    areaPlantio: "",
    dataPlantio: "",
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
        className="mt-1 w-full block border rounded-md border-black px-1 py-2 focus:outline-none focus:border-[#FF6B00]"
      />
    );
  };

  useEffect(() => {
    const carregarDadosProducao = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/producao/${producaoId}`
        );
        const data = response.data;

        setProdutorId(data.produtorId)

        setInitialValues({
          ...data,
          id: data.id || "",
          arranjoProdutivo: data.arranjoProdutivo || "",
          culturaConsorcio: data.culturaConsorcio || "",
          areaPlantio: floatParaFormatoBR(data.areaPlantio) || "",
          dataPlantio: data.dataPlantio || "",
        });

        console.log("dados carregados", data);
      } catch (error) {
        console.log(error);
      }
    };

    carregarDadosProducao();
  }, [producaoId]);

  const handleSubmitUpdate = async (values) => {
    // const [ano, mes, dia] = values.dataPlantio.split("-");
    // const dataPlantio = `${dia}/${mes}/${ano}`;

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
      dataPlantio: values.dataPlantio,
      produtorId: produtorId
    };

    try {
      const res = await axios.put(
        `http://localhost:3000/producao/${producaoId}`,
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

            {/* <div>
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
            </div> */}

            <div className="">
              <label className="block text-sm font-medium text-black">Data de plantio</label>
              <div className="font-medium">
                <Field name="dataPlantio" component={DateInputBr} />
              </div>
              <ErrorMessage
                name="dataPlantio"
                component="div"
                className="text-red-500 text-xs"
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

export default FormEditProducao;
