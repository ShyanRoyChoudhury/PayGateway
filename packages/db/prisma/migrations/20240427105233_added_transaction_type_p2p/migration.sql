/*
  Warnings:

  - Added the required column `transactionType` to the `p2pTransfer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "p2pTransactionType" AS ENUM ('Sent', 'Received');

-- AlterTable
ALTER TABLE "p2pTransfer" ADD COLUMN     "transactionType" "p2pTransactionType" NOT NULL;
