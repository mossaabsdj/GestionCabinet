/*
  Warnings:

  - Made the column `dateDeNaissance` on table `patient` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `patient` MODIFY `dateDeNaissance` DATETIME(3) NOT NULL;
