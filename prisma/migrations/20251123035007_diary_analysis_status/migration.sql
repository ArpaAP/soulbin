-- CreateEnum
CREATE TYPE "AnalysisStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "diary_analysis" ADD COLUMN     "status" "AnalysisStatus" NOT NULL DEFAULT 'PENDING';
