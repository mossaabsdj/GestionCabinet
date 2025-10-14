"use client";

import { useState } from "react";
import { Syringe } from "lucide-react";
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

export default function AddVaccinationModal({
  open,
  onClose,
  onAdd,
  value,
  setValue,
}) {
  const [form, setForm] = useState(value || { vaccineName: "" });

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.vaccineName) return alert("Le nom du vaccin est requis");
    onAdd(form.vaccineName);
    setForm({ vaccineName: "" });
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-2xl p-6 shadow-lg border border-purple-200">
        <DialogHeader className="flex flex-col items-center space-y-3">
          {/* Icon */}
          <div className="p-4 bg-purple-100 rounded-full shadow-md">
            <Syringe className="w-7 h-7 text-purple-700" />
          </div>

          {/* Title */}
          <DialogTitle className="text-2xl font-bold text-purple-800">
            Nouvelle Vaccination
          </DialogTitle>

          {/* Subtitle */}
          <p className="text-sm text-gray-500 text-center">
            Entrez le nom du vaccin à ajouter
          </p>
        </DialogHeader>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
          <div>
            <Label className="text-purple-700 font-medium">
              Nom du vaccin *
            </Label>
            <Input
              placeholder="Ex: COVID-19"
              value={form.vaccineName}
              onChange={(e) =>
                setForm({ ...form, vaccineName: e.target.value })
              }
              required
              className="h-12 px-4 mt-1 rounded-xl border-gray-300 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Footer Buttons */}
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
