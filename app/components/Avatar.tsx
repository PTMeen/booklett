import Image from "next/image";

interface Props {
  src?: string | null | undefined;
  size?: "sm" | "md";
}

function Avatar({ src, size = "md" }: Props) {
  return (
    <Image
      src={src || "/images/placeholder.jpg"}
      alt="User avatar"
      width={size === "md" ? 30 : 25}
      height={size === "md" ? 30 : 25}
      className="rounded-full"
    />
  );
}
export default Avatar;
