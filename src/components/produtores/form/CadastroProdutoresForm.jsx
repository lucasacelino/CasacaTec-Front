import React, { useEffect, useState } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { maskCPF, maskTelefone } from "../utils/mascarasInputs";
import { SuccessDialog } from "../Modal/SuccessDialog";
import { fetchCitiesByState, fetchStates } from "../../../services/ibgeService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { differenceInYears } from "date-fns";
import axios from "axios";

const CadastroProdutoresForm = () => {
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEstados = async () => {
      const estados = await fetchStates();
      setEstados(estados);
    };
    fetchEstados();
  }, []);

  const initialValues = {
    nomeCompleto: "",
    cpf: "",
    sexo: "",
    dataNascimento: "",
    telefone: "",
    fidelizacao: "",
    endereco: "",
    uf: "",
    nomeMunicipio: "",
    nomeRegional: "",
  };

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
    cpf: Yup.string()
      .required("CPF é obrigatório")
      .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
    sexo: Yup.string().required("Sexo é obrigatório"),
    dataNascimento: Yup.date()
      .required("Data de nascimento é obrigatória")
      .max(new Date(), "Data não pode ser no futuro")
      .test(
        "Produtor menor de idade",
        "Produtor não pode ser menor de idade",
        (idade) => {
          const dataNascimento = idade;
          const dataAtual = new Date();
          const diferencaAnos = differenceInYears(dataAtual, dataNascimento);
          return diferencaAnos >= 18;
        }
      )
      .test("ano-valido", "Ano inválido", (value) => {
        const ano = value.getFullYear();
        const anoString = value.getFullYear().toString();
        const anoAtual = new Date().getFullYear();
        return anoString.length === 4 && ano > 1920 && ano <= anoAtual;
      }),
    telefone: Yup.string()
      .required("Telefone é obrigatório")
      .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Telefone inválido"),
    fidelizacao: Yup.date()
      .required("Data de fidelização é obrigatório")
      .max(new Date(), "Data não pode ser no futuro")
      .test("ano-valido", "Ano inválido", (value) => {
        const ano = value.getFullYear();
        const anoString = value.getFullYear().toString();
        const anoAtual = new Date().getFullYear();
        return anoString.length === 4 && ano > 1920 && ano <= anoAtual;
      })
      .test(
        "x",
        "O ano de fidelização é incompatível com a data de nascimento",
        function (value) {
          const anoFidelizacao = new Date(value).getFullYear();
          const dataNascimento = new Date(
            this.parent.dataNascimento
          ).getFullYear();
          return anoFidelizacao >= dataNascimento;
        }
      )
      .test(
        "ano incompatível",
        "Maioridade não atingida no ano de fidelização",
        function (value) {
          const anoFidelizacao = new Date(value).getFullYear();
          const dataNascimento = this.parent.dataNascimento;
          const anoNascimento = new Date(dataNascimento).getFullYear();
          const diferencaAnos = anoFidelizacao - anoNascimento;
          return diferencaAnos >= 18;
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
    nomeMunicipio: Yup.string().required("Cidade é obrigatório"),
  });

  const handleCPFChange = (e, setFieldValue) => {
    const formattedValue = maskCPF(e.target.value);
    setFieldValue("cpf", formattedValue);
  };

  const handleTelefoneChange = (e, setFieldValue) => {
    const formattedValue = maskTelefone(e.target.value);
    setFieldValue("telefone", formattedValue);
  };

  const handleSubmit = async (values, { resetForm }) => {
    const [anoNasc, mesNasc, diaNasc] = values.dataNascimento.split("-");

    const dataNascFormatada = `${diaNasc}/${mesNasc}/${anoNasc}`;

    const [ano, mes, dia] = values.fidelizacao.split("-");
    const dte = `${dia}/${mes}/${ano}`;

    const dadosEnvio = {
      nomeCompleto: values.nomeCompleto,
      cpf: values.cpf,
      sexo: values.sexo,
      dataNascimento: dataNascFormatada,
      telefone: values.telefone,
      fidelizacao: dte,
      endereco: values.endereco,
      nomeMunicipio: values.nomeMunicipio,
      uf: values.uf,
      nomeRegional: values.nomeRegional,
    };

    console.log("Dados que serão enviados:", dadosEnvio);

    try {
      const response = await axios.post(
        "http://localhost:3000/produtores",
        dadosEnvio
      );
      console.log("Produtor cadastrado com sucesso!");
      resetForm();
      setOpenDialog(true);
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        console.error("Erro do backend:", error.response.data);
        toast.error(`Erro: ${error.response.data.message}`);
      } else {
        console.error("Erro na requisição:", error.message);
        toast.error("Falha na conexão com o servidor");
      }
    }
  };

  return (
    <div className="w-full bg-white">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, isSubmitting }) => (
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

              {/* CPF */}
              <div>
                <label
                  htmlFor="cpf"
                  className="block text-sm font-medium text-black"
                >
                  CPF*
                </label>
                <Field
                  name="cpf"
                  type="text"
                  className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                  onChange={(e) => handleCPFChange(e, setFieldValue)}
                  maxLength="14"
                />
                <ErrorMessage
                  name="cpf"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Sexo */}
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
                  className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
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

              {/* Data de Nascimento */}
              <div>
                <label
                  htmlFor="dataNascimento"
                  className="block text-sm font-medium text-black"
                >
                  Data de Nascimento*
                </label>
                <Field
                  name="dataNascimento"
                  type="date"
                  className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                />
                <ErrorMessage
                  name="dataNascimento"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Telefone */}
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

              {/* Fidelização */}
              <div>
                <label
                  htmlFor="fidelizacao"
                  className="block text-sm font-medium text-black"
                >
                  Fidelização*
                </label>
                <Field
                  name="fidelizacao"
                  type="date"
                  className="mt-1 block w-full border border-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                />
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

              {/* Cidade */}
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

              <div className="col-span-full flex justify-end gap-2 t-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-white bg-[#4a5059]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#000000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B00] disabled:opacity-50"
                >
                  {isSubmitting ? "Cadastrando..." : "Cadastrar Produtor"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <SuccessDialog isOpen={openDialog} onClose={() => setOpenDialog(false)} />
    </div>
  );
};

export default CadastroProdutoresForm;
