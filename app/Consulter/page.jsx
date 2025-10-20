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
  UserCircle,
  Mail,
  MapPin,
  Sparkles,
  Keyboard,
} from "lucide-react";
import SuccessModal from "@/app/component/success/page";
import { Card, CardContent } from "@/components/ui/card";
import NewOrdanance from "@/app/component/NewOrdanance/page";
import AddVaccinationButton from "../component/NewVaccination/page";
import { useState, useMemo, useEffect, useRef } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
import ModernSearchBar from "../component/SearchBar/page";
import { tabs } from "@heroui/theme";
export default function PatientDashboard() {
  const searchRef = useRef();
  const [selectedPatient, setSelectedPatient] = useState();
  const [search, setSearch] = useState("");
  const [files, setFiles] = useState([]);
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
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [load, setload] = useState(false);
  const [query, setquery] = useState({ visites: "", ord: "" });
  const [successopen, setsuccessopen] = useState(false);
  const [config, setConfig] = useState({
    title: "Payment Successful!",
    description:
      "Your payment has been processed successfully. You'll receive a confirmation email shortly.",
    autoClose: true,
    loadingText: "Traitement en cours...",

    autoCloseDelay: 100,
  });
  const filteredPatients = patientsData.filter((p) =>
    p.nom.toLowerCase().includes(search.toLowerCase())
  );
  const handleChange = (value) => {
    const att = selectedtab === "Visites" ? "visites" : "ord";
    console.log("ord", att);
    setquery((prev) => ({ ...prev, [att]: value }));
  };

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

  function handleFileTypeChange(index, value) {
    setFiles((prev) =>
      prev.map((f, i) => (i === index ? { ...f, type: value } : f))
    );
  }

  function handleFileRemove(index) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function addConsultation(formData) {
    setlastid(selectedPatient?.id);
    console.log(formData);

    // Check if all fields are empty
    const hasData =
      formData.note?.trim() ||
      formData.taille ||
      formData.poids ||
      formData.tensionSystolique ||
      formData.tensionDiastolique ||
      formData.temperature ||
      formData.frequenceCardiaque ||
      formData.frequenceRespiratoire ||
      formData.saturationOxygene ||
      formData.glycemie ||
      formData.developpementPsychomoteur?.trim() ||
      formData?.ordonnance?.items?.length > 0 ||
      formData?.bilanRecip?.items?.length > 0;

    if (!hasData) {
      alert(
        "Veuillez remplir au moins un champ avant de créer la consultation."
      );
      return;
    }
    setConfig({
      title: "Nouvelle consultation ajoutée !",
      description: "La consultation du patient a été ajoutée avec succès.",
    });
    setsuccessopen(true);

    setload(true);
    try {
      const response = await fetch("/api/Consulter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId: selectedPatient?.id,
          note: formData.note?.trim() || "",
          taille: formData.taille || null,
          poids: formData.poids || null,
          tensionSystolique: formData.tensionSystolique || null,
          tensionDiastolique: formData.tensionDiastolique || null,
          temperature: formData.temperature || null,
          frequenceCardiaque: formData.frequenceCardiaque || null,
          frequenceRespiratoire: formData.frequenceRespiratoire || null,
          saturationOxygene: formData.saturationOxygene || null,
          glycemie: formData.glycemie || null,
          developpementPsychomoteur:
            formData.developpementPsychomoteur?.trim() || null,
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
        setsuccessopen(false);
        const err = await response.json();
        throw new Error(
          err.error || "Erreur lors de la création de la consultation"
        );
      }
      setload(false);

      const consultation = await response.json();
      await fetchPatients();
      setnewordanance(false);

      //  setsuccessopen(true);
      console.log("✅ Consultation créée:", consultation);
      return consultation;
    } catch (error) {
      console.error("❌ addConsultation error:", error);
      alert("Erreur lors de la création de la consultation: " + error.message);
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
    } catch (error) {
      console.error("❌ Error fetching patients:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPatients();
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl+A: Focus search bar
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        searchRef.current?.focus();
      }

      // Ctrl+N: New patient
      if ((e.ctrlKey || e.metaKey) && e.key === "a") {
        e.preventDefault();
        setIsAddOpen(true);
      }

      // Ctrl+K: New consultation
      if ((e.ctrlKey || e.metaKey) && e.key === "c") {
        e.preventDefault();
        setNewConsultation(true);
        setselectedtab("+ Nouvelle Consultation");
      }

      // Ctrl+P: New prescription/bilan
      if ((e.ctrlKey || e.metaKey) && e.key === "p") {
        e.preventDefault();
        setnewordanance(true);
      }

      // Ctrl+V: Vaccinations tab
      if ((e.ctrlKey || e.metaKey) && e.key === "v") {
        e.preventDefault();
        setselectedtab("Vaccinations");
      }

      // Ctrl+I: Patient info tab
      if ((e.ctrlKey || e.metaKey) && e.key === "i") {
        e.preventDefault();
        setselectedtab("Informations Patient");
      }

      // Ctrl+/: Show shortcuts help
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        e.preventDefault();
        setShowShortcuts(true);
      }

      // ESC: Close shortcuts help
      if (e.key === "Escape" && showShortcuts) {
        setShowShortcuts(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedPatient, showShortcuts]);

  const generalInfo = (selectedPatient) => [
    {
      icon: Calendar,
      label: "Date de naissance",
      value: selectedPatient?.dateDeNaissance
        ? new Date(selectedPatient.dateDeNaissance).toLocaleDateString("fr-FR")
        : "Non spécifiée",
    },
    {
      icon: Weight,
      label: "Poids de naissance",
      value: selectedPatient?.poidsDeNaissance
        ? `${selectedPatient?.poidsDeNaissance} kg`
        : "Non spécifié",
    },
    {
      icon: ClipboardList,
      label: "Antécédents",
      value: selectedPatient?.antecedents || "Non spécifié",
    },
    {
      icon: Droplets,
      label: "Groupe sanguin",
      value: selectedPatient?.groupeSanguin || "Non spécifié",
    },
  ];

  const contactInfo = (selectedPatient) => [
    {
      icon: MapPin,
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

    const getInfo = (attr, index) => {
      for (let i = index; i >= 0; i--) {
        const val = consultations[i]?.[attr];
        if (val !== null && val !== undefined && val !== "") {
          return val;
        }
      }
      return "—";
    };

    const c = consultations[lastIndex];

    return [
      {
        icon: ClipboardList,
        label: "Notes",
        value: (
          <textarea
            rows={3}
            readOnly
            className="w-full border rounded-md p-2 text-sm text-gray-800"
            value={getInfo("note", lastIndex) || ""}
          />
        ),
        unite: "",
      },
      {
        icon: Sparkles,
        label: "Développement Psychomoteur",
        value: (
          <textarea
            rows={3}
            readOnly
            className="w-full border rounded-md p-2 text-sm text-gray-800"
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

  async function handleAddPatient(data) {
    console.log(JSON.stringify(data));
    if (!data.nom) return alert("Le nom est requis");
    setConfig({
      title: "Nouveau patient ajouté !",
      description:
        "Le patient a été enregistré avec succès dans la base de données.",
    });
    setsuccessopen(true);
    setload(true);
    try {
      const res = await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        setsuccessopen(false);
        throw new Error("Erreur lors de la création");
      }
      setload(false);

      const created = await res.json();

      setIsAddOpen(false);
      await fetchPatients();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la création du patient");
    }
  }

  if (loading) return <LoadingScreen />;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <SuccessModal
        config={config}
        dialogOpen={successopen}
        setDialogOpen={setsuccessopen}
        loading={load}
      />

      {/* Keyboard Shortcuts Help Dialog */}
      <AnimatePresence>
        {showShortcuts && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowShortcuts(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-purple-800 flex items-center gap-2">
                  <Keyboard size={24} />
                  Raccourcis clavier
                </h2>
                <button
                  onClick={() => setShowShortcuts(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                {[
                  { key: "Ctrl + S", desc: "Rechercher un patient" },
                  { key: "Ctrl + A", desc: "Nouveau patient" },
                  { key: "Ctrl + C", desc: "Nouvelle consultation" },
                  { key: "Ctrl + P", desc: "Nouvelle prescription/bilan" },
                  { key: "Ctrl + V", desc: "Onglet Vaccinations" },
                  { key: "Ctrl + I", desc: "Onglet Informations" },
                  { key: "Ctrl + /", desc: "Afficher les raccourcis" },
                  { key: "ESC", desc: "Fermer les dialogues" },
                ].map((shortcut, i) => (
                  <motion.div
                    key={shortcut.key}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex justify-between items-center p-3 bg-purple-50 rounded-lg"
                  >
                    <span className="text-gray-700">{shortcut.desc}</span>
                    <kbd className="px-3 py-1 bg-white border border-purple-300 rounded-md text-sm font-semibold text-purple-700 shadow-sm">
                      {shortcut.key}
                    </kbd>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
      {/* Sidebar with Animation */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-70 h-screen bg-purple-100 rounded-tr-4xl p-6 pl-2 pr-2  pr-0flex flex-col border-r border-purple-200 fixed "
      >
        <div
          className="absolute  bg-no-repeat bg-cover bg-center opacity-15 pointer-events-none "
          style={{
            backgroundImage: "url('/background.png')",
          }}
        ></div>
        <div className="flex justify-between items-center mb-6">
          <motion.h2
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-purple-800"
          >
            Patients
          </motion.h2>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Button
              onClick={() => setIsAddOpen(true)}
              className="rounded-full p-2 bg-purple-600 hover:bg-purple-700"
            >
              <Plus size={16} />
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative mb-4"
        >
          <Input
            ref={searchRef}
            type="text"
            placeholder="Rechercher (Ctrl+S)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-10"
          />
          <Search
            className="absolute right-3 top-2.5 text-gray-400"
            size={16}
          />
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="overflow-y-auto flex-1 h-[calc(100vh-120px)]"
        >
          <AnimatePresence>
            {filteredPatients.map((patient, index) => (
              <motion.li
                key={patient.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPatient(patient)}
                className={`p-3 mb-2 rounded-lg cursor-pointer flex flex-col transition-all duration-200 ${
                  selectedPatient?.id === patient.id
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-white text-gray-800 hover:bg-purple-100"
                }`}
              >
                <p className="font-medium flex items-center gap-2">
                  <UserCircle size={16} /> {patient.nom}
                </p>
                <p className="text-sm flex items-center gap-2">
                  <User size={14} /> {patient.sexe}
                </p>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </motion.div>
      {/* Main Content */}
      <div className="flex-1 ml-50 p-8 overflow-auto">
        {/* Keyboard shortcut hint button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowShortcuts(true)}
          className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 shadow-lg z-40"
          title="Raccourcis clavier (Ctrl+/)"
        >
          <Keyboard size={24} />
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-6"
        >
          <div>
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-3xl font-bold text-purple-800"
            >
              {selectedPatient?.nom}
            </motion.h1>
            <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
              <ClipboardList size={16} />
              {!NewConsultation ? "Dernier diagnostic" : "Nouveau diagnostic"}
            </p>
          </div>
          {selectedtab === "Prescriptions et Bilans" && (
            <div>
              <ModernSearchBar
                onChange={handleChange}
                value={selectedtab === "Visites" ? query.visites : query.ord}
                placeholder="id..."
              />
            </div>
          )}
          {selectedtab === "Visites" && (
            <div>
              <ModernSearchBar
                onChange={handleChange}
                value={selectedtab === "Visites" ? query.visites : query.ord}
                placeholder="id..."
              />
            </div>
          )}

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
          </motion.div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex border-b border-purple-200 mb-6 overflow-x-hidden"
        >
          {[
            "Informations Patient",
            "Analyses et Résultats",
            "Vaccinations",
            "Courbe",
            "Visites",
            "Prescriptions et Bilans",
            "+ Nouvelle Consultation",
          ].map((tab, index) => (
            <motion.button
              key={tab}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setselectedtab(tab);
              }}
              className={`px-4 py-2 font-medium border-b-2 transition-all duration-200 whitespace-nowrap ${
                tab === selectedtab
                  ? "text-purple-600 border-purple-600"
                  : "text-gray-600 border-transparent hover:text-purple-600 hover:border-purple-300"
              }`}
            >
              {tab}
            </motion.button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {!selectedPatient ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-gray-500 text-center mt-10"
            >
              Aucune Patient.
            </motion.p>
          ) : (
            <motion.div
              key={selectedtab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {selectedtab === "Informations Patient" && (
                <>
                  {[
                    {
                      title: "Informations Générales",
                      icon: User,
                      data: selectedPatient
                        ? generalInfo(selectedPatient)
                        : null,
                    },
                    {
                      title: "Informations Médicales",
                      icon: Stethoscope,
                      data: selectedPatient
                        ? medicalInfo(selectedPatient)
                        : null,
                    },
                    {
                      title: "Informations de Contact",
                      icon: Phone,
                      data: selectedPatient
                        ? contactInfo(selectedPatient)
                        : null,
                    },
                  ].map((section, sectionIndex) => (
                    <motion.div
                      key={section.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: sectionIndex * 0.1 }}
                      className="mb-6"
                    >
                      <h3 className="text-xl font-semibold mb-4 text-purple-700 flex items-center gap-2">
                        <section.icon size={20} /> {section.title}
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {section?.data?.map((info, infoIndex) => (
                          <motion.div
                            key={info.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay: sectionIndex * 0.1 + infoIndex * 0.05,
                            }}
                            whileHover={{ scale: 1.02, y: -2 }}
                          >
                            <Card className="flex items-center gap-3 p-3 shadow-sm hover:shadow-md transition-shadow bg-white z-0">
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
                                <span className="font-medium">
                                  {info.value} {info.unite}
                                </span>
                              </div>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
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
                <PatientVisits
                  patientId={selectedPatient?.id}
                  query={query.visites}
                />
              )}
              {selectedtab === "Prescriptions et Bilans" && (
                <Ordonnances
                  patientId={selectedPatient?.id}
                  query={query.ord}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
