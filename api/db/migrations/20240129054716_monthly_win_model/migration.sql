-- CreateTable
CREATE TABLE "MonthlyWin" (
    "userId" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MonthlyWin_month_year_key" ON "MonthlyWin"("month", "year");

-- AddForeignKey
ALTER TABLE "MonthlyWin" ADD CONSTRAINT "MonthlyWin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
