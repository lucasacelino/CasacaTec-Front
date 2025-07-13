import React, { useEffect, useState } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";

import { maskCPF, maskTelefone } from "../utils/mascarasInputs";
// import { SucessDialog } from "../Modal/SucessDialog";
import { SuccessDialog } from "../Modal/SuccessDialog";
import { fetchCitiesByState, fetchStates } from "../../../services/ibgeService";
import toast from "react-hot-toast";
import { differenceInYears } from "date-fns";

const CadastroProdutoresForm = () => {
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const loadStates = async () => {
      const estados = await fetchStates();
      setEstados(estados);
    };
    loadStates();
  }, []);

  const initialValues = {
    nome: "",
    cpf: "",
    sexo: "",
    data_nascimento: "",
    telefone: "",
    fidelizacao: "",
    endereco: "",
    estado: "",
    cidade: "",
    regionnal: ""
  };

  const validationSchema = Yup.object({
    nome: Yup.string()
      .required("Nome é obrigatório")
      .matches(/^[A-Za-zÀ-ú\s]+$/, "O nome deve conter apenas letras")
      .min(2, "O nome deve ter pelo menos 2 letras"),
    cpf: Yup.string()
      .required("CPF é obrigatório")
      .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
    sexo: Yup.string().required("Sexo é obrigatório"),
    data_nascimento: Yup.date()
      .required("Data de nascimento é obrigatória")
      .max(new Date(), "Data não pode ser no futuro")
      .test("Produtor menor de idade", "Produtor não pode ser menor de idade", (idade) => {
        const dataNascimento = idade;
        const dataAtual = new Date();
        const diferencaAnos = differenceInYears(dataAtual, dataNascimento);
        return diferencaAnos >= 18;
      })
      .test("ano-valido", "Ano inválido", (value) => {
        const ano = value.getFullYear();
        const anoString = value.getFullYear().toString();
        const anoAtual = new Date().getFullYear();
        return anoString.length === 4 && ano > 1920 && ano <= anoAtual;
      }),
    telefone: Yup.string()
      .required("Telefone é obrigatório")
      .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Telefone inválido"),
    fidelizacao: Yup.string()
      .matches(/^\d{4}$/, "O ano deve ter 4 dígitos")
      .test("ano-valido", "Ano não pode ser no futuro", function (value) {
        const ano = parseInt(value, 10);
        return ano <= new Date().getFullYear();
      })
      .test("ano incompatível", "O ano de fidelização é incompatível com a data de nascimento", function (ano) {
        const anoFidelizacao = parseInt(ano, 10);
        const dataNascimento = this.parent.data_nascimento;
        return anoFidelizacao > new Date(dataNascimento).getFullYear();
      })
      .test("Ano incomapátivel", "Maioridade não atingida no ano de fidelização", function (value) {
        const anoFidelizacao = parseInt(value, 10);
        const dataNascimento = this.parent.data_nascimento;
        const anoNascimento = new Date(dataNascimento).getFullYear()
        const diferencaAnos = anoFidelizacao - anoNascimento;
        return diferencaAnos >= 18;
        
      })
      .required("Ano de fidelização é obrigatório"),
    endereco: Yup.string().required("Endereço é obrigatório").matches(/^[A-Za-zÀ-ú\s]+$/, "O nome deve conter apenas letras")
    .min(2, "O nome deve ter pelo menos 2 letras"),
    estado: Yup.string().required("Estado é obrigatório"),
    cidade: Yup.string().required("Cidade é obrigatório"),
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
    const dadosEnvio = {
      nome: values.nome,
      cpf: values.cpf,
      sexo: values.sexo,
      data_nascimento: values.data_nascimento,
      telefone: values.telefone,
      fidelizacao: values.fidelizacao,
      endereco: values.endereco,
      estado: values.estado,
      cidade: values.cidade,
      regional: values.regional
    };

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
      toast.error("Erro ao Cadastrar produtor");
      console.log("error", error);
    }
  };

  return (
    <div className="w-full bg-[#FFFFFF] border-t-4 border-[#FFB059] pt-2">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="flex flex-wrap gap-x-6 gap-y-4">

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

            <div>
              <label htmlFor="cpf" className="block text-black font-semibold">
                CPF*
              </label>
              <Field
                name="cpf"
                type="text"
                className="w-[160px] border border-black-500 rounded-md pl-1 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleCPFChange(e, setFieldValue)}
                maxLength="14" // 000.000.000-00
              />
              <ErrorMessage
                name="cpf"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="sexo"
                className="block text-black font-semibold"
              >
                Sexo*
              </label>
              <Field
                as="select"
                name="sexo"
                className="border border-black-300 rounded-md pl-4 py-2.5 bg-white text-black"
              >
                <option value="">Selecione a cidade</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
              </Field>
              <ErrorMessage
                name="sexo"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="data_nascimento"
                className="block text-black font-semibold"
              >
                Data de Nascimento*
              </label>
              <Field
                name="data_nascimento"
                type="date"
                className="w-[160px] border border-black-500 rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                // onChange={(e) => handleDataChange(e, setFieldValue)}
              />
              <ErrorMessage
                name="data_nascimento"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

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
                className="w-[160px] border border-black-500 rounded-md pl-1 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleTelefoneChange(e, setFieldValue)}
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
                onChange={async (e) => {
                  const sigla = e.target.value;
                  setFieldValue("estado", sigla);
                  setFieldValue("cidade", ""); // Reseta a cidade ao mudar o estado

                  // Carrega cidades do estado selecionado
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
                name="estado"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="cidade"
                className="block text-black font-semibold"
              >
                Cidade*
              </label>
              <Field
                as="select"
                name="cidade"
                className="border border-black-500 rounded-md pl-4 py-2.5 bg-white text-black"
                // disabled={!values.estado}
              >
                <option value="">Selecione a cidade</option>
                {cidades.map((cidade) => (
                  <option key={cidade.nome} value={cidade.nome}>
                    {cidade.nome}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="cidade"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="regional"
                className="block text-black font-semibold"
              >
                Regional*
              </label>
              <Field
                as="select"
                name="regional"
                className="border border-black-500 rounded-md pl-4 py-2.5 bg-white text-black"
                // disabled={!values.estado}
              >
                <option value="">Selecione a regional</option>
                {cidades.map((cidade) => (
                  <option key={cidade.nome} value={cidade.nome}>
                    {cidade.nome}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="regional"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="w-full flex justify-center gap-4 mt-6">
              <button
                type="submit"
                className="bg-[#000000] text-[#FFFFFF] px-4 py-3 rounded-sm font-medium"
              >
                Cadastrar Produtor
              </button>
              <button
                type="button"
                className="bg-[#c1121f] text-[#FFFFFF] px-4 py-3 rounded-sm font-medium"
              >
                Cancelar
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <SuccessDialog isOpen={openDialog} onClose={() => setOpenDialog(false)} />
    </div>
  );
};

export default CadastroProdutoresForm;
