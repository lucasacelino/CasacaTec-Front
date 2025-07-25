import React, { useState } from "react";

// import { differenceInYears } from "date-fns";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { SuccessDialog } from "./Modal/SuccessDialog";
import DateInput from "./utils/DataInput";

const CadastrarAtvLimpezaForm = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const initialValues = {
    localLimpeza: "",
    materialLimpeza: "",
    responsavelLimpeza: "",
    fiscalLimpeza: "",
    dataLimpeza: "",
    observacao: "",
  };

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
      .test("data-futura", "Data não pode ser no futuro", (value) => {
        if (!value) return false;
        const [day, month, year] = value.split("/");
        const inputDate = new Date(`${year}-${month}-${day}`);
        return inputDate <= new Date();
      })
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
      // .required("Observação é obrigatório")
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

  const handleSubmit = async (values, { resetForm }) => {
    // const [anoNasc, mesNasc, diaNasc] = values.dataLimpeza.split("-");
    // const dataNascFormatada = `${diaNasc}/${mesNasc}/${anoNasc}`;

    const dadosEnvio = {
      localLimpeza: values.localLimpeza,
      materialLimpeza: values.materialLimpeza,
      responsavelLimpeza: values.responsavelLimpeza,
      fiscalLimpeza: values.fiscalLimpeza,
      dataLimpeza: values.dataLimpeza,
      observacao: values.observacao,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/atvs_limpeza",
        dadosEnvio
      );

      resetForm();
      console.log("Atividade de limpeza cadastrada com sucesso");
      setOpenDialog(true);
      console.log(response.data);
    } catch (error) {
      toast.error("Não foi possúvel cadastrar a atividade");
      console.error(error);
    }
  };

  return (
    <div className="w-full bg-[#FFFFFF] border-t-2 border-[#FF6B00] pt-2">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
              className="border border-black-500 rounded-md pl-1 py-2 text-black focus:outline-none focus:ring-1 focus:ring-black-500"
              //   maxLength="14" // 000.000.000-00
            />
            <ErrorMessage
              name="materialLimpeza"
              component="div"
              className="text-[#d00000] text-sm"
            />
          </div>

          <div className="max-w-[226px]">
            <label
              htmlFor="responsavelLimpeza"
              className="block text-black font-semibold"
            >
              Responsável*
            </label>
            <Field
              name="responsavelLimpeza"
              type="text"
              className="border border-black-500 rounded-md pl-1 py-2 text-black focus:outline-none focus:ring-1 focus:ring-black-500"
              // maxLength="15"
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
              className="w-[230px] border border-black-100 rounded-md pl-1 py-2 text-black focus:outline-none focus:ring-1 focus:ring-black-500"
            />
            <ErrorMessage
              name="fiscalLimpeza"
              component="div"
              className="text-[#d00000] text-sm"
            />
          </div>

          {/* <div className="max-w-[166px]">
            <label
              htmlFor="dataLimpeza"
              className="block text-black font-semibold"
            >
              Data*
            </label>
            <Field
              name="dataLimpeza"
              type="date"
              className="border border-black-500 rounded-md px-3 py-2 text-black focus:outline-none focus:ring-1 focus:ring-black-500"
            />
            <ErrorMessage
              name="dataLimpeza"
              component="div"
              className="text-[#d00000] text-sm"
            />
          </div> */}

          <div className="max-w-[166px]">
            <label
              htmlFor="dataLimpeza"
              className="block text-black font-semibold"
            >
              Data*
            </label>
            <Field
              name="dataLimpeza"
              component={DateInput}
              className="border border-black-500 rounded-md px-3 py-2 text-black focus:outline-none focus:ring-1 focus:ring-black-500"
            />
            <ErrorMessage
              name="dataLimpeza"
              component="div"
              className="text-[#d00000] text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="observacao"
              className="block text-black font-semibold"
            >
              Observação(opcional)
            </label>
            <Field
              name="observacao"
              as="textarea"
              className="w-[330px] h-[150px] resize-none border border-black-500 rounded-md pl-1 py-2 text-black focus:outline-none focus:ring-1 focus:ring-black-500"
            />
            <ErrorMessage
              name="observacao"
              component="div"
              className="text-[#d00000] text-sm"
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
              onClick={() => navigate("/")}
              className="bg-[#c1121f] text-[#FFFFFF] px-4 py-3 rounded-sm font-medium"
            >
              Cancelar
            </button>
          </div>
        </Form>
      </Formik>
      <SuccessDialog isOpen={openDialog} onClose={() => setOpenDialog(false)} />
    </div>
  );
};

export default CadastrarAtvLimpezaForm;
