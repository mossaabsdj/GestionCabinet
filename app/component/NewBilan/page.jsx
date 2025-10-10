"use client";

import { useState, useEffect } from "react";
import { ClipboardList } from "lucide-react";
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

export default function AddBilanModal({
  open,
  onClose,
  onAdd,
  value,
  setValue,
}) {
  const [form, setForm] = useState({ nom: "" });

  // Synchronize form with passed `value` when editing or reopening
  useEffect(() => {
    if (value) setForm(value);
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nom.trim()) {
      alert("Le nom du bilan est requis");
      return;
    }

    onAdd(form); // send form data to parent
    setForm({ nom: "" }); // reset form
    onClose(); // close modal
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-2xl p-6 shadow-lg border border-purple-200">
        <DialogHeader className="flex flex-col items-center space-y-3">
          <div className="p-4 bg-purple-100 rounded-full shadow-md">
            <ClipboardList className="w-7 h-7 text-purple-700" />
          </div>
          <DialogTitle className="text-2xl font-bold text-purple-800">
            Nouveau Bilan
          </DialogTitle>
          <p className="text-sm text-gray-500 text-center">
            Remplissez le nom pour ajouter un nouveau type de bilan.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
          {/* Champ Nom du Bilan */}
          <div>
            <Label htmlFor="nom" className="text-purple-700 font-medium">
              Nom *
            </Label>
            <Input
              id="nom"
              placeholder="Ex : Bilan sanguin"
              value={form.nom}
              onChange={(e) => setForm({ ...form, nom: e.target.value })}
              required
              className="h-12 px-4 mt-1 rounded-xl border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-400"
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
              className="h-12 px-6 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-md"
            >
              Ajouter
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
