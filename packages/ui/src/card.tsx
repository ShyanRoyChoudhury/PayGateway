export default function Card({
  children,
  title,
  className,
}: {
  children?: React.ReactNode;
  title: string;
  className?: string;
}): JSX.Element {
  return (
    <div className={`${className} p-4 rounded-sm px-8`}>
      <div className="text-2xl font-semibold">{title}</div>
      <hr />
      <div>{children}</div>
    </div>
  );
}
