interface Props {
  title: string;
  subtitle?: string;
  size?: "md" | "lg";
}

function Heading({ title, subtitle, size = "md" }: Props) {
  return (
    <div>
      <h2
        className={`mb-2 font-bold ${size === "md" ? "text-2xl" : "text-3xl"}`}
      >
        {title}
      </h2>
      {subtitle ? <p className="text-lg text-neutral-500">{subtitle}</p> : null}{" "}
    </div>
  );
}
export default Heading;
