import { CATEGORIES } from "@/app/constants/categories";
import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";

interface Props {
  onSelect: (category: string) => void;
  selectedCategory: string;
}

function CategoryStep({ onSelect, selectedCategory }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <Heading
        title="Which of this describe your place?"
        subtitle="Pick category"
      />
      <div className="h-[60vh] py-2 grid grid-cols-1 gap-x-3 gap-y-6 md:grid-cols-2 overflow-y-scroll">
        {CATEGORIES.map((item) => (
          <CategoryInput
            key={item.label}
            {...item}
            onClick={onSelect}
            isSelected={selectedCategory === item.label}
          />
        ))}
      </div>
    </div>
  );
}
export default CategoryStep;
