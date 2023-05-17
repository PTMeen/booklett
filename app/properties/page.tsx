import { getCurrentUser } from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

async function PropertiesPage() {
  const currentUser = await getCurrentUser();
  const listings = await getListings({ userId: currentUser?.id });

  if (!listings.length) {
    return (
      <EmptyState
        title="Hmm..."
        subtitle="It's seem you have no properties listed on Booklett"
      />
    );
  }

  return (
    <Container>
      <div>
        <Heading
          title="My Properties"
          subtitle="List of your registered properties"
        />
      </div>
      <div className="grid grid-cols-1 gap-8 pt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}
export default PropertiesPage;
