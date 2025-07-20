import { Icon } from "@iconify/react";

const CardItem = ({ titulo, valor, icon }) => {
  return (
    <div className="px-3 py-3 rounded-sm mt-2 border bg-[#f9f1f1 ] shadow-lg">
      <div className="flex items-center gap-x-2">
        <p className="text-lg font-semibold text-[#000000]">{titulo}</p>
        <img src={icon} />
      </div>
      <p className="text-xl font-bold text-center text-[#000000]">{valor}</p>
    </div>
  );
};

export default CardItem;
