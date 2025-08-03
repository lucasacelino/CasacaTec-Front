import { useEffect, useRef, useState } from "react";
import { maskTelefone } from "../utils/mascarasInputs";
import * as Yup from "yup";
import { fetchCitiesByState, fetchStates } from "../../../services/ibgeService";
import DateInput from "../../atividades_limpeza/utils/DataInput";
import axios from "axios";
import toast from "react-hot-toast";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";

const ModalEditInfoProdutor = ({
  produtorId,
  isOpen,
  onClose,
  onProdutorAtualizado
}) => {
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);

  const parseDateString = (dateStr) => {
    if (!dateStr) return null;
    const [day, month, year] = dateStr.split("/");
    return new Date(`${year}-${month}-${day}`);
  };

  const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date);
  };

  const isAdult = (birthDate) => {
    const today = new Date();
    const birthDateObj = parseDateString(birthDate);
    if (!isValidDate(birthDateObj)) return false;

    const age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      return age - 1 >= 18;
    }
    return age >= 18;
  };

  const [initialValues, setInitialValues] = useState({
    nomeCompleto: "",
    sexo: "",
    dataNascimento: "",
    telefone: "",
    fidelizacao: "",
    endereco: "",
    uf: "",
    nomeMunicipio: "",
    nomeRegional: "",
  });

  useEffect(() => {
    const fetchEstados = async () => {
      const estados = await fetchStates();
      setEstados(estados);
    };
    fetchEstados();
  }, []);

  const formikRef = useRef();

  useEffect(() => {
    const loadCities = async () => {
      if (initialValues.uf) {
        const cidadesFetch = await fetchCitiesByState(initialValues.uf);
        setCidades(cidadesFetch);

        // Atualiza o Formik com os valores iniciais
        if (formikRef.current) {
          formikRef.current.setValues({
            ...initialValues,
            nomeMunicipio: initialValues.nomeMunicipio,
            nomeRegional: initialValues.nomeRegional,
          });
        }
      }
    };

    if (isOpen && initialValues.uf) {
      loadCities();
    }
  }, [initialValues.uf, isOpen]);

  useEffect(() => {
    if (!produtorId || !isOpen) return;

    const fetchProdutor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/produtores/${produtorId}`
        );

        const data = response.data;
        console.log("Dados recebidos:", data);

        setInitialValues({
          ...data,
          nomeCompleto: data.nomeCompleto || "",
          sexo: data.sexo || "",
          dataNascimento: data.dataNascimento || "",
          telefone: data.telefone || "",
          fidelizacao: data.fidelizacao || "",
          endereco: data.endereco || "",
          uf: data.uf || "",
          nomeMunicipio: data.nomeMunicipio || "",
          nomeRegional: data.nomeRegional || "",
        });

        // Carrega cidades se tiver UF
        if (data.uf) {
          const cidadesFetch = await fetchCitiesByState(data.uf);
          setCidades(cidadesFetch);
          console.log("Cidades carregadas:", cidadesFetch);
        }
      } catch (err) {
        console.error(err);
        toast.error("Erro ao carregar dados do produtor");
      }
    };

    fetchProdutor();
  }, [produtorId, isOpen]);

  const validationSchema = Yup.object({
    nomeCompleto: Yup.string()
      .required("Nome é obrigatório")
      .matches(/^[A-Za-zÀ-ú\s]+$/, "O nome deve conter apenas letras")
      .test(
        "no-trailing-spaces",
        "Nome completo não pode ter espaços no início ou fim",
        (value) => {
          return value ? value.trim() === value : true;
        }
      )
      .min(2, "O nome deve ter pelo menos 2 letras"),
    sexo: Yup.string().required("Sexo é obrigatório"),
    dataNascimento: Yup.string()
      .required("Data de nascimento é obrigatória")
      .test("formato-data", "Formato inválido (use DD/MM/AAAA)", (value) => {
        return /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(value);
      })
      .test("data-valida", "Data inválida", (value) => {
        const date = parseDateString(value);
        return isValidDate(date);
      })
      .test("data-futura", "Data não pode ser no futuro", (value) => {
        const date = parseDateString(value);
        return date <= new Date();
      })
      .test("maioridade", "Produtor não pode ser menor de idade", (value) => {
        return isAdult(value);
      }),
    telefone: Yup.string()
      .required("Telefone é obrigatório")
      .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Telefone inválido"),
    fidelizacao: Yup.string()
      .required("Data de fidelização é obrigatória")
      .test("formato-data", "Formato inválido (use DD/MM/AAAA)", (value) => {
        return /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(value);
      })
      .test("data-valida", "Data inválida", (value) => {
        const date = parseDateString(value);
        return isValidDate(date);
      })
      .test("data-futura", "Data não pode ser no futuro", (value) => {
        const date = parseDateString(value);
        return date <= new Date();
      })
      .test(
        "ano-compativel",
        "Ano de fidelização não pode ser anterior ao de nascimento",
        function (value) {
          const fidelizacaoDate = parseDateString(value);
          const nascimentoDate = parseDateString(this.parent.dataNascimento);
          return fidelizacaoDate >= nascimentoDate;
        }
      )
      .test(
        "maioridade-fidelizacao",
        "Produtor não tinha 18 anos na data de fidelização",
        function (value) {
          const fidelizacaoDate = parseDateString(value);
          const nascimentoDate = parseDateString(this.parent.dataNascimento);

          if (!isValidDate(fidelizacaoDate) || !isValidDate(nascimentoDate)) {
            return false;
          }

          const ageAtFidelizacao =
            fidelizacaoDate.getFullYear() - nascimentoDate.getFullYear();
          const monthDiff =
            fidelizacaoDate.getMonth() - nascimentoDate.getMonth();

          if (
            monthDiff < 0 ||
            (monthDiff === 0 &&
              fidelizacaoDate.getDate() < nascimentoDate.getDate())
          ) {
            return ageAtFidelizacao - 1 >= 18;
          }
          return ageAtFidelizacao >= 18;
        }
      ),
    endereco: Yup.string()
      .required("Endereço é obrigatório")
      .matches(/^[A-Za-zÀ-ú\s]+$/, "O endereço deve conter apenas letras")
      .test(
        "no-trailing-spaces",
        "Endereço não pode ter espaços no início ou fim",
        (value) => {
          return value ? value.trim() === value : true;
        }
      )
      .min(2, "O nome deve ter pelo menos 2 letras"),
    uf: Yup.string().required("Estado é obrigatório"),
    nomeMunicipio: Yup.string().required("Município é obrigatório"),
    nomeRegional: Yup.string().required("Regional é obrigatório"),
  });

  const handleTelefoneChange = (e, setFieldValue) => {
    const formattedValue = maskTelefone(e.target.value);
    setFieldValue("telefone", formattedValue);
  };

  const handleSubmitUpdate = async (values) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/produtores/${produtorId}`,
        values
      );

      console.log(response.data);
      toast.success("Os dados do produtor foram atualizados com sucesso!", {
        style: {
          padding: "16px",
          color: "#FFFFFF",
          background: "#1a7431",
        },
        iconTheme: {
          primary: "#FFFFFF",
          secondary: "#3a5a40",
        },
      });
      onClose();
      onProdutorAtualizado(response.data);
    } catch (err) {
      toast.error("Erro ao tentar atualizar os dados do produtor", {
        style: {
          padding: "20px",
          color: "#FFFFFF",
          background: "#bf0603",
        },
        iconTheme: {
          primary: "#FFFFFF",
          secondary: "#f4acb7",
        },
      });
      console.error(err);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
        <DialogPanel className="w-full max-w-4xl rounded bg-white p-6">
          <DialogTitle className="text-xl font-bold mb-4 border-b-2 border-[#FF6B00]">
            Produtor(a): {initialValues.nomeCompleto}
          </DialogTitle>

          <Formik
            innerRef={formikRef}
            initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={handleSubmitUpdate}
          >
            {({ setFieldValue }) => (
              <Form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Nome Completo */}
                <div>
                  <label
                    htmlFor="nomeCompleto"
                    className="block text-sm font-medium text-black"
                  >
                    Nome completo*
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
                    htmlFor="sexo"
                    className="block text-sm font-medium text-black"
                  >
                    Sexo*
                  </label>
                  <Field
                    as="select"
                    name="sexo"
                    className="mt-1 block w-full border border-black rounded-md shadow-sm py-2.5 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                  >
                    <option value="">Selecione</option>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                  </Field>
                  <ErrorMessage
                    name="sexo"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Data de Nascimento*
                  </label>
                  <Field name="dataNascimento" component={DateInput} />
                  <ErrorMessage
                    name="dataNascimento"
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
                    maxLength="15"
                  />
                  <ErrorMessage
                    name="telefone"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="">
                  <label
                    htmlFor="fidelizacao"
                    className="block text-sm font-medium text-black mb-1"
                  >
                    Fidelização*
                  </label>
                  <Field name="fidelizacao" component={DateInput} />
                  <ErrorMessage
                    name="fidelizacao"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* Endereço */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="endereco"
                    className="block text-sm font-medium text-black"
                  >
                    Endereço*
                  </label>
                  <Field
                    name="endereco"
                    type="text"
                    className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                  />
                  <ErrorMessage
                    name="endereco"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* Estado */}
                <div>
                  <label
                    htmlFor="uf"
                    className="block text-sm font-medium text-black"
                  >
                    Estado*
                  </label>
                  <Field
                    as="select"
                    name="uf"
                    className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                    onChange={async (e) => {
                      const sigla = e.target.value;
                      setFieldValue("uf", sigla);
                      setFieldValue("nomeMunicipio", "");
                      if (sigla) {
                        const cidades = await fetchCitiesByState(sigla);
                        setCidades(cidades);
                      } else {
                        setCidades([]);
                      }
                    }}
                  >
                    <option value="">Selecione o estado</option>
                    {estados.map((estado) => (
                      <option key={estado.sigla} value={estado.sigla}>
                        {estado.nome} ({estado.sigla})
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="uf"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="nomeMunicipio"
                    className="block text-sm font-medium text-black"
                  >
                    Cidade*
                  </label>
                  <Field
                    as="select"
                    name="nomeMunicipio"
                    className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                  >
                    <option value="">Selecione a cidade</option>
                    {cidades.map((cidade) => (
                      <option key={cidade.nome} value={cidade.nome}>
                        {cidade.nome}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="nomeMunicipio"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* Regional */}
                <div>
                  <label
                    htmlFor="nomeRegional"
                    className="block text-sm font-medium text-black"
                  >
                    Regional*
                  </label>
                  <Field
                    as="select"
                    name="nomeRegional"
                    className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                  >
                    <option value="">Selecione a regional</option>
                    {cidades.map((cidade) => (
                      <option key={cidade.nome} value={cidade.nome}>
                        {cidade.nome}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="nomeRegional"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="col-span-full w-full flex justify-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-[#495057] text-[#FFFFFF] px-2 py-2 rounded-sm font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-[#000000] text-[#FFFFFF] px-2 py-2 rounded-sm font-medium"
                  >
                    Atualizar
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

export default ModalEditInfoProdutor;
