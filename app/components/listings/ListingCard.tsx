"use client";

import { Listing, User } from "@prisma/client";
import Link from "next/link";

import useCountries from "@/app/hooks/useCountries";
import Image from "next/image";
import LikeButton from "../inputs/LikeButton";
import { useRouter } from "next/navigation";

interface Props {
  data: Listing;
  currentUser: User | null;
}

function ListingCard({ data, currentUser }: Props) {
  const router = useRouter();

  const { title, locationValue, category, price, imageSrc, id } = data;
  const { getCountryByValue } = useCountries();

  const location = getCountryByValue(locationValue);

  return (
    <div
      onClick={() => router.push(`/listings/${id}`)}
      className="transition border rounded-lg cursor-pointer hover:shadow-lg border-neutral-200"
    >
      {/* image */}
      <div className="relative w-full overflow-hidden rounded-lg rounded-b-none group aspect-square">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover w-full h-full transition group-hover:scale-110"
        />
        <div className="absolute top-0 right-0 z-10">
          <LikeButton
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>

      {/* info */}
      <article className="p-4">
        <h2 className="text-xl font-bold">
          {location?.region}, {location?.label}
        </h2>
        <p className="my-2 text-lg font-light text-neutral-400">{category}</p>
        <p className="text-lg ">
          <span className="font-bold">${price}</span> night
        </p>
      </article>
    </div>
  );
}
export default ListingCard;
