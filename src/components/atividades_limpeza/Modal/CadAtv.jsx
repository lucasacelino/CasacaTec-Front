// import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
// import { useState } from "react";

// const CadAtv = ({ isOpen, onClose, onSave }) => {
//   const [novaAtividade, setNovaAtividade] = useState({
//     nome: "",
//     descricao: "",
//     frequencia: "",
//     responsavel: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNovaAtividade((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(novaAtividade);
//     setNovaAtividade({
//       nome: "",
//       descricao: "",
//       frequencia: "",
//       responsavel: "",
//     });
//     onClose();
//   };

//   return (
//     <Dialog open={isOpen} onClose={onClose} className="relative z-50">
//       <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
//       <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
//         <DialogPanel className="max-w-md w-full space-y-4 border bg-white p-6 rounded-lg">
//           <DialogTitle className="font-bold text-xl text-[#FF6B00]">
//             Cadastrar Nova Atividade
//           </DialogTitle>

//           <Description className="text-sm text-gray-600">
//             Preencha os campos abaixo para cadastrar uma nova atividade de
//             limpeza
//           </Description>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label
//                 htmlFor="nome"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Nome da Atividade*
//               </label>
//               <input
//                 type="text"
//                 id="nome"
//                 name="nome"
//                 value={novaAtividade.nome}
//                 onChange={handleInputChange}
//                 required
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="descricao"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Descrição*
//               </label>
//               <textarea
//                 id="descricao"
//                 name="descricao"
//                 value={novaAtividade.descricao}
//                 onChange={handleInputChange}
//                 required
//                 rows={3}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="frequencia"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Frequência*
//               </label>
//               <select
//                 id="frequencia"
//                 name="frequencia"
//                 value={novaAtividade.frequencia}
//                 onChange={handleInputChange}
//                 required
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
//               >
//                 <option value="">Selecione a frequência</option>
//                 <option value="diaria">Diária</option>
//                 <option value="semanal">Semanal</option>
//                 <option value="quinzenal">Quinzenal</option>
//                 <option value="mensal">Mensal</option>
//                 <option value="bimestral">Bimestral</option>
//                 <option value="trimestral">Trimestral</option>
//               </select>
//             </div>

//             <div>
//               <label
//                 htmlFor="responsavel"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Responsável*
//               </label>
//               <input
//                 type="text"
//                 id="responsavel"
//                 name="responsavel"
//                 value={novaAtividade.responsavel}
//                 onChange={handleInputChange}
//                 required
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
//               />
//             </div>

