-- CreateTable
CREATE TABLE "Business" (
    "id" TEXT NOT NULL,
    "BusinessName" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "item_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" TEXT NOT NULL,
    "quantity" TEXT,
    "BusinessId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Business_BusinessName_key" ON "Business"("BusinessName");

-- CreateIndex
CREATE UNIQUE INDEX "Item_item_id_key" ON "Item"("item_id");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_BusinessId_fkey" FOREIGN KEY ("BusinessId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;
