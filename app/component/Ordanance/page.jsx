"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar, Trash2 } from "lucide-react";
import { printOrdonnance, printBilan } from "@/lib/printer";
// ✅ Pediatric Age Calculation
function calculateAge(dateString) {
  if (!dateString) return "";

  const birthDate = new Date(dateString);
  const today = new Date();

  const diffMs = today - birthDate;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30.44);
  const diffYears = Math.floor(diffMonths / 12);

  if (diffDays < 30) return `${diffDays} jour${diffDays > 1 ? "s" : ""}`;
  if (diffMonths < 24) return `${diffMonths} mois`;

  const remainingMonths = diffMonths % 12;
  if (remainingMonths === 0)
    return `${diffYears} an${diffYears > 1 ? "s" : ""}`;
  return `${diffYears} an${
    diffYears > 1 ? "s" : ""
  } et ${remainingMonths} mois`;
}

export default function OrdBilanPage({ patientId, query, selectedPatient }) {
  const [tab, setTab] = useState("ord");
  const [ordonnances, setOrdonnances] = useState([]);
  const [bilans, setBilans] = useState([]);
  const [selectedOrdonnance, setSelectedOrdonnance] = useState(null);
  const [selectedBilan, setSelectedBilan] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filtredOrd, setFiltredOrd] = useState([]);
  const [filtredBilan, setFiltredBilan] = useState([]);

  // 🧾 Fetch ordonnances
  const fetchOrdonnances = async () => {
    if (!patientId) return;
    try {
      const res = await fetch(`/api/Ordonnance?patientId=${patientId}`);
      const data = await res.json();
      setOrdonnances(data);
      setFiltredOrd(data);
    } catch (err) {
      console.error("❌ Error fetching ordonnances:", err);
    }
  };

  // 🧪 Fetch bilans reçus
  const fetchBilans = async () => {
    if (!patientId) return;
    try {
      const res = await fetch(`/api/BilanRecip?patientId=${patientId}`);
      const data = await res.json();
      setBilans(data);
      setFiltredBilan(data);
    } catch (err) {
      console.error("❌ Error fetching bilans:", err);
    }
  };

  useEffect(() => {
    fetchOrdonnances();
    fetchBilans();
  }, [patientId]);

  useEffect(() => {
    if (tab === "ord") {
      const filtred = ordonnances?.filter((v) =>
        v.id.toString().includes(query),
      );
      setFiltredOrd(filtred);
    }
    if (tab === "bilan") {
      const filtred = bilans?.filter((v) => v.id.toString().includes(query));
      setFiltredBilan(filtred);
    }
  }, [query]);

  // 🗑 Delete Handling
  const confirmDelete = (type, item) => {
    setDeleteType(type);
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete || !deleteType) return;
    setLoading(true);
    try {
      const endpoint =
        deleteType === "ord"
          ? `/api/Ordonnance?id=${itemToDelete.id}`
          : `/api/BilanRecip?id=${itemToDelete.id}`;

      const res = await fetch(endpoint, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");

      setDeleteDialogOpen(false);
      setItemToDelete(null);
      deleteType === "ord" ? fetchOrdonnances() : fetchBilans();
    } catch (err) {
      console.error("❌ Error deleting:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🖨️ Print Ordonnance
  const handlePrintOrdonnanceElectron = async (ord) => {
    try {
      if (!ord.items || ord.items.length === 0) {
        alert("Aucune donnée à imprimer");
        return;
      }
      // console.log(JSON.stringify(ord));
      const fullname = selectedPatient?.nom || "";
      let prenom = "";
      let nom = "";

      if (fullname.trim()) {
        const parts = fullname.trim().split(" ");
        if (parts.length === 1) nom = parts[0];
        else {
          prenom = parts.slice(0, -1).join(" ");
          nom = parts[parts.length - 1];
        }
      }

      const datenaissance = selectedPatient?.dateDeNaissance;
      const age = calculateAge(datenaissance);

      // const res = await fetch("/api/last-records");
      // const data = await res.json();

      const nextConsultationId = ord.consultationId;
      const nextOrdonnanceId = ord.id;
      console.log(
        "nextConsultationId" +
          nextConsultationId +
          "/nextOrdonnanceId" +
          nextOrdonnanceId,
      );
      printOrdonnance({
        consultationId: nextConsultationId,
        ordonnanceId: nextOrdonnanceId,
        nom,
        prenom,
        age,
        items: ord.items.map((it) => ({
          name: it.medicament?.nom,
          dosage: it.dosage,
          duration: it.duree,
          frequency: it.frequence,
          quantity: it.quantite,
        })),
      });
    } catch (err) {
      console.error("Erreur lors de l'impression de l'ordonnance:", err);
      alert("Erreur lors de l'impression de l'ordonnance.");
    }
  };

  // 🖨️ Print Bilan
  const handlePrintBilanElectron = async (bilan) => {
    try {
      if (!bilan.items || bilan.items.length === 0) {
        alert("Aucun examen à imprimer");
        return;
      }
      // console.log(JSON.stringify(bilan));
      const fullname = selectedPatient?.nom || "";
      let prenom = "";
      let nom = "";

      if (fullname.trim()) {
        const parts = fullname.trim().split(" ");
        if (parts.length === 1) nom = parts[0];
        else {
          prenom = parts.slice(0, -1).join(" ");
          nom = parts[parts.length - 1];
        }
      }

      const datenaissance = selectedPatient?.dateDeNaissance;
      const age = calculateAge(datenaissance);

      // const res = await fetch("/api/last-records");
      // const data = await res.json();

      const nextBilanId = bilan.id || 0;
      const nextConsultationId = bilan.consultationId || 0;

      printBilan({
        bilanId: nextBilanId,
        consultationId: nextConsultationId,
        nom,
        prenom,
        age,
        items: bilan.items.map((exam) => ({
          id: exam.id,
          nom: exam.bilan?.nom,
        })),
      });
    } catch (err) {
      console.error("Erreur lors de l'impression du bilan:", err);
      alert("Erreur lors de l'impression du bilan.");
    }
  };

  // 💾 Save updated bilan items (each has resultat & remarque)
  const handleSaveBilan = async (bilan) => {
    try {
      const res = await fetch(`/api/BilanRecip`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: bilan.id, // ✅ now included in body, as your API expects
          items: bilan?.items?.map((it) => ({
            bilanId: it.bilanId, // ✅ backend expects this to recreate items
            resultat: it.resultat || null,
            remarque: it.remarque || null,
          })),
        }),
      });

      if (!res.ok) throw new Error("Erreur lors de la sauvegarde du bilan");
      const updated = await res.json();

      //   setBilans((prev) => prev.map((b) => (b.id === bilan.id ? updated : b)));
      fetchBilans();
      alert("✅ Bilan mis à jour avec succès !");
    } catch (err) {
      console.error("❌ Erreur lors de la sauvegarde du bilan:", err);
      alert("Erreur lors de la sauvegarde du bilan.");
    }
  };
  // 🧠 Handle input change for Bilan item (résultat / remarque)
  const handleChangeBilanItem = (bilanId, itemIndex, field, value) => {
    // نصنع نسخة جديدة من قائمة bilans
    const updatedBilans = bilans.map((b) => {
      if (b.id !== bilanId) return b;

      // نصنع نسخة جديدة من items
      const updatedItems = b.items.map((item, index) =>
        index === itemIndex ? { ...item, [field]: value } : item,
      );

      return { ...b, items: updatedItems };
    });

    setBilans(updatedBilans);

    // تحديث bilan المفتوح في الحوار (Dialog)
    setSelectedBilan((prev) =>
      prev?.id === bilanId
        ? {
            ...prev,
            items: prev.items.map((item, index) =>
              index === itemIndex ? { ...item, [field]: value } : item,
            ),
          }
        : prev,
    );
  };

  if (!patientId)
    return <p className="text-gray-500 text-center mt-10">Aucun patient.</p>;
  return (
    <div className="p-0 max-w-6xl mx-auto">
      <Tabs
        defaultValue="ord"
        value={tab}
        onValueChange={setTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 bg-[var(--color-100)] p-1 rounded-lg">
          <TabsTrigger
            value="ord"
            className="rounded-md data-[state=active]:bg-white data-[state=active]:text-[var(--color-700)]"
          >
            Ordonnances
          </TabsTrigger>
          <TabsTrigger
            value="bilan"
            className="rounded-md data-[state=active]:bg-white data-[state=active]:text-[var(--color-700)]"
          >
            Bilans reçus
          </TabsTrigger>
        </TabsList>

        {/* 🧾 Ordonnances */}
        <TabsContent value="ord" className="mt-6">
          {filtredOrd?.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">
              Aucune ordonnance trouvée.
            </p>
          ) : (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[var(--color-100)]">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r bg-[var(--color-400)] text-white">
                      <th className="text-left px-6 py-4 font-semibold text-sm uppercase tracking-wider">
                        #
                      </th>
                      <th className="text-left px-6 py-4 font-semibold text-sm uppercase tracking-wider">
                        Date
                      </th>
                      <th className="text-left px-6 py-4 font-semibold text-sm uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filtredOrd.map((ord, index) => (
                      <Dialog
                        key={ord.id}
                        open={selectedOrdonnance?.id === ord.id}
                        onOpenChange={(open) =>
                          !open && setSelectedOrdonnance(null)
                        }
                      >
                        <tr
                          className={`cursor-pointer transition-colors hover:bg-[var(--color-50)] ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }`}
                          onClick={() => setSelectedOrdonnance(ord)}
                        >
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-[var(--color-100)] text-[var(--color-800)]">
                              Ordonnance #{ord.id}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                              <Calendar
                                size={16}
                                className="text-[var(--color-500)]"
                              />
                              {new Date(ord.createdAt).toLocaleDateString(
                                "fr-FR",
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 hover:bg-red-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                confirmDelete("ord", ord);
                              }}
                            >
                              <Trash2 size={18} className="text-red-500" />
                            </Button>
                          </td>
                        </tr>

                        <DialogContent className="sm:min-w-4xl w-full bg-white rounded-xl p-6 shadow-lg">
                          <DialogHeader>
                            <DialogTitle className="text-[var(--color-700)] text-lg font-semibold">
                              Détails de l'Ordonnance #{ord.id}
                            </DialogTitle>
                          </DialogHeader>

                          {ord.items?.length > 0 ? (
                            <>
                              <div className="mt-4 border border-[var(--color-100)] rounded-xl overflow-hidden">
                                <table className="w-full border-collapse text-sm">
                                  <thead className="bg-[var(--color-100)] text-[var(--color-700)]">
                                    <tr>
                                      <th className="text-left py-3 px-4 font-semibold">
                                        Médicament
                                      </th>
                                      <th className="text-left py-3 px-4 font-semibold">
                                        Dosage
                                      </th>
                                      <th className="text-left py-3 px-4 font-semibold">
                                        Fréquence
                                      </th>
                                      <th className="text-left py-3 px-4 font-semibold">
                                        Durée
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {ord.items.map((item, i) => (
                                      <tr
                                        key={i}
                                        className="border-b border-[var(--color-100)] hover:bg-[var(--color-50)] transition-colors"
                                      >
                                        <td className="py-3 px-4 font-medium text-gray-800">
                                          {item.medicament?.nom || "—"}
                                        </td>
                                        <td className="py-3 px-4 text-gray-600">
                                          {item.dosage || "—"}
                                        </td>
                                        <td className="py-3 px-4 text-gray-600">
                                          {item.frequence || "—"}
                                        </td>
                                        <td className="py-3 px-4 text-gray-600">
                                          {item.duree || "—"}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>

                              <div className="flex justify-end mt-4">
                                <Button
                                  onClick={() =>
                                    handlePrintOrdonnanceElectron(ord)
                                  }
                                  className="bg-[var(--color-600)] hover:bg-[var(--color-700)] text-white"
                                >
                                  🖨️ Imprimer l'Ordonnance
                                </Button>
                              </div>
                            </>
                          ) : (
                            <p className="text-gray-500 text-center py-4">
                              Aucun médicament dans cette ordonnance.
                            </p>
                          )}
                        </DialogContent>
                      </Dialog>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </TabsContent>

        {/* 🧪 Bilans reçus */}
        <TabsContent value="bilan" className="mt-6">
          {filtredBilan?.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">
              Aucun bilan reçu trouvé.
            </p>
          ) : (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[var(--color-400)] text-white">
                      <th className="text-left px-6 py-4 font-semibold text-sm uppercase tracking-wider">
                        #
                      </th>
                      <th className="text-left px-6 py-4 font-semibold text-sm uppercase tracking-wider">
                        Date
                      </th>
                      <th className="text-left px-6 py-4 font-semibold text-sm uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filtredBilan.map((bilan, index) => (
                      <Dialog
                        key={bilan.id}
                        open={selectedBilan?.id === bilan.id}
                        onOpenChange={(open) => !open && setSelectedBilan(null)}
                      >
                        <tr
                          className={`cursor-pointer transition-colors hover:bg-blue-50 ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }`}
                          onClick={() => setSelectedBilan(bilan)}
                        >
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-[var(--color-100)] text-[var(--color-800)]">
                              Bilan reçu #{bilan.id}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                              <Calendar
                                size={16}
                                className="text-[var(--color-500)]"
                              />
                              {new Date(bilan.createdAt).toLocaleDateString(
                                "fr-FR",
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 hover:bg-red-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                confirmDelete("bilan", bilan);
                              }}
                            >
                              <Trash2 size={18} className="text-red-500" />
                            </Button>
                          </td>
                        </tr>

                        {selectedBilan?.id === bilan.id && (
                          <DialogContent className="sm:min-w-4xl w-full bg-white rounded-xl p-6 shadow-lg">
                            <DialogHeader>
                              <DialogTitle className="text-green-700 text-lg font-semibold">
                                Détails du Bilan #{selectedBilan.id}
                              </DialogTitle>
                            </DialogHeader>

                            {selectedBilan.items?.length > 0 ? (
                              <>
                                <div className="mt-4 border border-green-100 rounded-xl overflow-hidden">
                                  <table className="w-full border-collapse text-sm">
                                    <thead className="bg-green-100 text-green-700">
                                      <tr>
                                        <th className="text-left py-3 px-4 font-semibold">
                                          Nom du Bilan
                                        </th>
                                        <th className="text-left py-3 px-4 font-semibold">
                                          Résultat
                                        </th>
                                        <th className="text-left py-3 px-4 font-semibold">
                                          Remarque
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {selectedBilan.items.map((item, i) => (
                                        <tr
                                          key={i}
                                          className="border-b border-green-100 hover:bg-green-50 transition-colors"
                                        >
                                          <td className="py-3 px-4 font-medium text-gray-800">
                                            {item.bilan?.nom || "—"}
                                          </td>
                                          <td className="py-3 px-4">
                                            <input
                                              type="text"
                                              placeholder="Résultat..."
                                              value={item.resultat || ""}
                                              onChange={(e) =>
                                                handleChangeBilanItem(
                                                  selectedBilan.id,
                                                  i,
                                                  "resultat",
                                                  e.target.value,
                                                )
                                              }
                                              className="w-full border rounded-lg px-3 py-1 focus:ring-2 focus:ring-green-500"
                                            />
                                          </td>
                                          <td className="py-3 px-4">
                                            <textarea
                                              placeholder="Remarques..."
                                              value={item.remarque || ""}
                                              onChange={(e) =>
                                                handleChangeBilanItem(
                                                  selectedBilan.id,
                                                  i,
                                                  "remarque",
                                                  e.target.value,
                                                )
                                              }
                                              className="w-full border rounded-lg px-3 py-1 focus:ring-2 focus:ring-green-500"
                                              rows={1}
                                            />
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>

                                <div className="flex justify-end gap-2 mt-4">
                                  <Button
                                    onClick={() =>
                                      handlePrintBilanElectron(selectedBilan)
                                    }
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                  >
                                    🖨️ Imprimer le Bilan
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      handleSaveBilan(selectedBilan)
                                    }
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                  >
                                    💾 Enregistrer
                                  </Button>
                                </div>
                              </>
                            ) : (
                              <p className="text-gray-500 text-center py-4">
                                Aucun élément dans ce bilan.
                              </p>
                            )}
                          </DialogContent>
                        )}
                      </Dialog>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* 🗑 Delete Confirmation */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">
              Confirmation de suppression
            </DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est
              irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Suppression..." : "Supprimer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
