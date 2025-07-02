const CardItem = ({ titulo, valor }) => {
  return (
    <div className="px-6 py-3 rounded-sm mt-2 border bg-[#FFA94B]">
      <p className="text-lg font-semibold">{titulo}</p>
      <p className="text-xl font-bold text-center">{valor}</p>
    </div>
  );
};

export default CardItem;
