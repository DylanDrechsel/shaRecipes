/*
  Warnings:

  - You are about to drop the column `users` on the `Chatrooms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Chatrooms" DROP COLUMN "users",
ADD COLUMN     "guests" TEXT[];
