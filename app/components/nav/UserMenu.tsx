"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Menu, Transition } from "@headlessui/react";
import { MdLogin, MdLogout } from "react-icons/md";
import { FaRegIdCard } from "react-icons/fa";
import { User } from "@prisma/client";
import { FaPlaneDeparture } from "react-icons/fa";
import { AiOutlineHeart, AiOutlineHome } from "react-icons/ai";
import { BiBuildingHouse } from "react-icons/bi";
import { BsTicketPerforated } from "react-icons/bs";
import { toast } from "react-hot-toast";

import MenuButton from "./MenuButton";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useListingModal from "@/app/hooks/useListingModal";

interface Props {
  currentUser: User | null;
}

function UserMenu({ currentUser }: Props) {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const listingModal = useListingModal();

  const unautedMeuItems = [
    {
      label: "Login",
      icon: MdLogin,
      onClick: loginModal.onOpen,
    },
    {
      label: "Register",
      icon: FaRegIdCard,
      onClick: registerModal.onOpen,
    },
  ];

  const authedMenuItems = [
    {
      label: "My trips",
      icon: FaPlaneDeparture,
      onClick: () => router.push("/trips"),
    },
    {
      label: "My favorites",
      icon: AiOutlineHeart,
      onClick: () => router.push("/favorites"),
    },
    {
      label: "My properties",
      icon: BiBuildingHouse,
      onClick: () => router.push("/properties"),
    },
    {
      label: "My reservations",
      icon: BsTicketPerforated,
      onClick: () => {},
    },
    {
      label: "Booklett my home",
      icon: AiOutlineHome,
      onClick: listingModal.onOpen,
    },
    {
      label: "Logout",
      icon: MdLogout,
      onClick: () => {
        signOut();
        toast.success("Logged out");
      },
    },
  ];

  const menuItems = currentUser ? authedMenuItems : unautedMeuItems;

  return (
    <Menu
      as="nav"
      className="relative"
    >
      <Menu.Button>
        <MenuButton currentUser={currentUser} />
      </Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute right-0 flex flex-col text-left bg-white shadow-lg min-w-[300px] rounded-lg mt-5 overflow-hidden">
          {menuItems.map(({ icon: Icon, label, onClick }) => {
            return (
              <Menu.Item
                key={label}
                as="button"
                className="transition cursor-pointer hover:bg-orange-300/30"
              >
                <div
                  onClick={onClick}
                  className="flex items-center gap-4 px-8 py-4 font-semibold group"
                >
                  <div
                    role="presentation"
                    className="flex items-center justify-center p-2 font-bold text-orange-500 rounded-lg bg-orange-100/70 group-hover:bg-orange-400 group-hover:text-white"
                  >
                    <Icon size={20} />
                  </div>
                  {label}
                </div>
              </Menu.Item>
            );
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
export default UserMenu;
