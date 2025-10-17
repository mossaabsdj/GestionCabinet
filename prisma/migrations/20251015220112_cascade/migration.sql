-- DropForeignKey
ALTER TABLE `bilanfile` DROP FOREIGN KEY `BilanFile_consultationId_fkey`;

-- DropForeignKey
ALTER TABLE `bilanfile` DROP FOREIGN KEY `BilanFile_patientId_fkey`;

-- DropForeignKey
ALTER TABLE `bilanitem` DROP FOREIGN KEY `BilanItem_bilanRecipId_fkey`;

-- DropForeignKey
ALTER TABLE `bilanrecip` DROP FOREIGN KEY `BilanRecip_consultationId_fkey`;

-- DropForeignKey
ALTER TABLE `bilanrecip` DROP FOREIGN KEY `BilanRecip_patientId_fkey`;

-- DropForeignKey
ALTER TABLE `bilantypeitem` DROP FOREIGN KEY `BilanTypeItem_bilanTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `consultation` DROP FOREIGN KEY `Consultation_patientId_fkey`;

-- DropForeignKey
ALTER TABLE `ordonnance` DROP FOREIGN KEY `Ordonnance_consultationId_fkey`;

-- DropForeignKey
ALTER TABLE `ordonnance` DROP FOREIGN KEY `Ordonnance_patientId_fkey`;

-- DropForeignKey
ALTER TABLE `ordonnanceitem` DROP FOREIGN KEY `OrdonnanceItem_ordonnanceId_fkey`;

-- DropForeignKey
ALTER TABLE `paiement` DROP FOREIGN KEY `Paiement_patientId_fkey`;

-- DropForeignKey
ALTER TABLE `radio` DROP FOREIGN KEY `Radio_consultationId_fkey`;

-- DropForeignKey
ALTER TABLE `radio` DROP FOREIGN KEY `Radio_patientId_fkey`;

-- DropForeignKey
ALTER TABLE `recettetypeitem` DROP FOREIGN KEY `RecetteTypeItem_recetteId_fkey`;

-- DropForeignKey
ALTER TABLE `vaccination` DROP FOREIGN KEY `Vaccination_patientId_fkey`;

-- DropIndex
DROP INDEX `BilanFile_consultationId_fkey` ON `bilanfile`;

-- DropIndex
DROP INDEX `BilanFile_patientId_fkey` ON `bilanfile`;

-- DropIndex
DROP INDEX `BilanItem_bilanRecipId_fkey` ON `bilanitem`;

-- DropIndex
DROP INDEX `BilanRecip_patientId_fkey` ON `bilanrecip`;

-- DropIndex
DROP INDEX `BilanTypeItem_bilanTypeId_fkey` ON `bilantypeitem`;

-- DropIndex
DROP INDEX `Consultation_patientId_fkey` ON `consultation`;

-- DropIndex
DROP INDEX `Ordonnance_patientId_fkey` ON `ordonnance`;

-- DropIndex
DROP INDEX `OrdonnanceItem_ordonnanceId_fkey` ON `ordonnanceitem`;

-- DropIndex
DROP INDEX `Paiement_patientId_fkey` ON `paiement`;

-- DropIndex
DROP INDEX `Radio_consultationId_fkey` ON `radio`;

-- DropIndex
DROP INDEX `Radio_patientId_fkey` ON `radio`;

-- DropIndex
DROP INDEX `RecetteTypeItem_recetteId_fkey` ON `recettetypeitem`;

-- DropIndex
DROP INDEX `Vaccination_patientId_fkey` ON `vaccination`;

-- AddForeignKey
ALTER TABLE `Consultation` ADD CONSTRAINT `Consultation_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Radio` ADD CONSTRAINT `Radio_consultationId_fkey` FOREIGN KEY (`consultationId`) REFERENCES `Consultation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Radio` ADD CONSTRAINT `Radio_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BilanFile` ADD CONSTRAINT `BilanFile_consultationId_fkey` FOREIGN KEY (`consultationId`) REFERENCES `Consultation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BilanFile` ADD CONSTRAINT `BilanFile_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ordonnance` ADD CONSTRAINT `Ordonnance_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ordonnance` ADD CONSTRAINT `Ordonnance_consultationId_fkey` FOREIGN KEY (`consultationId`) REFERENCES `Consultation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrdonnanceItem` ADD CONSTRAINT `OrdonnanceItem_ordonnanceId_fkey` FOREIGN KEY (`ordonnanceId`) REFERENCES `Ordonnance`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BilanRecip` ADD CONSTRAINT `BilanRecip_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BilanRecip` ADD CONSTRAINT `BilanRecip_consultationId_fkey` FOREIGN KEY (`consultationId`) REFERENCES `Consultation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BilanItem` ADD CONSTRAINT `BilanItem_bilanRecipId_fkey` FOREIGN KEY (`bilanRecipId`) REFERENCES `BilanRecip`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BilanTypeItem` ADD CONSTRAINT `BilanTypeItem_bilanTypeId_fkey` FOREIGN KEY (`bilanTypeId`) REFERENCES `BilanType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecetteTypeItem` ADD CONSTRAINT `RecetteTypeItem_recetteId_fkey` FOREIGN KEY (`recetteId`) REFERENCES `RecetteType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Paiement` ADD CONSTRAINT `Paiement_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vaccination` ADD CONSTRAINT `Vaccination_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
