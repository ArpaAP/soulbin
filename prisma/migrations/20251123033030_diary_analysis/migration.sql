/*
  Warnings:

  - You are about to drop the column `analysis` on the `diary` table. All the data in the column will be lost.
  - You are about to drop the column `mood` on the `diary` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "diary" DROP COLUMN "analysis",
DROP COLUMN "mood";

-- CreateTable
CREATE TABLE "diary_analysis" (
    "id" TEXT NOT NULL,
    "diaryId" TEXT NOT NULL,
    "emotion" TEXT NOT NULL,
    "intensity" INTEGER NOT NULL,
    "tags" TEXT[],
    "summary" TEXT NOT NULL,
    "advice" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "diary_analysis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "diary_analysis_diaryId_key" ON "diary_analysis"("diaryId");

-- AddForeignKey
ALTER TABLE "diary_analysis" ADD CONSTRAINT "diary_analysis_diaryId_fkey" FOREIGN KEY ("diaryId") REFERENCES "diary"("id") ON DELETE CASCADE ON UPDATE CASCADE;
