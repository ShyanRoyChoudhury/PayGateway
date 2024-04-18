"use client";
import React, { useState } from "react";
import Card from "@repo/ui/src/card";
import Select from "@repo/ui/src/Select";
import { useRouter } from "next/navigation";
import prisma from "@repo/db";
import { useSession } from "next-auth/react";

function AddMoneyCard() {
  const session = useSession();
  const supportedBanks = [
    {
      name: "HDFC Bank",
      redirectUrl: "https://netbanking.hdfcbank.com",
    },
    {
      name: "Axis Bank",
      redirectUrl: "https://www.axisbank.com/",
    },
  ];
  const [amount, setAmount] = useState<string | null>(null);
  const [redirectUrl, setRedirectURL] = useState(
    supportedBanks[0]?.redirectUrl
  );
  const router = useRouter();
  return (
    <div className="md:w-1/2">
      <Card title={"Add Money"} className="bg-[#1F2937]">
        <form className="">
          <div>
            <label className="">Amount</label>
            <input
              placeholder="Amount"
              name="Amount"
              className="outline-none w-full bg-white "
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="">
            <label>Bank</label>
            <input
              placeholder="test input"
              className="outline-none w-full bg-white"
            />
          </div>
          <Select
            onSelect={(value) => {
              setRedirectURL(
                supportedBanks.find((x) => x.name === value)?.redirectUrl || ""
              );
            }}
            options={supportedBanks.map((bank) => ({
              key: bank.name,
              value: bank.name,
            }))}
          />
          <div className="flex justify-center pt-4">
            <button
              onClick={() => {
                router.push(redirectUrl || "");
              }}
            >
              Select Bank
            </button>
          </div>
          <div className="flex justify-center pt-10">
            <button
              className="border p-1 px-2 rounded-md"
              onClick={async () => {
                await prisma.onRampTransaction.create({
                  data: {
                    startTime: new Date(),
                    status: "Processing",
                    amount: Number(amount),
                    token: "13333",
                    userId: 18,
                    provider: "HDFC Bank",
                  },
                });
              }}
            >
              Add Money
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default AddMoneyCard;
