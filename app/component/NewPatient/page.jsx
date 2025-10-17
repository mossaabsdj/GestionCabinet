import { useState } from "react";
import { Stethoscope } from "lucide-react";
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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function AddPatientModal({ open, onClose, onAdd }) {
  const [form, setForm] = useState({
    nom: "",
    age: "",
    telephone: "",
    adresse: "",
    antecedents: "",
    groupeSanguin: "",
    poidsDeNaissance: "", // 🆕 added
    dateDeNaissance: "", // 🆕 added
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.nom) return alert("Le nom est requis");
    onAdd({
      ...form,
      poidsDeNaissance: form.poidsDeNaissance
        ? parseFloat(form.poidsDeNaissance)
        : null,
      age: form.age ? Number(form.age) : null,
      dateDeNaissance: form.dateDeNaissance
        ? new Date(form.dateDeNaissance) // convert to Date object
        : null,
      createdAt: new Date().toISOString(),
    });
    setForm({
      nom: "",
      age: "",
      telephone: "",
      adresse: "",
      antecedents: "",
      groupeSanguin: "",
      poidsDeNaissance: "", // 🆕 added
      dateDeNaissance: "", // 🆕 added
    });
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-2xl p-6 shadow-lg">
        <DialogHeader className="flex flex-col items-center space-y-3">
          <div className="p-4 bg-purple-100 rounded-full shadow-md">
            <Stethoscope className="w-7 h-7 text-purple-700" />
          </div>
          <DialogTitle className="text-2xl font-bold text-purple-800">
            Nouveau Patient
          </DialogTitle>
          <p className="text-sm text-gray-500">
            Remplissez les informations pour créer un nouveau dossier patient
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
          {/* Nom obligatoire */}
          <div>
            <Label className="text-purple-700 font-medium">Nom *</Label>
            <Input
              placeholder="Nom complet"
              value={form.nom}
              onChange={(e) => setForm({ ...form, nom: e.target.value })}
              required
              className="h-12 px-4 mt-1 rounded-xl border-gray-300 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Grid layout for Age + Téléphone */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-500">Date de naissance</Label>
              <Input
                type="date"
                value={form.dateDeNaissance}
                onChange={(e) =>
                  setForm({ ...form, dateDeNaissance: e.target.value })
                }
                className="h-12 px-4 mt-1 rounded-xl border-gray-300 focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <Label className="text-gray-500">Téléphone</Label>
              <Input
                placeholder="---"
                type="tel"
                value={form.telephone}
                onChange={(e) =>
                  setForm({ ...form, telephone: e.target.value })
                }
                className="h-12 px-4 mt-1 rounded-xl bg-gray-50 text-gray-600 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Grid layout for Adresse + Groupe sanguin */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-500">Adresse</Label>
              <Input
                placeholder="---"
                value={form.adresse}
                onChange={(e) => setForm({ ...form, adresse: e.target.value })}
                className="h-12 px-4 mt-1 rounded-xl bg-gray-50 text-gray-600 placeholder-gray-400"
              />
            </div>

            <div>
              <Label className="text-gray-500">Groupe sanguin</Label>
              <Select
                value={form.groupeSanguin}
                onValueChange={(val) =>
                  setForm({ ...form, groupeSanguin: val }) +
                  console.log(val + JSON.stringify(form))
                }
              >
                <SelectTrigger className="h-12 px-4 mt-1 rounded-xl bg-gray-50 text-gray-600">
                  <SelectValue placeholder="---" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A_POS">A+</SelectItem>
                  <SelectItem value="A_NEG">A-</SelectItem>
                  <SelectItem value="B_POS">B+</SelectItem>
                  <SelectItem value="B_NEG">B-</SelectItem>
                  <SelectItem value="AB_POS">AB+</SelectItem>
                  <SelectItem value="AB_NEG">AB-</SelectItem>
                  <SelectItem value="O_POS">O+</SelectItem>
                  <SelectItem value="O_NEG">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 🆕 Poids de naissance + Date de naissance */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-500">Poids de naissance (kg)</Label>
              <Input
                type="number"
                placeholder="Ex: 3.2"
                value={form.poidsDeNaissance}
                onChange={(e) =>
                  setForm({ ...form, poidsDeNaissance: e.target.value })
                }
                className="h-12 px-4 mt-1 rounded-xl bg-gray-50 text-gray-600 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Antécédents */}
          <div>
            <Label className="text-gray-500">Antécédents</Label>
            <Input
              placeholder="---"
              value={form.antecedents}
              onChange={(e) =>
                setForm({ ...form, antecedents: e.target.value })
              }
              className="h-12 px-4 mt-1 rounded-xl bg-gray-50 text-gray-600 placeholder-gray-400"
            />
          </div>

          <DialogFooter className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-12 px-6 rounded-xl border-gray-300 hover:bg-gray-100"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="h-12 px-6 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium"
            >
              Ajouter
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
