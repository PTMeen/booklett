"use client";

import { useEffect, useMemo, useState } from "react";
import { User } from "@prisma/client";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";

import Container from "../Container";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import { ListingWithUser, ReservationWithListing } from "@/app/types";
import ListingReservation from "./ListingReservation";
import useLoginModal from "@/app/hooks/useLoginModal";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
  listing: ListingWithUser;
  currentUser?: User | null;
  reservations: ReservationWithListing[];
}

const initialDateRange: Range = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

function ListingClient({ listing, currentUser, reservations }: Props) {
  const loginModal = useLoginModal();
  const router = useRouter();

  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reseravation) => {
      const range = eachDayOfInterval({
        start: new Date(reseravation.startDate),
        end: new Date(reseravation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const createListing = async () => {
    if (!currentUser) return loginModal.onOpen();

    try {
      setIsLoading(true);
      const reservationData = {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        totalPrice,
        listingId: listing.id,
      };

      await axios.post("/api/reservations", reservationData);
      setDateRange(initialDateRange);
      toast.success("Success");
      router.push("/trips");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        return setTotalPrice(dayCount * listing.price);
      }
    } else {
      setTotalPrice(listing.price);
    }
  }, [listing.price, dateRange]);

  return (
    <Container>
      <main className="max-w-screen-lg mx-auto">
        <ListingHead
          {...listing}
          currentUser={currentUser}
        />
        <div className="flex flex-col-reverse gap-16 mt-10 lg:flex-row">
          <ListingInfo listing={listing} />
          <ListingReservation
            price={listing.price}
            totalPrice={totalPrice}
            onChangeDate={(value) => setDateRange(value)}
            dateRange={dateRange}
            disabledDates={disabledDates}
            disabled={isLoading}
            onSubmit={createListing}
            isLoading={isLoading}
          />
        </div>
      </main>
    </Container>
  );
}
export default ListingClient;
