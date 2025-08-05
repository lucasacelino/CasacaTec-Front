import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import axios from "axios";
import toast from "react-hot-toast";

const ModalExcluirProducao = ({ producaoId, isOpen, onClose, onSuccesRemove }) => {
  const handleExcluirProducao = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/producao/${producaoId}`
      );
      console.log("Produtor excluido!", response);
      onClose();
      onSuccesRemove();
    //   onSuccess();
      toast.success("Nota fiscal excluída com sucesso!", {
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
    } catch (err) {
      toast.error("Erro ao excluir produtor", {
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
        <DialogPanel className="border w-full max-w-md rounded-xl bg-[#fefae0] p-6 backdrop-blur-2xl duration-100 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0">
          <DialogTitle className="text-xl font-bold mb-4">
            Tem certeza que deseja excluir a nota fiscal?
          </DialogTitle>

          <div className="w-full flex items-center justify-center gap-2">
            <button
              onClick={onClose}
              className="bg-[#495057] text-[#FFFFFF] px-3 py-2 font-medium rounded-sm"
            >
              Não
            </button>
            <button
              onClick={handleExcluirProducao}
              className="bg-[#000000] text-[#FFFFFF] px-3 py-2 font-medium rounded-sm"
            >
              Sim
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ModalExcluirProducao;
