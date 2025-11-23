/*
  Warnings:

  - You are about to drop the column `status` on the `diary_analysis` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "diary" ADD COLUMN     "analysisStatus" "AnalysisStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "diary_analysis" DROP COLUMN "status";
