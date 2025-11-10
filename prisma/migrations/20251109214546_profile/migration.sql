-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "profileId" TEXT;

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "bio" TEXT,
    "username" TEXT NOT NULL,
    "lowername" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "pronouns" TEXT,
    "site" TEXT,
    "age" INTEGER,
    "favoriteGenre" TEXT,
    "public" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_username_key" ON "Profile"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_lowername_key" ON "Profile"("lowername");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
