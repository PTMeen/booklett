import { User } from "@prisma/client";
import { ReservationWithListing } from "../types";
import Heading from "../components/Heading";
import TripCard from "./TripCard";

interface Props {
  reservations: ReservationWithListing[];
}

function TripClient({ reservations }: Props) {
  return (
    <div>
      <Heading
        title="My Trips"
        subtitle="Where you've been and where you're going"
      />
      <section className="grid grid-cols-1 my-12 lg:grid-cols-2 gap-x-8 gap-y-16 3xl:grid-cols-4">
        {reservations.map((reservation) => (
          <TripCard
            key={reservation.id}
            reservation={reservation}
          />
        ))}
      </section>
    </div>
  );
}
export default TripClient;
