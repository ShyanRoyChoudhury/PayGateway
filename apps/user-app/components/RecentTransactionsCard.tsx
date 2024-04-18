import Card from "@repo/ui/src/card";
import React from "react";

function RecentTransactionsCard({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    status: string;
    provider: string;
  }[];
}): JSX.Element {
  if (!transactions) {
    return (
      <div>
        <Card title="Recent Transactions" className="bg-[#1F2937]">
          <div className="text-center py-8">No Recent Transactions</div>
        </Card>
      </div>
    );
  }
  return (
    <div>
      <Card title="Recent Transactions" className="bg-[#1F2937]">
        {transactions.map((t) => (
          <div className="flex justify-between ">
            <div>
              <div className="text-sm">Received INR</div>
              <div className="text-slate-400 text-xs">
                {t.time.toDateString()}
              </div>
            </div>
            <div>
              <div className="flex flex-col justify-center">
                + Rs {t.amount / 100}
              </div>
              <div className="text-red-300">{t.status}</div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

export default RecentTransactionsCard;
