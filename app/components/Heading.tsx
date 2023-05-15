interface Props {
  title: string;
  subtitle?: string;
}

function Heading({ title, subtitle }: Props) {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold">{title}</h2>
      {subtitle ? (
        <p className="text-lg text-neutral-500">{subtitle}</p>
      ) : null}{" "}
    </div>
  );
}
export default Heading;
