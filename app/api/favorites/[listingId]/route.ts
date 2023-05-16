import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

interface IContext {
  params: { listingId?: string };
}

export const POST = async (requset: Request, context: IContext) => {
  console.log("Hello");
  const { listingId } = context.params;

  const currentUser = await getCurrentUser();

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid listing ID");
  }

  if (!currentUser) {
    return NextResponse.error();
  }

  let favoritedIds = [...(currentUser.favoritedIds || [])];
  favoritedIds.push(listingId);

  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: {
      favoritedIds,
    },
  });

  return NextResponse.json(user);
};

export const DELETE = async (requset: Request, context: IContext) => {
  console.log("Hello");

  const { listingId } = context.params;
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid listing ID");
  }

  const favoritedIds = [...(currentUser.favoritedIds || [])];
  const updatedFavoritedIds = favoritedIds.filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: {
      favoritedIds: updatedFavoritedIds,
    },
  });

  return NextResponse.json(user);
};
