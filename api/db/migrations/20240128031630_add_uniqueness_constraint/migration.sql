/*
  Warnings:

  - A unique constraint covering the columns `[userId,badge]` on the table `EarnedBadge` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EarnedBadge_userId_badge_key" ON "EarnedBadge"("userId", "badge");
