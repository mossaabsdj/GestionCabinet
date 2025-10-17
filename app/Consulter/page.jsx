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
  FilePlus,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import NewOrdanance from "@/app/component/NewOrdanance/page";

import AddVaccinationButton from "../component/NewVaccination/page";
import { useState, useMemo, useEffect } from "react";
import VaccinationsPage from "@/app/component/Vaccination/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AjouteModal from "@/app/component/NewPatient/page";
import CourbePage from "@/app/component/Courbe/page";
import NewConsultationPage from "../component/NewConsultation/page";
import Analyses from "../component/Analyses/page";
import PatientVisits from "../component/Visites/page";
import Ordonnances from "../component/Ordanance/page";
import LoadingScreen from "../component/LoadingScreen/page";
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
  const [files, setFiles] = useState([]); // store multiple files
  const [refrech, setrefrech] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedtab, setselectedtab] = useState("Informations Patient");
  const [NewConsultation, setNewConsultation] = useState(false);
  const [patientsData, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ShowAddDialogNewAnalyse, setShowAddDialogNewAnalyse] = useState(false);
  const [NewConsultationData, setNewConsultationData] = useState({});
  const [lastid, setlastid] = useState(null);
  const [openNewordanance, setnewordanance] = useState(false);
  const filteredPatients = patientsData.filter((p) =>
    p.nom.toLowerCase().includes(search.toLowerCase())
  );
  const handlesaveOrdanance = (data) => {
    setNewConsultationData({
      note: "",
      ordonnance: data.ordonnance,
      bilanRecip: data.bilanRecip,
      taille: "",
      poids: "",
      tensionSystolique: "",
      tensionDiastolique: "",
      temperature: "",
      frequenceCardiaque: "",
      frequenceRespiratoire: "",
      saturationOxygene: "",
      glycemie: "",
      developpementPsychomoteur: "",
    });
  };
  function handleFileAdd(e) {
    const file = e.target.files[0];
    if (file) {
      setFiles((prev) => [...prev, { file, type: "bilan" }]);
    }
  }

  // Change type of a file
  function handleFileTypeChange(index, value) {
    setFiles((prev) =>
      prev.map((f, i) => (i === index ? { ...f, type: value } : f))
    );
  }

  // Remove a file
  function handleFileRemove(index) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }
  async function addConsultation(formData) {
    setlastid(selectedPatient?.id);
    console.log(formData);
    try {
      const response = await fetch("/api/Consulter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId: selectedPatient?.id,
          note: formData.note || "",
          taille: formData.taille || null,
          poids: formData.poids || null,
          tensionSystolique: formData.tensionSystolique || null,
          tensionDiastolique: formData.tensionDiastolique || null,
          temperature: formData.temperature || null,
          frequenceCardiaque: formData.frequenceCardiaque || null,
          frequenceRespiratoire: formData.frequenceRespiratoire || null,
          saturationOxygene: formData.saturationOxygene || null,
          glycemie: formData.glycemie || null,
          developpementPsychomoteur: formData.developpementPsychomoteur || null,

          ordonnance:
            formData?.ordonnance?.items?.length > 0
              ? {
                  items: formData.ordonnance.items.map((item) => ({
                    medicamentId: item.medicamentId,
                    dosage: item.dosage,
                    frequence: item.frequence,
                    duree: item.duree,
                    quantite: item.quantite,
                  })),
                }
              : undefined,

          bilanRecip:
            formData?.bilanRecip?.items?.length > 0
              ? {
                  items: formData.bilanRecip.items.map((item) => ({
                    bilanId: item.id,
                    resultat: null,
                    remarque: null,
                  })),
                }
              : undefined,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(
          err.error || "Erreur lors de la création de la consultation"
        );
      }

      const consultation = await response.json();
      await fetchPatients();
      setnewordanance(false);
      console.log("✅ Consultation créée:", consultation);
      return consultation;
    } catch (error) {
      console.error("❌ addConsultation error:", error);
      throw error;
    }
  }
  async function addconsultationfunction(data) {
    await addConsultation(data);
  }
  useEffect(() => {
    if (!NewConsultationData) return;
    console.log("New consultation data:" + JSON.stringify(NewConsultationData));
    addconsultationfunction(NewConsultationData);
  }, [NewConsultationData]);
  async function fetchPatients() {
    console.log("lastid" + lastid);
    try {
      const res = await fetch("/api/patients");
      if (!res.ok) throw new Error("Failed to fetch patients");
      const data = await res.json();
      console.log(JSON.stringify(data[0]));
      setPatients(data);
      setSelectedPatient(data[0]);

      if (lastid != null && lastid != "") {
        const updatedPatient = data.find((p) => p.id === lastid) || null;

        setSelectedPatient(updatedPatient);
      }
      console.log(JSON.stringify(selectedPatient));
      //console.log("data" + JSON.stringify(data));
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
      value: selectedPatient?.dateDeNaissance
        ? new Date(selectedPatient.dateDeNaissance).toLocaleDateString("fr-FR")
        : "Non spécifiée",
    },
    {
      icon: Calendar,
      label: "poidsDeNaissance",
      value: selectedPatient?.poidsDeNaissance
        ? `${selectedPatient?.poidsDeNaissance} kg`
        : "Non spécifié",
    },
    {
      icon: User,
      label: "antecedents",
      value: selectedPatient?.antecedents || "Non spécifié",
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
    if (!selectedPatient?.consultations?.length) return [];

    const consultations = selectedPatient.consultations;
    const lastIndex = consultations.length - 1;

    // 🔁 Function to look backwards for a valid value
    const getInfo = (attr, index) => {
      for (let i = index; i >= 0; i--) {
        const val = consultations[i]?.[attr];
        if (val !== null && val !== undefined && val !== "") {
          return val;
        }
      }
      return "—";
    };

    const c = consultations[lastIndex]; // latest consultation

    return [
      {
        icon: ClipboardList,
        label: "Notes",
        value: (
          <textarea
            rows={3} // number of visible lines
            readOnly
            className="w-full border rounded-md p-2 text-sm  text-gray-800"
            value={getInfo("note", lastIndex) || ""}
          />
        ),
        unite: "",
      },
      {
        icon: ClipboardList,
        label: "Développement Psychomoteur",
        value: (
          <textarea
            rows={3}
            readOnly
            className="w-full border rounded-md p-2 text-sm  text-gray-800"
            value={getInfo("developpementPsychomoteur", lastIndex) || ""}
          />
        ),
        unite: "",
      },

      {
        icon: Ruler,
        label: "Taille",
        value: getInfo("taille", lastIndex),
        unite: "cm",
      },
      {
        icon: Weight,
        label: "Poids",
        value: getInfo("poids", lastIndex),
        unite: "kg",
      },
      {
        icon: Activity,
        label: "TA systolique",
        value: getInfo("tensionSystolique", lastIndex),
        unite: "mmHg",
      },
      {
        icon: Activity,
        label: "TA diastolique",
        value: getInfo("tensionDiastolique", lastIndex),
        unite: "mmHg",
      },
      {
        icon: Thermometer,
        label: "Température",
        value: getInfo("temperature", lastIndex),
        unite: "°C",
      },
      {
        icon: HeartPulse,
        label: "Fréquence cardiaque",
        value: getInfo("frequenceCardiaque", lastIndex),
        unite: "bpm",
      },
      {
        icon: Gauge,
        label: "Fréquence respiratoire",
        value: getInfo("frequenceRespiratoire", lastIndex),
        unite: "cpm",
      },
      {
        icon: Droplets,
        label: "Saturation en oxygène",
        value: getInfo("saturationOxygene", lastIndex),
        unite: "%",
      },
      {
        icon: ClipboardList,
        label: "Glycémie",
        value: getInfo("glycemie", lastIndex),
        unite: "g/L",
      },
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

  if (loading) return <LoadingScreen />;
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <NewOrdanance
        open={openNewordanance}
        onOpenChange={setnewordanance}
        onsave={handlesaveOrdanance}
        selectedPatient={selectedPatient}
      />
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
          {selectedtab === "Vaccinations" ? (
            <AddVaccinationButton
              patientId={selectedPatient?.id}
              setrefrech={setrefrech}
            />
          ) : selectedtab === "Analyses et Résultats" ? (
            <Button
              onClick={() => setShowAddDialogNewAnalyse(true)}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium px-5 py-2 rounded-xl shadow-md transition"
            >
              <Plus className="mr-2 h-4 w-4" /> Nouvelle analyse
            </Button>
          ) : selectedtab === "Prescriptions et Bilans" ? (
            <Button
              onClick={() => setnewordanance(true)}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium px-5 py-2 rounded-xl shadow-md transition"
            >
              <Plus className="mr-2 h-4 w-4" /> Nouvelle Prescription/Bilan
            </Button>
          ) : selectedtab === "Visites" ||
            selectedtab === "Informations Patient" ? (
            <Button
              onClick={() => {
                setNewConsultation(true);
                setselectedtab("+ Nouvelle Consultation");
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
            >
              <Plus size={18} />
              Nouvelle Consultation
            </Button>
          ) : null}
        </div>
        <div className="flex border-b border-purple-200 mb-6">
          {[
            "Informations Patient",

            "Analyses et Résultats",
            "Vaccinations",
            "Courbe",
            "Visites",
            "Prescriptions et Bilans",
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
        {!selectedPatient ? (
          <p className="text-gray-500 text-center mt-10">Aucune Patient .</p>
        ) : (
          <div>
            {selectedtab === "Informations Patient" && (
              <>
                {" "}
                {[
                  {
                    title: "Informations Générales",
                    icon: User,
                    data: selectedPatient ? generalInfo(selectedPatient) : null,
                  },
                  {
                    title: "Informations Médicales",
                    icon: Stethoscope,
                    data: selectedPatient ? medicalInfo(selectedPatient) : null,
                  },
                  {
                    title: "Informations de Contact",
                    icon: Phone,
                    data: selectedPatient ? contactInfo(selectedPatient) : null,
                  },
                ].map((section) => (
                  <div key={section.title} className="mb-6">
                    <h3 className="text-xl font-semibold mb-4 text-purple-700 flex items-center gap-2">
                      <section.icon size={20} /> {section.title}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {section?.data?.map((info) => (
                        <Card
                          key={info.label}
                          className="flex items-center gap-3 p-3"
                        >
                          <div className="flex justify-between w-full">
                            <div className="flex flex-row items-center">
                              <info.icon
                                className="text-purple-500"
                                size={20}
                              />
                              <span className="text-gray-500 ml-2">
                                {info.label}
                              </span>
                            </div>
                            <span>
                              {info.value} {info.unite}
                            </span>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
                {/* Derniers Diagnostics */}
              </>
            )}
            {selectedtab === "Courbe" && (
              <CourbePage patientID={selectedPatient?.id} />
            )}
            {selectedtab === "+ Nouvelle Consultation" && (
              <NewConsultationPage
                onSave={setNewConsultationData}
                selectedPatient={selectedPatient}
              />
            )}
            {selectedtab === "Analyses et Résultats" && (
              <Analyses
                patientID={selectedPatient?.id}
                ShowAddDialogNewAnalyse={ShowAddDialogNewAnalyse}
                setShowAddDialogNewAnalyse={setShowAddDialogNewAnalyse}
              />
            )}
            {selectedtab === "Vaccinations" && (
              <VaccinationsPage
                refrech={refrech}
                setrefrech={setrefrech}
                patientId={selectedPatient?.id}
              />
            )}

            {selectedtab === "Visites" && (
              <PatientVisits patientId={selectedPatient?.id} />
            )}
            {selectedtab === "Prescriptions et Bilans" && (
              <Ordonnances patientId={selectedPatient?.id} />
            )}

            {/* Sections */}
          </div>
        )}
      </div>
    </div>
  );
}
