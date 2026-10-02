-- CreateEnum
CREATE TYPE "public"."GroupeSanguin" AS ENUM ('A_POS', 'A_NEG', 'B_POS', 'B_NEG', 'AB_POS', 'AB_NEG', 'O_POS', 'O_NEG');

-- CreateTable
CREATE TABLE "public"."Patient" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "age" INTEGER,
    "dateDeNaissance" TIMESTAMP(3) NOT NULL,
    "sexe" TEXT NOT NULL,
    "telephone" TEXT,
    "adresse" TEXT,
    "antecedents" TEXT,
    "poidsDeNaissance" DOUBLE PRECISION,
    "groupeSanguin" "public"."GroupeSanguin",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Consultation" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "note" TEXT,
    "taille" DOUBLE PRECISION,
    "poids" DOUBLE PRECISION,
    "tensionSystolique" INTEGER,
    "tensionDiastolique" INTEGER,
    "temperature" DOUBLE PRECISION,
    "frequenceCardiaque" INTEGER,
    "frequenceRespiratoire" INTEGER,
    "saturationOxygene" INTEGER,
    "glycemie" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "developpementPsychomoteur" TEXT,
    "motifDeConsultation" TEXT,
    "justification" TEXT,
    "perimetreCranien" DOUBLE PRECISION,
    "rendezVousId" INTEGER,

    CONSTRAINT "Consultation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RendezVous" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,

    CONSTRAINT "RendezVous_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Radio" (
    "id" SERIAL NOT NULL,
    "consultationId" INTEGER,
    "patientId" INTEGER,
    "description" TEXT,
    "fichier" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Radio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BilanFile" (
    "id" SERIAL NOT NULL,
    "consultationId" INTEGER,
    "patientId" INTEGER,
    "type" TEXT,
    "description" TEXT,
    "fichier" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BilanFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Ordonnance" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "consultationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ordonnance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OrdonnanceItem" (
    "id" SERIAL NOT NULL,
    "ordonnanceId" INTEGER NOT NULL,
    "medicamentId" INTEGER NOT NULL,
    "dosage" TEXT,
    "frequence" TEXT,
    "duree" TEXT,
    "quantite" INTEGER,

    CONSTRAINT "OrdonnanceItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Medicament" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Medicament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Bilan" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bilan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BilanRecip" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "consultationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BilanRecip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BilanItem" (
    "id" SERIAL NOT NULL,
    "bilanRecipId" INTEGER NOT NULL,
    "bilanId" INTEGER NOT NULL,
    "resultat" TEXT,
    "remarque" TEXT,

    CONSTRAINT "BilanItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BilanType" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "BilanType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BilanTypeItem" (
    "id" SERIAL NOT NULL,
    "bilanTypeId" INTEGER NOT NULL,
    "bilanId" INTEGER NOT NULL,
    "remarque" TEXT,

    CONSTRAINT "BilanTypeItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RecetteType" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "RecetteType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RecetteTypeItem" (
    "id" SERIAL NOT NULL,
    "recetteId" INTEGER NOT NULL,
    "medicamentId" INTEGER NOT NULL,
    "dosage" TEXT,
    "frequence" TEXT,
    "duree" TEXT,
    "quantite" INTEGER,

    CONSTRAINT "RecetteTypeItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Paiement" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "montant" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Paiement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Vaccine" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vaccine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Vaccination" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "vaccineId" INTEGER NOT NULL,
    "dateGiven" TIMESTAMP(3) NOT NULL,
    "doseNumber" INTEGER,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vaccination_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_nom_key" ON "public"."Patient"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "Ordonnance_consultationId_key" ON "public"."Ordonnance"("consultationId");

-- CreateIndex
CREATE UNIQUE INDEX "Medicament_nom_key" ON "public"."Medicament"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "Bilan_nom_key" ON "public"."Bilan"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "BilanRecip_consultationId_key" ON "public"."BilanRecip"("consultationId");

-- CreateIndex
CREATE UNIQUE INDEX "Vaccine_name_key" ON "public"."Vaccine"("name");

-- AddForeignKey
ALTER TABLE "public"."Consultation" ADD CONSTRAINT "Consultation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Consultation" ADD CONSTRAINT "Consultation_rendezVousId_fkey" FOREIGN KEY ("rendezVousId") REFERENCES "public"."RendezVous"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Radio" ADD CONSTRAINT "Radio_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "public"."Consultation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Radio" ADD CONSTRAINT "Radio_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BilanFile" ADD CONSTRAINT "BilanFile_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "public"."Consultation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BilanFile" ADD CONSTRAINT "BilanFile_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Ordonnance" ADD CONSTRAINT "Ordonnance_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Ordonnance" ADD CONSTRAINT "Ordonnance_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "public"."Consultation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrdonnanceItem" ADD CONSTRAINT "OrdonnanceItem_ordonnanceId_fkey" FOREIGN KEY ("ordonnanceId") REFERENCES "public"."Ordonnance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrdonnanceItem" ADD CONSTRAINT "OrdonnanceItem_medicamentId_fkey" FOREIGN KEY ("medicamentId") REFERENCES "public"."Medicament"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BilanRecip" ADD CONSTRAINT "BilanRecip_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BilanRecip" ADD CONSTRAINT "BilanRecip_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "public"."Consultation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BilanItem" ADD CONSTRAINT "BilanItem_bilanRecipId_fkey" FOREIGN KEY ("bilanRecipId") REFERENCES "public"."BilanRecip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BilanItem" ADD CONSTRAINT "BilanItem_bilanId_fkey" FOREIGN KEY ("bilanId") REFERENCES "public"."Bilan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BilanTypeItem" ADD CONSTRAINT "BilanTypeItem_bilanTypeId_fkey" FOREIGN KEY ("bilanTypeId") REFERENCES "public"."BilanType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BilanTypeItem" ADD CONSTRAINT "BilanTypeItem_bilanId_fkey" FOREIGN KEY ("bilanId") REFERENCES "public"."Bilan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RecetteTypeItem" ADD CONSTRAINT "RecetteTypeItem_recetteId_fkey" FOREIGN KEY ("recetteId") REFERENCES "public"."RecetteType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RecetteTypeItem" ADD CONSTRAINT "RecetteTypeItem_medicamentId_fkey" FOREIGN KEY ("medicamentId") REFERENCES "public"."Medicament"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Paiement" ADD CONSTRAINT "Paiement_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Vaccination" ADD CONSTRAINT "Vaccination_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Vaccination" ADD CONSTRAINT "Vaccination_vaccineId_fkey" FOREIGN KEY ("vaccineId") REFERENCES "public"."Vaccine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
