"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Mock data
const MEDICAMENTS = [
  "Metformine",
  "Glibenclamide",
  "Paracétamol",
  "Ibuprofen",
  "Metformine9",
  "Glibenclamid2e",
  "Paracétamol3",
  "Ibuprofen4",
  "Metformine4",
  "Glibenclamide",
  "Paracétamol",
  "Ibuprofen",
  "Metformine",
  "Glibenclamide",
  "Paracétamol",
  "Ibuprofen",
];
const BILANS = [
  "Glycémie à jeun",
  "Créatinine",
  "NFS",
  "CRP",
  "Glycémie à jeun2",
  "Cré2atinine",
  "NF2S",
  "C2RP",

  "Glycémie à jeun",
  "Créatinine",
  "NFS",
  "CRP",
  "Glycémie à jeun",
  "Créatinine",
  "NFS",
  "CRP",
  "Glycémie à jeun",
  "Créatinine",
  "NFS",
  "CRP",
  "Glycémie à jeun",
  "Créatinine",
  "NFS",
  "CRP",
];

export default function TypesPage() {
  const [ordTypes, setOrdTypes] = useState([]);
  const [bilanTypes, setBilanTypes] = useState([]);
  const [justifTypes, setJustifTypes] = useState([]);

  // modal
  const [modal, setModal] = useState({
    open: false,
    section: "",
    mode: "add",
    type: null,
  });

  const [typeLabel, setTypeLabel] = useState("");
  const [medQuery, setMedQuery] = useState("");
  const [selectedMeds, setSelectedMeds] = useState([]);
  const [bilanQuery, setBilanQuery] = useState("");
  const [selectedBilans, setSelectedBilans] = useState([]);

  // justifs
  const [newJustif, setNewJustif] = useState({ nom: "", texte: "" });
  const [justifList, setJustifList] = useState([]);

  const openAdd = (section) => {
    setModal({ open: true, section, mode: "add", type: null });
    setTypeLabel("");
    setSelectedMeds([]);
    setSelectedBilans([]);
    setJustifList([]);
  };

  const openEdit = (section, type) => {
    setModal({ open: true, section, mode: "edit", type });
    setTypeLabel(type.label);
    setSelectedMeds(type.meds || []);
    setSelectedBilans(type.bilans || []);
    setJustifList(type.justifs || []);
  };

  const handleSave = () => {
    if (!typeLabel.trim()) return;
    const newType = {
      id: modal.type?.id || Date.now().toString(),
      label: typeLabel,
      meds: selectedMeds,
      bilans: selectedBilans,
      justifs: justifList,
    };

    if (modal.section === "ord") {
      if (modal.mode === "add") setOrdTypes([...ordTypes, newType]);
      else
        setOrdTypes(
          ordTypes.map((t) => (t.id === modal.type.id ? newType : t))
        );
    }
    if (modal.section === "bilan") {
      if (modal.mode === "add") setBilanTypes([...bilanTypes, newType]);
      else
        setBilanTypes(
          bilanTypes.map((t) => (t.id === modal.type.id ? newType : t))
        );
    }
    if (modal.section === "justif") {
      if (modal.mode === "add") setJustifTypes([...justifTypes, newType]);
      else
        setJustifTypes(
          justifTypes.map((t) => (t.id === modal.type.id ? newType : t))
        );
    }

    setModal({ open: false, section: "", mode: "add", type: null });
  };

  const handleDelete = (section, id) => {
    if (section === "ord") setOrdTypes(ordTypes.filter((t) => t.id !== id));
    if (section === "bilan")
      setBilanTypes(bilanTypes.filter((t) => t.id !== id));
    if (section === "justif")
      setJustifTypes(justifTypes.filter((t) => t.id !== id));
  };

  // render table
  const renderTable = (section, data) => (
    <div className="overflow-x-auto ">
      <table className="w-full text-sm border border-purple-200 rounded-lg">
        <thead className="bg-purple-100 text-purple-700 font-semibold">
          <tr>
            <th className="px-4 py-2 text-left">Nom du type</th>
            <th className="px-4 py-2">Aperçu</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center text-gray-400 py-4 italic">
                Aucun type ajouté
              </td>
            </tr>
          ) : (
            data.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="px-4 py-2">{t.label}</td>
                <td className="px-4 py-2">
                  {t.meds?.length ? `${t.meds.length} médicaments` : ""}
                  {t.bilans?.length ? `, ${t.bilans.length} bilans` : ""}
                  {t.justifs?.length ? `, ${t.justifs.length} justifs` : ""}
                </td>
                <td className="px-4 py-2 flex gap-2 justify-center">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-purple-400 text-purple-700"
                    onClick={() => openEdit(section, t)}
                  >
                    Modifier
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(section, t.id)}
                  >
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="max-w-full mx-auto py-12 px-6">
      <Tabs defaultValue="ord" className="w-full">
        <TabsList className="mb-6 grid grid-cols-3 gap-2 bg-purple-100 rounded-xl">
          <TabsTrigger value="ord" className="text-purple-800 font-semibold">
            Ordonnances
          </TabsTrigger>
          <TabsTrigger value="bilan" className="text-purple-800 font-semibold">
            Bilans
          </TabsTrigger>
          <TabsTrigger value="justif" className="text-purple-800 font-semibold">
            Justifs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ord">
          <Card className="mb-8 shadow-lg border-purple-200 border">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-purple-700 font-bold">
                Types d’ordonnance
              </CardTitle>
              <Button
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => openAdd("ord")}
              >
                Ajouter
              </Button>
            </CardHeader>
            <CardContent>{renderTable("ord", ordTypes)}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bilan">
          <Card className="mb-8 shadow-lg border-purple-200 border">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-purple-700 font-bold">
                Types de bilan
              </CardTitle>
              <Button
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => openAdd("bilan")}
              >
                Ajouter
              </Button>
            </CardHeader>
            <CardContent>{renderTable("bilan", bilanTypes)}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="justif">
          <Card className="mb-8 shadow-lg border-purple-200 border">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-purple-700 font-bold">
                Types de justifications
              </CardTitle>
              <Button
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => openAdd("justif")}
              >
                Ajouter
              </Button>
            </CardHeader>
            <CardContent>{renderTable("justif", justifTypes)}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal */}
      <Dialog
        open={modal.open}
        onOpenChange={(open) => setModal((m) => ({ ...m, open }))}
      >
        <DialogContent className="min-h-160 min-w-3xl overflow-auto">
          <DialogHeader>
            <DialogTitle>
              {modal.mode === "add" ? "Ajouter un type" : "Modifier le type"}
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue={modal.section}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="ord">Ordonnance</TabsTrigger>
              <TabsTrigger value="bilan">Bilans</TabsTrigger>
              <TabsTrigger value="justif">Justifs</TabsTrigger>
            </TabsList>

            {/* ORD */}
            <TabsContent value="ord">
              <Label>Nom du type d’ordonnance</Label>
              <Input
                value={typeLabel}
                onChange={(e) => setTypeLabel(e.target.value)}
                placeholder="Nom du type"
                className="my-2"
              />
              <div className="mt-4">
                <Label>Ajouter Médicament</Label>
                <Input
                  value={medQuery}
                  onChange={(e) => setMedQuery(e.target.value)}
                  placeholder="Rechercher médicament"
                  className="my-2"
                />
                <div className="flex flex-wrap gap-2 h-20 overflow-auto">
                  {MEDICAMENTS.filter((m) =>
                    m.toLowerCase().includes(medQuery.toLowerCase())
                  ).map((m) => (
                    <Button
                      key={m}
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        !selectedMeds.includes(m) &&
                        setSelectedMeds([...selectedMeds, m])
                      }
                    >
                      {m}
                    </Button>
                  ))}
                </div>
                <div className="mt-3 h-60 overflow-auto">
                  {selectedMeds.map((m) => (
                    <div
                      key={m}
                      className="flex justify-between items-center bg-purple-50 px-2 py-1 mb-1 rounded  "
                    >
                      {m}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          setSelectedMeds(selectedMeds.filter((x) => x !== m))
                        }
                      >
                        ❌
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* BILANS */}
            <TabsContent value="bilan">
              <Label>Nom du type de bilan</Label>
              <Input
                value={typeLabel}
                onChange={(e) => setTypeLabel(e.target.value)}
                placeholder="Nom du type de bilan"
                className="my-2"
              />
              <Label>Ajouter Bilan</Label>
              <Input
                value={bilanQuery}
                onChange={(e) => setBilanQuery(e.target.value)}
                placeholder="Rechercher bilan"
                className="my-2"
              />
              <div className="flex flex-wrap gap-2 h-20 overflow-auto">
                {BILANS.filter((b) =>
                  b.toLowerCase().includes(bilanQuery.toLowerCase())
                ).map((b) => (
                  <Button
                    key={b}
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      !selectedBilans.includes(b) &&
                      setSelectedBilans([...selectedBilans, b])
                    }
                  >
                    {b}
                  </Button>
                ))}
              </div>
              <div className="mt-3 h-60 overflow-auto">
                {selectedBilans.map((b) => (
                  <div
                    key={b}
                    className="flex justify-between items-center bg-purple-50 px-2 py-1 mb-1 rounded"
                  >
                    {b}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        setSelectedBilans(selectedBilans.filter((x) => x !== b))
                      }
                    >
                      ❌
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* JUSTIFS */}
            <TabsContent value="justif">
              <Label>Nom du type de justification</Label>
              <Input
                value={typeLabel}
                onChange={(e) => setTypeLabel(e.target.value)}
                placeholder="Nom du type de justification"
                className="my-2"
              />

              <div className="space-y-4 mt-4">
                <div className="flex flex-col gap-2 border p-3 rounded-md">
                  <Textarea
                    value={newJustif.texte}
                    onChange={(e) =>
                      setNewJustif((j) => ({ ...j, texte: e.target.value }))
                    }
                    placeholder="Texte de la justification..."
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-4">
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={handleSave}
            >
              {modal.mode === "add" ? "Ajouter" : "Mettre à jour"}
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                setModal({ open: false, section: "", mode: "add", type: null })
              }
            >
              Annuler
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
