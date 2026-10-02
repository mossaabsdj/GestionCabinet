require('dotenv').config();
const { PrismaClient } = require('./app/generated/prisma');
const prisma = new PrismaClient();

async function main() {
  console.log('Testing full database query integrity...');

  const meds = await prisma.medicament.findMany({ orderBy: { nom: 'asc' } });
  console.log(`✅ Medicaments: fetched ${meds.length} records`);

  const vaccines = await prisma.vaccine.findMany({ orderBy: { createdAt: 'desc' } });
  console.log(`✅ Vaccines: fetched ${vaccines.length} records`);

  const patients = await prisma.patient.findMany({ orderBy: { createdAt: 'desc' } });
  console.log(`✅ Patients: fetched ${patients.length} records`);

  const bilans = await prisma.bilan.findMany();
  console.log(`✅ Bilans: fetched ${bilans.length} records`);

  const consultations = await prisma.consultation.findMany({
    include: {
      patient: true,
      ordonnance: { include: { items: { include: { medicament: true } } } },
      bilanRecip: { include: { items: { include: { bilan: true } } } }
    },
    take: 5
  });
  console.log(`✅ Consultations: fetched ${consultations.length} records with relations`);

  const vaccinations = await prisma.vaccination.findMany({
    include: { patient: true, vaccine: true },
    take: 5
  });
  console.log(`✅ Vaccinations: fetched ${vaccinations.length} records with relations`);

  console.log('\n🌟 ALL DATABASE QUERIES WORKING PERFECTLY!');
}

main()
  .catch((e) => {
    console.error('❌ Query failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

