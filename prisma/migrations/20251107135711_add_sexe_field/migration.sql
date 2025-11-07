-- AlterTable
ALTER TABLE `consultation` ADD COLUMN `motifDeConsultation` VARCHAR(191) NULL,
    ADD COLUMN `perimetreCranien` DOUBLE NULL,
    ADD COLUMN `rendezVousId` INTEGER NULL;

-- CreateTable
CREATE TABLE `RendezVous` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Consultation` ADD CONSTRAINT `Consultation_rendezVousId_fkey` FOREIGN KEY (`rendezVousId`) REFERENCES `RendezVous`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
