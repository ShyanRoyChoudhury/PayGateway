import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: {
      number: "1111111111",
    },
    update: {},
    create: {
      number: "1111111111",
      password: await bcrypt.hash("alice", 10),
      Balance: {
        create: {
          amount: 5000,
          locked: 0,
        },
      },
      onRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          token: "112",
          provider: "Axis bank",
          amount: 20000,
        },
      },
    },
  });

  const bob = await prisma.user.upsert({
    where: { number: "2222222222" },
    update: {},
    create: {
      number: "2222222222",
      password: await bcrypt.hash("bob", 10),
      Balance: {
        create: {
          amount: 20000,
          locked: 0,
        },
      },
      onRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failure",
          token: "312",
          provider: "HDFC bank",
          amount: 50000,
        },
      },
    },
  });

  console.log({ alice, bob });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
