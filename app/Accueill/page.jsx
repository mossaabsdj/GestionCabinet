"use client";

import {
  Stethoscope,
  Users,
  CalendarCheck,
  FileText,
  Pill,
  Activity,
  FlaskConical,
  Clock,
} from "lucide-react";

import LoadingScreen from "../component/LoadingScreen/page";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

// === Animation Config === //
const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

const staggerContainer = {
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

// === Dashboard Header === //
const dashboardHeader = {
  icon: Stethoscope,
  title: "Tableau de bord médical",
  subtitle: "Aperçu global de l'activité",
};

const monthNames = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

export default function DashboardPage() {
  // === States === //
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    newPatients: 0,
    ordonnances: 0,
    bilans: 0,
    consultations: 0,
  });

  const [weeklyPatientsData, setWeeklyPatientsData] = useState([]);
  const [consultationsWeekly, setConsultationsWeekly] = useState([]);
  const [mounthlystats, setmounthlystats] = useState({});
  const [mounthofstats, setmounthofstats] = useState(new Date().getMonth() + 1);
  const [hourlyConsultations, setHourlyData] = useState([]);
  const [topData, setTopData] = useState({ topMedications: [], topBilans: [] });

  // === Fetch Hooks === //
  useEffect(() => {
    async function fetchAllData() {
      try {
        // Day stats
        const resStats = await fetch("/api/DayStats");
        const dataStats = await resStats.json();
        setStats(dataStats);

        // Weekly patients
        const resWeeklyPatients = await fetch("/api/Stats/weekly");
        setWeeklyPatientsData(await resWeeklyPatients.json());

        // Weekly consultations
        const resConsultationsWeekly = await fetch(
          "/api/Stats/consultations-weekly"
        );
        setConsultationsWeekly(await resConsultationsWeekly.json());

        // Hourly consultations (average)
        const resHourly = await fetch(
          "/api/Stats/consultations-hourly-average?days=7"
        );
        const hourly = await resHourly.json();
        setHourlyData(hourly.hourlyAverage);

        // Monthly stats
        const resMonthly = await fetch(
          `/api/Stats/mounthly?month=${mounthofstats}`
        );
        setmounthlystats(await resMonthly.json());

        // Top medications and bilans
        const resTop = await fetch("/api/Stats/top-usage");
        setTopData(await resTop.json());
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllData();
  }, [mounthofstats]);

  if (loading) return <LoadingScreen />;

  // === Data Config === //
  const statCards = [
    {
      icon: Users,
      title: "Nouveaux Patients",
      value: stats.newPatients,
      description: "Aujourd'hui",
    },
    {
      icon: Pill,
      title: "Ordonnances",
      value: stats.ordonnances,
      description: "Aujourd'hui",
    },
    {
      icon: FileText,
      title: "Bilans",
      value: stats.bilans,
      description: "Aujourd'hui",
    },
    {
      icon: Activity,
      title: "Consultations",
      value: stats.consultations,
      description: "Aujourd'hui",
    },
    {
      icon: CalendarCheck,
      title: "Dernière mise à jour",
      value: stats.date || "-",
      description: "Date",
    },
  ];

  const monthlyChartData = [
    { name: "Patients", value: mounthlystats.newPatients || 0 },
    { name: "Ordonnances", value: mounthlystats.ordonnances || 0 },
    { name: "Consultations", value: mounthlystats.consultations || 0 },
  ];

  // === UI === //
  return (
    <div className="min-h-screen p-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* === HEADER === */}
        <motion.div variants={fadeIn} className="mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-600 rounded-xl">
              <dashboardHeader.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {dashboardHeader.title}
              </h1>
              <p className="text-sm text-gray-600">
                {dashboardHeader.subtitle}
              </p>
            </div>
          </div>
        </motion.div>

        {/* === STATS CARDS === */}
        <motion.div
          variants={staggerContainer}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-10"
        >
          {statCards.map((card, i) => (
            <motion.div key={i} variants={fadeIn}>
              <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 bg-purple-100 rounded-lg">
                      <card.icon className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {card.value}
                    </div>
                    <CardTitle className="text-sm font-medium text-gray-700">
                      {card.title}
                    </CardTitle>
                    <CardDescription className="text-xs text-gray-500">
                      {card.description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* === WEEKLY CHARTS === */}
        <motion.div
          variants={staggerContainer}
          className="grid gap-6 lg:grid-cols-2"
        >
          {/* Patients */}
          <motion.div variants={fadeIn}>
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Patients de la semaine
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  Évolution journalière
                </CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyPatientsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="week"
                      stroke="#6b7280"
                      style={{ fontSize: "12px" }}
                    />
                    <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar
                      dataKey="patients"
                      fill="#9333ea"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Consultations */}
          <motion.div variants={fadeIn}>
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Consultations de la semaine
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  Évolution journalière
                </CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={consultationsWeekly}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="week"
                      stroke="#6b7280"
                      style={{ fontSize: "12px" }}
                    />
                    <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar
                      dataKey="consultations"
                      fill="#10b981"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* === HOURLY AVERAGE CHART === */}
        <motion.div variants={fadeIn} className="w-full mt-10">
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all w-full">
            <CardHeader className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Moyenne de consultations par heure
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  Activité horaire moyenne sur 7 jours
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={hourlyConsultations}
                  margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="hour"
                    stroke="#6b7280"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ fontWeight: "bold" }}
                    formatter={(value) => [`${value} consultations`, "Moyenne"]}
                  />
                  <Bar
                    dataKey="average"
                    fill="#3b82f6"
                    radius={[6, 6, 0, 0]}
                    barSize={25}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* === MONTHLY STATS === */}
        <motion.div variants={fadeIn} className="mt-10 lg:col-span-2">
          <Card className="border border-gray-200">
            <CardHeader className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Statistiques mensuelles
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {monthNames[mounthofstats - 1]}{" "}
                  {mounthlystats.year || new Date().getFullYear()}
                </CardDescription>
              </div>
              <select
                value={mounthofstats}
                onChange={(e) => setmounthofstats(Number(e.target.value))}
                className="border border-gray-300 rounded-md text-sm px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {monthNames.map((m, i) => (
                  <option key={i} value={i + 1}>
                    {m}
                  </option>
                ))}
              </select>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyChartData} barSize={60}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="name"
                    stroke="#6b7280"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="value" fill="#9333ea" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* === TOP MÉDICAMENTS & BILANS === */}
        <motion.div
          variants={staggerContainer}
          className="grid gap-6 mt-10 lg:grid-cols-2 items-stretch"
        >
          {/* Médicaments */}
          <motion.div variants={fadeIn} className="w-full">
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all w-full h-full flex flex-col">
              <CardHeader className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Pill className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Top 10 Médicaments utilisés
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    Médicaments les plus prescrits
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto px-4 pb-4">
                {topData.topMedications.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-6">
                    Aucune donnée disponible
                  </p>
                ) : (
                  <ul className="divide-y divide-gray-100">
                    {topData.topMedications.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between py-3 px-2 hover:bg-gray-50 rounded-lg transition"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 flex items-center justify-center bg-purple-100 text-purple-600 font-semibold rounded-full">
                            {i + 1}
                          </div>
                          <span className="text-gray-800 font-medium truncate max-w-[200px]">
                            {item.name}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-purple-600">
                          {item.value}x
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Bilans */}
          <motion.div variants={fadeIn} className="w-full">
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all w-full h-full flex flex-col">
              <CardHeader className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-xl">
                  <FlaskConical className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Top 10 Bilans réalisés
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    Bilans les plus demandés
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto px-4 pb-4">
                {topData.topBilans.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-6">
                    Aucune donnée disponible
                  </p>
                ) : (
                  <ul className="divide-y divide-gray-100">
                    {topData.topBilans.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between py-3 px-2 hover:bg-gray-50 rounded-lg transition"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-600 font-semibold rounded-full">
                            {i + 1}
                          </div>
                          <span className="text-gray-800 font-medium truncate max-w-[200px]">
                            {item.name}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-green-600">
                          {item.value}x
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
