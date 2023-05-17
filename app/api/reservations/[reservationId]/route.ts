import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

interface IParams {
  reservationId?: string;
}

export const DELETE = async (
  request: Request,
  { params }: { params: IParams }
) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { reservationId } = params;
  console.log({ reservationId });

  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid reservation Id");
  }

  const reservation = await prisma.reservation.delete({
    where: { id: reservationId },
  });

  return NextResponse.json(reservation);
};
