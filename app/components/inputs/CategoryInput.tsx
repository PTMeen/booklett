import { IconType } from "react-icons/lib";

interface Props {
  label: string;
  icon: IconType;
  onClick: (id: string) => void;
  isSelected: boolean;
}

function CategoryInput({ icon: Icon, label, onClick, isSelected }: Props) {
  return (
    <div
      onClick={() => onClick(label)}
      className={`border-[1px] border-neutral-200 rounded-lg text-neutral-600 cursor-pointer flex items-center p-6 gap-3 hover:-translate-y-1 transition
      ${isSelected ? "text-orange-500 bg-orange-100/20 border-orange-200" : ""}
      `}
    >
      <Icon size={56} />
      <p className="text-lg">{label}</p>
    </div>
  );
}
export default CategoryInput;
