"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Stethoscope,
  Users,
  FileText,
  Pill,
  TestTube,
  Syringe,
  Menu,
  LogOut,
  Settings,
} from "lucide-react";

const Sidebar = ({
  items = [],
  onNavigate,
  collapsed = false,
  onToggleCollapse,
  userInfo = { name: "Dr. Amel", role: "Médecin" },
}) => {
  const [activeItem, setActiveItem] = useState(items[0]?.url || "");
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleItemClick = (item) => {
    setActiveItem(item.url);
    if (onNavigate) {
      onNavigate(item);
    }
  };

  return (
    <motion.div
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 text-white shadow-2xl flex flex-col relative overflow-x-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-purple-700/50">
        <div className="flex items-center justify-between">
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-lg">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">DR Amel</h1>
                  <p className="text-xs text-purple-300">Health System</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={onToggleCollapse}
            className="p-2 rounded-lg hover:bg-purple-700/50 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4  overflow-hidden">
        <div className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.url;
            const isHovered = hoveredItem === item.url;

            return (
              <button
                key={item.url}
                onClick={() => handleItemClick(item)}
                onMouseEnter={() => setHoveredItem(item.url)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`
                  w-full flex items-center gap-4 px-4 py-3 rounded-xl
                  transition-all duration-200 relative
                  ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-purple-500 shadow-lg"
                      : "hover:bg-purple-700/30"
                  }
                `}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full" />
                )}

                {/* Icon */}
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? "text-white" : "text-purple-300"
                  }`}
                />

                {/* Title */}
                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex-1 text-left font-medium ${
                        isActive ? "text-white" : "text-purple-200"
                      }`}
                    >
                      {item.title}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Tooltip for collapsed state */}
                {collapsed && isHovered && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-purple-800 rounded-lg shadow-xl whitespace-nowrap z-50">
                    {item.title}
                    <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-purple-800 rotate-45" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-purple-700/50">
        {/* Settings & Logout */}
        <div className="flex gap-2 mt-3">
          <button className="flex-1 p-3 rounded-lg bg-purple-700/30 hover:bg-purple-700/50 transition-colors">
            <Settings className="w-5 h-5 mx-auto" />
          </button>

          {!collapsed && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-1 p-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors text-red-300 hover:text-red-200"
            >
              <LogOut className="w-5 h-5 mx-auto" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Demo App
export default function App() {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("Accueill");

  const items = [
    { title: "Tableau de bord", url: "Accueill", icon: Home },
    { title: "Consulter", url: "Consulter", icon: Stethoscope },
    { title: "Patients", url: "Patients", icon: Users },
    { title: "Predifined", url: "Predifined", icon: FileText },
    { title: "Médicaments", url: "Medicament", icon: Pill },
    { title: "Bilans", url: "Bilans", icon: TestTube },
    { title: "Vaccine", url: "Vaccinations", icon: Syringe },
  ];

  const handleNavigate = (item) => {
    router.push(`/${item.url}`);
    // Auto-close sidebar after navigation
    setCollapsed(true);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 to-white overflow-hidden">
      <Sidebar
        items={items}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        onNavigate={handleNavigate}
        userInfo={{ name: "Dr. Dib Amel", role: "Médecin Pédiatre" }}
      />
    </div>
  );
}
