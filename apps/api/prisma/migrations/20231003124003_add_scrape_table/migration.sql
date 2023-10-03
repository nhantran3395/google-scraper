/*
  Warnings:

  - You are about to drop the column `user_id` on the `Keyword` table. All the data in the column will be lost.
  - Added the required column `scrape_id` to the `Keyword` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Keyword" DROP CONSTRAINT "Keyword_user_id_fkey";

-- AlterTable
ALTER TABLE "Keyword" DROP COLUMN "user_id",
ADD COLUMN     "scrape_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Scrape" (
    "scrape_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Scrape_pkey" PRIMARY KEY ("scrape_id")
);

-- AddForeignKey
ALTER TABLE "Keyword" ADD CONSTRAINT "Keyword_scrape_id_fkey" FOREIGN KEY ("scrape_id") REFERENCES "Scrape"("scrape_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scrape" ADD CONSTRAINT "Scrape_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
