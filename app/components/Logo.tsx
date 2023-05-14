import Link from "next/link";

function Logo() {
  return (
    <Link
      href="/"
      className="hidden text-4xl font-extrabold text-orange-600 transition lg:inline hover:-translate-y-1"
    >
      Booklett
    </Link>
  );
}
export default Logo;
