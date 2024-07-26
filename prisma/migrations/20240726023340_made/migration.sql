/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `OTPRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OTPRequest_userId_key" ON "OTPRequest"("userId");

-- AddForeignKey
ALTER TABLE "OTPRequest" ADD CONSTRAINT "OTPRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
