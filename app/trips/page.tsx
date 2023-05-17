import { getCurrentUser } from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import TripClient from "./TripClient";

async function TripsPage() {
  const currentUser = await getCurrentUser();
  const myReservations = await getReservations({ userId: currentUser?.id });

  if (!myReservations.length) {
    return (
      <EmptyState
        title="No trips found"
        showResetBtn
        actionLabel="Brows Location"
      />
    );
  }

  return (
    <main>
      <Container>
        <TripClient
          reservations={myReservations}
          currentUser={currentUser}
        />
      </Container>
    </main>
  );
}
export default TripsPage;
