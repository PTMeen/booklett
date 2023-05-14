"use client";

import { AiOutlineMenu } from "react-icons/ai";
import { User } from "next-auth";

import Avatar from "../Avatar";

interface Props {
  currentUser: User | null;
}

function MenuButton({ currentUser }: Props) {
  return (
    <div className="flex border-[1px] border-neutral-200 items-center p-3 sm:p-2 rounded-full hover:shadow-md transition gap-3">
      <AiOutlineMenu size={18} />
      <div className="hidden sm:block">
        <Avatar src={currentUser?.image} />
      </div>
    </div>
  );
}
export default MenuButton;
