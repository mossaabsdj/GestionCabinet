"use client";
import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

// 📆 helper to format date to yyyy-mm-dd (for <input type="date">)
function formatDateForInput(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString);
  return d.toISOString().split("T")[0];
}

// 📆 helper to display dd/mm/yyyy
function formatDateDisplay(dateString) {
  if (!dateString) return "-";
  const d = new Date(dateString);
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function PatientModal({ open, onClose, patient }) {
  const [formData, setFormData] = useState({
    id: patient.id || "",
    nom: patient.nom || "",
    telephone: patient.telephone || "",
    adresse: patient.adresse || "",
    groupeSanguin: patient.groupeSanguin || "",
    dateDeNaissance: patient.dateDeNaissance
      ? formatDateForInput(patient.dateDeNaissance)
      : "",
    poidsDeNaissance: patient.poidsDeNaissance || "",
    antecedents: patient.antecedents || "",
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  async function updateInfoPatient(patientData) {
    try {
      const response = await fetch("/api/patients", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update patient");
      }

      const updatedPatient = await response.json();
      onClose();
      return updatedPatient;
    } catch (error) {
      console.error("❌ Error updating patient info:", error);
      throw error;
    }
  }
  const handleSave = async () => {
    console.log("Updated patient:", formData);
    await updateInfoPatient(formData);
  };

  // 📊 Chart for Poids & Taille (consultations)
  const consultationData =
    patient.consultations?.map((c) => ({
      name: new Date(c.createdAt).toLocaleDateString(),
      Poids: c.poids || 0,
      Taille: c.taille || 0,
    })) || [];

  // 📆 Visits per month chart
  const visitsByMonth = useMemo(() => {
    const counts = {};
    patient.consultations?.forEach((c) => {
      const d = new Date(c.createdAt);
      const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts).map(([k, v]) => {
      const [year, month] = k.split("-");
      const monthName = new Date(year, month - 1).toLocaleString("fr-FR", {
        month: "short",
      });
      return { name: `${monthName} ${year}`, Visites: v };
    });
  }, [patient.consultations]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-5xl rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-purple-700">
            🧑‍⚕️ Détails du patient
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4"
        >
          {/* 🧍 Infos personnelles */}
          <div className="space-y-3">
            <Label>Nom complet</Label>
            <Input
              value={formData.nom}
              onChange={(e) => handleChange("nom", e.target.value)}
            />

            <Label>Date de naissance</Label>
            <Input
              type="date"
              value={formData.dateDeNaissance}
              onChange={(e) => handleChange("dateDeNaissance", e.target.value)}
            />

            <Label>Poids de naissance (kg)</Label>
            <Input
              type="number"
              value={formData.poidsDeNaissance}
              onChange={(e) => handleChange("poidsDeNaissance", e.target.value)}
            />

            <Label>Téléphone</Label>
            <Input
              value={formData.telephone}
              onChange={(e) => handleChange("telephone", e.target.value)}
            />

            <Label>Adresse</Label>
            <Input
              value={formData.adresse}
              onChange={(e) => handleChange("adresse", e.target.value)}
            />

            <Label>Groupe sanguin</Label>
            <select
              className="border rounded-md p-2 w-full"
              value={formData.groupeSanguin}
              onChange={(e) => handleChange("groupeSanguin", e.target.value)}
            >
              <option value="">Sélectionner...</option>
              <option value="A_POS">A+</option>
              <option value="A_NEG">A-</option>
              <option value="B_POS">B+</option>
              <option value="B_NEG">B-</option>
              <option value="AB_POS">AB+</option>
              <option value="AB_NEG">AB-</option>
              <option value="O_POS">O+</option>
              <option value="O_NEG">O-</option>
            </select>

            <Label>Antécédents</Label>
            <Textarea
              rows={3}
              placeholder="Ex: Diabète, allergies..."
              value={formData.antecedents}
              onChange={(e) => handleChange("antecedents", e.target.value)}
            />
          </div>

          {/* 📊 Charts */}
          <div className="space-y-4">
            <Card className="shadow-md">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-center mb-2">
                  ⚖️ Évolution du poids et taille
                </h3>
                {consultationData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={consultationData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="Poids" fill="#8b5cf6" radius={6} />
                      <Bar dataKey="Taille" fill="#a78bfa" radius={6} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-center text-gray-500 text-sm">
                    Aucune donnée de consultation
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-center mb-2">
                  📅 Visites par mois
                </h3>
                {visitsByMonth.length > 0 ? (
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={visitsByMonth}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="Visites" fill="#34d399" radius={6} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-center text-gray-500 text-sm">
                    Aucune visite enregistrée
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <DialogFooter className="mt-6 flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
          <Button
            onClick={handleSave}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
