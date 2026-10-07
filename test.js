/**
 * test.js - Comprehensive Pediatric Medical Database Seeder
 *
 * Populates the PostgreSQL / Neon database with realistic, coherent clinical data
 * for all Prisma models in the application.
 *
 * Safe to run repeatedly (idempotent batch inserts & relationship checks).
 */

const fs = require("fs");
const path = require("path");

// 1. Load environment variables from .env if present
function loadEnv() {
  const envPath = path.join(__dirname, ".env");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf8");
    envContent.split("\n").forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#")) {
        const firstEqual = trimmed.indexOf("=");
        if (firstEqual > 0) {
          const key = trimmed.substring(0, firstEqual).trim();
          let val = trimmed.substring(firstEqual + 1).trim();
          if (
            (val.startsWith('"') && val.endsWith('"')) ||
            (val.startsWith("'") && val.endsWith("'"))
          ) {
            val = val.substring(1, val.length - 1);
          }
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    });
  }
}

loadEnv();

// 2. Reuse the project's generated Prisma Client
let PrismaClient;
try {
  PrismaClient = require("./app/generated/prisma").PrismaClient;
} catch (e) {
  try {
    PrismaClient = require("@prisma/client").PrismaClient;
  } catch (err) {
    console.error("❌ Impossible de charger PrismaClient :", err.message);
    process.exit(1);
  }
}

const prisma = new PrismaClient({
  log: ["error", "warn"],
});

// Helper for safe query execution with retry
async function safeExec(fn, retries = 3) {
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries) throw err;
      const waitTime = (i + 1) * 1000;
      console.log(
        `   ⏳ Connexion en cours (tentative ${i + 1}/${retries})...`,
      );
      await new Promise((r) => setTimeout(r, waitTime));
    }
  }
}

// ==========================================
// SEED DATA DEFINITIONS
// ==========================================

const MEDICAMENTS_DATA = [
  { nom: "Paracétamol Sirop 2.4% (Doliprane)" },
  { nom: "Amoxicilline 250mg/5ml suspension (Clamoxyl)" },
  { nom: "Amoxicilline + Acide Clavulanique 100mg/12.5mg (Augmentin)" },
  { nom: "Célestène 0.05% solution buvable en gouttes (Bétaméthasone)" },
  { nom: "Ibuprofène 20mg/ml suspension (Advil pédiatrique)" },
  { nom: "Sérum physiologique 0.9% (Dosettes 5ml)" },
  { nom: "Smecta 3g sachets pédiatrique (Diosmectite)" },
  { nom: "Soluté de Réhydratation Orale (SRO / Adiaril)" },
  { nom: "Ventoline 100µg/dose spray aérosol" },
  { nom: "Flixotide 50µg spray avec chambre d'inhalation (Babyhaler)" },
  { nom: "Zyrtec (Cétirizine) solution buvable 10mg/ml" },
  { nom: "Gaviscon suspension buvable nourrissons" },
  { nom: "Ferrostrane 0.68% sirop (Fer ferrique)" },
  { nom: "Vitamine D3 (Zyma D) 10 000 UI/ml gouttes" },
  { nom: "Bactrim pédiatrique suspension (Sulfaméthoxazole + Triméthoprime)" },
  { nom: "Josacine 250mg/5ml suspension (Josamycine)" },
  { nom: "Ultra-Levure 50mg sachets pédiatriques" },
  { nom: "Tiorfan 10mg sachets nourrissons (Racécadotril)" },
];

const BILANS_DATA = [
  { nom: "NFS (Numération Formule Sanguine)" },
  { nom: "CRP (Protéine C-Réactive)" },
  { nom: "Vitesse de sédimentation (VS)" },
  { nom: "ECBU (Examen Cytobactériologique des Urines)" },
  { nom: "Ferritine sérique + Fer sérique" },
  { nom: "Ionogramme sanguin (Sodium, Potassium, Chlore)" },
  { nom: "Glycémie à jeun" },
  { nom: "Bilan hépatique (ASAT / ALAT / Bilirubine)" },
  { nom: "Urée & Créatinine plasmatique" },
  { nom: "Coproculture & Examen Parasitologique des Selles" },
  { nom: "Sérologie Maladie Coeliaque (Anti-transglutaminase IgA)" },
  { nom: "Bilan Phospho-calcique & 25-OH Vitamine D" },
  { nom: "Bilan d'Hémostase (TP, TCA, Fibrinogène)" },
];

