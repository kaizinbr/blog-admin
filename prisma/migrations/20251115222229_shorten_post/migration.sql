/*
  Warnings:

  - A unique constraint covering the columns `[shorten]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shorten` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "raw" TEXT,
ADD COLUMN     "shorten" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Post_shorten_key" ON "Post"("shorten");
