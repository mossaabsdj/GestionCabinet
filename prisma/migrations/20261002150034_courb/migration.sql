-- CreateTable
CREATE TABLE "public"."Justification" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "consultationId" INTEGER,
    "titre" TEXT,
    "texte" TEXT NOT NULL,
    "dateDebut" TIMESTAMP(3),
    "dateFin" TIMESTAMP(3),
    "duree" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Justification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."JustificationType" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "texte" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JustificationType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Cabinet" (
    "id" SERIAL NOT NULL,
    "title" TEXT DEFAULT 'Professeur',
    "doctorName" TEXT NOT NULL DEFAULT 'Professeur',
    "doctorNameAr" TEXT DEFAULT 'بروفيسور',
    "specialty" TEXT DEFAULT 'Médecin Spécialiste en Pédiatrie et Néonatologie',
    "specialtyAr" TEXT DEFAULT 'طبيبة مختصة في طب الأطفال و حديثي الولادة',
    "cabinetName" TEXT DEFAULT 'Cabinet Pédiatrique',
    "cabinetNameAr" TEXT DEFAULT 'عيادة طب الأطفال',
    "address" TEXT DEFAULT 'Rue Frères KAFI logts 38, 1er étage',
    "addressAr" TEXT DEFAULT 'شارع الإخوة كافي عقار 38 الطابق الأول',
    "city" TEXT DEFAULT 'El-Harrouch SKIKDA',
    "cityAr" TEXT DEFAULT '(بزاز لعلاوي) الحروش - سكيكدة',
    "phones" TEXT DEFAULT '0652 76 89 72 / 0562 24 40 87',
    "logo" TEXT DEFAULT '/uploads/image.PNG',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cabinet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CourbeInfo" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "consultationId" INTEGER,
    "age" TEXT,
    "poids" DOUBLE PRECISION,
    "taille" DOUBLE PRECISION,
    "perimetreCranien" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourbeInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Justification_consultationId_key" ON "public"."Justification"("consultationId");

-- CreateIndex
CREATE UNIQUE INDEX "JustificationType_nom_key" ON "public"."JustificationType"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "CourbeInfo_consultationId_key" ON "public"."CourbeInfo"("consultationId");

-- AddForeignKey
ALTER TABLE "public"."Justification" ADD CONSTRAINT "Justification_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Justification" ADD CONSTRAINT "Justification_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "public"."Consultation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CourbeInfo" ADD CONSTRAINT "CourbeInfo_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CourbeInfo" ADD CONSTRAINT "CourbeInfo_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "public"."Consultation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
