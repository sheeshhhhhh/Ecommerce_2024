/*
  Warnings:

  - You are about to drop the column `BusinessId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `userInfoId` on the `Item` table. All the data in the column will be lost.
  - Added the required column `businessId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_BusinessId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_userInfoId_fkey";

-- DropIndex
DROP INDEX "Item_item_id_key";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "BusinessId",
DROP COLUMN "userInfoId",
ADD COLUMN     "businessId" TEXT NOT NULL,
ADD CONSTRAINT "Item_pkey" PRIMARY KEY ("item_id");

-- CreateTable
CREATE TABLE "Order" (
    "order_id" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "totalQuantity" INTEGER NOT NULL,
    "userInfoId" TEXT NOT NULL,
    "BusinessId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "orderItem_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "order_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("orderItem_id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userInfoId_fkey" FOREIGN KEY ("userInfoId") REFERENCES "UserInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_BusinessId_fkey" FOREIGN KEY ("BusinessId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("order_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("item_id") ON DELETE CASCADE ON UPDATE CASCADE;
