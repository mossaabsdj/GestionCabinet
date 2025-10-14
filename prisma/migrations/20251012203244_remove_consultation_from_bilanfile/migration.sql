-- AlterTable
ALTER TABLE `bilanfile` ADD COLUMN `patientId` INTEGER NULL;

-- AlterTable
ALTER TABLE `radio` ADD COLUMN `patientId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Radio` ADD CONSTRAINT `Radio_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BilanFile` ADD CONSTRAINT `BilanFile_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
