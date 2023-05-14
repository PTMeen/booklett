import { getServerSession } from "next-auth/next";

import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "@/app/libs/prismadb";

export const getSessing = async () => await getServerSession(authOptions);

export const getCurrentUser = async () => {
  try {
    const session = await getSessing();
    if (!session?.user?.email) return null;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (user?.hashedPassword) {
      user.hashedPassword = "";
    }

    return user;
  } catch (error) {
    return null;
  }
};
