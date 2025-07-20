import logo from "../../assets/lg-c.png"
import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/FirebaseGoogleAuth/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const HeaderLogin = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="bg-[#F9F8F4] border-b-2 border-[#FF6B00] py-2 px-2 sticky top-0 z-50 h-16">
      <div className="ml-3 flex items-center justify-between h-full">
        <NavLink to="/">
          <div className="flex items-center">
            <img
              src={logo}
              alt="Logo Instituto Casaca Couro"
              className="h-[60px] w-auto"
            />
            <h1 className="text-[#000000] text-lg font-bold pb-3">
              CasacaTec
            </h1>
          </div>
        </NavLink>

        <div className="flex-1 flex flex-col items-center justify-center mx-4">
          <h2 className="ml-10 text-lg font-bold text-center whitespace-nowrap pb-3">
            Sistema de gestão e controle de produção de algodão - CasacaTec
          </h2>
        </div>

        {user ? (
          <div className="flex items-center">
            <div className="flex flex-col">
              <p className="font-medium text-right whitespace-nowrap mr-2">
                {user.displayName}
              </p>
              <p className="font-medium text-xs mr-2">{user.email}</p>
            </div>

            <img
              src={user.photoURL}
              className="w-8 h-8 rounded-full mr-2 border"
              alt="User avatar"
            />
            <button
              className="mr-4 text-[#FFFFFF] bg-[#000000] flex items-center px-2 py-1 rounded-md"
              onClick={handleLogout}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="22"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"
                />
              </svg>
              sair
            </button>
          </div>
        ) : (
          <div className="w-8 h-8"></div>
        )}
      </div>
    </header>
  );
};

export default HeaderLogin;
