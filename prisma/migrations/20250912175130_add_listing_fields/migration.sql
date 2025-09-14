/*
  Warnings:

  - Added the required column `updatedAt` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "buyingMethod" TEXT DEFAULT 'both',
ADD COLUMN     "city" TEXT,
ADD COLUMN     "condition" TEXT DEFAULT 'good',
ADD COLUMN     "favorites" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "isSold" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "negotiable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "originalPrice" DOUBLE PRECISION,
ADD COLUMN     "soldDate" TIMESTAMP(3),
ADD COLUMN     "soldPrice" DOUBLE PRECISION,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;
