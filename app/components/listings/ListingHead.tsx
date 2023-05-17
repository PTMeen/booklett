import useCountries from "@/app/hooks/useCountries";
import { User } from "@prisma/client";
import Heading from "../Heading";
import Image from "next/image";
import LikeButton from "../inputs/LikeButton";

interface Props {
  title: string;
  locationValue: string;
  id: string;
  currentUser?: User | null;
  imageSrc: string;
}

function ListingHead({
  id,
  locationValue,
  title,
  currentUser,
  imageSrc,
}: Props) {
  const { getCountryByValue } = useCountries();
  const location = getCountryByValue(locationValue);

  return (
    <section className="flex flex-col gap-8">
      <Heading
        size="lg"
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="h-[60vh] relative overflow-hidden rounded-lg">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-0 right-0 z-10">
          <LikeButton
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </section>
  );
}
export default ListingHead;
