import React from "react";
import { FcGoogle } from "react-icons/fc"; // Ícone do Google

const LoginCard = () => {
  const handleGoogleLogin = () => {
    // Adicione aqui a lógica de autenticação com Google
    console.log("Login com Google clicado");
  };

  return (
    <div className="flex flex-col items-center p-10 mt-2">
      {" "}
      <div className="text-center mb-2">
        <h1 className="text-3xl font-bold mb-1">Login</h1>{" "}
        {/* Título um pouco menor */}
        <p className="text-black-600 mb-3 text-xs sm:text-sm">
          Use sua conta do Google para acessar o sistema
        </p>
      </div>

      <div className="p-4 w-full max-w-xs">
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full py-2 px-4 border border-black-300 rounded text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black-500 transition-colors"
        >
          <FcGoogle className="text-lg mr-2" />
          Logar com o Google
        </button>
      </div>
    </div>
  );
};

export default LoginCard;
