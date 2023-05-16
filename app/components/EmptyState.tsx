"use client";

import { useRouter } from "next/navigation";
import Button from "./inputs/Button";

interface Props {
  title?: string;
  subtitle?: string;
  showResetBtn?: boolean;
}

function EmptyState({
  title = "Oh no!",
  subtitle = "Something went wrong",
  showResetBtn,
}: Props) {
  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col items-center justify-center">
      <h1 className="mb-3 text-3xl font-bold">{title}</h1>
      <p className="mb-6 text-neutral-600">{subtitle}</p>
      {showResetBtn && (
        <Button
          label="Remove all filters"
          outline
          onClick={() => router.push("/")}
        />
      )}
    </div>
  );
}
export default EmptyState;
