"use client";

import {
  Stethoscope,
  Users,
  CalendarCheck,
  FileText,
  Pill,
  Activity,
} from "lucide-react";
import LoadingScreen from "../component/LoadingScreen/page";
import { useState } from "react";
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

// --- Minimal Animation Variants --- //
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
    transition: {
      staggerChildren: 0.08,
    },
  },
};

// --- Config --- //
const dashboardHeader = {
  icon: Stethoscope,
  title: "Tableau de bord médical",
  subtitle: "Aperçu global de l'activité",
};

const statCards = [
  {
    icon: Users,
    title: "Patients",
    value: "120",
    description: "Total inscrits",
  },
  {
    icon: CalendarCheck,
    title: "Rendez-vous",
    value: "15",
    description: "Aujourd'hui",
  },
  {
    icon: Pill,
    title: "Ordonnances",
    value: "35",
    description: "Ce mois",
  },
  {
    icon: FileText,
    title: "Rapports",
    value: "10",
    description: "Nouveaux",
  },
  {
    icon: Activity,
    title: "Consultations",
    value: "8",
    description: "En cours",
  },
];

const weeklyPatientsData = [
  { week: "Lun", patients: 80 },
  { week: "Mar", patients: 95 },
  { week: "Mer", patients: 110 },
  { week: "Jeu", patients: 130 },
  { week: "Ven", patients: 125 },
  { week: "Sam", patients: 90 },
  { week: "Dim", patients: 70 },
];

const prescriptionsData = [
  { month: "Jan", value: 35 },
  { month: "Fév", value: 40 },
  { month: "Mar", value: 50 },
  { month: "Avr", value: 45 },
  { month: "Mai", value: 60 },
  { month: "Juin", value: 55 },
];

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Header */}
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

        {/* Stats Cards */}
        <motion.div
          variants={staggerContainer}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-8"
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

        {/* Charts */}
        <motion.div
          variants={staggerContainer}
          className="grid gap-6 lg:grid-cols-2"
        >
          {/* Weekly Patients */}
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

          {/* Prescriptions */}
          <motion.div variants={fadeIn}>
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Ordonnances mensuelles
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  Tendance sur 6 mois
                </CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={prescriptionsData}>
                    <defs>
                      <linearGradient
                        id="colorPurple"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#9333ea"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#9333ea"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="month"
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
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#9333ea"
                      strokeWidth={2}
                      fill="url(#colorPurple)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
