/*
  Warnings:

  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Session" DROP CONSTRAINT "Session_pkey",
DROP COLUMN "id";

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "Otp" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "codeHash" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires" TIMESTAMP(3) NOT NULL,
    "consumed" BOOLEAN NOT NULL DEFAULT false,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "maxAttempts" INTEGER NOT NULL DEFAULT 5,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Otp_identifier_idx" ON "Otp"("identifier");

-- CreateIndex
CREATE INDEX "Otp_expires_idx" ON "Otp"("expires");
