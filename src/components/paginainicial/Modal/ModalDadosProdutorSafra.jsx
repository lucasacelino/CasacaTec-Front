import { Dialog, DialogPanel } from "@headlessui/react";
import React from "react";

const ModalDadosProdutorSafra = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="rounded-xl w-full max-w-[60vw] max-h-[90vh] flex flex-col bg-white border border-gray-200 shadow-lg">
          <div className="flex justify-between sticky top-0 border-b-2 border-[#ff6600]">
            <h2>Safra</h2>
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

          <div className="flex-1 overflow-y-auto px-2 py-2"></div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ModalDadosProdutorSafra;
