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
import { useEffect, useState } from "react";
import { fetchCitiesByState, fetchStates } from "../../../services/ibgeService";

const CadastroCondutorModal = ({ isOpen, onClose, onSave }) => {
  const [estado, setEstado] = useState([]);
  const [cidades, setCidades] = useState([]);

  useEffect(() => {
    const carregarDadosEstados = async () => {
      const response = await fetchStates();
      setEstado(response);
    };
    carregarDadosEstados();
  }, []);

  const initialValues = {
    nomeCondutor: "",
    telefone: "",
    estado: "",
    municipio: "",
    horario: "",
    qtdSacos: "",
    // estado: "",
    // municipio: "",
    dataEntrega: "",
    observacao: "",
  };

  const validationSchema = Yup.object({
    nomeCondutor: Yup.string()
      .required("Nome do condutor é obrigatório")
      .matches(/^[A-Za-zÀ-ú\s]+$/, "O nome deve conter apenas letras")
      .test(
        "no-trailing-spaces",
        "Nome não pode ter espaços no início ou fim",
        (value) => (value ? value.trim() === value : true)
      )
      .min(2, "O nome deve ter pelo menos 2 letras"),

    telefone: Yup.string()
      .required("Telefone é obrigatório")
      .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Telefone inválido"),
    estado: Yup.string().required("Estado é obrigatório"),
    municipio: Yup.string().required("Cidade é obrigatória"),
    // nomeTecnic: Yup.string()
    //   .required("Nome do técnico é obrigatório")
    //   .matches(/^[A-Za-zÀ-ú\s]+$/, "O nome deve conter apenas letras")
    //   .test(
    //     "no-trailing-spaces",
    //     "Nome não pode ter espaços no início ou fim",
    //     (value) => (value ? value.trim() === value : true)
    //   )
    //   .min(2, "O nome deve ter pelo menos 2 letras"),
    horario: Yup.string().required("Horário previsto é obrigatório"),
    qtdSacos: Yup.number()
      .required("Quantidade de sacos é obrigatória")
      .positive("A quantidade deve ser positiva")
      .integer("A quantidade deve ser um número inteiro"),
    dataEntrega: Yup.date()
      .required("Data de agendamento é obrigatória")
      .test("ano-valido", "Ano inválido", (value) => {
        // const ano = value.getFullYear();
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

    observacao: Yup.string()
      .matches(/^[A-Za-zÀ-ú\s]+$/, "A observação deve conter apenas letras")
      .test(
        "no-trailing-spaces",
        "Observação não pode ter espaços no início ou fim",
        (value) => (value ? value.trim() === value : true)
      )
      .min(2, "A observação deve ter pelo menos 2 letras"),
  });

  const handleTelefoneChange = (e, setFieldValue) => {
    const formattedValue = maskTelefone(e.target.value);
    setFieldValue("telefone", formattedValue);
  };

  const handleEstadoChange = async (siglaEstado, setFieldValue) => {
    if (siglaEstado) {
      const response = await fetchCitiesByState(siglaEstado);
      setCidades(response);
      setFieldValue("municipio", "");
    } else {
      setCidades([]);
    }
    setFieldValue("estado", siglaEstado);
  };

  const handleSubmit = async (values, { resetForm }) => {
    const [anoNasc, mesNasc, diaNasc] = values.dataEntrega.split("-");
    const dataNascFormatada = `${diaNasc}/${mesNasc}/${anoNasc}`;

    try {
      const dadosEnvio = {
        nomeCondutor: values.nomeCondutor,
        telefone: values.telefone,
        estado: values.estado,
        municipio: values.municipio,
        // nomeTecnico: values.nomeTecnico,
        horario: values.horario,
        qtdSacos: values.qtdSacos,
        dataEntrega: dataNascFormatada,
        status: "Pendente",
        observacao: values.observacao,
      };

      const response = await axios.post(
        "http://localhost:8080/distriSementes/distribuicaoSementes",
        dadosEnvio
      );

      resetForm();
      toast.success("Condutor cadastrado com sucesso");
      onSave(response.data);
      onClose();
    } catch (error) {
      toast.error("Não foi possível cadastrar o condutor");
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-2xl w-full space-y-4 border bg-white p-6 rounded-lg">
          <DialogTitle className="font-bold text-xl text-[#000000] border-b-2 border-[#FF6B00]">
            Agendar distribuição de sementes
          </DialogTitle>

          <Description className="text-sm text-[#000000]">
            Preencha os campos abaixo para agendar uma distribuição
          </Description>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label
                    htmlFor="nomeCondutor"
                    className="block text-sm font-medium text-black"
                  >
                    Nome do Condutor*
                  </label>
                  <Field
                    name="nomeCondutor"
                    type="text"
                    className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                  />
                  <ErrorMessage
                    name="nomeCondutor"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="telefone"
                    className="block text-sm font-medium text-black"
                  >
                    Telefone do Condutor*
                  </label>
                  <Field
                    name="telefone"
                    type="text"
                    className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                    onChange={(e) => handleTelefoneChange(e, setFieldValue)}
                    maxLength="15"
                  />
                  <ErrorMessage
                    name="telefone"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="estado"
                    className="block text-sm font-medium text-black"
                  >
                    Estado*
                  </label>
                  <Field
                    name="estado"
                    as="select"
                    onChange={async (e) => {
                      await handleEstadoChange(e.target.value, setFieldValue);
                    }}
                    className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                  >
                    <option value="">Selecione o estado</option>
                    {estado.map((estado) => (
                      <option key={estado.sigla} value={estado.sigla}>
                        {estado.nome} ({estado.sigla})
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="estado"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="municipio"
                    className="block text-sm font-medium text-black"
                  >
                    Cidade*
                  </label>
                  <Field
                    name="municipio"
                    as="select"
                    className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                  >
                    <option value="">Selecione uma cidade</option>
                    {cidades.map((estado) => (
                      <option key={estado.nome} value={estado.nome}>
                        {estado.nome}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="municipio"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* <div>
                  <label
                    htmlFor="nomeTecnico"
                    className="block text-sm font-medium text-black"
                  >
                    Nome do Técnico*
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
                </div> */}

                <div className="col-span-2 grid grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="horario"
                      className="block text-sm font-medium text-black"
                    >
                      Horário Previsto*
                    </label>
                    <Field
                      name="horario"
                      type="time"
                      className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                    />
                    <ErrorMessage
                      name="horario"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="qtdSacos"
                      className="block text-sm font-medium text-black"
                    >
                      Quantidade de Sacos*
                    </label>
                    <Field
                      name="qtdSacos"
                      type="number"
                      min="1"
                      className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                    />
                    <ErrorMessage
                      name="qtdSacos"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="dataEntrega"
                      className="block text-sm font-medium text-black"
                    >
                      Data de entrega*
                    </label>
                    <Field
                      name="dataEntrega"
                      type="date"
                      min="1"
                      className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                    />
                    <ErrorMessage
                      name="dataEntrega"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
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

export default CadastroCondutorModal;
