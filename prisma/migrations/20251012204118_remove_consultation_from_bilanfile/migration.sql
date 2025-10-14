/*
  Warnings:

  - You are about to drop the column `resultat` on the `bilanfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `bilanfile` DROP COLUMN `resultat`,
    ADD COLUMN `description` VARCHAR(191) NULL;
