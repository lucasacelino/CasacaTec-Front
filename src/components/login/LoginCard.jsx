// import { FcGoogle } from "react-icons/fc";
// import { useAuth } from "../../auth/FirebaseGoogleAuth/hooks/useAuth";
// import { useNavigate } from "react-router-dom";
// import loginImage from "../../assets/lg-rm.png";
// import logoIcc from "../../assets/logo-icc.avif";
// import logocasacatec from "../../assets/lg-cts.png";

// const LoginCard = () => {
//   const { loginWithGoogle } = useAuth();
//   const navigate = useNavigate();

//   const handleLoginGoogle = async () => {
//     await loginWithGoogle();
//     navigate("/");
//   };

//   return (
//     <div className="flex h-screen">

//       <div className="w-1/2 b-[#e9ecef] flex flex-col items-center justify-center border-r border-[#ced4da] shadow-lg">
//         {/* <img src={logoIcc} />
//         <img src={logocasacatec} /> */}

//         <div className="flex gap-2 fixed top-0 mt-3">
//           <img src={logoIcc} className="border-r-2 border-[#000000]"/>
//           <img src={logocasacatec} />
//         </div>

//         <div className="border border-[##445661] p-6 rounded-lg bg-white shadow-md">
//           <h1 className="text-3xl font-bold mb-1 text-center">Login</h1>
//           <p className="text-black mb-3 text-2x font-medium">
//             Use sua conta do Google para acessar o sistema
//           </p>

//           <div className="p-4 w-full max-w-xs">
//             <button
//               className="flex items-center justify-center w-full py-2 px-4 border border-black-100 rounded text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
//               onClick={handleLoginGoogle}
//             >
//               <FcGoogle className="text-lg mr-2" />
//               Logar com o Google
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="w-1/2 bg-gradient-to-r from-[#070807] to-[#f35b04] text-white flex flex-col items-center justify-center px-8">
//         <img
//           src={loginImage}
//           alt="Logo CasacaTec"
//           className="max-w-[80%] h-auto object-contain mb-6"
//         />
//         <p className="text-xl font-bold text-center">
//           Sistema de controle e gestão de produção
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginCard;

import { FcGoogle } from "react-icons/fc";
// import { useAuth } from "../../auth/hooks/useAuth"; // Atualizado o caminho
import { useAuth } from "../../auth/FirebaseGoogleAuth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import loginImage from "../../assets/lg-rm.png";
import logoIcc from "../../assets/logo-icc.avif";
import logocasacatec from "../../assets/lg-cts.png";

const LoginCard = () => {
  const { loginWithGoogle, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirecionar automaticamente quando o usuário fizer login
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate("/");
    }
  }, [isAuthenticated, user, navigate]);

  const handleLoginGoogle = () => {
    loginWithGoogle();
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 b-[#e9ecef] flex flex-col items-center justify-center border-r border-[#ced4da] shadow-lg">
        <div className="fixed top-0 mt-3">
          <div className="flex items-center gap-2">
            <img src={logoIcc} />
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 14 14"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 7H.5m3-3l-3 3l3 3m7-6l3 3l-3 3"
                />
              </svg>
            </div>
            <img src={logocasacatec} />
          </div>

          {/* <span className="text-center text-base font-medium">Um sistema da cooperativa Instituto Casaca de Couro</span> */}
        </div>

        <div className="border border-[##445661] p-6 rounded-lg bg-white shadow-md">
          <h1 className="text-3xl font-bold mb-1 text-center">Login</h1>
          <p className="text-black mb-3 text-2x font-medium">
            Use sua conta do Google para acessar o sistema
          </p>

          <div className="p-4 w-full max-w-xs">
            <button
              className="flex items-center justify-center w-full py-2 px-4 border border-black-100 rounded text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-colors"
              onClick={handleLoginGoogle}
              disabled={isAuthenticated}
            >
              <FcGoogle className="text-lg mr-2" />
              {isAuthenticated ? "Logando..." : "Logar com o Google"}
            </button>
          </div>
        </div>
      </div>

      <div className="w-1/2 bg-gradient-to-r from-[#070807] to-[#f35b04] text-white flex flex-col items-center justify-center px-8">
        <img
          src={loginImage}
          alt="Logo CasacaTec"
          className="max-w-[80%] h-auto object-contain mb-6"
        />
        <p className="text-xl font-bold text-center">
          Sistema de controle e gestão de produção
        </p>
      </div>
    </div>
  );
};

export default LoginCard;
