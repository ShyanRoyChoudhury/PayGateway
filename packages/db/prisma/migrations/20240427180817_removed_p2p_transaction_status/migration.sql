/*
  Warnings:

  - You are about to drop the column `transactionType` on the `p2pTransfer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "p2pTransfer" DROP COLUMN "transactionType";

-- DropEnum
DROP TYPE "p2pTransactionType";
