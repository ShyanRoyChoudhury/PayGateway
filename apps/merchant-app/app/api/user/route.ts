import { NextResponse } from "next/server";
import prisma from "@repo/db";

export const GET = async () => {
  await prisma.merchant.create({
    data: {
      email: Math.random().toString(),
      name: "adsads",
      auth_type: "Google",
    },
  });
  return NextResponse.json({
    message: "hi there",
  });
};
