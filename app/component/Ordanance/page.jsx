"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, Clock, Hash } from "lucide-react";

const ORDONNANCES = [
  {
    num: "001",
    date: "05 Oct 2025",
    time: "10:30",
    details:
      "Paracétamol 500mg x2/j pendant 5 jours.\nBilans sanguins à réaliser.",
  },
  {
    num: "002",
    date: "06 Oct 2025",
    time: "14:00",
    details:
      "Ibuprofène 400mg x3/j pendant 7 jours.\nSuivi post-opératoire appendicite.",
  },
  {
    num: "003",
    date: "07 Oct 2025",
    time: "09:15",
    details:
      "Oméprazole 20mg x1/j pendant 14 jours.\nContrôle glycémie et tension artérielle.",
  },
];

export default function OrdonnancesPage() {
  const [selectedOrdonnance, setSelectedOrdonnance] = useState(null);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-purple-700 mb-4">
        Ordonnances du patient
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {ORDONNANCES.map((ord) => (
          <Dialog
            key={ord.num}
            open={selectedOrdonnance?.num === ord.num}
            onOpenChange={(open) => !open && setSelectedOrdonnance(null)}
          >
            <Card
              className="bg-purple-50 p-3 cursor-pointer hover:bg-purple-100 transition"
              onClick={() => setSelectedOrdonnance(ord)}
            >
              <CardContent>
                <p className="font-medium text-purple-700">
                  Ordonnance #{ord.num}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <Calendar size={16} /> {ord.date}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <Clock size={16} /> {ord.time}
                </div>
              </CardContent>
            </Card>

            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-purple-700">
                  Détails Ordonnance #{ord.num}
                </DialogTitle>
              </DialogHeader>
              <pre className="mt-2 text-gray-700 whitespace-pre-wrap">
                {ord.details}
              </pre>
              <div className="mt-4 text-right">
                <Button
                  variant="outline"
                  onClick={() => setSelectedOrdonnance(null)}
                >
                  Fermer
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
