"use client";

import { MouseEvent } from "react";
import { User } from "@prisma/client";
import { AiOutlineHeart } from "react-icons/ai";
import useLike from "@/app/hooks/useLike";

interface Props {
  listingId: string;
  currentUser?: User | null;
}

function LikeButton({ currentUser, listingId }: Props) {
  const { likeListing, dislikeListing, isLiked } = useLike({
    listingId,
    currentUser,
  });

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (isLiked) {
      await dislikeListing();
    } else {
      await likeListing();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`p-2 rounded-bl-lg bg-black/25 ${
        isLiked ? "text-rose-600" : "text-white"
      }`}
    >
      <AiOutlineHeart size={28} />
    </button>
  );
}
export default LikeButton;
