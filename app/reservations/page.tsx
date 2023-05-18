import { getCurrentUser } from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import ReservationClient from "./ReservationClient";

async function ReservationsPage() {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations({ authorId: currentUser?.id });

  if (!reservations.length) {
    return (
      <EmptyState
        title="Hmm..."
        subtitle="You have no reservations on your properties"
      />
    );
  }

  return (
    <Container>
      <ReservationClient reservations={reservations} />
    </Container>
  );
}
export default ReservationsPage;
