"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { AiOutlineSearch } from "react-icons/ai";
import { differenceInDays } from "date-fns";

import useSearchModal from "@/app/hooks/useSearchModal";
import useCountries from "@/app/hooks/useCountries";

function Search() {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getCountryByValue } = useCountries();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getCountryByValue(locationValue)?.label;
    }

    return "Anywhere";
  }, [locationValue, getCountryByValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      let duration = differenceInDays(end, start);
      if (duration === 0) {
        duration = 1;
      }

      return `${duration} days`;
    }

    return "Any week";
  }, [startDate, endDate]);

  const guestCountLabel = useMemo(() => {
    return guestCount ? `${guestCount} guests` : "Add Guests";
  }, [guestCount]);

  return (
    <div
      onClick={() => searchModal.onOpen()}
      className="flex items-center  border-[1px] rounded-full py-2 flex-grow lg:flex-grow-0 gap-3  pl-4 pr-2 justify-between hover:shadow-md transition cursor-pointer"
    >
      <div className="px-2 font-semibold">{locationLabel}</div>
      <div className="font-semibold border-x-[1px] flex-grow text-center px-2 hidden sm:block">
        {durationLabel}
      </div>
      <div className="flex items-center gap-3 pl-2">
        <p className="hidden text-neutral-600 sm:inline">{guestCountLabel}</p>
        <div className="flex items-center justify-center p-2 text-white bg-orange-600 rounded-full">
          <AiOutlineSearch size={20} />
        </div>
      </div>
    </div>
  );
}
export default Search;
