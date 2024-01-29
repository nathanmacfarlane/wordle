/*
  Warnings:

  - A unique constraint covering the columns `[userId,month,year]` on the table `MonthlyWin` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `MonthlyWin` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "MonthlyWin_month_year_key";

-- AlterTable
ALTER TABLE "MonthlyWin" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "MonthlyWin_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "MonthlyWin_userId_month_year_key" ON "MonthlyWin"("userId", "month", "year");
