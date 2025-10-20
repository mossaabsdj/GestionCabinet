/*
  Warnings:

  - Added the required column `sexe` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `patient` ADD COLUMN `sexe` VARCHAR(191) NOT NULL;
