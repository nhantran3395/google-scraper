/*
  Warnings:

  - You are about to drop the `Keyword` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Scrape` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Keyword" DROP CONSTRAINT "Keyword_scrape_id_fkey";

-- DropForeignKey
ALTER TABLE "Scrape" DROP CONSTRAINT "Scrape_user_id_fkey";

-- DropTable
DROP TABLE "Keyword";

-- DropTable
DROP TABLE "Scrape";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Users" (
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Keywords" (
    "keyword_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "ad_words_count" INTEGER NOT NULL,
    "result_count" INTEGER NOT NULL,
    "link_count" INTEGER NOT NULL,
    "raw_html_result" BYTEA NOT NULL,
    "body" VARCHAR(255) NOT NULL,
    "upload_id" TEXT NOT NULL,

    CONSTRAINT "Keywords_pkey" PRIMARY KEY ("keyword_id")
);

-- CreateTable
CREATE TABLE "Uploads" (
    "upload_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "keyword_count" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Uploads_pkey" PRIMARY KEY ("upload_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Uploads_name_key" ON "Uploads"("name");

-- AddForeignKey
ALTER TABLE "Keywords" ADD CONSTRAINT "Keywords_upload_id_fkey" FOREIGN KEY ("upload_id") REFERENCES "Uploads"("upload_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Uploads" ADD CONSTRAINT "Uploads_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
