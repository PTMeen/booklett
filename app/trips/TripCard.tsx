"use client";

import Image from "next/image";
import { BsCalendarCheck, BsCalendarMinus } from "react-icons/bs";
import { format } from "date-fns";
import Link from "next/link";

import { ReservationWithListing } from "../types";
import useCountries from "../hooks/useCountries";
import { User } from "@prisma/client";
import CancelButton from "./CancelButton";

interface Props {
  reservation: ReservationWithListing;
}

function TripCard({ reservation }: Props) {
  const { getCountryByValue } = useCountries();

  const location = getCountryByValue(reservation.listing.locationValue);

  const startDateText = format(new Date(reservation.startDate), "d MMM Y");
  const endDateText = format(new Date(reservation.endDate), "d MMM Y");

  return (
    <div className="overflow-hidden border min-h-[200px] rounded-lg border-neutral-300 flex flex-grow w-full bg-neutral-50 transition hover:shadow-lg">
      <div className="relative w-1/3">
        <Image
          fill
          src={reservation.listing.imageSrc}
          alt={reservation.listing.title}
          className="object-cover w-full"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <article className="relative flex-grow">
        {/* card head */}
        <div className="flex items-center justify-between py-5 px-6 border-b-[1px] border-neutral-200">
          <h3 className="text-lg font-bold">
            {location?.region}, {location?.label}
          </h3>
          <CancelButton reservationId={reservation.id} />
        </div>

        <div className="flex items-center gap-5 p-6 mt-3 text-sm font-light text-neutral-600 ">
          <div className="flex items-center gap-2">
            <BsCalendarCheck />
            <p>{startDateText}</p>
          </div>
          <div className="flex items-center gap-2">
            <BsCalendarMinus />
            <p>{endDateText}</p>
          </div>
        </div>
        <div className="p-6 mt-10 font-thin">
          <Link
            href={`/listings/${reservation.listing.id}`}
            className="px-3 py-1 font-light text-orange-800 bg-orange-200 rounded-full cursor-pointer hover:opacity-70"
          >
            {reservation.listing.title}
          </Link>
        </div>
      </article>
    </div>
  );
}
export default TripCard;
