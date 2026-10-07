/*
  Warnings:

  - You are about to drop the column `developpementPsychomoteur` on the `Consultation` table. All the data in the column will be lost.
  - You are about to drop the column `perimetreCranien` on the `Consultation` table. All the data in the column will be lost.
  - You are about to drop the column `poidsDeNaissance` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the `CourbeInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."CourbeInfo" DROP CONSTRAINT "CourbeInfo_consultationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CourbeInfo" DROP CONSTRAINT "CourbeInfo_patientId_fkey";

-- AlterTable
ALTER TABLE "public"."Cabinet" ALTER COLUMN "title" SET DEFAULT 'Docteur',
ALTER COLUMN "doctorName" SET DEFAULT 'Docteur',
ALTER COLUMN "doctorNameAr" SET DEFAULT 'دكتور',
ALTER COLUMN "specialty" SET DEFAULT 'Chirurgien Dentiste',
ALTER COLUMN "specialtyAr" SET DEFAULT 'جراحة و طب الأسنان',
ALTER COLUMN "cabinetName" SET DEFAULT 'Cabinet Dentaire',
ALTER COLUMN "cabinetNameAr" SET DEFAULT 'عيادة طب الأسنان';

-- AlterTable
ALTER TABLE "public"."Consultation" DROP COLUMN "developpementPsychomoteur",
DROP COLUMN "perimetreCranien";

-- AlterTable
ALTER TABLE "public"."Patient" DROP COLUMN "poidsDeNaissance";

-- DropTable
DROP TABLE "public"."CourbeInfo";
