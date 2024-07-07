/*
  Warnings:

  - You are about to drop the column `BusinessName` on the `Business` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[businessName]` on the table `Business` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contactNumber]` on the table `Business` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `businessName` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactNumber` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logoUrl` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Business_BusinessName_key";

-- AlterTable
ALTER TABLE "Business" DROP COLUMN "BusinessName",
ADD COLUMN     "CoverPhotoUrl" TEXT,
ADD COLUMN     "businessName" TEXT NOT NULL,
ADD COLUMN     "category" TEXT,
ADD COLUMN     "contactNumber" TEXT NOT NULL,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "logoUrl" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Business_businessName_key" ON "Business"("businessName");

-- CreateIndex
CREATE UNIQUE INDEX "Business_contactNumber_key" ON "Business"("contactNumber");
