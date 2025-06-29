import logo from '../../assets/logo_ICC.avif';

const HeaderLogin = () => {
    return (
      // bg-[#F9BF80] border-b-3 border-[#000000] py-4 px-6 relative - conteúdo anterior
    <header className="bg-[#F9BF80] border-b-2 border-[#000000] py-2 px-2 sticky top-0 z-50 h-16">
      <div className="flex items-center">
        <img 
          src={logo} 
          alt="Logo Instituto Casaca Couro" 
          className="h-12 mr-4"
        />
        <h1 className="text-[#000000] text-l font-bold">Instituto Casaca de Couro</h1>
      </div>

      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h2 className="text-lg font-semibold whitespace-nowrap">
          Sistema de gestão e controle de produção de algodão - CasacaTec
        </h2>
      </div>
    </header>
  );
}

export default HeaderLogin;