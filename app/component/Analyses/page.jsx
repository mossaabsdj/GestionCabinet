"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

const latestFiles = [
  {
    name: "Bilan sanguin",
    date: "04 mai 2025",
    type: "Bilan (labo)",
    path: "/files/bilan1.pdf",
  },
  {
    name: "Scan abdomen",
    date: "02 mai 2025",
    type: "Scan",
    path: "/files/scan1.pdf",
  },
  {
    name: "Bilan urinaire",
    date: "01 mai 2025",
    type: "Bilan (labo)",
    path: "/files/bilan2.pdf",
  },
];

export default function Analyses() {
  const openFile = (path) => {
    window.open(path, "_blank"); // Opens file in a new tab
  };

  return (
    <div className="p-4">
      {" "}
      <h1 className="text-2xl font-bold text-purple-700 mb-4">
        Analyses du patient
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {latestFiles.map((file) => (
          <Card
            key={file.name + file.date}
            className="bg-purple-50 p-3 cursor-pointer hover:bg-purple-100 transition"
            onClick={() => openFile(file.path)}
          >
            <CardContent>
              <p className="font-medium text-purple-700 text-lg">{file.name}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <Calendar size={16} /> {file.date}
              </div>{" "}
              <p className="text-sm text-purple-700 font-semibold mt-1">
                {file.type}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
