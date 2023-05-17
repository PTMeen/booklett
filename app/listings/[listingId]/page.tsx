import { getCurrentUser } from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListing";
import getReservations from "@/app/actions/getReservations";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "@/app/components/listings/ListingClient";

interface Props {
  params: {
    listingId?: string;
  };
}

async function SingleListingPage({ params }: Props) {
  const { listingId } = params;

  const listing = await getListingById(listingId);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations({ listingId });

  if (!listing) {
    return (
      <EmptyState
        title="Listing not found"
        subtitle="This listing doesn't or no longer exist."
      />
    );
  }

  return (
    <Container>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </Container>
  );
}
export default SingleListingPage;
