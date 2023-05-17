import prisma from "@/app/libs/prismadb";

import { getCurrentUser } from "./getCurrentUser";

const getFavoritedListings = async () => {
  try {
    const currentUser = await getCurrentUser();
    const favoritedIds = currentUser?.favoritedIds || [];

    const listings = await prisma.listing.findMany({
      where: {
        id: {
          in: favoritedIds,
        },
      },
    });

    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getFavoritedListings;
