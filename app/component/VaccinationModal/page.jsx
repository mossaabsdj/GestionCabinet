"use client";

import { useState } from "react";
import { Syringe, Loader2 } from "lucide-react";
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
  loading: parentLoading,
}) {
  const [form, setForm] = useState(value || { vaccineName: "" });
  const [internalLoading, setInternalLoading] = useState(false);
  const loading = parentLoading || internalLoading;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.vaccineName) return alert("Le nom du vaccin est requis");
    setInternalLoading(true);
    try {
      await onAdd(form.vaccineName);
      setForm({ vaccineName: "" });
    } catch (err) {
      console.error(err);
    } finally {
      setInternalLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-2xl p-6 shadow-lg border border-[var(--color-200)]">
        <DialogHeader className="flex flex-col items-center space-y-3">
          {/* Icon */}
          <div className="p-4 bg-[var(--color-100)] rounded-full shadow-md">
            <Syringe className="w-7 h-7 text-[var(--color-700)]" />
          </div>

          {/* Title */}
          <DialogTitle className="text-2xl font-bold text-[var(--color-800)]">
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
            <Label className="text-[var(--color-700)] font-medium">
              Nom du vaccin *
            </Label>
            <Input
              placeholder="Ex: BCG"
              value={form.vaccineName}
              onChange={(e) =>
                setForm({ ...form, vaccineName: e.target.value })
              }
              required
              className="h-12 px-4 mt-1 rounded-xl border-gray-300 focus:ring-2 focus:ring-[var(--color-500)]"
            />
          </div>

          {/* Footer Buttons */}
          <DialogFooter className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={onClose}
              className="h-12 px-6 rounded-xl border-gray-300 hover:bg-gray-100"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="h-12 px-6 rounded-xl bg-[var(--color-600)] hover:bg-[var(--color-700)] text-white font-medium flex items-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Ajout..." : "Ajouter"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
