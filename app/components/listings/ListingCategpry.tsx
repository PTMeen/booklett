import { CategoryType } from "@/app/constants/categories";

interface Props {
  category?: CategoryType;
}

function ListingCategpry({ category }: Props) {
  const Icon = category?.icon;

  return (
    <div className="flex items-end gap-4 text-lg">
      {Icon && <Icon size={36} />} <p>{category?.description}</p>
    </div>
  );
}
export default ListingCategpry;
