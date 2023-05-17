"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { ListingWithUser } from "@/app/types";

import Avatar from "../Avatar";
import Heading from "../Heading";
import { CATEGORIES } from "@/app/constants/categories";
import ListingCategpry from "./ListingCategpry";
import useCountries from "@/app/hooks/useCountries";

interface Props {
  listing: ListingWithUser;
}

function ListingInfo({ listing }: Props) {
  const category = CATEGORIES.find((item) => item.label === listing.category);
  const { getCountryByValue } = useCountries();

  const location = getCountryByValue(listing.locationValue);

  const Map = useMemo(
    () => dynamic(() => import("@/app/components/Map"), { ssr: false }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  return (
    <section>
      <div className="flex items-center gap-4">
        <Heading title={`Hosted by ${listing.user.name}`} />
        <div>
          <Avatar src={listing.user?.image} />
        </div>
      </div>
      <div className="flex gap-3 py-4 text-neutral-600 border-b-[1px] border-neutral-200">
        <p>{listing.guestCount} guests</p>
        <p>{listing.roomCount} rooms</p>
        <p>{listing.bathroomCount} bathrooms</p>
      </div>
      <div className="flex gap-3 py-4 text-neutral-600 border-b-[1px] border-neutral-200">
        {<ListingCategpry category={category} />}{" "}
      </div>
      <div className="py-4 text-neutral-600 border-b-[1px] border-neutral-20">
        {listing.description}
      </div>
      <div>
        <Map center={location?.latlng} />
      </div>
    </section>
  );
}
export default ListingInfo;
