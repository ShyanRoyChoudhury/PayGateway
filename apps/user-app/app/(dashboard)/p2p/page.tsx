import prisma from "@repo/db";
import SendMoneyCard from "../../../components/SendMoneyCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import RecentTransactionsCard from "../../../components/RecentTransactionsCard";

export default async function p2p() {
  const session = await getServerSession(authOptions);
  async function getp2pTransactions() {
    const transactions = await prisma.p2pTransfer.findMany({
      where: {
        OR: [
          { fromUserId: Number(session?.user?.id) },
          { toUserId: Number(session?.user?.id) },
        ],
      },
      include: {
        toUser: {
          select: {
            number: true,
          },
        },
        fromUser: {
          select: {
            number: true,
            id: true,
          },
        },
      },
      orderBy: {
        timestamp: "desc",
      },
    });
    console.log(transactions);
    return transactions.map((t) => ({
      time: t.timestamp,
      amount: t.amount,
      status: t.status,
      id: t.id,
      toUserNumber: t.toUser.number,
      fromUserNumber: t.fromUser.number,
      fromUserId: t.fromUser?.id,
    }));
  }

  const transactions = await getp2pTransactions();
  return (
    <div className="p-6 w-full">
      <div className="text-[#6a51a6] text-3xl font-bold">P2P Transfer</div>
      <div className="py-4 md:flex md:space-x-2 space-y-4 md:space-y-0">
        <SendMoneyCard />
        <div className="space-y-4 md:w-1/2  md:space-y-2">
          <RecentTransactionsCard
            transactions={transactions}
            session={session}
          />
        </div>
      </div>
    </div>
  );
}
