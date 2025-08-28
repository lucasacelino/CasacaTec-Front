import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { maskTelefone } from "../../produtores/utils/mascarasInputs";
import { fetchCitiesByState, fetchStates } from "../../../services/ibgeService";

const ModalEditDistribuicao = ({ agendamentoId, isOpen, onClose, onSuccess }) => {
  const [estado, setEstado] = useState([]);
  const [cidades, setCidades] = useState([]);

  useEffect(() => {
    const carregarDadosEstados = async () => {
      const response = await fetchStates();
      setEstado(response);
    };
    carregarDadosEstados();
  }, []);

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
    // nomeTecnico: Yup.string()
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
    dataEntrega: Yup.string()
      .required("Data de agendamento é obrigatória")
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

    observacao: Yup.string()
      .matches(/^[A-Za-zÀ-ú\s]*$/, "A observação deve conter apenas letras")
      .test(
        "no-trailing-spaces",
        "Observação não pode ter espaços no início ou fim",
        (value) => (value ? value.trim() === value : true)
      )
      .min(0, "A observação deve ter pelo menos 2 letras"),
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

  const [initialValues, setInitialValues] = useState({
    nomeCondutor: "",
    telefone: "",
    estado: "",
    municipio: "",
    // nomeTecnico: "",
    horario: "",
    qtdSacos: "",
    dataEntrega: "",
    observacao: "",
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
        className="w-full border border-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-[#FF6B00]"
      />
    );
  };

  useEffect(() => {
    if (!agendamentoId || !isOpen) return;

    const fetchDistribuicoes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/distriSementes/${agendamentoId}`
        );

        const data = response.data;

        // Carregar cidades do estado selecionado
        if (data.estado) {
          const cidadesResponse = await fetchCitiesByState(data.estado);
          setCidades(cidadesResponse);
        }

        setInitialValues({
          ...data,
          idDistribuicao: data.idDistribuicao,
          nomeCondutor: data.nomeCondutor || "",
          telefone: data.telefone || "",
          estado: data.estado || "",
          municipio: data.municipio || "",
          // nomeTecnico: data.nomeTecnico || "",
          horario: data.horario || "",
          qtdSacos: data.qtdSacos || "",
          dataEntrega: data.dataEntrega || "",
          // statusEntrega: data.statusEntrega || "",
          observacao: data.observacao || "",
        });
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        toast.error("Erro ao carregar dados do agendamento");
      }
    };

    fetchDistribuicoes();
  }, [agendamentoId, isOpen]);

  const handleSubmitUpdate = async (values) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/distriSementes/${agendamentoId}`,
        values
      );

      console.log(response.data);
      toast.success("Agendamento atualizado com sucesso");
      onSuccess(response.data);
      onClose();
    } catch (err) {
      console.error("Erro ao atualizar:", err);
      toast.error("Erro ao atualizar agendamento");
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
        <DialogPanel className="w-full max-w-4xl rounded bg-white p-6">
          <DialogTitle className="text-xl font-bold mb-4 border-b-2 border-[#FF6B00]">
            Editar agendamento
          </DialogTitle>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmitUpdate}
            enableReinitialize={true}
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
                    {cidades.map((cidade) => (
                      <option key={cidade.nome} value={cidade.nome}>
                        {cidade.nome}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="municipio"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
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
                </div>

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
                    <label className="block text-sm font-medium text-black mb-1">
                      Data de Entrega*
                    </label>
                    <Field name="dataEntrega" component={DateInputBr} />
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
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-[#FFFFFF] bg-[#595959] hover:bg-[#494949]"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#000000] hover:bg-[#333333] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B00] disabled:opacity-50"
                  >
                    {isSubmitting ? "Atualizando..." : "Atualizar"}
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

export default ModalEditDistribuicao;
