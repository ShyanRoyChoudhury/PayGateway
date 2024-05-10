"use Client";
import Card from "@repo/ui/src/components/card";
import React from "react";
function BalanceCard({
  amount,
  locked,
  className,
}: {
  amount: number;
  locked: number;
  className?: string;
}) {
  return (
    <div>
      <Card title={"Balance"} className={`${className} bg-white`}>
        <div className="flex justify-between">
          <div>Unlocked Balance</div>
          <div>{amount / 100} INR</div>
        </div>
        <div className="flex justify-between">
          <div>Total Locked Balance</div>
          <div>{locked / 100} INR</div>
        </div>
        <div className="flex justify-between">
          <div>Total Balance</div>
          <div>{(amount + locked) / 100} INR</div>
        </div>
      </Card>
    </div>
  );
}

export default BalanceCard;
