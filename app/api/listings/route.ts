import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export const POST = async (request: Request) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const {
    selectedCategory,
    selectedLocation,
    guestCount,
    roomCount,
    bathroomCount,
    imageSrc,
    title,
    description,
    price,
  } = body;

  const listing = await prisma.listing.create({
    data: {
      category: selectedCategory,
      locationValue: selectedLocation.value,
      guestCount,
      roomCount,
      bathroomCount,
      imageSrc,
      price,
      title,
      description,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
};
