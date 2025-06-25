import LoginCard from "../components/login/CardLogin";
import HeaderLogin from "../components/login/HeaderLogin";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderLogin />
      <LoginCard />
    </div>
  );
};

export default LoginPage;