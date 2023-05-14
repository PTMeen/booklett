"use client";

import { IconType } from "react-icons/lib";
import { SyncLoader } from "react-spinners";

interface Props {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  small?: boolean;
  outline?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: IconType;
  isLoading?: boolean;
}

function Button({
  label,
  onClick = () => {},
  disabled,
  className = "",
  small,
  outline,
  type = "button",
  icon: Icon,
  isLoading,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={` rounded-lg border  text-center text-lg font-semibold disabled:opacity-70 hover:opacity-70
      ${className}
      ${small ? "px-3 py-1" : "py-3 px-5"}
      ${
        outline
          ? "border-neutral-900 text-black border-[2px]"
          : "bg-orange-500 text-white"
      }
      ${isLoading ? "opacity-70" : ""}
      `}
    >
      {isLoading ? (
        <div>
          <SyncLoader
            color="white"
            size={5}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center gap-4">
          {Icon && <Icon size={28} />}
          {label}
        </div>
      )}
    </button>
  );
}
export default Button;
