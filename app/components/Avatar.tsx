import Image from "next/image";

interface Props {
  src?: string | null | undefined;
}

function Avatar({ src }: Props) {
  return (
    <Image
      src={src || "/images/placeholder.jpg"}
      alt="User avatar"
      width={30}
      height={30}
      className="rounded-full"
    />
  );
}
export default Avatar;
