import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "Aucun fichier de sauvegarde fourni." },
        { status: 400 },
      );
    }

    const textContent = await file.text();
    let parsed;
    try {
      parsed = JSON.parse(textContent);
    } catch {
      return NextResponse.json(
        { error: "Le fichier n'est pas un JSON valide." },
        { status: 400 },
      );
    }

    if (!parsed || !parsed.data) {
      return NextResponse.json(
        {
          error:
            "Format de fichier de sauvegarde invalide (clé 'data' absente).",
        },
        { status: 400 },
      );
    }

    const { data } = parsed;

    // Restore sequentially / transactionally
    await prisma.$transaction(async (tx) => {
      // 1. Medicaments
      if (Array.isArray(data.medicaments)) {
        for (const m of data.medicaments) {
          await tx.medicament.upsert({
            where: { id: m.id },
            update: { nom: m.nom },
            create: { id: m.id, nom: m.nom },
          });
        }
      }

      // 2. Bilans
      if (Array.isArray(data.bilans)) {
        for (const b of data.bilans) {
          await tx.bilan.upsert({
            where: { id: b.id },
            update: { nom: b.nom },
            create: { id: b.id, nom: b.nom },
          });
        }
      }

      // 3. Vaccines
      if (Array.isArray(data.vaccines)) {
        for (const v of data.vaccines) {
          await tx.vaccine.upsert({
            where: { id: v.id },
            update: { name: v.name },
            create: { id: v.id, name: v.name },
          });
        }
      }

      // 4. Patients
      if (Array.isArray(data.patients)) {
        for (const p of data.patients) {
          const patientPayload = {
            nom: p.nom,
            age: p.age ?? null,
            dateDeNaissance: new Date(p.dateDeNaissance),
            sexe: p.sexe || "M",
            telephone: p.telephone ?? null,
            adresse: p.adresse ?? null,
            antecedents: p.antecedents ?? null,
            poidsDeNaissance: p.poidsDeNaissance ?? null,
            groupeSanguin: p.groupeSanguin ?? null,
          };
          await tx.patient.upsert({
            where: { id: p.id },
            update: patientPayload,
            create: { id: p.id, ...patientPayload },
          });
        }
      }

      // 5. Consultations
      if (Array.isArray(data.consultations)) {
        for (const c of data.consultations) {
          const consultPayload = {
            patientId: c.patientId,
            note: c.note ?? null,
            taille: c.taille ?? null,
            poids: c.poids ?? null,
            tensionSystolique: c.tensionSystolique ?? null,
            tensionDiastolique: c.tensionDiastolique ?? null,
            temperature: c.temperature ?? null,
            frequenceCardiaque: c.frequenceCardiaque ?? null,
            frequenceRespiratoire: c.frequenceRespiratoire ?? null,
            saturationOxygene: c.saturationOxygene ?? null,
            glycemie: c.glycemie ?? null,
            motifDeConsultation: c.motifDeConsultation ?? null,
            justification: c.justification ?? null,
            perimetreCranien: c.perimetreCranien ?? null,
            developpementPsychomoteur: c.developpementPsychomoteur ?? null,
            createdAt: new Date(c.createdAt || Date.now()),
          };
          await tx.consultation.upsert({
            where: { id: c.id },
            update: consultPayload,
            create: { id: c.id, ...consultPayload },
          });
        }
      }

      // 6. Ordonnances & Items
      if (Array.isArray(data.ordonnances)) {
        for (const o of data.ordonnances) {
          await tx.ordonnance.upsert({
            where: { id: o.id },
            update: {
              patientId: o.patientId,
              consultationId: o.consultationId,
              createdAt: new Date(o.createdAt || Date.now()),
            },
            create: {
              id: o.id,
              patientId: o.patientId,
              consultationId: o.consultationId,
              createdAt: new Date(o.createdAt || Date.now()),
            },
          });
        }
      }

      if (Array.isArray(data.ordonnanceItems)) {
        for (const oi of data.ordonnanceItems) {
          await tx.ordonnanceItem.upsert({
            where: { id: oi.id },
            update: {
              ordonnanceId: oi.ordonnanceId,
              medicamentId: oi.medicamentId,
              dosage: oi.dosage ?? null,
              frequence: oi.frequence ?? null,
              duree: oi.duree ?? null,
              quantite: oi.quantite ?? null,
            },
            create: {
              id: oi.id,
              ordonnanceId: oi.ordonnanceId,
              medicamentId: oi.medicamentId,
              dosage: oi.dosage ?? null,
              frequence: oi.frequence ?? null,
              duree: oi.duree ?? null,
              quantite: oi.quantite ?? null,
            },
          });
        }
      }

      // 7. BilanRecip & Items
      if (Array.isArray(data.bilanRecips)) {
        for (const br of data.bilanRecips) {
          await tx.bilanRecip.upsert({
            where: { id: br.id },
            update: {
              patientId: br.patientId,
              consultationId: br.consultationId,
              createdAt: new Date(br.createdAt || Date.now()),
            },
            create: {
              id: br.id,
              patientId: br.patientId,
              consultationId: br.consultationId,
              createdAt: new Date(br.createdAt || Date.now()),
            },
          });
        }
      }

      if (Array.isArray(data.bilanItems)) {
        for (const bi of data.bilanItems) {
          await tx.bilanItem.upsert({
            where: { id: bi.id },
            update: {
              bilanRecipId: bi.bilanRecipId,
              bilanId: bi.bilanId,
              resultat: bi.resultat ?? null,
              remarque: bi.remarque ?? null,
            },
            create: {
              id: bi.id,
              bilanRecipId: bi.bilanRecipId,
              bilanId: bi.bilanId,
              resultat: bi.resultat ?? null,
              remarque: bi.remarque ?? null,
            },
          });
        }
      }

      // 8. Vaccinations
      if (Array.isArray(data.vaccinations)) {
        for (const v of data.vaccinations) {
          await tx.vaccination.upsert({
            where: { id: v.id },
            update: {
              patientId: v.patientId,
              vaccineId: v.vaccineId,
              dateGiven: new Date(v.dateGiven),
              doseNumber: v.doseNumber ?? null,
              notes: v.notes ?? null,
              createdAt: new Date(v.createdAt || Date.now()),
            },
            create: {
              id: v.id,
              patientId: v.patientId,
              vaccineId: v.vaccineId,
              dateGiven: new Date(v.dateGiven),
              doseNumber: v.doseNumber ?? null,
              notes: v.notes ?? null,
              createdAt: new Date(v.createdAt || Date.now()),
            },
          });
        }
      }

      // 9. Radios & BilanFiles
      if (Array.isArray(data.radios)) {
        for (const r of data.radios) {
          await tx.radio.upsert({
            where: { id: r.id },
            update: {
              consultationId: r.consultationId ?? null,
              patientId: r.patientId ?? null,
              description: r.description ?? null,
              fichier: r.fichier ?? null,
              createdAt: new Date(r.createdAt || Date.now()),
            },
            create: {
              id: r.id,
              consultationId: r.consultationId ?? null,
              patientId: r.patientId ?? null,
              description: r.description ?? null,
              fichier: r.fichier ?? null,
              createdAt: new Date(r.createdAt || Date.now()),
            },
          });
        }
      }

      if (Array.isArray(data.bilanFiles)) {
        for (const bf of data.bilanFiles) {
          await tx.bilanFile.upsert({
            where: { id: bf.id },
            update: {
              consultationId: bf.consultationId ?? null,
              patientId: bf.patientId ?? null,
              type: bf.type ?? null,
              description: bf.description ?? null,
              fichier: bf.fichier ?? null,
              createdAt: new Date(bf.createdAt || Date.now()),
            },
            create: {
              id: bf.id,
              consultationId: bf.consultationId ?? null,
              patientId: bf.patientId ?? null,
              type: bf.type ?? null,
              description: bf.description ?? null,
              fichier: bf.fichier ?? null,
              createdAt: new Date(bf.createdAt || Date.now()),
            },
          });
        }
      }
    });

    return NextResponse.json({
      message: "Base de données restaurée avec succès.",
    });
  } catch (error) {
    console.error("Restore API Error:", error);
    return NextResponse.json(
      { error: "Échec de la restauration: " + error.message },
      { status: 500 },
    );
  }
}
