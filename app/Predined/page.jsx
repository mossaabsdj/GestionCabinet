"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";

// Example products/exams
const ALL_PRODUCTS = [
  "Paracétamol 500mg",
  "Ibuprofène 400mg",
  "Metformine 500mg",
  "Amlodipine 5mg",
  "Amoxicilline 500mg",
  "Oméprazole 20mg",
  "Glibenclamide 5mg",
  "Ciprofloxacine 500mg",
];

const ALL_EXAMS = [
  "Glycémie à jeun",
  "HbA1c",
  "Bilan lipidique",
  "Créatinine",
  "Protéinurie",
  "Ionogramme sanguin",
  "ECG",
  "CRP",
  "Hémogramme",
  "Radiographie thoracique",
];

export default function PredefinedPage() {
  // Ordonnance & Bilan types
  const [ordTypes, setOrdTypes] = useState([
    {
      id: "diabete",
      label: "Ordonnance Diabète",
      products: ["Metformine 500mg", "Glibenclamide 5mg"],
    },
    {
      id: "hta",
      label: "Ordonnance Hypertension",
      products: ["Amlodipine 5mg"],
    },
    {
      id: "antibio",
      label: "Ordonnance Antibiotique",
      products: ["Amoxicilline 500mg"],
    },
    { id: "autre", label: "Autre", products: [] },
  ]);
  const [bilanTypes, setBilanTypes] = useState([
    {
      id: "diabete",
      label: "Bilan Diabète",
      exams: ["Glycémie à jeun", "HbA1c"],
    },
    {
      id: "hta",
      label: "Bilan Hypertension",
      exams: ["Ionogramme sanguin", "ECG"],
    },
    {
      id: "infectieux",
      label: "Bilan Infectieux",
      exams: ["CRP", "Hémogramme"],
    },
    { id: "autre", label: "Autre", exams: [] },
  ]);
  const [ordType, setOrdType] = useState(ordTypes[0].id);
  const [bilanType, setBilanType] = useState(bilanTypes[0].id);

  // Modal state
  const [modal, setModal] = useState({
    open: false,
    section: "",
    mode: "",
    type: null,
  });
  const [typeLabel, setTypeLabel] = useState("");

  // Search state
  const [productQuery, setProductQuery] = useState("");
  const [examQuery, setExamQuery] = useState("");

  // Open modal
  const openAdd = (section) => {
    setModal({ open: true, section, mode: "add", type: null });
    setTypeLabel("");
  };
  const openEdit = (section, type) => {
    setModal({ open: true, section, mode: "edit", type });
    setTypeLabel(type.label);
  };

  // Delete type
  const handleDelete = (section, id) => {
    if (section === "ord") {
      setOrdTypes(ordTypes.filter((t) => t.id !== id));
      if (ordType === id && ordTypes.length > 1) setOrdType(ordTypes[0].id);
    }
    if (section === "bilan") {
      setBilanTypes(bilanTypes.filter((t) => t.id !== id));
      if (bilanType === id && bilanTypes.length > 1)
        setBilanType(bilanTypes[0].id);
    }
  };

  // Save modal type
  const handleSaveType = () => {
    if (!typeLabel.trim()) return;
    const id = modal.type?.id || typeLabel.toLowerCase().replace(/\s+/g, "");
    if (modal.section === "ord") {
      if (modal.mode === "add")
        setOrdTypes([...ordTypes, { id, label: typeLabel, products: [] }]);
      else
        setOrdTypes(
          ordTypes.map((t) =>
            t.id === modal.type.id ? { ...t, label: typeLabel } : t
          )
        );
    }
    if (modal.section === "bilan") {
      if (modal.mode === "add")
        setBilanTypes([...bilanTypes, { id, label: typeLabel, exams: [] }]);
      else
        setBilanTypes(
          bilanTypes.map((t) =>
            t.id === modal.type.id ? { ...t, label: typeLabel } : t
          )
        );
    }
    setModal({ open: false, section: "", mode: "", type: null });
    setTypeLabel("");
  };

  // Add/remove product/exam
  const addProductToType = (product) => {
    setOrdTypes(
      ordTypes.map((t) =>
        t.id === ordType && !t.products.includes(product)
          ? { ...t, products: [...t.products, product] }
          : t
      )
    );
    setProductQuery("");
  };
  const removeProductFromType = (product) => {
    setOrdTypes(
      ordTypes.map((t) =>
        t.id === ordType
          ? { ...t, products: t.products.filter((p) => p !== product) }
          : t
      )
    );
  };
  const addExamToType = (exam) => {
    setBilanTypes(
      bilanTypes.map((t) =>
        t.id === bilanType && !t.exams.includes(exam)
          ? { ...t, exams: [...t.exams, exam] }
          : t
      )
    );
    setExamQuery("");
  };
  const removeExamFromType = (exam) => {
    setBilanTypes(
      bilanTypes.map((t) =>
        t.id === bilanType
          ? { ...t, exams: t.exams.filter((e) => e !== exam) }
          : t
      )
    );
  };

  // Save handlers
  const handleSaveOrdType = () => alert("Ordonnance sauvegardée !");
  const handleSaveBilanType = () => alert("Bilan sauvegardé !");

  // Suggestions
  const productSuggestions = productQuery
    ? ALL_PRODUCTS.filter(
        (p) =>
          p.toLowerCase().includes(productQuery.toLowerCase()) &&
          !ordTypes.find((t) => t.id === ordType).products.includes(p)
      )
    : [];
  const examSuggestions = examQuery
    ? ALL_EXAMS.filter(
        (e) =>
          e.toLowerCase().includes(examQuery.toLowerCase()) &&
          !bilanTypes.find((t) => t.id === bilanType).exams.includes(e)
      )
    : [];

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <Tabs defaultValue="ordonnance" className="w-full">
        <TabsList className="mb-6 grid grid-cols-2 gap-2 bg-purple-100 rounded-xl">
          <TabsTrigger
            value="ordonnance"
            className="text-purple-800 font-semibold"
          >
            Ordonnance
          </TabsTrigger>
          <TabsTrigger value="bilan" className="text-purple-800 font-semibold">
            Bilans
          </TabsTrigger>
        </TabsList>

        {/* Ordonnance */}
        <TabsContent value="ordonnance">
          <Card className="mb-8 shadow-lg border-purple-200 border">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-purple-700 font-bold">
                Types d'ordonnance prédéfinis
              </CardTitle>
              <Button
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => openAdd("ord")}
              >
                Ajouter type
              </Button>
            </CardHeader>
            <CardContent>
              {/* Select */}
              <div className="mb-4">
                <Label className="text-purple-700 font-medium">Type</Label>
                <Select value={ordType} onValueChange={setOrdType}>
                  <SelectTrigger className="w-full mt-2 border-purple-300 focus:ring-purple-400">
                    <SelectValue placeholder="Choisir le type" />
                  </SelectTrigger>
                  <SelectContent>
                    {ordTypes.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Buttons */}
              <div className="mb-4 flex gap-2">
                <Button
                  size="xs"
                  variant="outline"
                  className="border-purple-400 text-purple-700"
                  onClick={() =>
                    openEdit(
                      "ord",
                      ordTypes.find((t) => t.id === ordType)
                    )
                  }
                >
                  Modifier
                </Button>
                <Button
                  size="xs"
                  variant="destructive"
                  className="border-red-400"
                  onClick={() => handleDelete("ord", ordType)}
                >
                  Supprimer
                </Button>
                <Button
                  size="xs"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={handleSaveOrdType}
                >
                  Sauvegarder
                </Button>
              </div>

              {/* Add Product */}
              <div className="mb-4">
                <Label className="text-purple-700 font-medium">
                  Ajouter un médicament
                </Label>
                <div className="relative mt-2">
                  <Input
                    value={productQuery}
                    onChange={(e) => setProductQuery(e.target.value)}
                    placeholder="Rechercher un médicament..."
                    className="pr-10 border-purple-300 focus:ring-purple-400"
                  />
                  <Search
                    className="absolute right-3 top-3 text-purple-400"
                    size={18}
                  />
                  {productSuggestions.length > 0 && (
                    <ul className="absolute z-10 bg-white border border-purple-200 rounded shadow-lg w-full mt-1 max-h-40 overflow-auto">
                      {productSuggestions.map((p) => (
                        <li
                          key={p}
                          className="px-3 py-2 hover:bg-purple-50 cursor-pointer"
                          onClick={() => addProductToType(p)}
                        >
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Product List */}
              <div>
                <Label className="text-purple-700 font-medium">
                  Médicaments du type
                </Label>
                <ul className="mt-2 space-y-2">
                  {ordTypes.find((t) => t.id === ordType).products.length ===
                  0 ? (
                    <li className="text-gray-400 italic">
                      Aucun médicament ajouté.
                    </li>
                  ) : (
                    ordTypes
                      .find((t) => t.id === ordType)
                      .products.map((p) => (
                        <li
                          key={p}
                          className="bg-purple-50 rounded px-3 py-2 flex items-center justify-between"
                        >
                          <span className="font-semibold text-purple-700">
                            {p}
                          </span>
                          <Button
                            size="xs"
                            variant="ghost"
                            className="text-purple-500"
                            onClick={() => removeProductFromType(p)}
                          >
                            Supprimer
                          </Button>
                        </li>
                      ))
                  )}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bilans */}
        <TabsContent value="bilan">
          <Card className="mb-8 shadow-lg border-purple-200 border">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-purple-700 font-bold">
                Types de bilan prédéfinis
              </CardTitle>
              <Button
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => openAdd("bilan")}
              >
                Ajouter type
              </Button>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Label className="text-purple-700 font-medium">Type</Label>
                <Select value={bilanType} onValueChange={setBilanType}>
                  <SelectTrigger className="w-full mt-2 border-purple-300 focus:ring-purple-400">
                    <SelectValue placeholder="Choisir le type" />
                  </SelectTrigger>
                  <SelectContent>
                    {bilanTypes.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-4 flex gap-2">
                <Button
                  size="xs"
                  variant="outline"
                  className="border-purple-400 text-purple-700"
                  onClick={() =>
                    openEdit(
                      "bilan",
                      bilanTypes.find((t) => t.id === bilanType)
                    )
                  }
                >
                  Modifier
                </Button>
                <Button
                  size="xs"
                  variant="destructive"
                  className="border-red-400"
                  onClick={() => handleDelete("bilan", bilanType)}
                >
                  Supprimer
                </Button>
                <Button
                  size="xs"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={handleSaveBilanType}
                >
                  Sauvegarder
                </Button>
              </div>

              <div className="mb-4">
                <Label className="text-purple-700 font-medium">
                  Ajouter un examen
                </Label>
                <div className="relative mt-2">
                  <Input
                    value={examQuery}
                    onChange={(e) => setExamQuery(e.target.value)}
                    placeholder="Rechercher un examen..."
                    className="pr-10 border-purple-300 focus:ring-purple-400"
                  />
                  <Search
                    className="absolute right-3 top-3 text-purple-400"
                    size={18}
                  />
                  {examSuggestions.length > 0 && (
                    <ul className="absolute z-10 bg-white border border-purple-200 rounded shadow-lg w-full mt-1 max-h-40 overflow-auto">
                      {examSuggestions.map((e) => (
                        <li
                          key={e}
                          className="px-3 py-2 hover:bg-purple-50 cursor-pointer"
                          onClick={() => addExamToType(e)}
                        >
                          {e}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div>
                <Label className="text-purple-700 font-medium">
                  Examens du type
                </Label>
                <ul className="mt-2 space-y-2">
                  {bilanTypes.find((t) => t.id === bilanType).exams.length ===
                  0 ? (
                    <li className="text-gray-400 italic">
                      Aucun examen ajouté.
                    </li>
                  ) : (
                    bilanTypes
                      .find((t) => t.id === bilanType)
                      .exams.map((e) => (
                        <li
                          key={e}
                          className="bg-purple-50 rounded px-3 py-2 flex items-center justify-between"
                        >
                          <span className="font-semibold text-purple-700">
                            {e}
                          </span>
                          <Button
                            size="xs"
                            variant="ghost"
                            className="text-purple-500"
                            onClick={() => removeExamFromType(e)}
                          >
                            Supprimer
                          </Button>
                        </li>
                      ))
                  )}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal */}
      <Dialog
        open={modal.open}
        onOpenChange={(open) => setModal((m) => ({ ...m, open }))}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {modal.mode === "add" ? "Ajouter un type" : "Modifier le type"}
            </DialogTitle>
          </DialogHeader>
          <Input
            value={typeLabel}
            onChange={(e) => setTypeLabel(e.target.value)}
            placeholder="Nom du type"
            className="my-4 border-purple-300 focus:ring-purple-400"
          />
          <DialogFooter className="flex justify-between">
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={handleSaveType}
            >
              {modal.mode === "add" ? "Ajouter" : "Mettre à jour"}
            </Button>
            <Button
              variant="outline"
              className="border-purple-300 text-purple-700"
              onClick={() =>
                setModal({ open: false, section: "", mode: "", type: null })
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
