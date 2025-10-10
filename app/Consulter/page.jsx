"use client";

import {
  Plus,
  Search,
  Calendar,
  User,
  Phone,
  Home,
  ClipboardList,
  FileText,
  Stethoscope,
  Ruler,
  Weight,
  Activity,
  Thermometer,
  HeartPulse,
  Gauge,
  Droplets,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useMemo, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AjouteModal from "@/app/component/NewPatient/page";
import CourbePage from "@/app/component/Courbe/page";
import NewConsultationPage from "../component/NewConsultation/page";
import Analyses from "../component/Analyses/page";
import PatientVisits from "../component/Visites/page";
import Ordonnances from "../component/Ordanance/page";
const patientsData = [
  {
    id: 1,
    nom: "Antonio Carson",
    condition: "Rhinite allergique",
    note: "Le patient présente des symptômes légers.",
    taille: 175,
    poids: 70,
    tensionSystolique: 120,
    tensionDiastolique: 80,
    temperature: 36.6,
    frequenceCardiaque: 72,
    frequenceRespiratoire: 16,
    saturationOxygene: 98,
    glycemie: 5.4,
    radios: [{ name: "Radiographie thoracique", date: "2025-09-01" }],
    bilans: [{ name: "NFS", result: "Normal" }],
  },
  {
    id: 2,
    name: "Brendon Rogers",
    condition: "Athérosclérose coronarienne",
    note: "Surveiller la tension artérielle régulièrement.",
    taille: 180,
    poids: 85,
    tensionSystolique: 135,
    tensionDiastolique: 85,
    temperature: 36.8,
    frequenceCardiaque: 78,
    frequenceRespiratoire: 18,
    saturationOxygene: 97,
    glycemie: 5.9,
    radios: [{ name: "IRM cardiaque", date: "2025-08-20" }],
    bilans: [{ name: "Cholestérol", result: "Élevé" }],
  },
];

export default function PatientDashboard() {
  const [selectedPatient, setSelectedPatient] = useState();
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedtab, setselectedtab] = useState("Informations Patient");
  const [NewConsultation, setNewConsultation] = useState(false);
  const [patientsData, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [NewConsultationData, setNewConsultationData] = useState({});
  const filteredPatients = patientsData.filter((p) =>
    p.nom.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    if (!NewConsultationData) return;
    console.log("New consultation data:" + JSON.stringify(NewConsultationData));
  }, [NewConsultationData]);
  async function fetchPatients() {
    try {
      const res = await fetch("/api/patients");
      if (!res.ok) throw new Error("Failed to fetch patients");
      const data = await res.json();
      setPatients(data);
      setSelectedPatient(data[0]);
      console.log("data" + JSON.stringify(data));
    } catch (error) {
      console.error("❌ Error fetching patients:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchPatients();
  }, []);
  // --- Données des sections ---

  const generalInfo = (selectedPatient) => [
    {
      icon: Calendar,
      label: "Date de naissance",
      value: selectedPatient?.dateNaissance || "Non spécifiée",
    },
    {
      icon: Calendar,
      label: "Âge",
      value: selectedPatient?.age
        ? `${selectedPatient?.age} ans`
        : "Non spécifié",
    },
    {
      icon: User,
      label: "Sexe",
      value: selectedPatient?.sexe || "Non spécifié",
    },
    {
      icon: User,
      label: "Groupe sanguin",
      value: selectedPatient?.groupeSanguin || "Non spécifié",
    },
  ];

  const contactInfo = (selectedPatient) => [
    {
      icon: Home,
      label: "Adresse",
      value: selectedPatient?.adresse || "Non spécifiée",
    },
    {
      icon: Phone,
      label: "Téléphone",
      value: selectedPatient?.telephone || "Non spécifié",
    },
  ];

  const medicalInfo = (selectedPatient) => {
    const c = selectedPatient?.consultations?.[0]; // Get latest or first consultation

    return [
      { icon: ClipboardList, label: "Notes", value: c?.note || "—" },
      { icon: Ruler, label: "Taille (cm)", value: c?.taille ?? "—" },
      { icon: Weight, label: "Poids (kg)", value: c?.poids ?? "—" },
      {
        icon: Activity,
        label: "TA systolique",
        value: c?.tensionSystolique ?? "—",
      },
      {
        icon: Activity,
        label: "TA diastolique",
        value: c?.tensionDiastolique ?? "—",
      },
      {
        icon: Thermometer,
        label: "Température (°C)",
        value: c?.temperature ?? "—",
      },
      {
        icon: HeartPulse,
        label: "Fréquence cardiaque",
        value: c?.frequenceCardiaque ?? "—",
      },
      {
        icon: Gauge,
        label: "Fréquence respiratoire",
        value: c?.frequenceRespiratoire ?? "—",
      },
      {
        icon: Droplets,
        label: "Saturation en oxygène (%)",
        value: c?.saturationOxygene ?? "—",
      },
      { icon: ClipboardList, label: "Glycémie", value: c?.glycemie ?? "—" },
    ];
  };

  const latestDiagnoses = [
    { name: "selectedPatient.condition,", date: "4 mai 2020" },
  ];
  async function handleAddPatient(data) {
    console.log(JSON.stringify(data));
    if (!data.nom) return alert("Le nom est requis");

    try {
      const res = await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Erreur lors de la création");
      const created = await res.json();
      await fetchPatients();
      setIsAddOpen(false);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la création du patient");
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <AjouteModal
        onAdd={handleAddPatient}
        open={isAddOpen}
        onClose={() => {
          setIsAddOpen(false);
        }}
      />
      {/* Sidebar */}

      <div className="w-80 h-screen bg-purple-50 p-6 flex flex-col border-r border-purple-200 fixed">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-800">Patients</h2>
          <Button
            onClick={() => setIsAddOpen(true)}
            className="rounded-full p-2 bg-purple-600 hover:bg-purple-700"
          >
            <Plus size={16} />
          </Button>
        </div>
        <div className="relative mb-4">
          <Input
            type="text"
            placeholder="Rechercher"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-10"
          />
          <Search
            className="absolute right-3 top-2.5 text-gray-400"
            size={16}
          />
        </div>
        <ul className="overflow-y-auto flex-1 h-[calc(100vh-120px)]">
          {filteredPatients.map((patient) => (
            <li
              key={patient.id}
              onClick={() => setSelectedPatient(patient)}
              className={`p-3 mb-2 rounded-lg cursor-pointer flex flex-col ${
                selectedPatient.id === patient.id
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-800 hover:bg-purple-100"
              }`}
            >
              <p className="font-medium flex items-center gap-2">
                <User size={16} /> {patient.nom}
              </p>
              <p className="text-sm flex items-center gap-2">
                <Stethoscope size={14} /> {patient.condition}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-80 p-8 overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="relative flex items-center justify-center ">
              {" "}
              <h1 className="text-3xl font-bold text-purple-800">
                {selectedPatient?.nom}
              </h1>
            </div>
            <p className="text-gray-500 text-sm flex items-center gap-1">
              <ClipboardList size={16} />
              {!NewConsultation ? "Dernier diagnostic" : "Nouveau diagnostic"}
            </p>
          </div>
          {!NewConsultation && (
            <Button
              onClick={() => {
                setNewConsultation(true);
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold"
            >
              <Plus size={18} />
              Nouvelle Consultation
            </Button>
          )}
        </div>
        <div className="flex border-b border-purple-200 mb-6">
          {[
            "Informations Patient",
            "Visites",
            "Analyses",
            "Courbe",
            "Ordonnances",
            "+ Nouvelle Consultation",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setselectedtab(tab);
              }}
              className={`px-4 py-2 font-medium border-b-2 transition-colors duration-200 ${
                tab === selectedtab
                  ? "text-purple-600 border-purple-600"
                  : "text-gray-600 border-transparent hover:text-purple-600 hover:border-purple-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div>
          {selectedtab === "Informations Patient" && (
            <>
              {" "}
              {[
                {
                  title: "Informations Générales",
                  icon: User,
                  data: generalInfo(selectedPatient),
                },
                {
                  title: "Informations Médicales",
                  icon: Stethoscope,
                  data: medicalInfo(selectedPatient),
                },
                {
                  title: "Informations de Contact",
                  icon: Phone,
                  data: contactInfo(selectedPatient),
                },
              ].map((section) => (
                <div key={section.title} className="mb-6">
                  <h3 className="text-xl font-semibold mb-4 text-purple-700 flex items-center gap-2">
                    <section.icon size={20} /> {section.title}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {section?.data.map((info) => (
                      <Card
                        key={info.label}
                        className="flex items-center gap-3 p-3"
                      >
                        <div className="flex justify-between w-full">
                          <div className="flex flex-row items-center">
                            <info.icon className="text-purple-500" size={20} />
                            <span className="text-gray-500 ml-2">
                              {info.label}
                            </span>
                          </div>
                          <span>{info.value}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
              {/* Derniers Diagnostics */}
              <h3 className="text-xl font-semibold mb-4 text-purple-700 flex items-center gap-2">
                <FileText size={20} /> Derniers Diagnostics
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {latestDiagnoses.map((diag) => (
                  <Card key={diag.name} className="bg-purple-50 p-3">
                    <CardContent>
                      <p className="font-medium">{diag.name}</p>
                      <p className="text-sm text-gray-500">{diag.date}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
          {selectedtab === "Courbe" && <CourbePage />}
          {selectedtab === "+ Nouvelle Consultation" && (
            <NewConsultationPage
              onSave={setNewConsultationData}
              selectedPatient={selectedPatient}
            />
          )}
          {selectedtab === "Analyses" && <Analyses />}
          {selectedtab === "Visites" && <PatientVisits />}
          {selectedtab === "Ordonnances" && <Ordonnances />}

          {/* Sections */}
        </div>
      </div>
    </div>
  );
}