const VACCINES_DATA = [
  { name: "BCG + Hépatite B (Naissance)" },
  { name: "Pentavalent 1ère dose (DTC-Hib-HBV) + VPI - 2 mois" },
  { name: "Pneumocoque conjugué (PCV 13) 1ère dose - 2 mois" },
  { name: "Pentavalent 2ème dose + VPO - 4 mois" },
  { name: "Pneumocoque conjugué (PCV 13) 2ème dose - 4 mois" },
  { name: "Pentavalent 3ème dose + VPO - 12 mois" },
  { name: "ROR 1ère dose (Rougeole-Oreillons-Rubéole) - 11 mois" },
  { name: "ROR 2ème dose (Rappel) - 18 mois" },
  { name: "Vaccin DTPolio (Rappel scolaire 6 ans)" },
];

const PATIENTS_DATA = [
  {
    nom: "Benali Yacine",
    age: 3,
    dateDeNaissance: new Date("2023-04-15"),
    sexe: "M",
    telephone: "0550123456",
    adresse: "Cité 500 Logements, Bloc B, Skikda",
    antecedents: "Bronchiolite à 6 mois, Pas d'allergie connue",
    groupeSanguin: "O_POS",
  },
  {
    nom: "Boudiaf Meriem",
    age: 1,
    dateDeNaissance: new Date("2025-06-10"),
    sexe: "F",
    telephone: "0561234567",
    adresse: "Rue Frères Kafi, El-Harrouch, Skikda",
    antecedents:
      "Accouchement à terme, APLV suspectée (Allergie Lait de Vache)",
    groupeSanguin: "A_POS",
  },
  {
    nom: "Zitouni Rayan",
    age: 5,
    dateDeNaissance: new Date("2021-09-22"),
    sexe: "M",
    telephone: "0770345678",
    adresse: "Boulevard Didouche Mourad, Skikda",
    antecedents: "Asthme de la petite enfance sous Flixotide au besoin",
    groupeSanguin: "B_POS",
  },
  {
    nom: "Khelifi Aya",
    age: 7,
    dateDeNaissance: new Date("2019-11-05"),
    sexe: "F",
    telephone: "0661987654",
    adresse: "Cité des Jardins, Azzaba, Skikda",
    antecedents: "Otites séromuqueuses récidivantes, amygdalectomie en 2024",
    groupeSanguin: "O_POS",
  },
  {
    nom: "Mansouri Adam",
    age: 2,
    dateDeNaissance: new Date("2024-02-18"),
    sexe: "M",
    telephone: "0558765432",
    adresse: "Cité 20 Août 1955, Skikda",
    antecedents: "Aucun, bon état général",
    groupeSanguin: "AB_POS",
  },
  {
    nom: "Derradji Sarah",
    age: 4,
    dateDeNaissance: new Date("2022-07-30"),
    sexe: "F",
    telephone: "0560112233",
    adresse: "Cité Bachir Boukadoum, Ramdane Djamel, Skikda",
    antecedents: "Eczéma atopique",
    groupeSanguin: "A_NEG",
  },
];

