import LoginCard from "../../components/login/LoginCard";
import HeaderLogin from "../../components/login/HeaderLogin";
// import HeaderLogin from "../../components/login/Header/HeaderLogin";


const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderLogin />
      <LoginCard />
    </div>
  );
};

export default LoginPage;