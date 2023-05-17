import { getCurrentUser } from "../actions/getCurrentUser";
import getFavoritedListings from "../actions/getFavoritedListings";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

async function FavoritesPage() {
  const listings = await getFavoritedListings();
  const currentUser = await getCurrentUser();

  if (!listings.length) {
    return (
      <EmptyState
        title="Umm..."
        subtitle="Look like you don't have any favorite destination yet"
        showResetBtn
      />
    );
  }

  return (
    <Container>
      <div>
        <Heading
          title="Favorites"
          subtitle="List of places you have favorited!"
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
export default FavoritesPage;
