"use client";

import React, { useState, useEffect } from "react";
import DashboardPage from "./Accueill/page";
import AproposPage from "./Apropos/page";
import LoadingScreen from "./component/LoadingScreen/page";

export default function RootEntryPage() {
  const [isElectron, setIsElectron] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsElectron(Boolean(window?.electron));
    }
  }, []);

  // During initial hydration
  if (isElectron === null) {
    return <LoadingScreen />;
  }

  // In Electron desktop app -> Open Medical Dashboard directly
  if (isElectron) {
    return <DashboardPage />;
  }

  // In Web Browser -> Open Showcase & About page first (with CTA to test the app)
  return <AproposPage />;
}
