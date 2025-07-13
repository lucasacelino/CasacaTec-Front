import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../auth/FirebaseGoogleAuth/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginCard = () => {

  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleLoginGoogle = async () => {
    await loginWithGoogle();
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center p-10 mt-2">
      <div className="text-center mb-2">
        <h1 className="text-3xl font-bold mb-1">Login</h1>
        <p className="text-black-600 mb-3 text-2x">
          Use sua conta do Google para acessar o sistema
        </p>
      </div>

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
  );
};

export default LoginCard;
