-- DropForeignKey
ALTER TABLE `bilanitem` DROP FOREIGN KEY `BilanItem_bilanId_fkey`;

-- DropForeignKey
ALTER TABLE `bilantypeitem` DROP FOREIGN KEY `BilanTypeItem_bilanId_fkey`;

-- DropForeignKey
ALTER TABLE `ordonnanceitem` DROP FOREIGN KEY `OrdonnanceItem_medicamentId_fkey`;

-- DropForeignKey
ALTER TABLE `recettetypeitem` DROP FOREIGN KEY `RecetteTypeItem_medicamentId_fkey`;

-- DropIndex
DROP INDEX `BilanItem_bilanId_fkey` ON `bilanitem`;

-- DropIndex
DROP INDEX `BilanTypeItem_bilanId_fkey` ON `bilantypeitem`;

-- DropIndex
DROP INDEX `OrdonnanceItem_medicamentId_fkey` ON `ordonnanceitem`;

-- DropIndex
DROP INDEX `RecetteTypeItem_medicamentId_fkey` ON `recettetypeitem`;

-- AddForeignKey
ALTER TABLE `OrdonnanceItem` ADD CONSTRAINT `OrdonnanceItem_medicamentId_fkey` FOREIGN KEY (`medicamentId`) REFERENCES `Medicament`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BilanItem` ADD CONSTRAINT `BilanItem_bilanId_fkey` FOREIGN KEY (`bilanId`) REFERENCES `Bilan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BilanTypeItem` ADD CONSTRAINT `BilanTypeItem_bilanId_fkey` FOREIGN KEY (`bilanId`) REFERENCES `Bilan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecetteTypeItem` ADD CONSTRAINT `RecetteTypeItem_medicamentId_fkey` FOREIGN KEY (`medicamentId`) REFERENCES `Medicament`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
