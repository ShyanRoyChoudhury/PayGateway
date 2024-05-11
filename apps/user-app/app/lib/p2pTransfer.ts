"use server";

import prisma from "@repo/db/index";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

type p2pTransferProps = {
  amount: number;
  number: string;
};
export const p2pTransfer = async ({ amount, number }: p2pTransferProps) => {
  const session = await getServerSession(authOptions);
  if (!session?.user || !session.user?.id) {
    return {
      message: "Unauthenticated Request",
    };
  }
  let transactionId: number | undefined;
  try {
    const toUser = await prisma.user.findFirst({
      where: {
        number,
      },
    });

    if (!toUser) {
      throw new Error("User not found");
    }
    if (toUser.id === Number(session?.user?.id)) {
      throw new Error("Cant send money to same account you are paying from.");
    }
    await prisma.$transaction(async (tx) => {
      const userBalance = await tx.balance.findUnique({
        where: {
          userId: Number(session?.user?.id),
        },
      });
      if (
        !userBalance ||
        userBalance?.amount < amount ||
        userBalance?.amount - amount < 0
      ) {
        await prisma.p2pTransfer.create({
          data: {
            fromUserId: Number(session?.user?.id),
            toUserId: toUser.id,
            amount: amount * 100,
            status: "Failure",
            timestamp: new Date(),
          },
        });
        throw new Error("Insufficient funds");
      }

      const transaction = await prisma.p2pTransfer.create({
        data: {
          fromUserId: Number(session?.user?.id),
          toUserId: toUser.id,
          amount: amount * 100,
          status: "Processing",
          timestamp: new Date(),
        },
      });
      transactionId = transaction.id;

      await tx.$executeRaw`
            UPDATE "Balance" SET "amount"="amount"-${amount * 100} WHERE "userId"=${Number(session?.user?.id)};
            `;
      await tx.$executeRaw`UPDATE "Balance" SET "amount"="amount"+${amount * 100} WHERE "userId"=${Number(toUser?.id)};`;
    });
    await prisma.p2pTransfer.update({
      where: {
        id: transactionId,
      },
      data: {
        status: "Success",
      },
    });
    return {
      message: "Transaction Successful",
    };
  } catch (e) {
    if (e instanceof Error) {
      return {
        message: e.message,
      };
    }
    if (transactionId) {
      await prisma.p2pTransfer.update({
        where: {
          id: transactionId,
        },
        data: {
          status: "Failure",
        },
      });
    }
  }
};
