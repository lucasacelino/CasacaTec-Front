import axios from "axios";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { maskTelefone } from "../../produtores/utils/mascarasInputs";
import toast from "react-hot-toast";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";

const ModalEditInfoTecnico = ({ tecnicoId, isOpen, onClose }) => {
  const validationSchema = Yup.object({
    nomeCompleto: Yup.string()
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
    email: Yup.string()
      .required("material de limpeza é obrigatório")
      .email("email inválido"),
    telefone: Yup.string()
      .required("Telefone é obrigatório")
      .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Telefone inválido"),
  });

  const [initialValues, setInitialValues] = useState({
    nomeCompleto: "",
    email: "",
    telefone: "",
  });

  useEffect(() => {
    if (!tecnicoId || !isOpen) return;

    const fetchTecnico = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/tecnicos/${tecnicoId}`
        );

        setInitialValues({
          id: response.data.id,
          nomeCompleto: response.data.nomeCompleto || "",
          email: response.data.email || "",
          telefone: response.data.telefone || "",
        });

        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTecnico();
  }, [tecnicoId, isOpen]);

  const handleTelefoneChange = (e, setFieldValue) => {
    const formattedValue = maskTelefone(e.target.value);
    setFieldValue("telefone", formattedValue);
  };

  const handleSubmitUpdate = async (values) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/tecnicos/${tecnicoId}`,
        values
      );

      console.log(response.data);
      toast.success("Técnico atualizado com sucesso!");
      onClose();
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
            Editar Tecnico
          </DialogTitle>

          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmitUpdate}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label
                    htmlFor="nomeCompleto"
                    className="block text-sm font-medium text-black"
                  >
                    Nome Completo*
                  </label>
                  <Field
                    name="nomeCompleto"
                    type="text"
                    className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                  />
                  <ErrorMessage
                    name="nomeCompleto"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-black"
                  >
                    Email*
                  </label>
                  <Field
                    name="email"
                    type="text"
                    className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="telefone"
                    className="block text-sm font-medium text-black"
                  >
                    Telefone*
                  </label>
                  <Field
                    name="telefone"
                    type="text"
                    className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                    onChange={(e) => handleTelefoneChange(e, setFieldValue)}
                  />
                  <ErrorMessage
                    name="telefone"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="col-span-2 flex justify-center gap-2 pt-2">
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

export default ModalEditInfoTecnico;
