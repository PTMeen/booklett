"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { BsTrash } from "react-icons/bs";

interface Props {
  reservationId: string;
}

function CancelButton({ reservationId }: Props) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/reservations/${reservationId}`);
      toast.success("Success");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      title="cancel my trip"
      disabled={isLoading}
      onClick={onClick}
      className="text-neutral-600 hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <BsTrash size={18} />
    </button>
  );
}
export default CancelButton;
