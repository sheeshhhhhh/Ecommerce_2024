-- AlterTable
ALTER TABLE "User" ALTER COLUMN "multifactor" SET DEFAULT false;

-- CreateTable
CREATE TABLE "OTPRequest" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OTPRequest_pkey" PRIMARY KEY ("id")
);
