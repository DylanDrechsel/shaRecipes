/*
  Warnings:

  - You are about to drop the column `fallowedUserId` on the `FollowedUsers` table. All the data in the column will be lost.
  - You are about to drop the column `followUsername` on the `FollowedUsers` table. All the data in the column will be lost.
  - Added the required column `followedUserId` to the `FollowedUsers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followedUsername` to the `FollowedUsers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FollowedUsers" DROP COLUMN "fallowedUserId",
DROP COLUMN "followUsername",
ADD COLUMN     "followedUserId" INTEGER NOT NULL,
ADD COLUMN     "followedUsername" TEXT NOT NULL;
