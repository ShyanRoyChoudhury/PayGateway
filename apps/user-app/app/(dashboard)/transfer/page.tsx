import React from "react";
import AddMoneyCard from "../../../components/AddMoneyCard";
import BalanceCard from "../../../components/BalanceCard";
import RecentTransactionsCard from "../../../components/RecentTransactionsCard";
import { getServerSession } from "next-auth";
import prisma from "@repo/db";
import { authOptions } from "../../lib/auth";

async function getTransactions() {
  const session = await getServerSession(authOptions);
  const transactions = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return transactions.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}
async function getBalance() {
  const session = await getServerSession(authOptions);
  console.log("userid:", session?.user?.id);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  console.log("balance:", balance);
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}
async function Transfer() {
  const transactions = await getTransactions();
  const balance = await getBalance();
  console.log("balance:", balance);
  return (
    <div className="p-6 w-full">
      <div className="text-[#6a51a6] text-3xl font-bold">Transfer</div>
      <div className="py-4 md:flex md:space-x-2 space-y-4 md:space-y-0">
        <AddMoneyCard />
        <div className="space-y-4 md:w-1/2  md:space-y-2">
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <RecentTransactionsCard transactions={transactions} />
        </div>
      </div>
    </div>
  );
}

export default Transfer;
