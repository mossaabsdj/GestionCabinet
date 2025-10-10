/*
  Warnings:

  - You are about to drop the column `consultationId` on the `bilan` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `bilan` table. All the data in the column will be lost.
  - You are about to drop the column `fichier` on the `bilan` table. All the data in the column will be lost.
  - You are about to drop the column `resultat` on the `bilan` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `bilan` table. All the data in the column will be lost.
  - You are about to drop the column `alcool` on the `consultation` table. All the data in the column will be lost.
  - You are about to drop the column `tabac` on the `consultation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nom]` on the table `Bilan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nom` to the `Bilan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `bilan` DROP FOREIGN KEY `Bilan_consultationId_fkey`;

-- DropIndex
DROP INDEX `Bilan_consultationId_fkey` ON `bilan`;

-- AlterTable
ALTER TABLE `bilan` DROP COLUMN `consultationId`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `fichier`,
    DROP COLUMN `resultat`,
    DROP COLUMN `type`,
    ADD COLUMN `nom` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `consultation` DROP COLUMN `alcool`,
    DROP COLUMN `tabac`;

-- AlterTable
ALTER TABLE `ordonnanceitem` ADD COLUMN `quantite` INTEGER NULL;

-- AlterTable
ALTER TABLE `recettetypeitem` ADD COLUMN `quantite` INTEGER NULL;

-- CreateTable
CREATE TABLE `BilanFile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `consultationId` INTEGER NOT NULL,
    `type` VARCHAR(191) NULL,
    `resultat` VARCHAR(191) NULL,
    `fichier` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BilanRecip` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patientId` INTEGER NOT NULL,
    `consultationId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `BilanRecip_consultationId_key`(`consultationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BilanItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bilanRecipId` INTEGER NOT NULL,
    `bilanId` INTEGER NOT NULL,
    `resultat` VARCHAR(191) NULL,
    `remarque` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BilanType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BilanTypeItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bilanTypeId` INTEGER NOT NULL,
    `bilanId` INTEGER NOT NULL,
    `remarque` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Bilan_nom_key` ON `Bilan`(`nom`);

-- AddForeignKey
ALTER TABLE `BilanFile` ADD CONSTRAINT `BilanFile_consultationId_fkey` FOREIGN KEY (`consultationId`) REFERENCES `Consultation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BilanRecip` ADD CONSTRAINT `BilanRecip_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BilanRecip` ADD CONSTRAINT `BilanRecip_consultationId_fkey` FOREIGN KEY (`consultationId`) REFERENCES `Consultation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BilanItem` ADD CONSTRAINT `BilanItem_bilanRecipId_fkey` FOREIGN KEY (`bilanRecipId`) REFERENCES `BilanRecip`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BilanItem` ADD CONSTRAINT `BilanItem_bilanId_fkey` FOREIGN KEY (`bilanId`) REFERENCES `Bilan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BilanTypeItem` ADD CONSTRAINT `BilanTypeItem_bilanTypeId_fkey` FOREIGN KEY (`bilanTypeId`) REFERENCES `BilanType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BilanTypeItem` ADD CONSTRAINT `BilanTypeItem_bilanId_fkey` FOREIGN KEY (`bilanId`) REFERENCES `Bilan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