// ==========================================
// MAIN SEED FUNCTION
// ==========================================
async function main() {
  console.log("\n=======================================================");
  console.log("🏥 Initialisation du Seeder Médical (Base PostgreSQL / Neon)");
  console.log("=======================================================\n");

  // 1. Médicaments en lot
  console.log("💊 1/8. Insertion des Médicaments Pédiatriques...");
  await safeExec(() =>
    prisma.medicament.createMany({
      data: MEDICAMENTS_DATA,
      skipDuplicates: true,
    }),
  );
  const allMeds = await safeExec(() => prisma.medicament.findMany());
  const medicamentMap = {};
  allMeds.forEach((m) => (medicamentMap[m.nom] = m));
  console.log(`   ✅ ${allMeds.length} médicaments prêts.`);

  // 2. Bilans en lot
  console.log("\n🧪 2/8. Insertion des Bilans et Analyses...");
  await safeExec(() =>
    prisma.bilan.createMany({
      data: BILANS_DATA,
      skipDuplicates: true,
    }),
  );
  const allBilans = await safeExec(() => prisma.bilan.findMany());
  const bilanMap = {};
  allBilans.forEach((b) => (bilanMap[b.nom] = b));
  console.log(`   ✅ ${allBilans.length} types d'analyses prêts.`);

  // 3. Vaccins en lot
  console.log("\n💉 3/8. Insertion du Calendrier Vaccinal...");
  await safeExec(() =>
    prisma.vaccine.createMany({
      data: VACCINES_DATA,
      skipDuplicates: true,
    }),
  );
  const allVaccines = await safeExec(() => prisma.vaccine.findMany());
  const vaccineMap = {};
  allVaccines.forEach((v) => (vaccineMap[v.name] = v));
  console.log(`   ✅ ${allVaccines.length} vaccins prêts.`);

  // 4. Recettes Types (Ordonnances Prédéfinies)
  console.log(
    "\n📋 4/8. Insertion des Ordonnances Prédéfinies (RecetteType)...",
  );
  const RECETTES_PRESET = [
    {
      nom: "Angine bactérienne / Otite aiguë",
      items: [
        {
          medName: "Amoxicilline 250mg/5ml suspension (Clamoxyl)",
          dosage: "80 mg/kg/j en 3 prises",
          frequence: "Toutes les 8 heures",
          duree: "6 jours",
          quantite: 2,
        },
        {
          medName: "Paracétamol Sirop 2.4% (Doliprane)",
          dosage: "1 dose-poids",
          frequence: "Toutes les 6 heures si T° > 38.5°C",
          duree: "3 à 5 jours",
          quantite: 1,
        },
        {
          medName: "Sérum physiologique 0.9% (Dosettes 5ml)",
          dosage: "1 dosette dans chaque narine",
          frequence: "4 fois par jour avant les repas",
          duree: "7 jours",
          quantite: 1,
        },
      ],
    },
    {
      nom: "Bronchiolite / Crise d'asthme du nourrisson",
      items: [
        {
          medName: "Ventoline 100µg/dose spray aérosol",
          dosage: "2 bouffées avec chambre d'inhalation",
          frequence: "4 à 6 fois par jour selon encombrement",
          duree: "5 jours",
          quantite: 1,
        },
        {
          medName:
            "Célestène 0.05% solution buvable en gouttes (Bétaméthasone)",
          dosage: "10 gouttes/kg/j en 1 prise matinale",
          frequence: "Le matin après le petit-déjeuner",
          duree: "3 jours",
          quantite: 1,
        },
        {
          medName: "Sérum physiologique 0.9% (Dosettes 5ml)",
          dosage: "Désobstruction rhinopharyngée (DRP)",
          frequence: "Avant chaque tétée / repas",
          duree: "7 jours",
          quantite: 2,
        },
      ],
    },
    {
      nom: "Gastro-Entérite Aiguë (GEA) avec diarrhée",
      items: [
        {
          medName: "Soluté de Réhydratation Orale (SRO / Adiaril)",
          dosage: "1 sachet dans 200 ml d'eau minérale",
          frequence: "À volonté par petites gorgées après chaque selle",
          duree: "3 jours",
          quantite: 2,
        },
        {
          medName: "Smecta 3g sachets pédiatrique (Diosmectite)",
          dosage: "1 sachet par jour dilué dans compote ou biberon",
          frequence: "En 2 prises",
          duree: "4 jours",
          quantite: 1,
        },
        {
          medName: "Paracétamol Sirop 2.4% (Doliprane)",
          dosage: "1 dose-poids",
          frequence: "En cas de fièvre ou douleurs abdominales",
          duree: "3 jours",
          quantite: 1,
        },
      ],
    },
  ];

  for (const r of RECETTES_PRESET) {
    let existingRecette = await safeExec(() =>
      prisma.recetteType.findFirst({
        where: { nom: r.nom },
        include: { items: true },
      }),
    );

    if (!existingRecette) {
      existingRecette = await safeExec(() =>
        prisma.recetteType.create({
          data: { nom: r.nom },
        }),
      );
    }

    if (!existingRecette.items || existingRecette.items.length === 0) {
      const itemsToCreate = [];
      for (const item of r.items) {
        const med = medicamentMap[item.medName];
        if (med) {
          itemsToCreate.push({
            recetteId: existingRecette.id,
            medicamentId: med.id,
            dosage: item.dosage,
            frequence: item.frequence,
            duree: item.duree,
            quantite: item.quantite,
          });
        }
      }
      if (itemsToCreate.length > 0) {
        await safeExec(() =>
          prisma.recetteTypeItem.createMany({
            data: itemsToCreate,
          }),
        );
      }
    }
  }
  console.log(
    `   ✅ ${RECETTES_PRESET.length} modèles d'ordonnances configurés.`,
  );

  // 5. Bilans Types
  console.log("\n📑 5/8. Insertion des Bilans Prédéfinis (BilanType)...");
  const BILAN_TYPES_PRESET = [
    {
      nom: "Bilan Infectieux / Syndrome Inflammatoire",
      items: [
        {
          bilanName: "NFS (Numération Formule Sanguine)",
          remarque: "Recherche hyperleucocytose ou neutropénie",
        },
        {
          bilanName: "CRP (Protéine C-Réactive)",
          remarque: "Dosage quantitatif rapide",
        },
        {
          bilanName: "Vitesse de sédimentation (VS)",
          remarque: "1ère et 2ème heure",
        },
      ],
    },
    {
      nom: "Bilan Anémie / Pâleur Carentielle",
      items: [
        {
          bilanName: "NFS (Numération Formule Sanguine)",
          remarque: "Microcytose et hypochromie",
        },
        {
          bilanName: "Ferritine sérique + Fer sérique",
          remarque: "À jeun le matin",
        },
      ],
    },
    {
      nom: "Bilan Infection Urinaire / Fièvre inexpliquée",
      items: [
        {
          bilanName: "ECBU (Examen Cytobactériologique des Urines)",
          remarque: "Recueil poche stérile ou milieu de jet",
        },
        {
          bilanName: "CRP (Protéine C-Réactive)",
          remarque: "Évaluation du retentissement parenchymateux",
        },
        {
          bilanName: "Urée & Créatinine plasmatique",
          remarque: "Fonction rénale",
        },
      ],
    },
    {
      nom: "Bilan Pré-Opératoire Pédiatrique",
      items: [
        {
          bilanName: "NFS (Numération Formule Sanguine)",
          remarque: "Taux d'hémoglobine et plaquettes",
        },
        {
          bilanName: "Bilan d'Hémostase (TP, TCA, Fibrinogène)",
          remarque: "Recherche coagulopathie",
        },
      ],
    },
  ];

  for (const bt of BILAN_TYPES_PRESET) {
    let existingBT = await safeExec(() =>
      prisma.bilanType.findFirst({
        where: { nom: bt.nom },
        include: { items: true },
      }),
    );

    if (!existingBT) {
      existingBT = await safeExec(() =>
        prisma.bilanType.create({
          data: { nom: bt.nom },
        }),
      );
    }

    if (!existingBT.items || existingBT.items.length === 0) {
      const itemsToCreate = [];
      for (const item of bt.items) {
        const bilan = bilanMap[item.bilanName];
        if (bilan) {
          itemsToCreate.push({
            bilanTypeId: existingBT.id,
            bilanId: bilan.id,
            remarque: item.remarque,
          });
        }
      }
      if (itemsToCreate.length > 0) {
        await safeExec(() =>
          prisma.bilanTypeItem.createMany({
            data: itemsToCreate,
          }),
        );
      }
    }
  }
  console.log(
    `   ✅ ${BILAN_TYPES_PRESET.length} protocoles de bilans types configurés.`,
  );

  // 6. Patients en lot
  console.log("\n👶 6/8. Insertion des Dossiers Patients Pédiatriques...");
  await safeExec(() =>
    prisma.patient.createMany({
      data: PATIENTS_DATA,
      skipDuplicates: true,
    }),
  );
  const allPatients = await safeExec(() => prisma.patient.findMany());
  const patientMap = {};
  allPatients.forEach((p) => (patientMap[p.nom] = p));
  console.log(`   ✅ ${allPatients.length} patients enregistrés.`);

  // 7. Rendez-vous
  console.log("\n📅 7/8. Insertion des Rendez-vous...");
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(10, 30, 0, 0);

  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  nextWeek.setHours(14, 0, 0, 0);

  let rdv1 = await safeExec(() =>
    prisma.rendezVous.findFirst({
      where: { description: { contains: "otite" } },
    }),
  );
  if (!rdv1) {
    rdv1 = await safeExec(() =>
      prisma.rendezVous.create({
        data: {
          date: tomorrow,
          description:
            "Contrôle post-traitement otite aiguë et vérification tympanique",
        },
      }),
    );
  }

  let rdv2 = await safeExec(() =>
    prisma.rendezVous.findFirst({
      where: { description: { contains: "vaccination" } },
    }),
  );
  if (!rdv2) {
    rdv2 = await safeExec(() =>
      prisma.rendezVous.create({
        data: {
          date: nextWeek,
          description:
            "Visite de suivi du développement et rappel de vaccination ROR",
        },
      }),
    );
  }
  console.log("   ✅ Rendez-vous prêts.");

  // 8. Workflow Cliniques Complets
  console.log(
    "\n🩺 8/8. Génération des Consultations, Ordonnances & Actes Cliniques...",
  );

  // Patient 1: Benali Yacine
  const p1 = patientMap["Benali Yacine"];
  if (p1) {
    const existingConsult = await safeExec(() =>
      prisma.consultation.findFirst({
        where: { patientId: p1.id },
      }),
    );

    if (!existingConsult) {
      const consult1 = await safeExec(() =>
        prisma.consultation.create({
          data: {
            patientId: p1.id,
            motifDeConsultation:
              "Fièvre à 39°C depuis 48h, odynophagie et refus d'alimentation",
            note: "Examen ORL : pharynx très érythémateux, amygdales hypertrophiées avec exsudat pultacé bilatéral. Adénopathies sous-angulomaxillaires sensibles. Auscultation pulmonaire normale.",
            justification:
              "Arrêt maladie garde d'enfant pour le père (3 jours).",
            rendezVousId: rdv1 ? rdv1.id : null,
          },
        }),
      );

      const ord1 = await safeExec(() =>
        prisma.ordonnance.create({
          data: {
            patientId: p1.id,
            consultationId: consult1.id,
          },
        }),
      );

      const medAmox =
        medicamentMap["Amoxicilline 250mg/5ml suspension (Clamoxyl)"];
      const medDoli = medicamentMap["Paracétamol Sirop 2.4% (Doliprane)"];
      const medSerum = medicamentMap["Sérum physiologique 0.9% (Dosettes 5ml)"];

      const ordItems = [];
      if (medAmox) {
        ordItems.push({
          ordonnanceId: ord1.id,
          medicamentId: medAmox.id,
          dosage: "1 dose-poids 15kg (3 fois par jour)",
          frequence: "Toutes les 8h au milieu des repas",
          duree: "6 jours",
          quantite: 2,
        });
      }
      if (medDoli) {
        ordItems.push({
          ordonnanceId: ord1.id,
          medicamentId: medDoli.id,
          dosage: "1 dose-poids 15kg",
          frequence: "Toutes les 6h si température > 38.5°C",
          duree: "3 jours",
          quantite: 1,
        });
      }
      if (medSerum) {
        ordItems.push({
          ordonnanceId: ord1.id,
          medicamentId: medSerum.id,
          dosage: "Lavage nasal doux",
          frequence: "3 fois par jour",
          duree: "5 jours",
          quantite: 1,
        });
      }

      if (ordItems.length > 0) {
        await safeExec(() =>
          prisma.ordonnanceItem.createMany({
            data: ordItems,
          }),
        );
      }

      await safeExec(() =>
        prisma.paiement.create({
          data: {
            patientId: p1.id,
            montant: 2500.0,
            date: new Date(),
          },
        }),
      );

      const vBcg = vaccineMap["BCG + Hépatite B (Naissance)"];
      const vPenta1 =
        vaccineMap["Pentavalent 1ère dose (DTC-Hib-HBV) + VPI - 2 mois"];
      if (vBcg) {
        await safeExec(() =>
          prisma.vaccination.create({
            data: {
              patientId: p1.id,
              vaccineId: vBcg.id,
              dateGiven: new Date("2023-04-16"),
              doseNumber: 1,
              notes: "Fait à la maternité, cicatrice vaccinale visible.",
            },
          }),
        );
      }
      if (vPenta1) {
        await safeExec(() =>
          prisma.vaccination.create({
            data: {
              patientId: p1.id,
              vaccineId: vPenta1.id,
              dateGiven: new Date("2023-06-20"),
              doseNumber: 1,
              notes: "Bonne tolérance, absence de fièvre.",
            },
          }),
        );
      }
    }
  }

  // Patient 2: Boudiaf Meriem
  const p2 = patientMap["Boudiaf Meriem"];
  if (p2) {
    const existingConsult = await safeExec(() =>
      prisma.consultation.findFirst({
        where: { patientId: p2.id },
      }),
    );

    if (!existingConsult) {
      const consult2 = await safeExec(() =>
        prisma.consultation.create({
          data: {
            patientId: p2.id,
            motifDeConsultation:
              "Épisodes de diarrhée aiguë liquide (5 selles/j) et vomissements depuis 24h",
            note: "Signes de déshydratation légers (< 5%) : muqueuses un peu sèches, pli cutané s'efface vite, yeux normaux, fontanelle antérieure normo-tendue. Abdomen souple et dépressible.",
            justification:
              "Arrêt travail pour la mère afin d'assurer la réhydratation de l'enfant (2 jours).",
            rendezVousId: rdv2 ? rdv2.id : null,
          },
        }),
      );

      const ord2 = await safeExec(() =>
        prisma.ordonnance.create({
          data: {
            patientId: p2.id,
            consultationId: consult2.id,
          },
        }),
      );

      const medSro =
        medicamentMap["Soluté de Réhydratation Orale (SRO / Adiaril)"];
      const medSmecta =
        medicamentMap["Smecta 3g sachets pédiatrique (Diosmectite)"];

      const ordItems2 = [];
      if (medSro) {
        ordItems2.push({
          ordonnanceId: ord2.id,
          medicamentId: medSro.id,
          dosage: "1 sachet dans 200 ml d'eau",
          frequence: "À volonté par petites gorgées régulières",
          duree: "48 heures",
          quantite: 2,
        });
      }
      if (medSmecta) {
        ordItems2.push({
          ordonnanceId: ord2.id,
          medicamentId: medSmecta.id,
          dosage: "1 sachet par jour",
          frequence: "En 2 prises mélangé aux repas",
          duree: "3 jours",
          quantite: 1,
        });
      }

      if (ordItems2.length > 0) {
        await safeExec(() =>
          prisma.ordonnanceItem.createMany({
            data: ordItems2,
          }),
        );
      }

      const bilanRecip2 = await safeExec(() =>
        prisma.bilanRecip.create({
          data: {
            patientId: p2.id,
            consultationId: consult2.id,
          },
        }),
      );

      const bIono = bilanMap["Ionogramme sanguin (Sodium, Potassium, Chlore)"];
      const bCrp = bilanMap["CRP (Protéine C-Réactive)"];
      const bCopro =
        bilanMap["Coproculture & Examen Parasitologique des Selles"];

      const bilanItems2 = [];
      if (bIono) {
        bilanItems2.push({
          bilanRecipId: bilanRecip2.id,
          bilanId: bIono.id,
          resultat:
            "Na+: 139 mEq/L, K+: 4.2 mEq/L, Cl-: 102 mEq/L (Équilibre hydro-électrolytique normal)",
          remarque: "Urgence bilan de déshydratation",
        });
      }
      if (bCrp) {
        bilanItems2.push({
          bilanRecipId: bilanRecip2.id,
          bilanId: bCrp.id,
          resultat: "CRP: 8.5 mg/L (Légère réaction inflammatoire)",
          remarque: "Contrôle étiologie virale",
        });
      }
      if (bCopro) {
        bilanItems2.push({
          bilanRecipId: bilanRecip2.id,
          bilanId: bCopro.id,
          resultat: "Rotavirus positif (+), Absence de salmonelle et shigelle",
          remarque: "Gastro-entérite virale à Rotavirus confirmée",
        });
      }

      if (bilanItems2.length > 0) {
        await safeExec(() =>
          prisma.bilanItem.createMany({
            data: bilanItems2,
          }),
        );
      }

      await safeExec(() =>
        prisma.bilanFile.create({
          data: {
            patientId: p2.id,
            consultationId: consult2.id,
            type: "PDF Rapport Laboratoire",
            description:
              "Rapport complet du laboratoire d'analyses médicales El-Harrouch",
            fichier: "/uploads/bilans/bilan_boudiaf_meriem.pdf",
          },
        }),
      );

      await safeExec(() =>
        prisma.paiement.create({
          data: {
            patientId: p2.id,
            montant: 2500.0,
            date: new Date(),
          },
        }),
      );

      const vRor1 =
        vaccineMap["ROR 1ère dose (Rougeole-Oreillons-Rubéole) - 11 mois"];
      if (vRor1) {
        await safeExec(() =>
          prisma.vaccination.create({
            data: {
              patientId: p2.id,
              vaccineId: vRor1.id,
              dateGiven: new Date("2026-05-15"),
              doseNumber: 1,
              notes: "Vaccination ROR effectuée à 11 mois sans incident.",
            },
          }),
        );
      }
    }
  }

  // Patient 3: Zitouni Rayan
  const p3 = patientMap["Zitouni Rayan"];
  if (p3) {
    const existingConsult = await safeExec(() =>
      prisma.consultation.findFirst({
        where: { patientId: p3.id },
      }),
    );

    if (!existingConsult) {
      const consult3 = await safeExec(() =>
        prisma.consultation.create({
          data: {
            patientId: p3.id,
            motifDeConsultation:
              "Toux nocturne quinteuse et sifflements respiratoires depuis 3 jours",
            note: "Auscultation : râles sibilants diffus aux deux champs pulmonaires, allongement du temps expiratoire. Pas de tirage sus-sternal ni intercostal majeur. SpO2 à 96% à l'air libre.",
            justification:
              "Éviction scolaire et dispense d'activités physiques intenses pendant 5 jours.",
          },
        }),
      );

      const ord3 = await safeExec(() =>
        prisma.ordonnance.create({
          data: {
            patientId: p3.id,
            consultationId: consult3.id,
          },
        }),
      );

      const medVento = medicamentMap["Ventoline 100µg/dose spray aérosol"];
      const medFlixo =
        medicamentMap[
          "Flixotide 50µg spray avec chambre d'inhalation (Babyhaler)"
        ];
      const medCeles =
        medicamentMap[
          "Célestène 0.05% solution buvable en gouttes (Bétaméthasone)"
        ];

      const ordItems3 = [];
      if (medVento) {
        ordItems3.push({
          ordonnanceId: ord3.id,
          medicamentId: medVento.id,
          dosage: "2 bouffées dans la chambre d'inhalation",
          frequence: "4 fois par jour pendant 5 jours puis à la demande",
          duree: "7 jours",
          quantite: 1,
        });
      }
      if (medFlixo) {
        ordItems3.push({
          ordonnanceId: ord3.id,
          medicamentId: medFlixo.id,
          dosage: "1 bouffée matin et soir",
          frequence: "Traitement de fond quotidien",
          duree: "1 mois",
          quantite: 1,
        });
      }
      if (medCeles) {
        ordItems3.push({
          ordonnanceId: ord3.id,
          medicamentId: medCeles.id,
          dosage: "180 gouttes le matin (10 gttes/kg)",
          frequence: "Pendant 3 jours le matin",
          duree: "3 jours",
          quantite: 1,
        });
      }

      if (ordItems3.length > 0) {
        await safeExec(() =>
          prisma.ordonnanceItem.createMany({
            data: ordItems3,
          }),
        );
      }

      await safeExec(() =>
        prisma.radio.create({
          data: {
            patientId: p3.id,
            consultationId: consult3.id,
            description:
              "Radiographie du thorax (face) : distension thoracique modérée, accentuation des hiles vasculaires, pas de foyer alvéolaire de condensation.",
            fichier: "/uploads/radios/rx_thorax_zitouni_rayan.jpg",
          },
        }),
      );

      await safeExec(() =>
        prisma.paiement.create({
          data: {
            patientId: p3.id,
            montant: 3000.0,
            date: new Date(),
          },
        }),
      );
    }
  }

  // Patients 4 & 5 - Vaccinations
  const p4 = patientMap["Khelifi Aya"];
  if (p4) {
    const v6ans = vaccineMap["Vaccin DTPolio (Rappel scolaire 6 ans)"];
    if (v6ans) {
      const existingVac = await safeExec(() =>
        prisma.vaccination.findFirst({
          where: { patientId: p4.id, vaccineId: v6ans.id },
        }),
      );
      if (!existingVac) {
        await safeExec(() =>
          prisma.vaccination.create({
            data: {
              patientId: p4.id,
              vaccineId: v6ans.id,
              dateGiven: new Date("2025-11-10"),
              doseNumber: 4,
              notes: "Rappel scolaire des 6 ans validé sur carnet de santé.",
            },
          }),
        );
      }
    }
  }

  const p5 = patientMap["Mansouri Adam"];
  if (p5) {
    const vPenta3 = vaccineMap["Pentavalent 3ème dose + VPO - 12 mois"];
    if (vPenta3) {
      const existingVac = await safeExec(() =>
        prisma.vaccination.findFirst({
          where: { patientId: p5.id, vaccineId: vPenta3.id },
        }),
      );
      if (!existingVac) {
        await safeExec(() =>
          prisma.vaccination.create({
            data: {
              patientId: p5.id,
              vaccineId: vPenta3.id,
              dateGiven: new Date("2025-02-20"),
              doseNumber: 3,
              notes: "Vaccination des 12 mois bien tolérée.",
            },
          }),
        );
      }
    }
  }

  // Summary (sequential and fast)
  const countP = await safeExec(() => prisma.patient.count());
  const countM = await safeExec(() => prisma.medicament.count());
  const countB = await safeExec(() => prisma.bilan.count());
  const countV = await safeExec(() => prisma.vaccine.count());
  const countC = await safeExec(() => prisma.consultation.count());
  const countO = await safeExec(() => prisma.ordonnance.count());
  const countRT = await safeExec(() => prisma.recetteType.count());
  const countBT = await safeExec(() => prisma.bilanType.count());
  const countPay = await safeExec(() => prisma.paiement.count());
  const countRad = await safeExec(() => prisma.radio.count());
  const countBF = await safeExec(() => prisma.bilanFile.count());
  const countVac = await safeExec(() => prisma.vaccination.count());

  console.log("\n=======================================================");
  console.log("🎉 SEEDING TERMINÉ AVEC SUCCÈS !");
  console.log("=======================================================");
  console.log(` 👶 Patients enregistrés         : ${countP}`);
  console.log(` 💊 Médicaments disponibles      : ${countM}`);
  console.log(` 🧪 Types d'analyses & bilans    : ${countB}`);
  console.log(` 💉 Vaccins enregistrés          : ${countV}`);
  console.log(` 📋 Ordonnances types prédéfinies: ${countRT}`);
  console.log(` 📑 Bilans types prédéfinis      : ${countBT}`);
  console.log(` 🩺 Consultations médicales      : ${countC}`);
  console.log(` 📝 Ordonnances délivrées        : ${countO}`);
  console.log(` 💉 Actes vaccinaux administrés  : ${countVac}`);
  console.log(` 🩻 Radiographies archivées      : ${countRad}`);
  console.log(` 📄 Rapports d'analyses PDF      : ${countBF}`);
  console.log(` 💰 Paiements enregistrés        : ${countPay}`);
  console.log("=======================================================\n");
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seeding :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
