import React from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { maskCPF, maskTelefone } from "./utils/mascarasInputs";

const CadastroProdutoresForm = () => {
  const estados = ["Rio Grande do Norte", "São Paulo", "Minas Gerais"];

  const initialValues = {
    nome: "",
    cpf: "",
    nascimento: "",
    telefone: "",
    fidelizacao: "",
    endereco: "",
    estado: "",
  };

  // const ano = new Date().getFullYear()
  const validationSchema = Yup.object({
    nome: Yup.string()
      .required("Nome é obrigatório")
      .matches(/^[A-Za-zÀ-ú\s]+$/, "O nome deve conter apenas letras")
      .min(2, "O nome deve ter pelo menos 2 letras"),
    cpf: Yup.string()
      .required("CPF é obrigatório")
      .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
    nascimento: Yup.date()
      .required("Data de nascimento é obrigatória")
      .max(new Date(), "Data não pode ser no futuro"),
    telefone: Yup.string()
      .required("Telefone é obrigatório")
      .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Telefone inválido"),
    // fidelizacao: Yup.number().required('Fidelização é obrigatória')
    // .typeError('Informe um ano válido com 4 dígitos')
    // .integer('Ano deve ser um número inteiro')
    // .max(ano, 'Ano não pode ser no futuro'),
    fidelizacao: Yup.string()
      .matches(/^\d{4}$/, "O ano deve ter 4 dígitos")
      .test("ano-valido", "Ano não pode ser no futuro", function (value) {
        const ano = parseInt(value, 10);
        return ano <= new Date().getFullYear();
      })
      .required("Ano de fidelização é obrigatório"),
    endereco: Yup.string().required("Endereço é obrigatório"),
    estado: Yup.string().required("Estado é obrigatório"),
  });

  const onSubmit = (values) => {
    console.log(values);
    alert("Formulário enviado com sucesso!");
  };

  const handleCPFChange = (e, setFieldValue) => {
    const formattedValue = maskCPF(e.target.value);
    setFieldValue("cpf", formattedValue);
  };

  const handleTelefoneChange = (e, setFieldValue) => {
    const formattedValue = maskTelefone(e.target.value);
    setFieldValue("telefone", formattedValue);
  };

  return (
    <div className="w-full bg-[#FFFFFF] border-t-4 border-[#F9BF80] pt-2">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="flex flex-wrap gap-x-6 gap-y-4">
            {/* Nome */}
            <div>
              <label htmlFor="nome" className="block text-black font-semibold">
                Nome completo*
              </label>
              <Field
                name="nome"
                type="text"
                className="w-[230px] border border-black-500 rounded-md pl-1 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="nome"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* CPF */}
            <div>
              <label htmlFor="cpf" className="block text-black font-semibold">
                CPF*
              </label>
              <Field
                name="cpf"
                type="text"
                className="border border-black-500 rounded-md pl-1 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleCPFChange(e, setFieldValue)}
                maxLength="14" // 000.000.000-00
              />
              <ErrorMessage
                name="cpf"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Data de Nascimento */}
            <div>
              <label
                htmlFor="nascimento"
                className="block text-black font-semibold"
              >
                Data de Nascimento*
              </label>
              <Field
                name="nascimento"
                type="date"
                className="border border-black-500 rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="nascimento"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Telefone */}
            <div>
              <label
                htmlFor="telefone"
                className="block text-black font-semibold"
              >
                Telefone*
              </label>
              <Field
                name="telefone"
                type="text"
                className="border border-black-500 rounded-md pl-1 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleTelefoneChange(e, setFieldValue)}
                maxLength="15"
              />
              <ErrorMessage
                name="telefone"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Fidelização */}
            <div>
              <label
                htmlFor="fidelizacao"
                className="block text-black font-semibold"
              >
                Fidelização*
              </label>
              <Field
                name="fidelizacao"
                type="text"
                maxLength="4"
                className="w-[98px] border border-black-100 rounded-md pl-1 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="fidelizacao"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Endereço */}
            <div>
              <label
                htmlFor="endereco"
                className="block text-black font-semibold"
              >
                Endereço*
              </label>
              <Field
                name="endereco"
                type="text"
                className="w-[230px] border border-black-100 rounded-md pl-1 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="endereco"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Estado */}
            <div>
              <label
                htmlFor="estado"
                className="block text-black font-semibold"
              >
                Estado*
              </label>
              <Field
                as="select"
                name="estado"
                className="border border-black-500 rounded-md px-4 py-2.5 bg-white text-black"
              >
                <option value="">Selecione o estado</option>
                {estados.map((estado) => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="estado"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CadastroProdutoresForm;
