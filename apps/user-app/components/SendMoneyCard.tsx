"use client";
import { Button } from "@repo/ui/src/components/button";
import Card from "@repo/ui/src/components/card";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/p2pTransfer";

export default function SendMoneyCard(): JSX.Element {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  return (
    <Card title="Send Money" className="bg-white w-full md:w-1/2">
      <form>
        <div>
          <label>Number</label>
          <input
            placeholder="Phone Number"
            type="text"
            className="text-black  w-full p-1.5 rounded-md bg-gray-300 focus:ring-blue-300"
            onChange={(e) => {
              setNumber(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Amount</label>
          <input
            placeholder="Amount"
            type="number"
            className="text-black  w-full p-1.5 rounded-md bg-gray-300 focus:ring-blue-300"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center pt-2">
          <Button
            onClick={async () => {
              if (Number(amount) > 0) {
                const p2pmessage = await p2pTransfer({
                  amount: Number(amount),
                  number: number,
                });
                console.log(p2pmessage);
              }
            }}
            className="bg-gray-900 focus:ring-0 hover:bg-gray-700"
          >
            Send Money
          </Button>
        </div>
      </form>
    </Card>
  );
}
