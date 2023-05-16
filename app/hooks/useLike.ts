import axios from "axios";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import useLoginModal from "./useLoginModal";
import { User } from "@prisma/client";

interface IParams {
  listingId: string;
  currentUser?: User | null;
}

const useLike = ({ listingId, currentUser }: IParams) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const isLiked = useMemo(() => {
    const likedIds = currentUser?.favoritedIds ? currentUser?.favoritedIds : [];
    return likedIds.includes(listingId);
  }, [currentUser, listingId]);

  const likeListing = async () => {
    try {
      if (!currentUser) return loginModal.onOpen();

      await axios.post(`/api/favorites/${listingId}`);
      toast.success("Success");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const dislikeListing = async () => {
    if (!currentUser) return loginModal.onOpen();

    try {
      await axios.delete(`/api/favorites/${listingId}`);
      router.refresh();
      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return { likeListing, dislikeListing, isLiked };
};

export default useLike;
