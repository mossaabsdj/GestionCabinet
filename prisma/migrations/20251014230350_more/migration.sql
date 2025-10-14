/*
  Warnings:

  - You are about to drop the column `PoidsDeNaissance` on the `patient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `consultation` ADD COLUMN `developpementPsychomoteur` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `patient` DROP COLUMN `PoidsDeNaissance`,
    ADD COLUMN `dateDeNaissance` DATETIME(3) NULL,
    ADD COLUMN `poidsDeNaissance` DOUBLE NULL;
