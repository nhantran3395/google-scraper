/*
  Warnings:

  - You are about to drop the column `adwordsCount` on the `Keyword` table. All the data in the column will be lost.
  - You are about to drop the column `linkCount` on the `Keyword` table. All the data in the column will be lost.
  - You are about to drop the column `resultCount` on the `Keyword` table. All the data in the column will be lost.
  - You are about to drop the column `searchTime` on the `Keyword` table. All the data in the column will be lost.
  - Added the required column `adwords_count` to the `Keyword` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link_count` to the `Keyword` table without a default value. This is not possible if the table is not empty.
  - Added the required column `result_count` to the `Keyword` table without a default value. This is not possible if the table is not empty.
  - Added the required column `search_time` to the `Keyword` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Keyword" DROP COLUMN "adwordsCount",
DROP COLUMN "linkCount",
DROP COLUMN "resultCount",
DROP COLUMN "searchTime",
ADD COLUMN     "adwords_count" INTEGER NOT NULL,
ADD COLUMN     "link_count" INTEGER NOT NULL,
ADD COLUMN     "result_count" INTEGER NOT NULL,
ADD COLUMN     "search_time" DECIMAL(65,30) NOT NULL;
