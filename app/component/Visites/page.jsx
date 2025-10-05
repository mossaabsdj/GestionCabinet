"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, Clock } from "lucide-react";

// Sample visits data
const visits = [
  {
    num: "001",
    date: "05 Oct 2025",
    time: "10:30",
    consultation: "Patient présente des symptômes de grippe.",
  },
  {
    num: "002",
    date: "06 Oct 2025",
    time: "14:00",
    consultation: "Contrôle post-opératoire de l’appendicite.",
  },
  {
    num: "003",
    date: "07 Oct 2025",
    time: "09:15",
    consultation: "Bilan sanguin et suivi diabète.",
  },
];

export default function PatientVisits() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-purple-700 mb-4">
        Visites du patient
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {visits.map((visit) => (
          <Dialog key={visit.num}>
            <DialogTrigger asChild>
              <Card className="bg-purple-50 p-3 cursor-pointer hover:bg-purple-100 transition">
                <CardContent>
                  <p className="font-medium text-purple-700 text-lg">
                    Visite #{visit.num}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <Calendar size={16} /> {visit.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <Clock size={16} /> {visit.time}
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md w-full bg-purple-50 rounded-xl p-4">
              <DialogHeader>
                <DialogTitle className="text-purple-700 text-lg font-semibold">
                  Consultation Visite #{visit.num}
                </DialogTitle>
              </DialogHeader>
              <p className="mt-2 text-gray-700">{visit.consultation}</p>
              <div className="mt-4 text-right">
                <Button variant="default">Fermer</Button>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
