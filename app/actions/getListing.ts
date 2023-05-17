import prisma from "@/app/libs/prismadb";

const getListingById = async (listingId?: string) => {
  try {
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      include: {
        user: true,
      },
    });

    return listing;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getListingById;
