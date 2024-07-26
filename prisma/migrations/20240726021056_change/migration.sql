/*
  Warnings:

  - The primary key for the `OTPRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "OTPRequest" DROP CONSTRAINT "OTPRequest_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "OTPRequest_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "OTPRequest_id_seq";
