"use client";

import { useBalance } from "@repo/store";

export default function () {
  const balance = useBalance();
  console.log(balance);
  return <div>hi there {balance}</div>;
}
