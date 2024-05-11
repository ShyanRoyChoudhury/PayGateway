import Card from "@repo/ui/src/components/card";
import React from "react";

function RecentTransactionsCard({
  transactions,
  session,
  className,
}: {
  transactions: {
    time: Date;
    amount: number;
    status: string;
    provider?: string;
    id: number;
    toUserNumber?: string;
    fromUserNumber?: string;
    fromUserId?: number;
  }[];
  session?: any;
  className?: string;
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
      <Card
        title="Recent Transactions"
        className={`${className} bg-white w-full px-8 max-h-60  overflow-y-auto`}
      >
        {transactions.map((t) => (
          <div className="flex justify-between" key={t.id}>
            <div>
              <div className="text-sm">
                {t.toUserNumber ? t.toUserNumber : "Received INR"}
              </div>
              <div className="text-slate-400 text-xs">
                {t.time.toDateString()}
              </div>
            </div>
            <div>
              <div className="flex flex-col justify-center">
                {t.fromUserId
                  ? Number(session?.user?.id) === t.fromUserId
                    ? `- RS ${t.amount / 100}`
                    : `+ RS ${t.amount / 100}`
                  : `Rs ${t.amount / 100}`}
              </div>
              <div
                className={`${
                  t.status === "Success"
                    ? "text-green-300"
                    : t.status === "Processing"
                      ? "text-yellow-200"
                      : "text-red-300"
                } text-sm`}
              >
                {t.status}
              </div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

export default RecentTransactionsCard;
