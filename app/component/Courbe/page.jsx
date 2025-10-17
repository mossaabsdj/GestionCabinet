"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Scatter,
} from "recharts";

// --- Data poids (kg)
const growthRefWeight = [
  { age: 0, m: 3.5, sd1: 4, sd2: 4.5, sd3: 5, sd_1: 3, sd_2: 2.5, sd_3: 2 },
  { age: 12, m: 9, sd1: 10, sd2: 11, sd3: 12, sd_1: 8, sd_2: 7, sd_3: 6 },
  {
    age: 24,
    m: 12.5,
    sd1: 13.7,
    sd2: 14.4,
    sd3: 15,
    sd_1: 11.6,
    sd_2: 10.9,
    sd_3: 10,
  },
  {
    age: 36,
    m: 14,
    sd1: 15.4,
    sd2: 16.2,
    sd3: 16.8,
    sd_1: 13,
    sd_2: 12.2,
    sd_3: 11.3,
  },
  {
    age: 48,
    m: 15.5,
    sd1: 17,
    sd2: 17.8,
    sd3: 18.6,
    sd_1: 14.5,
    sd_2: 13.6,
    sd_3: 12.6,
  },
  {
    age: 60,
    m: 17,
    sd1: 18.7,
    sd2: 19.6,
    sd3: 28,
    sd_1: 16,
    sd_2: 15,
    sd_3: 14,
  },
];

// --- Data taille (cm)
const growthRefHeight = [
  { age: 0, m: 50, sd1: 52, sd2: 54, sd3: 56, sd_1: 48, sd_2: 46, sd_3: 44 },
  { age: 12, m: 75, sd1: 77, sd2: 79, sd3: 81, sd_1: 73, sd_2: 71, sd_3: 69 },
  { age: 24, m: 87, sd1: 89, sd2: 91, sd3: 93, sd_1: 85, sd_2: 83, sd_3: 81 },
  { age: 36, m: 96, sd1: 98, sd2: 100, sd3: 102, sd_1: 94, sd_2: 92, sd_3: 90 },
  {
    age: 48,
    m: 104,
    sd1: 106,
    sd2: 108,
    sd3: 110,
    sd_1: 102,
    sd_2: 100,
    sd_3: 98,
  },
  {
    age: 60,
    m: 112,
    sd1: 114,
    sd2: 116,
    sd3: 118,
    sd_1: 110,
    sd_2: 108,
    sd_3: 106,
  },
];

// Mesures enfant
const childPoints = [
  { age: 0, poids: 3.3, taille: 50 },
  { age: 24, poids: 10.4, taille: 85 },
  { age: 36, poids: 6, taille: 94 },
];

const numericTicks = Array.from({ length: 31 }, (_, i) => i * 2);
const formatTick = (value) => {
  if (value === 12) return "1 an";
  if (value === 24) return "2 ans";
  if (value === 36) return "3 ans";
  if (value === 48) return "4 ans";
  if (value === 60) return "5 ans";
  return value;
};

export default function GrowthCharts({ patientID }) {
  const printRef = useRef();
  const [childPoints, setchildPoints] = useState();
  const [patientsData, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState();

  const handlePrint = () => {
    window.print();
  };
  async function fetchPatients() {
    try {
      const res = await fetch("/api/patients");
      if (!res.ok) throw new Error("Failed to fetch patients");
      const data = await res.json();
      setPatients(data);
      // setSelectedPatient(data[0]);

      const updatedPatient = data.find((p) => p.id === patientID) || null;

      setSelectedPatient(updatedPatient);

      console.log(JSON.stringify(updatedPatient));
      //console.log("data" + JSON.stringify(data));
    } catch (error) {
      console.error("❌ Error fetching patients:", error);
    } finally {
      // setLoading(false);
    }
  }
  function calculateAgeInMonths(dateNaissance, consultationDate) {
    const birth = new Date(dateNaissance);
    const consult = new Date(consultationDate);
    const years = consult.getFullYear() - birth.getFullYear();
    const months = consult.getMonth() - birth.getMonth();
    const totalMonths = years * 12 + months;
    return totalMonths;
  }

  useEffect(() => {
    fetchPatients();
  }, [patientID]);
  useEffect(() => {
    if (!selectedPatient) return;
    const value = {
      age: 0,
      poids: selectedPatient.poidsDeNaissance,
      taille: selectedPatient.tailleDeNaissance || null,
    };
    const data = selectedPatient.consultations.map((c) => ({
      age: calculateAgeInMonths(selectedPatient.dateDeNaissance, c.createdAt),
      poids: c.poids,
      taille: c.taille,
    }));
    data.push(value);
    setchildPoints(data);
  }, [selectedPatient]);
  return (
    <div>
      {/* --- Charts container --- */}
      <div id="charts-print">
        <div className="space-y-8 print:space-y-0 print:pb-0">
          {/* --- Poids --- */}
          <Card className="border-purple-300 shadow-md">
            <CardHeader>
              <CardTitle className="text-purple-700">
                Courbe de Poids (OMS 2007)
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[450px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="age"
                    type="number"
                    ticks={numericTicks}
                    interval={0}
                    allowDecimals={false}
                    tickFormatter={formatTick}
                    domain={[0, 60]}
                  />
                  <YAxis domain={[2, 34]} />
                  <Tooltip />
                  {["sd_3", "sd_2", "sd_1", "m", "sd1", "sd2", "sd3"].map(
                    (key, i) => (
                      <Line
                        key={key}
                        data={growthRefWeight}
                        dataKey={key}
                        strokeWidth={key === "m" ? 2.5 : 1.5}
                        dot={false}
                      />
                    )
                  )}
                  <Line
                    data={childPoints}
                    dataKey="poids"
                    stroke="#db2777"
                    dot={{ r: 5 }}
                    name="Enfant"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* --- Taille --- */}
          <Card className="border-green-300 shadow-md">
            <CardHeader>
              <CardTitle className="text-green-700">
                Courbe de Taille (OMS 2007)
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[450px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="age"
                    type="number"
                    ticks={numericTicks}
                    interval={0}
                    allowDecimals={false}
                    tickFormatter={formatTick}
                    domain={[0, 60]}
                  />
                  <YAxis domain={[40, 130]} />
                  <Tooltip />
                  {["sd_3", "sd_2", "sd_1", "m", "sd1", "sd2", "sd3"].map(
                    (key, i) => (
                      <Line
                        key={key}
                        data={growthRefHeight}
                        dataKey={key}
                        strokeWidth={key === "m" ? 2.5 : 1.5}
                        dot={false}
                      />
                    )
                  )}
                  <Line
                    data={childPoints}
                    dataKey="taille"
                    stroke="#db2777"
                    dot={{ r: 5 }}
                    name="Enfant"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* --- Print button --- */}
      <div className="flex justify-center print:hidden">
        <button
          onClick={handlePrint}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold"
        >
          Imprimer les courbes
        </button>
      </div>

      {/* --- Print styles --- */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #charts-print,
          #charts-print * {
            visibility: visible !important;
          }
          #charts-print {
            position: absolute !important;
            left: 0;
            top: 0;
            width: 100vw;
          }
        }
      `}</style>
    </div>
  );
}
