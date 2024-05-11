"use client";
import React, { useState } from "react";
import Card from "@repo/ui/src/components/card";
import Select from "@repo/ui/src/components/Select";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/src/components/button";
import { createOnRampTransaction } from "../app/lib/createOnRampTransaction";

function AddMoneyCard() {
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
  const [amount, setAmount] = useState(0);
  const [redirectUrl, setRedirectURL] = useState(
    supportedBanks[0]?.redirectUrl || "",
  );
  const [provider, setProvider] = useState(supportedBanks[0]?.name || "");
  const router = useRouter();
  return (
    <div className="md:w-1/2">
      <Card title={"Add Money"} className="bg-white">
        <form className="">
          <div>
            <label className="">Amount</label>
            <input
              placeholder="Amount"
              name="Amount"
              className=" w-full text-black focus:ring-blue-400 p-1.5 bg-gray-300 rounded-md"
              type="number"
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
          <div>
            <label>Select Bank</label>
            <Select
              onSelect={(value: string) => {
                setRedirectURL(
                  supportedBanks.find((x) => x.name === value)?.redirectUrl ||
                    "",
                );
                setProvider(
                  supportedBanks.find((x) => x.name === value)?.name || "",
                );
              }}
              options={supportedBanks.map((bank) => ({
                key: bank.name,
                value: bank.name,
              }))}
            />
          </div>

          {/* <div className="flex justify-center pt-4">
            <button
              onClick={() => {
                router.push(redirectUrl || "");
              }}
            >
              Select Bank
            </button>
          </div> */}
          <div className="flex justify-center pt-6">
            <Button
              className="  rounded-md bg-gray-900 hover:bg-gray-700 focus:ring-0"
              onClick={async () => {
                if (amount > 0) {
                  const data = await createOnRampTransaction(provider, amount);
                  console.log(data.message);
                }
                router.push(redirectUrl || "");
              }}
            >
              Add Money
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default AddMoneyCard;
