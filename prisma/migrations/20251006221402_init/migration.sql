/*
  Warnings:

  - A unique constraint covering the columns `[nom]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Patient_nom_key` ON `Patient`(`nom`);
