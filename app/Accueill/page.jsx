"use client";

import {
  Stethoscope,
  Users,
  CalendarCheck,
  FileText,
  Pill,
} from "lucide-react";
import LoadingScreen from "../component/LoadingScreen/page";
import { useState, useMemo, useEffect } from "react";

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

// --- Variables de config --- //

// Header
const dashboardHeader = {
  icon: Stethoscope,
  title: "Tableau de bord médical",
  subtitle: "Aperçu global de l’activité",
};

// Stats cards
const statCards = [
  {
    icon: Users,
    title: "Patients",
    description: "120 inscrits",
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    icon: CalendarCheck,
    title: "Rendez-vous",
    description: "Aujourd’hui : 15",
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    icon: Pill,
    title: "Ordonnances",
    description: "35 émises",
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    icon: FileText,
    title: "Rapports",
    description: "10 nouveaux",
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    icon: Stethoscope,
    title: "Activité médicale",
    description: "Consultations en cours",
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
];

// Patients par semaine
const weeklyPatientsData = [
  { week: "S1", patients: 80 },
  { week: "S2", patients: 95 },
  { week: "S3", patients: 110 },
  { week: "S4", patients: 130 },
];

// Ordonnances par mois
const prescriptionsData = [
  { month: "Jan", value: 35 },
  { month: "Fév", value: 40 },
  { month: "Mar", value: 50 },
  { month: "Avr", value: 45 },
  { month: "Mai", value: 60 },
];

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);
  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 ">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-purple-100 rounded-full shadow-md">
          <dashboardHeader.icon className="w-7 h-7 text-purple-700" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-purple-800">
            {dashboardHeader.title}
          </h1>
          <p className="text-sm text-purple-500">{dashboardHeader.subtitle}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card, i) => (
          <Card
            key={i}
            className="shadow-lg hover:shadow-xl transition rounded-xl"
          >
            <CardHeader className="flex flex-row items-center gap-4">
              <div className={`p-3 ${card.bg} rounded-xl`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
              <div>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2 mt-10">
        {/* Patients par semaine */}
        <Card>
          <CardHeader>
            <CardTitle>Patients par semaine</CardTitle>
            <CardDescription>Évolution sur 4 semaines</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyPatientsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="patients" fill="#7e3af2" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Ordonnances par mois */}
        <Card>
          <CardHeader>
            <CardTitle>Ordonnances par mois</CardTitle>
            <CardDescription>Tendance récente</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={prescriptionsData}>
                <defs>
                  <linearGradient id="colorOrd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7e3af2" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#7e3af2" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#7e3af2"
                  fillOpacity={1}
                  fill="url(#colorOrd)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
