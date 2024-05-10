import { cn } from "../cn";

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
    <div className={cn(`p-4 rounded-lg px-8 relative shadow-lg`, className)}>
      <div className="text-2xl font-semibold sticky top-0 z-10 py-2 bg-white">
        {title}
        <hr />
      </div>
      <div className="">{children}</div>
    </div>
  );
}
