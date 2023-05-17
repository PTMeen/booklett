import { Listing, Reservation, User } from "@prisma/client";

export type ListingWithUser = Listing & { user: User };

export type ReservationWithListing = Reservation & {
  listing: Listing;
};
