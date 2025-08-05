import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

const ModalEditAtividadeLimpeza = ({ atividadeId, isOpen, onClose, onSuccess }) => {
  const validationSchema = Yup.object({
    localLimpeza: Yup.string()
      .required("Local de limpeza é obrigatório")
      .matches(/^[A-Za-zÀ-ú\s]+$/, "O nome deve conter apenas letras")
      .test(
        "no-trailing-spaces",
        "Local de limpeza não pode ter espaços no início ou fim",
        (value) => {
          return value ? value.trim() === value : true;
        }
      )
      .min(2, "O nome deve ter pelo menos 2 letras"),
    materialLimpeza: Yup.string()
      .required("material de limpeza é obrigatório")
      .matches(/^[A-Za-zÀ-ú\s]+$/, "O nome deve conter apenas letras")
      .test(
        "no-trailing-spaces",
        "O material de limpeza não pode ter espaços no início ou fim",
        (value) => {
          return value ? value.trim() === value : true;
        }
      )
      .min(2, "O nome deve ter pelo menos 2 letras"),
    responsavelLimpeza: Yup.string()
      .required("Responsável é obrigatório")
      .matches(/^[A-Za-zÀ-ú\s]+$/, "O nome deve conter apenas letras")
      .test(
        "no-trailing-spaces",
        "Responsável não pode ter espaços no início ou fim",
        (value) => {
          return value ? value.trim() === value : true;
        }
      )
      .min(2, "O nome deve ter pelo menos 2 letras"),
    fiscalLimpeza: Yup.string()
      .required("Informar o fiscal é obrigatório")
      .matches(/^[A-Za-zÀ-ú\s]+$/, "O nome deve conter apenas letras")
      .test(
        "no-trailing-spaces",
        "Fiscal de limpeza não pode ter espaços no início ou fim",
        (value) => {
          return value ? value.trim() === value : true;
        }
      )
      .min(2, "O nome deve ter pelo menos 2 letras"),
    dataLimpeza: Yup.string()
      .required("Data de limpeza é obrigatória")
      .test("formato-data", "Formato inválido (use DD/MM/AAAA)", (value) => {
        if (!value) return false;
        return /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(value);
      })
      .test("data-valida", "Data inválida", (value) => {
        if (!value) return false;
        const [day, month, year] = value.split("/");
        const date = new Date(`${year}-${month}-${day}`);
        return !isNaN(date.getTime());
      })
      .test("data-futura", "Data não pode ser no futuro", (value) => {
        if (!value) return false;
        const [day, month, year] = value.split("/");
        const inputDate = new Date(`${year}-${month}-${day}`);
        return inputDate <= new Date();
      })
      .test(
        "ano-valido",
        "Ano inválido (deve ser entre 1900 e o ano atual)",
        (value) => {
          if (!value) return false;
          const [_, __, year] = value.split("/");
          const yearNum = parseInt(year, 10);
          const currentYear = new Date().getFullYear();
          return yearNum >= 1900 && yearNum <= currentYear;
        }
      )
      .test("dia-valido", "Dia inválido para este mês", (value) => {
        if (!value) return false;
        const [day, month, year] = value.split("/");
        const date = new Date(year, month - 1, day);
        return (
          date.getDate() == day &&
          date.getMonth() == month - 1 &&
          date.getFullYear() == year
        );
      })
      .test("mes-valido", "Mês inválido (1-12)", (value) => {
        if (!value) return false;
        const [_, month, __] = value.split("/");
        const monthNum = parseInt(month, 10);
        return monthNum >= 1 && monthNum <= 12;
      }),
    observacao: Yup.string()
      .matches(/^[A-Za-zÀ-ú\s]+$/, "O nome deve conter apenas letras")
      .test(
        "no-trailing-spaces",
        "Observação não pode ter espaços no início ou fim",
        (value) => {
          return value ? value.trim() === value : true;
        }
      )
      .min(2, "O nome deve ter pelo menos 2 letras"),
  });

  const [initialValues, setInitialValues] = useState({
    localLimpeza: "",
    materialLimpeza: "",
    responsavelLimpeza: "",
    fiscalLimpeza: "",
    dataLimpeza: "",
    observacao: "",
  });

  const DateInputBr = ({ field, form, ...props }) => {
    const handleChange = (e) => {
      const isoDate = e.target.value;
      if (isoDate) {
        const [year, month, day] = isoDate.split("-");
        form.setFieldValue(field.name, `${day}/${month}/${year}`);
      } else {
        form.setFieldValue(field.name, "");
      }
    };

    const formatForInput = (brDate) => {
      if (!brDate || !brDate.includes("/")) return "";
      const [day, month, year] = brDate.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    };

    return (
      <input
        type="date"
        {...props}
        value={formatForInput(field.value)}
        onChange={handleChange}
        className="w-full border border-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    );
  };

  useEffect(() => {
    if (!atividadeId || !isOpen) return;

    const fetchProdutor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/atvs_limpeza/${atividadeId}`
        );

        setInitialValues({
          id: response.data.id,
          localLimpeza: response.data.localLimpeza || "",
          materialLimpeza: response.data.materialLimpeza || "",
          responsavelLimpeza: response.data.responsavelLimpeza || "",
          fiscalLimpeza: response.data.fiscalLimpeza || "",
          dataLimpeza: response.data.dataLimpeza || "",
          observacao: response.data.observacao || "",
        });

        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProdutor();
  }, [atividadeId, isOpen]);

  const handleSubmitUpdate = async (values) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/atvs_limpeza/${atividadeId}`,
        values
      );

      console.log(response.data);
      toast.success("Atividade atualizada com sucesso");
      onClose();
      onSuccess(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
        <DialogPanel className="w-full max-w-4xl rounded bg-white p-6">
          <DialogTitle className="text-xl font-bold mb-4 border-b-2 border-[#FF6B00]">
            Editar atividade de limpeza
          </DialogTitle>

          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmitUpdate}
          >
            <Form className="flex flex-wrap gap-x-6 gap-y-4">
              <div className="max-w-[230px]">
                <label
                  htmlFor="localLimpeza"
                  className="block text-black font-semibold"
                >
                  Local limpeza*
                </label>
                <Field
                  name="localLimpeza"
                  type="text"
                  className="w-[230px] border border-black-500 rounded-md pl-1 py-2 text-black focus:outline-none focus:ring-1 focus:ring-black-500"
                />
                <ErrorMessage
                  name="localLimpeza"
                  component="div"
                  className="text-[#d00000] text-sm"
                />
              </div>

              <div className="max-w-[230px]">
                <label
                  htmlFor="materialLimpeza"
                  className="block text-black font-semibold"
                >
                  Material de limpeza*
                </label>
                <Field
                  name="materialLimpeza"
                  type="text"
                  className="w-[230px] border border-black-500 rounded-md pl-1 py-2 text-black focus:outline-none focus:ring-1 focus:ring-black-500"
                />
                <ErrorMessage
                  name="materialLimpeza"
                  component="div"
                  className="text-[#d00000] text-sm"
                />
              </div>

              <div className="max-w-[230px]">
                <label
                  htmlFor="responsavelLimpeza"
                  className="block text-black font-semibold"
                >
                  Responsável*
                </label>
                <Field
                  name="responsavelLimpeza"
                  type="text"
                  className="w-[230px] border border-black-500 rounded-md pl-1 py-2 text-black focus:outline-none focus:ring-1 focus:ring-black-500"
                />
                <ErrorMessage
                  name="responsavelLimpeza"
                  component="div"
                  className="text-[#d00000] text-sm"
                />
              </div>

              <div className="max-w-[230px]">
                <label
                  htmlFor="fiscalLimpeza"
                  className="block text-black font-semibold"
                >
                  Fiscal*
                </label>
                <Field
                  name="fiscalLimpeza"
                  type="text"
                  className="w-[230px] border border-black-500 rounded-md pl-1 py-2 text-black focus:outline-none focus:ring-1 focus:ring-black-500"
                />
                <ErrorMessage
                  name="fiscalLimpeza"
                  component="div"
                  className="text-[#d00000] text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Data*
                </label>
                <Field name="dataLimpeza" component={DateInputBr} />
                <ErrorMessage
                  name="dataLimpeza"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="observacao"
                  className="block text-black font-semibold"
                >
                  Observação (opcional)
                </label>
                <Field
                  name="observacao"
                  as="textarea"
                  className="w-full h-[150px] resize-none border border-black-500 rounded-md pl-1 py-2 text-black focus:outline-none focus:ring-1 focus:ring-black-500"
                />
                <ErrorMessage
                  name="observacao"
                  component="div"
                  className="text-[#d00000] text-sm"
                />
              </div>

              <div className="w-full flex justify-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-[#4a5059] text-[#FFFFFF] px-4 py-3 rounded-sm font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#000000] text-[#FFFFFF] px-4 py-3 rounded-sm font-medium"
                >
                  Atualizar
                </button>
              </div>
            </Form>
          </Formik>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ModalEditAtividadeLimpeza;