//             <div className="flex justify-end gap-4 pt-2">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
//               >
//                 Cancelar
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF6B00] hover:bg-[#E55D00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B00]"
//               >
//                 Cadastrar
//               </button>
//             </div>
//           </form>
//         </DialogPanel>
//       </div>
//     </Dialog>
//   );
// };

// export default CadAtv;

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";

const CadastroAtividadeModal = ({ isOpen, onClose, onSave }) => {
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
        (value) => (value ? value.trim() === value : true)
      )
      .min(2, "O nome deve ter pelo menos 2 letras"),
    materialLimpeza: Yup.string()
      .required("Material de limpeza é obrigatório")
      .matches(/^[A-Za-zÀ-ú\s]+$/, "O nome deve conter apenas letras")
      .test(
        "no-trailing-spaces",
        "O material de limpeza não pode ter espaços no início ou fim",
        (value) => (value ? value.trim() === value : true)
      )
      .min(2, "O nome deve ter pelo menos 2 letras"),
    responsavelLimpeza: Yup.string()
      .required("Responsável é obrigatório")
      .matches(/^[A-Za-zÀ-ú\s]+$/, "O nome deve conter apenas letras")
      .test(
        "no-trailing-spaces",
        "Responsável não pode ter espaços no início ou fim",
        (value) => (value ? value.trim() === value : true)
      )
      .min(2, "O nome deve ter pelo menos 2 letras"),
    fiscalLimpeza: Yup.string()
      .required("Informar o fiscal é obrigatório")
      .matches(/^[A-Za-zÀ-ú\s]+$/, "O nome deve conter apenas letras")
      .test(
        "no-trailing-spaces",
        "Fiscal de limpeza não pode ter espaços no início ou fim",
        (value) => (value ? value.trim() === value : true)
      )
      .min(2, "O nome deve ter pelo menos 2 letras"),
    dataLimpeza: Yup.date()
      .required("Data de limpeza é obrigatória")
      .max(new Date(), "Data não pode ser no futuro")
      .test("ano-valido", "Ano inválido", (value) => {
        const ano = value.getFullYear();
        const anoString = value.getFullYear().toString();
        const anoAtual = new Date().getFullYear();
        return anoString.length === 4 && ano > 1920 && ano <= anoAtual;
      }),
    observacao: Yup.string()
      .matches(/^[A-Za-zÀ-ú\s]+$/, "O nome deve conter apenas letras")
      .test(
        "no-trailing-spaces",
        "Observação não pode ter espaços no início ou fim",
        (value) => (value ? value.trim() === value : true)
      )
      .min(2, "O nome deve ter pelo menos 2 letras"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const [anoNasc, mesNasc, diaNasc] = values.dataLimpeza.split("-");
      const dataNascFormatada = `${diaNasc}/${mesNasc}/${anoNasc}`;

      const dadosEnvio = {
        ...values,
        dataLimpeza: dataNascFormatada,
      };

      // Chamada para a API
      const response = await axios.post(
        "http://localhost:3000/atvs_limpeza",
        dadosEnvio
      );

      onSave(response.data); // Passa os dados salvos para o componente pai
      resetForm();
      toast.success("Atividade de limpeza cadastrada com sucesso");
      onClose();
    } catch (error) {
      toast.error("Não foi possível cadastrar a atividade");
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-2xl w-full space-y-4 border bg-white p-6 rounded-lg">
          <DialogTitle className="font-bold text-xl text-[#000000] border-b-2 border-[#FF6B00]">
            Cadastrar Nova Atividade de Limpeza
          </DialogTitle>

          <Description className="text-sm text-[#000000]">
            Preencha os campos abaixo para cadastrar uma nova atividade de
            limpeza
          </Description>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label
                    htmlFor="localLimpeza"
                    className="block text-sm font-medium text-black"
                  >
                    Local de Limpeza*
                  </label>
                  <Field
                    name="localLimpeza"
                    type="text"
                    className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                  />
                  <ErrorMessage
                    name="localLimpeza"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="materialLimpeza"
                    className="block text-sm font-medium text-black"
                  >
                    Material de Limpeza*
                  </label>
                  <Field
                    name="materialLimpeza"
                    type="text"
                    className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                  />
                  <ErrorMessage
                    name="materialLimpeza"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="responsavelLimpeza"
                    className="block text-sm font-medium text-black"
                  >
                    Responsável*
                  </label>
                  <Field
                    name="responsavelLimpeza"
                    type="text"
                    className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                  />
                  <ErrorMessage
                    name="responsavelLimpeza"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="fiscalLimpeza"
                    className="block text-sm font-medium text-black"
                  >
                    Fiscal*
                  </label>
                  <Field
                    name="fiscalLimpeza"
                    type="text"
                    className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                  />
                  <ErrorMessage
                    name="fiscalLimpeza"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="dataLimpeza"
                    className="block text-sm font-medium text-black"
                  >
                    Data*
                  </label>
                  <Field
                    name="dataLimpeza"
                    type="date"
                    className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                  />
                  <ErrorMessage
                    name="dataLimpeza"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="observacao"
                    className="block text-sm font-medium text-black"
                  >
                    Observação (opcional)
                  </label>
                  <Field
                    name="observacao"
                    as="textarea"
                    rows={3}
                    className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                  />
                  <ErrorMessage
                    name="observacao"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="col-span-2 flex justify-end gap-4 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-[#FFFFFF] bg-[#595959]"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#000000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B00] disabled:opacity-50"
                  >
                    {isSubmitting ? "Cadastrando..." : "Cadastrar"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CadastroAtividadeModal;
