-- DropForeignKey
ALTER TABLE `bilanfile` DROP FOREIGN KEY `BilanFile_consultationId_fkey`;

-- DropForeignKey
ALTER TABLE `radio` DROP FOREIGN KEY `Radio_consultationId_fkey`;

-- DropIndex
DROP INDEX `BilanFile_consultationId_fkey` ON `bilanfile`;

-- DropIndex
DROP INDEX `Radio_consultationId_fkey` ON `radio`;

-- AlterTable
ALTER TABLE `bilanfile` MODIFY `consultationId` INTEGER NULL;

-- AlterTable
ALTER TABLE `radio` MODIFY `consultationId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Radio` ADD CONSTRAINT `Radio_consultationId_fkey` FOREIGN KEY (`consultationId`) REFERENCES `Consultation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BilanFile` ADD CONSTRAINT `BilanFile_consultationId_fkey` FOREIGN KEY (`consultationId`) REFERENCES `Consultation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
