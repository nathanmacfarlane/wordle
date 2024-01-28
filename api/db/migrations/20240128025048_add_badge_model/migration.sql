-- CreateEnum
CREATE TYPE "Badge" AS ENUM ('monthly_winner', 'win_streak_5_days', 'win_streak_3_days', 'monthly_avg_3', 'monthly_avg_4', 'weekly_avg_4', 'weekly_avg_3', 'guess_in_1', 'guess_in_2');

-- CreateTable
CREATE TABLE "EarnedBadge" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "badge" "Badge" NOT NULL,
    "firstReceived" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EarnedBadge_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EarnedBadge" ADD CONSTRAINT "EarnedBadge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
