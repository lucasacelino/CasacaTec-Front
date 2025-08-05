import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEffect, useState } from "react";
import CadastroNotaFiscalForm from "../Form/CadastroNotaFiscalForm";
import CardInfoNota from "../Card/CardInfoNota";
import axios from "axios";

function NotaFiscalProdutorModalPage({ produtorId, isOpen, onClose }) {
  const [isOpenCadNota, setIsOpenCadNota] = useState(false);
  const [dadosProdutor, setDadosProdutor] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleNotaCadastrada = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    const responseDadosProdutor = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/produtores/${produtorId}`);
        setDadosProdutor(response.data.nomeCompleto);
      } catch (error) {
        console.error(error)
      }
    };

    responseDadosProdutor();
  }, [produtorId]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="rounded-xl w-full max-w-[60vw] max-h-[90vh] flex flex-col bg-white border border-gray-200 shadow-lg">

          <div className="flex justify-between sticky top-0 border-b-2 border-[#ff6600]">
            <h1 className="p-2 text-xl font-bold">Notas Fiscais - {dadosProdutor}</h1>

            <button onClick={onClose} className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M10 8.586L2.929 1.515L1.515 2.929L8.586 10l-7.071 7.071l1.414 1.414L10 11.414l7.071 7.071l1.414-1.414L11.414 10l7.071-7.071l-1.414-1.414z"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-2 py-2">
            <div className="w-full flex items-center justify-center">
              <button
                onClick={() => setIsOpenCadNota(true)}
                className="flex items-center bg-[#000000] p-2 mt-2 rounded-sm gap-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#FFFFFF"
                    d="M3 3v19l3-2l3 2l3-2l1.3.86c-.2-.58-.3-1.21-.3-1.86a6.005 6.005 0 0 1 8-5.66V3zm14 4v2H7V7zm-2 4v2H7v-2zm3 4v3h-3v2h3v3h2v-3h3v-2h-3v-3z"
                  />
                </svg>
                <p className="text-[#FFFFFF]">Cadastrar nota fiscal</p>
              </button>
            </div>

            {isOpenCadNota && (
              <div className="border border-[#99b0aa] my-2 rounded-sm px-2 py-2">
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsOpenCadNota(false)}
                    className="ml-auto"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="-2 -2 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="m11.414 10l2.829-2.828a1 1 0 1 0-1.415-1.415L10 8.586L7.172 5.757a1 1 0 0 0-1.415 1.415L8.586 10l-2.829 2.828a1 1 0 0 0 1.415 1.415L10 11.414l2.828 2.829a1 1 0 0 0 1.415-1.415zM10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10s-4.477 10-10 10"
                      />
                    </svg>
                  </button>
                </div>

                <CadastroNotaFiscalForm
                  produtorId={produtorId}
                  onClose={() => setIsOpenCadNota(false)}
                  onSuccess={handleNotaCadastrada}
                />
              </div>
            )}

            <CardInfoNota key={refreshKey} produtorId={produtorId} />
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default NotaFiscalProdutorModalPage;
