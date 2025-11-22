-- CreateTable
CREATE TABLE "diary" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "mood" TEXT,
    "analysis" TEXT,

    CONSTRAINT "diary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "diary_userId_idx" ON "diary"("userId");

-- AddForeignKey
ALTER TABLE "diary" ADD CONSTRAINT "diary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
