"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function DialogAlert({ open, onClose, title, message }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white/90 backdrop-blur-md border border-purple-200 shadow-lg">
        <DialogHeader className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-purple-600" />
          <DialogTitle className="text-purple-700 font-semibold">
            {title || "Alerte"}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-gray-700 py-2">
          {message || "Une erreur s’est produite."}
        </DialogDescription>

        <DialogFooter>
          <Button
            onClick={onClose}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
