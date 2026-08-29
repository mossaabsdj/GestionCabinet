"use client";

import { Power } from "lucide-react";

export default function ExitButton() {
  const handleExit = () => {
    if (typeof window !== "undefined" && (window?.electron?.exit || window?.electronAPI?.exit)) {
      if (window.electron?.exit) window.electron.exit();
      else window.electronAPI.exit();
    } else if (typeof window !== "undefined") {
      const confirmClose = window.confirm("Voulez-vous fermer la session ou quitter ?");
      if (confirmClose) {
        window.close();
      }
    }
  };

  return (
    <button
      onClick={handleExit}
      className="absolute top-3 right-3 flex items-center gap-2 px-4 py-2 
                 bg-gradient-to-r from-rose-500 via-red-500 to-pink-600 
                 text-white rounded-full shadow-xl hover:shadow-2xl 
                 hover:brightness-110 hover:scale-105 active:scale-95 
                 transition-all duration-200 z-50 cursor-pointer"
      title="Quitter l'application"
    >
      <Power size={18} />
      Quitter
    </button>
  );
}
