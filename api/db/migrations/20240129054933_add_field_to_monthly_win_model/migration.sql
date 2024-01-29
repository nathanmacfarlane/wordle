/*
  Warnings:

  - Added the required column `avgScore` to the `MonthlyWin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MonthlyWin" ADD COLUMN     "avgScore" DOUBLE PRECISION NOT NULL;
