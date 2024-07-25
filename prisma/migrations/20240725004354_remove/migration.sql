/*
  Warnings:

  - You are about to drop the column `BusinessId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `businessId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_BusinessId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "BusinessId";

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "businessId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
