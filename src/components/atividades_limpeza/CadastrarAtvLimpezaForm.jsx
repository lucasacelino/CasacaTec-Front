import React from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";

const CadastrarAtvLimpezaForm = () => {
  return (
    <div className="w-full bg-[#FFFFFF] border-t-4 border-[#F9BF80] pt-2">
      <Formik>
        <Form className="flex flex-wrap gap-x-6 gap-y-4">
          {/* Nome */}
          <div>
            <label htmlFor="nome" className="block text-black font-semibold">
              Local limpeza*
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
              Objeto de limpeza*
            </label>
            <Field
              name="cpf"
              type="text"
              className="border border-black-500 rounded-md pl-1 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            //   maxLength="14" // 000.000.000-00
            />
            <ErrorMessage
              name="cpf"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="telefone"
              className="block text-black font-semibold"
            >
              Responsável*
            </label>
            <Field
              name="telefone"
              type="text"
              className="border border-black-500 rounded-md pl-1 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength="15"
            />
            <ErrorMessage
              name="telefone"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="endereco"
              className="block text-black font-semibold"
            >
              Fiscal*
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

          <div>
            <label
              htmlFor="nascimento"
              className="block text-black font-semibold"
            >
              Data*
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

          <div className="w-full flex justify-center gap-4 mt-6">
            <button className="bg-[#000000] text-[#FFFFFF] px-4 py-3 rounded-sm font-medium">Cadastrar limpeza</button>
            <button className="bg-[#c1121f] text-[#FFFFFF] px-4 py-3 rounded-sm font-medium">Cancelar</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default CadastrarAtvLimpezaForm;
