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
import { Calendar, Clock, Trash2, FileText } from "lucide-react";

export default function OrdBilanPage({ patientId }) {
  const [tab, setTab] = useState("ord");
  const [ordonnances, setOrdonnances] = useState([]);
  const [bilans, setBilans] = useState([]);
  const [bilan, setBilan] = useState([]);

  const [selectedOrdonnance, setSelectedOrdonnance] = useState(null);
  const [selectedBilan, setSelectedBilan] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState(null); // 'ord' or 'bilan'
  const [itemToDelete, setItemToDelete] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🧾 Fetch ordonnances
  const fetchOrdonnances = async () => {
    if (!patientId) return;
    try {
      const res = await fetch(`/api/Ordonnance?patientId=${patientId}`);
      const data = await res.json();
      setOrdonnances(data);
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
    } catch (err) {
      console.error("❌ Error fetching bilans:", err);
    }
  };

  useEffect(() => {
    fetchOrdonnances();
    fetchBilans();
  }, [patientId]);

  // 🗑 Handle delete open
  const confirmDelete = (type, item) => {
    setDeleteType(type);
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  // 🗑 Handle delete (works for both ord and bilan)
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
  const handleBilanChange = (index, field, value) => {
    if (!selectedBilan) return;

    // Copy the selected bilan deeply
    const updatedBilan = {
      ...selectedBilan,
      items: selectedBilan.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    };

    // Update the selected bilan state
    setSelectedBilan(updatedBilan);

    // Also update the bilans array to reflect this change
    setBilans((prevBilans) =>
      prevBilans.map((b) => (b.id === updatedBilan.id ? updatedBilan : b))
    );
  };

  const updateBilanAll = async (data) => {
    try {
      const res = await fetch("/api/BilanRecip", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSelectedBilan(null);

        // refetch or close dialog if needed
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };
  if (!patientId)
    return <p className="text-gray-500 text-center mt-10">Aucune Patient .</p>;
  return (
    <div className="p-0 max-w-6xl mx-auto">
      <Tabs
        defaultValue="ord"
        value={tab}
        onValueChange={setTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 bg-purple-100 p-1 rounded-lg">
          <TabsTrigger
            value="ord"
            className="rounded-md data-[state=active]:bg-white data-[state=active]:text-purple-700"
          >
            Ordonnances
          </TabsTrigger>
          <TabsTrigger
            value="bilan"
            className="rounded-md data-[state=active]:bg-white data-[state=active]:text-purple-700"
          >
            Bilans reçus
          </TabsTrigger>
        </TabsList>

        {/* 🧾 Ordonnances */}
        <TabsContent value="ord" className="mt-6">
          {ordonnances?.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">
              Aucune ordonnance trouvée.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {ordonnances?.map((ord) => (
                <Dialog
                  key={ord.id}
                  open={selectedOrdonnance?.id === ord.id}
                  onOpenChange={(open) => !open && setSelectedOrdonnance(null)}
                >
                  {/* 🟣 Card Summary */}
                  <Card
                    className="bg-purple-50 p-3 cursor-pointer hover:bg-purple-100 transition"
                    onClick={() => setSelectedOrdonnance(ord)}
                  >
                    <CardContent>
                      <div className="flex justify-between">
                        <p className="font-medium text-purple-700">
                          Ordonnance #{ord.id}
                        </p>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            confirmDelete("ord", ord);
                          }}
                        >
                          <Trash2 size={18} className="text-red-500" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <Calendar size={16} />{" "}
                        {new Date(ord.createdAt).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>

                  {/* 🟣 Dialog Details */}
                  <DialogContent className="sm:min-w-4xl  w-full bg-white rounded-xl p-6 shadow-lg">
                    <DialogHeader>
                      <DialogTitle className="text-purple-700 text-lg font-semibold">
                        Détails de l’Ordonnance #{ord.id}
                      </DialogTitle>
                    </DialogHeader>

                    {ord.items?.length > 0 ? (
                      <div className="mt-4 border border-purple-100 rounded-xl overflow-hidden">
                        <table className="w-full border-collapse text-sm">
                          <thead className="bg-purple-100 text-purple-700">
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
                                className="border-b border-purple-100 hover:bg-purple-50 transition-colors"
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
                    ) : (
                      <p className="text-gray-500 text-center py-4">
                        Aucun médicament dans cette ordonnance.
                      </p>
                    )}
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          )}
        </TabsContent>

        {/* 🧪 Bilans reçus */}
        <TabsContent value="bilan" className="mt-6">
          {bilans?.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">
              Aucun bilan reçu trouvé.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {bilans?.map((bilan) => (
                <Dialog
                  key={bilan.id}
                  open={selectedBilan?.id === bilan.id}
                  onOpenChange={(open) => !open && setSelectedBilan(null)}
                >
                  <Card
                    className="bg-blue-50 p-3 cursor-pointer hover:bg-blue-100 transition"
                    onClick={() => setSelectedBilan(bilan)}
                  >
                    <CardContent>
                      <div className="flex justify-between">
                        <p className="font-medium text-blue-700">
                          Bilan reçu #{bilan.id}
                        </p>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            confirmDelete("bilan", bilan);
                          }}
                        >
                          <Trash2 size={18} className="text-red-500" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <Calendar size={16} />{" "}
                        {new Date(bilan.createdAt).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>

                  <DialogContent className="sm:min-w-4xl w-full bg-white rounded-xl p-6 shadow-lg">
                    <DialogHeader>
                      <DialogTitle className="text-green-700 text-lg font-semibold">
                        Détails du Bilan #{bilan.id}
                      </DialogTitle>
                    </DialogHeader>

                    {bilan.items?.length > 0 ? (
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
                              {bilan.items.map((item, i) => (
                                <tr
                                  key={i}
                                  className="border-b border-green-100 hover:bg-green-50 transition-colors"
                                >
                                  {/* Nom du bilan */}
                                  <td className="py-3 px-4 font-medium text-gray-800">
                                    {item.bilan?.nom || "—"}
                                  </td>

                                  {/* Résultat */}
                                  <td className="py-3 px-4">
                                    <input
                                      type="text"
                                      placeholder="Écrire le résultat..."
                                      className="w-full border rounded-md p-2 text-sm outline-none focus:ring-2 focus:ring-green-400"
                                      value={item.resultat || ""}
                                      onChange={(e) =>
                                        handleBilanChange(
                                          i,
                                          "resultat",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </td>

                                  {/* Remarque */}
                                  <td className="py-3 px-4">
                                    <textarea
                                      placeholder="Ajouter une remarque..."
                                      className="w-full border rounded-md p-2 text-sm outline-none focus:ring-2 focus:ring-green-400"
                                      rows={2}
                                      value={item.remarque || ""}
                                      onChange={(e) =>
                                        handleBilanChange(
                                          i,
                                          "remarque",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* ✅ One Save Button for all */}
                        <div className="flex justify-end mt-6">
                          <button
                            onClick={async () => {
                              const data = {
                                id: bilan.id,
                                items: bilan.items.map((it) => ({
                                  bilanId: it.bilanId,
                                  resultat: it.resultat || "",
                                  remarque: it.remarque || "",
                                })),
                              };

                              await updateBilanAll(data);
                            }}
                            className="px-5 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition"
                          >
                            💾 Enregistrer tout
                          </button>
                        </div>
                      </>
                    ) : (
                      <p className="text-gray-500 text-center py-4">
                        Aucun élément dans ce bilan.
                      </p>
                    )}
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* 🔒 Delete Confirmation Dialog */}
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
