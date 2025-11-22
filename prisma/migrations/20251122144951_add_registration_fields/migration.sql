-- CreateEnum
CREATE TYPE "AIStyle" AS ENUM ('AUTO', 'COLD', 'WARM');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "aiStyle" "AIStyle" NOT NULL DEFAULT 'AUTO',
ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "isRegistered" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "job" TEXT,
ADD COLUMN     "nickname" TEXT,
ADD COLUMN     "phoneNumber" TEXT;
