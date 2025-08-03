import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../auth/FirebaseGoogleAuth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import loginImage from "../../assets/lg-rm.png";

const LoginCard = () => {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleLoginGoogle = async () => {
    await loginWithGoogle();
    navigate("/");
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 b-[#e9ecef] flex flex-col items-center justify-center border-r border-[#ced4da] shadow-lg">
        <div className="border border-[#ced4da] p-6 rounded-lg bg-white shadow-md">
          <h1 className="text-3xl font-bold mb-1 text-center">Login</h1>
          <p className="text-black-600 mb-3 text-2x">
            Use sua conta do Google para acessar o sistema
          </p>

          <div className="p-4 w-full max-w-xs">
            <button
              className="flex items-center justify-center w-full py-2 px-4 border border-black-100 rounded text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              onClick={handleLoginGoogle}
            >
              <FcGoogle className="text-lg mr-2" />
              Logar com o Google
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
