import { useEffect } from 'react';

export function SuccessDialog({ isOpen, onClose }) {
  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setTimeout(() => {
        onClose();
      }, 2000); 
    }
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/30" onClick={onClose}></div>
      
      <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            Cadastro concluído!
          </h3>
          <div className="mt-2">
            <p className="text-sm text-black-500">
              O cadastro do produtor foi efetuado com sucesso.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
