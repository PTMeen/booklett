"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons/lib";
import qs from "query-string";

interface Props {
  label: string;
  icon: IconType;
  selected: boolean;
}

function CategoryBox({ icon: Icon, label, selected }: Props) {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [params, label, router]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center px-5 pb-4 cursor-pointer sm:pb-6 text-neutral-500 border-b-[2px]
      ${selected ? "border-b-neutral-800" : "border-transparent"}
      ${selected ? "text-neutral-800" : "text-neutral-500"}
      `}
    >
      <Icon size={26} />
      {label}
    </div>
  );
}
export default CategoryBox;
