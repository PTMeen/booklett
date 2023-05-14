"use client";

import { usePathname, useSearchParams } from "next/navigation";

import { CATEGORIES } from "@/app/constants/categories";
import CategoryBox from "./CategoryBox";
import Container from "../Container";

function Categories() {
  const params = useSearchParams();
  const pathname = usePathname();

  const category = params?.get("category");
  const isHomePage = pathname === "/";

  if (!isHomePage) return null;

  return (
    <Container>
      <div className="flex items-center justify-between pt-4 mt-4 overflow-x-auto sm:pt-6 scrollbar-hide">
        {CATEGORIES.map((item) => (
          <CategoryBox
            {...item}
            key={item.label}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
}
export default Categories;
