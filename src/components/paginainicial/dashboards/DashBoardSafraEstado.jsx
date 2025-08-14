const DashBoardSafraEstado = ({ estado }) => {
  return (
    <div className="flex gap-3">
      <div className="flex items-center flex-col border border-[#fa5c00] px-4 py-1 rounded-sm">
        <span>Total produtores</span>
        <span className="text-lg font-bold">82</span>
      </div>

      <div className="flex items-center flex-col border border-[#fa5c00] px-4 py-1 rounded-sm">
        <span className="font-medium">Total produtores</span>
        <span className="text-lg font-bold">82</span>
      </div>

      <div className="flex items-center flex-col border border-[#fa5c00] px-4 py-1 rounded-sm">
        <span>Total produtores</span>
        <span className="text-xl font-bold">82</span>
      </div>

      <div className="flex items-center flex-col rounded-sm border border-[#fa5c00] bg-[#f6f4f1] px-4 py-1">
        <span>Total produtores</span>
        <span className="text-lg font-bold">82</span>
      </div>
    </div>
  );
};

export default DashBoardSafraEstado;
