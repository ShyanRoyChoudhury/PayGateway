"use client";
import { useRouter, usePathname } from "next/navigation";

function SidebarItem({
  href,
  icon,
  title,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const selected = pathname === href;

  return (
    <div
      className={`${selected ? "text-[#6a51a6]" : "text-slate-500"} flex p-2 space-x-2 cursor-pointer font-semibold`}
      onClick={() => {
        router.push(href);
      }}
    >
      <div>{icon}</div>
      <div>{title}</div>
    </div>
  );
}

export default SidebarItem;
