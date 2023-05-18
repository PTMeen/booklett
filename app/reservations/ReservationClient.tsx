import Heading from "../components/Heading";
import TripCard from "../trips/TripCard";
import { ReservationWithListing } from "../types";

interface Props {
  reservations: ReservationWithListing[];
}

function ReservationClient({ reservations }: Props) {
  const activeReservations = reservations.filter((item) => {
    const endDate = new Date(item.endDate);
    return endDate > new Date();
  });

  return (
    <div>
      <Heading
        title="My Reservations"
        subtitle={`You have ${activeReservations.length} reservations on your properties`}
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
export default ReservationClient;
