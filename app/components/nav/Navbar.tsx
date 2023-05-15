"use client";

import { User } from "@prisma/client";

import Container from "../Container";
import Logo from "../Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";
import useListingModal from "@/app/hooks/useListingModal";

interface Props {
  currentUser: User | null;
}

function Navbar({ currentUser }: Props) {
  const listingModal = useListingModal();

  return (
    <header className="border-b-[1px] border-neutral-200 bg-neutral-50 pt-6 relative">
      <Container>
        <div className="flex items-center justify-between gap-4">
          <Logo />
          <Search />
          <div className="flex items-center gap-8">
            <button
              onClick={listingModal.onOpen}
              className="hidden px-3 py-2 font-semibold transition rounded-full lg:inline hover:bg-neutral-100"
            >
              Booklett your home
            </button>
            <UserMenu currentUser={currentUser} />
          </div>
        </div>
      </Container>
      <hr className="mt-4" />
      <Categories />
    </header>
  );
}
export default Navbar;
