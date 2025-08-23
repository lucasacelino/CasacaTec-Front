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
import { maskTelefone } from "../../produtores/utils/mascarasInputs";

const CadastroTecnicoModal = ({ isOpen, onClose, onSave }) => {
  const initialValues = {
    nomeTecnico: "",
    emailTecnico: "",
    telefoneTecnico: "",
  };

  const validationSchema = Yup.object({
    nomeTecnico: Yup.string()
      .required("Local de limpeza é obrigatório")
      .matches(/^[A-Za-zÀ-ú\s]+$/, "O nome deve conter apenas letras")
      .test(
        "no-trailing-spaces",
        "Local de limpeza não pode ter espaços no início ou fim",
        (value) => (value ? value.trim() === value : true)
      )
      .min(2, "O nome deve ter pelo menos 2 letras"),
    // email: Yup.string()
    //   .required("Material de limpeza é obrigatório")
    //   .matches(/^[A-Za-zÀ-ú\s]+$/, "O nome deve conter apenas letras")
    //   .test(
    //     "no-trailing-spaces",
    //     "O material de limpeza não pode ter espaços no início ou fim",
    //     (value) => (value ? value.trim() === value : true)
    //   )

    emailTecnico: Yup.string()
      .required("material de limpeza é obrigatório")
      .email("email inválido"),
    telefoneTecnico: Yup.string()
      .required("Telefone é obrigatório")
      .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Telefone inválido"),
  });

  const handleTelefoneChange = (e, setFieldValue) => {
    const formattedValue = maskTelefone(e.target.value);
    setFieldValue("telefoneTecnico", formattedValue);
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const dadosEnvio = {
        nomeTecnico: values.nomeTecnico,
        emailTecnico: values.emailTecnico,
        telefoneTecnico: values.telefoneTecnico,
      };

      // Chamada para a API
      // const response = await axios.post(
      //   "http://localhost:3000/tecnicos",
      //   dadosEnvio
      // );

      const response = await axios.post(
        "http://localhost:8080/tecnicos/tecnico",
        dadosEnvio
      );

      onSave(response.data);
      resetForm();
      toast.success("Tecnico cadastro com sucesso");
      onClose();
    } catch (error) {
      toast.error("Não foi possível cadastrar o técnico");
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-2xl w-full space-y-4 border bg-white p-6 rounded-lg">
          <DialogTitle className="font-bold text-xl text-[#000000] border-b-2 border-[#FF6B00]">
            Cadastrar Técnico
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
            {({ setFieldValue, isSubmitting }) => (
              <Form className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label
                    htmlFor="nomeTecnico"
                    className="block text-sm font-medium text-black"
                  >
                    Nome Completo*
                  </label>
                  <Field
                    name="nomeTecnico"
                    type="text"
                    className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                  />
                  <ErrorMessage
                    name="nomeTecnico"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="emailTecnico"
                    className="block text-sm font-medium text-black"
                  >
                    Email*
                  </label>
                  <Field
                    name="emailTecnico"
                    type="text"
                    className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                  />
                  <ErrorMessage
                    name="emailTecnico"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="telefoneTecnico"
                    className="block text-sm font-medium text-black"
                  >
                    Telefone*
                  </label>
                  <Field
                    name="telefoneTecnico"
                    type="text"
                    className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                    onChange={(e) => handleTelefoneChange(e, setFieldValue)}
                  />
                  <ErrorMessage
                    name="telefoneTecnico"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="col-span-2 flex justify-end gap-2 pt-2">
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

export default CadastroTecnicoModal;
