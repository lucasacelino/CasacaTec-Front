import React from "react";

// import { differenceInYears } from "date-fns";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";

const CadastrarAtvLimpezaForm = () => {
  const initialValues = {
    local_limpeza: "",
    objeto_limpeza: "",
    responsavel: "",
    fiscal: "",
    data_limpeza: "",
  };

  const validationSchema = Yup.object({
    local_limpeza: Yup.string()
      .required("Nome é obrigatório")
      .matches(/^[A-Za-zÀ-ú\s]+$/, "O nome deve conter apenas letras")
      .min(2, "O nome deve ter pelo menos 2 letras"),
    objeto_limpeza: Yup.string()
      .required("Nome é obrigatório")
      .matches(/^[A-Za-zÀ-ú\s]+$/, "O nome deve conter apenas letras")
      .min(2, "O nome deve ter pelo menos 2 letras"),
    responsavel: Yup.string()
      .required("Nome é obrigatório")
      .matches(/^[A-Za-zÀ-ú\s]+$/, "O nome deve conter apenas letras")
      .min(2, "O nome deve ter pelo menos 2 letras"),
    fiscal: Yup.string()
      .required("Nome é obrigatório")
      .matches(/^[A-Za-zÀ-ú\s]+$/, "O nome deve conter apenas letras")
      .min(2, "O nome deve ter pelo menos 2 letras"),
    data_limpeza: Yup.date()
      .required("Data de limpeza é obrigatória")
      .max(new Date(), "Data não pode ser no futuro")
      .test("ano-valido", "Ano inválido", (value) => {
        const ano = value.getFullYear();
        const anoString = value.getFullYear().toString();
        const anoAtual = new Date().getFullYear();
        return anoString.length === 4 && ano > 1920 && ano <= anoAtual;
      }),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const dadosEnvio = {
      local_limpeza: values.local_limpeza,
      objeto_limpeza: values.objeto_limpeza,
      responsavel: values.responsavel,
      fiscal: values.fiscal,
      data_limpeza: values.data_limpeza,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/atvs_limpeza",
        dadosEnvio
      );

      resetForm();
      console.log("Atividade de limpeza cadastrada com sucesso");
      toast.success("Atividade de limpeza cadastrada co sucesso");
      console.log(response.data);
    } catch (error) {
      toast.error("Não foi possúvel cadastrar a atividade");
      console.error(error);
    }
  };

  return (
    <div className="w-full bg-[#FFFFFF] border-t-4 border-[#F9BF80] pt-2">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-wrap gap-x-6 gap-y-4">
          <div>
            <label
              htmlFor="local_limpeza"
              className="block text-black font-semibold"
            >
              Local limpeza*
            </label>
            <Field
              name="local_limpeza"
              type="text"
              className="w-[230px] border border-black-500 rounded-md pl-1 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="local_limpeza"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="objeto_limpeza"
              className="block text-black font-semibold"
            >
              Objeto de limpeza*
            </label>
            <Field
              name="objeto_limpeza"
              type="text"
              className="border border-black-500 rounded-md pl-1 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              //   maxLength="14" // 000.000.000-00
            />
            <ErrorMessage
              name="objeto_limpeza"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="responsavel"
              className="block text-black font-semibold"
            >
              Responsável*
            </label>
            <Field
              name="responsavel"
              type="text"
              className="border border-black-500 rounded-md pl-1 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength="15"
            />
            <ErrorMessage
              name="responsavel"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label htmlFor="fiscal" className="block text-black font-semibold">
              Fiscal*
            </label>
            <Field
              name="fiscal"
              type="text"
              className="w-[230px] border border-black-100 rounded-md pl-1 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="fiscal"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="data_limpeza"
              className="block text-black font-semibold"
            >
              Data*
            </label>
            <Field
              name="data_limpeza"
              type="date"
              className="border border-black-500 rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="data_limpeza"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="w-full flex justify-center gap-4 mt-6">
            <button
              type="submit"
              className="bg-[#000000] text-[#FFFFFF] px-4 py-3 rounded-sm font-medium"
            >
              Cadastrar limpeza
            </button>
            <button
              type="button"
              className="bg-[#c1121f] text-[#FFFFFF] px-4 py-3 rounded-sm font-medium"
            >
              Cancelar
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default CadastrarAtvLimpezaForm;
